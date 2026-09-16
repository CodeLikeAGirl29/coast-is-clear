// components/ShareButtons.tsx
"use client";

import { useState } from "react";
import { Check, Link2, Mail } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

const pillClass =
  "inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition hover:border-emerald-500/50 hover:text-emerald-600 dark:border-neutral-800 dark:text-neutral-400 dark:hover:text-emerald-400";

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (older browser / non-HTTPS) — fail quietly.
    }
  };

  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title,
  )}&url=${encodeURIComponent(url)}`;
  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url,
  )}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(
    title,
  )}&body=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        Share
      </span>
      <button type="button" onClick={handleCopy} className={pillClass}>
        {copied ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
        {copied ? "Copied" : "Copy Link"}
      </button>
      <a href={xHref} target="_blank" rel="noopener noreferrer" className={pillClass}>
        Share on X
      </a>
      <a href={fbHref} target="_blank" rel="noopener noreferrer" className={pillClass}>
        Facebook
      </a>
      <a href={mailHref} className={pillClass}>
        <Mail className="h-3.5 w-3.5" />
        Email
      </a>
    </div>
  );
}
