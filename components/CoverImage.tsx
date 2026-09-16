// components/CoverImage.tsx
import Image from "next/image";
import { categoryGradient, categoryIcon } from "@/lib/categories";

interface CoverImageProps {
  src?: string;
  alt: string;
  category: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders `src` as a real photo when a post has one set in frontmatter.
 * Otherwise falls back to an on-brand gradient + category icon so the
 * site looks finished before you've added real photography. Drop images
 * in /public/images/posts/ and set `coverImage` in a post's frontmatter
 * to swap in the real thing — no code changes needed.
 */
export default function CoverImage({
  src,
  alt,
  category,
  className = "",
  sizes = "100vw",
  priority = false,
}: CoverImageProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const Icon = categoryIcon(category);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-linear-to-br ${categoryGradient(
        category,
      )} ${className}`}
    >
      <Icon
        className="h-1/3 w-1/3 text-white/25"
        strokeWidth={1}
        aria-hidden="true"
      />
    </div>
  );
}
