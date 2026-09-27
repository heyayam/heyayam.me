import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import getSortedPosts from "./getSortedPosts";

/** All published posts carrying `tag`, newest first. */
const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) =>
  getSortedPosts(posts).filter((post) =>
    post.data.tags.map((t) => slugifyStr(t)).includes(slugifyStr(tag)),
  );

export default getPostsByTag;
