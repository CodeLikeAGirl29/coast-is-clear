// lib/categories.ts
// Keep this list in sync with the `frontmatterSchema` category enum in lib/posts.ts.

import { Home, MapPin, PiggyBank, Shield, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const CATEGORIES = [
  "Relocation",
  "Market Trends",
  "Neighborhoods",
  "Investing",
] as const;

export type Category = (typeof CATEGORIES)[number];

const CATEGORY_STYLES: Record<string, string> = {
  Relocation: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  "Market Trends":
    "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  Neighborhoods:
    "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
  Investing:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
};

const FALLBACK_STYLE =
  "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300";

/** Returns Tailwind classes for a category pill, with a safe fallback. */
export function categoryStyle(category: string): string {
  return CATEGORY_STYLES[category] ?? FALLBACK_STYLE;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  Relocation: "from-blue-500 to-blue-700",
  "Market Trends": "from-amber-500 to-orange-600",
  Neighborhoods: "from-purple-500 to-fuchsia-700",
  Investing: "from-emerald-500 to-teal-700",
};

const FALLBACK_GRADIENT = "from-neutral-500 to-neutral-700";

/** Gradient classes used for the placeholder cover image when a post has no photo. */
export function categoryGradient(category: string): string {
  return CATEGORY_GRADIENTS[category] ?? FALLBACK_GRADIENT;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Relocation: Shield,
  "Market Trends": TrendingUp,
  Neighborhoods: MapPin,
  Investing: PiggyBank,
};

/** Watermark icon used inside the placeholder cover image. */
export function categoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category] ?? Home;
}
