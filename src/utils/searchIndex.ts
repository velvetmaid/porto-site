// Search index generator for markdown content in the content collection.

import matter from "gray-matter";
import { toRouteSlug } from "./urlSlug";

const markdownFiles = import.meta.glob("/src/content/**/*.{md,mdx}", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseMarkdown(raw: string) {
  const { data, content } = matter(raw);

  return {
    title: data.title || "",
    description: data.description || "",
    tags: data.tags || [],
    slug: data.slug || "",
    content,
  };
}

function createSlug(path: string, fallbackSlug = "") {
  const withoutExt = path.replace(/\.(md|mdx)$/, "");
  const withoutRoot = withoutExt.replace(/^\/src\/content\//, "");
  const segments = withoutRoot.split("/");
  const lastSegment = segments.pop() ?? "";
  const folder = segments.join("/");

  if (lastSegment === "index") {
    return folder ? `/${folder}/` : "/";
  }

  const slugValue = fallbackSlug || lastSegment;
  const routeSlug = toRouteSlug(slugValue);

  if (!routeSlug) {
    return folder ? `/${folder}/` : "/";
  }

  if (!folder) {
    return `/${routeSlug}/`;
  }

  return `/${folder}/${routeSlug}/`;
}

function buildIndex(entries: Record<string, string>) {
  return Object.entries(entries).map(([path, raw]) => {
    const parsed = parseMarkdown(raw);
    const slug = createSlug(path, parsed.slug);

    return {
      title: parsed.title || path.split("/").pop(),
      description: parsed.description,
      tags: parsed.tags,
      slug,
      content: normalizeMarkdown(parsed.content),
      type: "content",
    };
  });
}

export const searchIndex = [...buildIndex(markdownFiles)];

function normalizeMarkdown(raw = "") {
  return raw
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/^\[.*?\]:.*$/gm, " ")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[#>*_`~]/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}