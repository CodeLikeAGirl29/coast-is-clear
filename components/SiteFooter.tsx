// components/SiteFooter.tsx
import Link from "next/link";
import { Compass } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-neutral-900 dark:text-white">
              <Compass className="h-4 w-4 text-emerald-500" />
              The Coast Is Clear
            </div>
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              Straight-talk real estate insights for Fort Walton Beach,
              Niceville, Crestview, Destin, Eglin AFB & Hurlburt Field.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Explore
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#valuation"
                  className="text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
                >
                  Free Valuation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Categories
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href="/blog"
                    className="text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} The Coast Is Clear • Emerald Coast &
            Okaloosa County Real Estate Insights. Information deemed reliable
            but not guaranteed. Not affiliated with the U.S. Department of
            Defense or U.S. Air Force.
          </p>
        </div>
      </div>
    </footer>
  );
}
