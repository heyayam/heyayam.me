# heyayam.me

Personal site and blog for **Ayam Dhotekar** — [heyayam.me](https://heyayam.me).

Astro + Tailwind CSS v4. Fully static, no JS framework, light/dark mode, RSS,
sitemap, structured data.

## Quick start

```bash
npm install     # first time only
npm run dev     # http://localhost:4321
```

Requires **Node 22.12+**.

| Command           | What it does                             |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Dev server, hot reload, drafts visible   |
| `npm run build`   | Production build into `dist/`            |
| `npm run preview` | Serve the built `dist/` locally          |
| `npm run check`   | Astro + TypeScript type check            |

## Your images

Two images, both in `public/`. Placeholders are committed, so the site builds
and looks finished before you add anything.

| File                    | Where it shows                  | Shape                        |
| ----------------------- | ------------------------------- | ---------------------------- |
| `public/avatar.jpg`     | Home hero, share previews       | Square, 400×400+ (160 px circle) |
| `public/about-image.jpg`| About page, full width          | Landscape, ~1200×675 (16:9)  |

Overwrite the files, keeping the names. Renaming means editing
`profileImage` / `aboutImage` in [`src/config.ts`](src/config.ts:58) — both are
read from there, so nothing else needs touching.

Keep each under ~300 KB. `avatar.jpg` is also the Open Graph image, so it is what
people see when the site is shared.

## Contact

No email address is published. `email` in [`src/config.ts`](src/config.ts:32) is
empty on purpose, which keeps the personal inbox out of a public repo.

Set it to a real address and the Mail icon appears in the social row and footer
automatically — see the conditional in [`src/constants.ts`](src/constants.ts:28).
An alias such as `hey@heyayam.me` is a better idea than a personal Gmail, since
scrapers harvest addresses off public pages.

## Writing a post

Add a `.md` or `.mdx` file under `src/content/blog/`. The folder path becomes the
URL, so organise by year:

```
src/content/blog/2026/my-new-post.md  →  /posts/2026/my-new-post/
```

```yaml
---
title: "My New Post"
description: "One sentence, shown in lists, RSS and search results."
pubDatetime: 2026-05-01T09:00:00+05:30
tags: ["rust", "systems"]
featured: false   # true pins it to the home page "Featured" section
draft: true       # true = only visible in `npm run dev`
---
```

Optional: `modDatetime`, `heroImage`, `ogImage`, `canonicalURL`, `hideEditPost`,
`timezone`, `author`.

- **Drafts** (`draft: true`) are excluded from the build, tag pages, RSS and
  sitemap, but still render locally. One exists, unfinished:
  [`python-rust-and-beyond.md`](src/content/blog/2026/python-rust-and-beyond.md).
- **Skipping a file** entirely: prefix the filename or folder with `_`.

## Colours

All five tokens live at the top of `src/styles/global.css`.

```css
:root,
html[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #b7410e;      /* rust orange, darkened for contrast on white */
  --muted: #e6e6e6;
  --border: #ece9e9;
}

html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff7a45;      /* rust orange, brightened for the dark background */
  --muted: #343f60bf;
  --border: #8a3f0d;
}
```

Changing `--accent` updates links, headings, focus rings, list markers, tag
pills, the reading-progress bar and text selection. That's the whole palette —
`--color-*` is emptied in the Tailwind theme, so no other colour can creep in.

## Light and dark mode

Toggles from the sun/moon button in the header. Defaults to the OS preference;
an explicit choice is stored in `localStorage` and respected for 24 hours before
the site follows the OS again. The theme is applied before first paint, so there
is no flash of the wrong theme.

## Structure

```
src/
├── config.ts               # name, handle, socials, images, timezone
├── constants.ts            # social links (Mail appears once email is set)
├── content.config.ts       # blog collection schema
├── content/blog/           # posts, organised by year
├── components/             # Header, Footer, Card, Socials, Tag, Pagination, ...
├── layouts/
│   ├── Layout.astro        # <head>, meta tags, theme bootstrapping
│   ├── PostDetails.astro   # single post: progress bar, tags, prev/next
│   └── Main.astro          # generic titled page
├── pages/
│   ├── index.astro                 # home: hero + featured + recent
│   ├── posts/[...page].astro       # paginated post list
│   ├── posts/[...slug]/index.astro # single post
│   ├── tags/                       # tag index + per-tag pages
│   ├── about.astro                 # About page
│   ├── 404.astro
│   ├── rss.xml.ts                  # /rss.xml
│   └── robots.txt.ts               # /robots.txt
├── styles/
│   ├── global.css          # colour tokens, base styles, dark mode
│   └── typography.css      # prose styles, code block theming
└── utils/                  # dates, reading time, sorting, paths

public/
├── avatar.jpg              # profile photo (home hero + share previews)
├── about-image.jpg         # About page image
├── favicon.svg
├── toggle-theme.js
└── CNAME                   # only used for branch-based Pages deploys
```

## Deploying

Push to `main`. `.github/workflows/deploy.yml` type-checks, builds and publishes
to GitHub Pages. A failing type check leaves the live site untouched.

Two one-time steps in the GitHub UI, which cannot be committed:

1. **Settings → Pages → Source = GitHub Actions**
2. **Settings → Pages → Custom domain = `heyayam.me`**

Step 2 matters: with a custom Actions workflow, GitHub ignores the `public/CNAME`
file. The file is kept only so branch-based deploys still work.

Full walkthrough, including Cloudflare DNS records and a VPS/nginx alternative:
**[DEPLOYMENT.md](./DEPLOYMENT.md)**.

## Credits

- Design inspired by [steipete.me](https://steipete.me) by Peter Steinberger —
  rebuilt from scratch.
- Icons: [Tabler Icons](https://tabler.io/icons) (MIT).
