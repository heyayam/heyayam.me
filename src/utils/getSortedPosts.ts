import type { CollectionEntry } from "astro:content";
import publishedPostFilter from "./postFilter";

/** Newest first, drafts excluded outside of `astro dev`. */
const getSortedPosts = (posts: CollectionEntry<"blog">[]) =>
  posts.filter(publishedPostFilter).sort((a, b) => {
    const aTime = (a.data.modDatetime ?? a.data.pubDatetime).getTime();
    const bTime = (b.data.modDatetime ?? b.data.pubDatetime).getTime();
    return bTime - aTime;
  });

export default getSortedPosts;
