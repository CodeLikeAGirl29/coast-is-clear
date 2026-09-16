// components/BlogIndexClient.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Search } from "lucide-react";
import { CATEGORIES, categoryStyle } from "@/lib/categories";
import CoverImage from "@/components/CoverImage";

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  permalink: string;
  tags?: string[];
  coverImage?: string;
  coverAlt?: string;
}

const FILTER_OPTIONS = ["All", ...CATEGORIES];

export default function BlogIndexClient({
  posts,
}: {
  posts: BlogPostSummary[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        (post.tags ?? []).some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [posts, activeCategory, query]);

  return (
    <div>
      {/* Filters + search */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setActiveCategory(option)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                activeCategory === option
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            aria-label="Search articles"
            className="w-full rounded-full border border-neutral-200 bg-white py-2 pl-9 pr-4 text-sm text-neutral-900 placeholder-neutral-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
          />
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-neutral-500 dark:text-neutral-400">
          No articles match {query ? `"${query}"` : "that filter"}
          {activeCategory !== "All" ? ` in ${activeCategory}` : ""}. Try a
          different search or category.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={post.permalink}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
            >
              <CoverImage
                src={post.coverImage}
                alt={post.coverAlt ?? post.title}
                category={post.category}
                className="aspect-[16/9] w-full"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-medium ${categoryStyle(
                      post.category,
                    )}`}
                  >
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-bold tracking-tight text-neutral-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                  {post.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
                  {post.description}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-medium text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Read Article <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
