import Link from "next/link";
import { getPublishedPosts } from "@/lib/posts";
import ValuationWidget from "@/components/ValuationWidget";
import CoverImage from "@/components/CoverImage";
import { categoryStyle } from "@/lib/categories";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Home as HomeIcon,
  Shield,
  TrendingUp,
  Waves,
} from "lucide-react";

const VALUE_PROPS = [
  {
    icon: Shield,
    title: "PCS & Military Relocation",
    body: "BAH breakdowns, gate-commute realities, and VA loan strategy for Eglin AFB and Hurlburt Field families \u2014 not recycled base-housing brochures.",
  },
  {
    icon: HomeIcon,
    title: "Wind Mitigation & Insurance",
    body: "OIR-B1-1802 inspections, roof clips, the \u2018third nail,\u2019 and how to actually cut your windstorm premium instead of just paying it.",
  },
  {
    icon: TrendingUp,
    title: "Builder & Market Trends",
    body: "What\u2019s actually getting built in Niceville and Crestview, who\u2019s building it, and whether it\u2019s worth the premium over resale.",
  },
  {
    icon: Waves,
    title: "Flood Zones & Coastal Risk",
    body: "Zone X vs. AE, elevation certificates, and what flood insurance really costs before you fall in love with a canal lot.",
  },
];

export default function HomePage() {
  const featuredPosts = getPublishedPosts().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:py-28">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            Okaloosa County • Fort Walton Beach • Niceville • Crestview • Destin
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 dark:text-white sm:text-6xl">
            Real Talk for Real Estate on the Emerald Coast.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
            No staging tips. No fluff. Just the PCS logistics, wind
            mitigation math, builder trends, and tax rules that actually
            decide whether a house makes sense here.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Read the Blog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#valuation"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-neutral-700 dark:text-neutral-300 dark:hover:text-emerald-400"
            >
              Get a Free Valuation
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          What We Actually Cover
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {VALUE_PROPS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-neutral-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-neutral-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="border-t border-neutral-200 bg-neutral-50 py-16 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Latest from the Blog
              </h2>
              <Link
                href="/blog"
                className="hidden items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 sm:flex"
              >
                View all <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
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
                    <h3 className="mt-4 text-lg font-bold tracking-tight text-neutral-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
                      {post.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Read Article <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/blog"
              className="mt-8 flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 sm:hidden"
            >
              View all articles <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Valuation Widget */}
      <section
        id="valuation"
        className="mx-auto max-w-3xl scroll-mt-24 px-4 py-20 sm:px-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
            What&rsquo;s Your Emerald Coast Home Worth?
          </h2>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
            No robo-estimate guesswork — a real comparative market
            analysis based on recent neighborhood sales.
          </p>
        </div>
        <ValuationWidget />
      </section>
    </div>
  );
}
