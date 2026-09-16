// app/blog/page.tsx
import BlogIndexClient from "@/components/BlogIndexClient";
import { getPublishedPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Honest insights on Okaloosa County real estate, military relocations, builder trends, and coastal living.",
};

export default function BlogIndexPage() {
  const publishedPosts = getPublishedPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Emerald Coast Real Estate Insights
        </span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
          The Coast Is Clear
        </h1>
        <p className="mt-4 text-base text-neutral-600 dark:text-neutral-400">
          Straightforward guides on property values, PCS moves to Eglin &
          Hurlburt, and Florida Panhandle homeownership.
        </p>
      </div>

      <BlogIndexClient posts={publishedPosts} />
    </div>
  );
}
