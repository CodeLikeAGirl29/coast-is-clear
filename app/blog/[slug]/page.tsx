// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXContent } from "@/components/mdx-content";
import TableOfContents from "@/components/TableOfContents";
import ShareButtons from "@/components/ShareButtons";
import RelatedPosts from "@/components/RelatedPosts";
import CoverImage from "@/components/CoverImage";
import { categoryStyle } from "@/lib/categories";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${SITE_URL}${post.permalink}`,
    },
  };
}

export default async function SinglePostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  // Related: prefer same-category posts, backfill with the most recent
  // other posts so the section is never sparse.
  const related = getAllPosts()
    .filter((p) => p.published && p.slug !== post.slug)
    .sort((a, b) => {
      const aScore = a.category === post.category ? 1 : 0;
      const bScore = b.category === post.category ? 1 : 0;
      if (aScore !== bScore) return bScore - aScore;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  const shareUrl = `${SITE_URL}${post.permalink}`;

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto mb-10 w-full max-w-4xl">
        <CoverImage
          src={post.coverImage}
          alt={post.coverAlt ?? post.title}
          category={post.category}
          className="aspect-[21/9] w-full rounded-2xl"
          sizes="(min-width: 1024px) 900px, 100vw"
          priority
        />
      </div>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
        <div className="mx-auto w-full max-w-3xl lg:mx-0">
          {/* Header Info */}
          <div className="border-b border-neutral-200 pb-8 dark:border-neutral-800">
            <Link
              href="/blog"
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider transition hover:opacity-80 ${categoryStyle(
                post.category,
              )}`}
            >
              {post.category}
            </Link>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              Published on{" "}
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* MDX Body */}
          <div
            id="article-content"
            className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-emerald-600 dark:prose-a:text-emerald-400"
          >
            <MDXContent source={post.content} />
          </div>

          <div className="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <ShareButtons url={shareUrl} title={post.title} />
          </div>

          <RelatedPosts posts={related} />
        </div>

        <TableOfContents containerId="article-content" />
      </div>
    </article>
  );
}
