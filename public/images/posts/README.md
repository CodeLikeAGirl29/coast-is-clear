# Post cover images

Drop your own photos here (JPG/PNG/WebP — WebP recommended for smaller
file size) and reference them in a post's frontmatter:

```yaml
coverImage: "/images/posts/your-file-name.jpg"
coverAlt: "Short, descriptive alt text for accessibility and SEO"
```

Until a post has `coverImage` set, it automatically falls back to a
branded gradient placeholder (see components/CoverImage.tsx) — so
nothing looks broken while you're building out your photo library.

Recommended aspect ratio: 16:9 (e.g. 1600x900px), since that's what
the blog cards and homepage use. The single-post hero crops to 21:9.
