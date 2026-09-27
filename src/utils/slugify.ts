/**
 * Kebab-case a string so it is safe to use as a URL segment, CSS class or
 * `view-transition-name`.
 */
export const slugifyStr = (str: string): string =>
  str
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const slugifyAll = (arr: string[]): string[] => arr.map(slugifyStr);
