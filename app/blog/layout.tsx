// app/blog/layout.tsx
// Header/footer now live in the root layout, so this just sets the
// blog section's background tint. Kept as its own layout in case
// blog-specific chrome (breadcrumbs, category nav) gets added later.
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-neutral-50 dark:bg-neutral-950">{children}</div>;
}
