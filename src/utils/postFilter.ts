import type { CollectionEntry } from "astro:content";

interface Publication {
  pubDatetime: Date;
  draft?: boolean;
}

export interface PublicationOptions {
  /** Preview drafts — used in `astro dev` so you can read a draft locally. */
  preview?: boolean;
}

export function isPublished(data: Publication, { preview = false }: PublicationOptions = {}) {
  if (data.draft && !preview) return false;
  return true;
}

/** Posts that are published and should appear in lists, feeds and sitemaps. */
export const publishedPostFilter = ({ data }: CollectionEntry<"blog">) =>
  isPublished(data, { preview: import.meta.env.DEV });

export default publishedPostFilter;
