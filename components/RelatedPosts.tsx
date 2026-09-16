// components/RelatedPosts.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryStyle } from "@/lib/categories";
import CoverImage from "@/components/CoverImage";

export interface RelatedPostSummary {
  slug: string;
  title: string;
  category: string;
  permalink: string;
  coverImage?: string;
  coverAlt?: string;
}

export default function RelatedPosts({
  posts,
}: {
  posts: RelatedPostSummary[];
}) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-14 border-t border-neutral-200 pt-10 dark:border-neutral-800">
      <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
        Keep Reading
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.permalink}
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/80 bg-white transition hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <CoverImage
              src={post.coverImage}
              alt={post.coverAlt ?? post.title}
              category={post.category}
              className="aspect-[16/9] w-full"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${categoryStyle(
                    post.category,
                  )}`}
                >
                  {post.category}
                </span>
                <h3 className="mt-2 text-sm font-bold leading-snug text-neutral-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                  {post.title}
                </h3>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                Read <ArrowUpRight className="h-3 w-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
