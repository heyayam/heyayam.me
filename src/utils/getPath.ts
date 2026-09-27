/**
 * Map a content collection id to its public URL.
 *
 * With the glob loader the id is the path relative to `src/content/blog`,
 * without the extension — e.g. `2026/on-systems-and-curiosity`.
 * That becomes `/posts/2026/on-systems-and-curiosity/`.
 *
 * The trailing slash matches `trailingSlash: "always"` in `astro.config.mjs`,
 * which keeps every host from having to issue a redirect.
 */
export function getPath(id: string, includeBase = true): string {
  const slug = id
    .split("/")
    .filter((segment) => segment !== "" && !segment.startsWith("_"))
    .join("/");

  return includeBase ? `/posts/${slug}/` : slug;
}
