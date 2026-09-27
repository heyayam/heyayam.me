import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE } from "@/config";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";

export async function GET(context: APIContext) {
  const posts = getSortedPosts(await getCollection("blog"));

  return rss({
    title: SITE.title,
    description: SITE.bio,
    site: context.site ?? SITE.website,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDatetime,
      link: getPath(post.id),
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
