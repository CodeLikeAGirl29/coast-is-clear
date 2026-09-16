// lib/posts.ts
//
// Reads content/posts/*.mdx directly from the filesystem, parses frontmatter
// with gray-matter, and validates it with the same zod schema shape Velite
// used to enforce. No separate build step, no generated output folder, no
// module aliasing — just a plain function you call from Server Components.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { CATEGORIES } from "@/lib/categories";

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts");

const frontmatterSchema = z.object({
  title: z.string().max(99),
  description: z.string().max(200),
  date: z.string(),
  category: z.enum(CATEGORIES),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  /** Path under /public, e.g. "/images/posts/flood-zones-cover.jpg". Optional — falls back to a gradient placeholder. */
  coverImage: z.string().optional(),
  coverAlt: z.string().optional(),
});

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: (typeof CATEGORIES)[number];
  tags: string[];
  published: boolean;
  permalink: string;
  coverImage?: string;
  coverAlt?: string;
  /** Raw MDX body (frontmatter stripped), rendered via <MDXContent />. */
  content: string;
}

function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(POSTS_DIRECTORY, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  let frontmatter: z.infer<typeof frontmatterSchema>;
  try {
    frontmatter = frontmatterSchema.parse(data);
  } catch (err) {
    // Fail loudly and specifically instead of a vague "module not found"
    // three files downstream — this is exactly the class of bug that cost
    // real time under the old Velite setup.
    throw new Error(
      `Invalid frontmatter in content/posts/${fileName}: ${
        err instanceof z.ZodError ? err.message : String(err)
      }`,
    );
  }

  return {
    slug,
    ...frontmatter,
    permalink: `/blog/${slug}`,
    content,
  };
}

let cache: Post[] | null = null;

/** All posts (including unpublished), newest first. Cached per server process. */
export function getAllPosts(): Post[] {
  if (cache) return cache;

  const fileNames = fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((name) => name.endsWith(".mdx"));

  cache = fileNames
    .map(readPost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return cache;
}

/** Published posts only, newest first — use this everywhere the public site lists posts. */
export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((post) => post.published);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
