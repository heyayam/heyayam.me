import { SITE } from "../config.ts";

/**
 * Format a date in the post's timezone, e.g. `18 Mar, 2026`.
 *
 * Uses `Intl` so no date library is required.
 */
export function formatPostDate(date: Date, timezone?: string): string {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: timezone ?? SITE.timezone,
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value]),
  );

  return `${parts.day} ${parts.month}, ${parts.year}`;
}

/** The calendar year a post was published in, in its own timezone. */
export function getPostYear(date: Date, timezone?: string): number {
  return Number(
    new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      timeZone: timezone ?? SITE.timezone,
    }).format(date),
  );
}

/** Machine readable date for `<time datetime="...">` and `<meta>`. */
export function getPostISOString(date: Date): string {
  return date.toISOString();
}
