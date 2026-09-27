import type { APIContext } from "astro";
import { SITE } from "@/config";

export function GET({ site }: APIContext) {
  const base = site ?? new URL(SITE.website);
  const sitemap = new URL("sitemap-index.xml", base).href;

  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
