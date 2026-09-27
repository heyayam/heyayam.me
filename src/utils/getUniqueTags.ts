import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

export interface Tag {
  tag: string;
  tagName: string;
}

/** Every tag used by at least one post, alphabetically, with no duplicates. */
const getUniqueTags = (posts: CollectionEntry<"blog">[]): Tag[] => {
  const tags: Tag[] = posts.flatMap((post) =>
    post.data.tags.map((tag) => ({ tag: slugifyStr(tag), tagName: tag })),
  );

  return tags
    .filter(
      (value, index, self) => self.findIndex((t) => t.tag === value.tag) === index,
    )
    .sort((a, b) => a.tag.localeCompare(b.tag));
};

export default getUniqueTags;
