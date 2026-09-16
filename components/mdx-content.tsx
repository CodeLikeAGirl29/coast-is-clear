// components/mdx-content.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import ValuationWidget from "@/components/ValuationWidget";
import { slugify } from "@/lib/slugify";

/** Recursively flattens React children into plain text (for heading ids). */
function getNodeText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getNodeText).join("");
  if (
    children &&
    typeof children === "object" &&
    "props" in (children as { props?: { children?: ReactNode } })
  ) {
    return getNodeText(
      (children as { props: { children?: ReactNode } }).props.children,
    );
  }
  return "";
}

interface HeadingProps {
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Builds h2/h3 overrides that stamp a stable, slugified id onto every
 * heading, so the TableOfContents component can link straight to them.
 */
function createHeading(Tag: "h2" | "h3") {
  function Heading({ children, ...props }: HeadingProps) {
    const id = slugify(getNodeText(children));
    return (
      <Tag id={id} className="scroll-mt-28" {...props}>
        {children}
      </Tag>
    );
  }
  Heading.displayName = `Mdx${Tag.toUpperCase()}`;
  return Heading;
}

const mdxComponents = {
  ValuationWidget,
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  table: function Table({ children, ...props }: HeadingProps) {
    return (
      <div className="overflow-x-auto">
        <table {...props}>{children}</table>
      </div>
    );
  },
};

/** Renders a post's raw MDX body string. `source` is post.content from lib/posts.ts. */
export function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
