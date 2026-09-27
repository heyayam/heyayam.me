# heyayam.me

Personal site and blog for **Ayam Dhotekar** — [heyayam.me](https://heyayam.me).

Built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com),
in the spirit of [steipete.me](https://steipete.me). Fully static, no JavaScript
framework, light and dark mode, RSS, sitemap and structured data.

---

## Quick start

```bash
npm install     # first time only
npm run dev     # http://localhost:4321
```

Other scripts:

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload (drafts are visible)      |
| `npm run build`   | Production build into `dist/`                        |
| `npm run preview` | Serve the built `dist/` locally                      |
| `npm run check`   | Astro + TypeScript type check                        |

> **Node 22.12+ is required** (that's what Astro 7 needs).

---

## ✅ Your photo goes here

Drop your profile picture at:

```
public/avatar.jpg
```

A placeholder is already there — **just overwrite that file** (keep the name
`avatar.jpg`, or change `ogImage` in `src/config.ts` and the `<img src>` in
`src/pages/index.astro` if you rename it).

- **Recommended size:** square, at least **400×400 px** (1200×1200 is ideal).
- It is displayed as a 160 px circle, so keep the face centred.
- The same file is reused as the social/Open Graph preview image, so don't make
  it enormous — under ~300 KB keeps shares fast.

To use a different filename, update **two** places:

1. `src/config.ts` → `ogImage: "avatar.jpg"`
2. `src/pages/index.astro` → `src="/avatar.jpg"`

---

## ✍️ Writing a post

Add a Markdown (or MDX) file under `src/content/blog/`. The folder path becomes
the URL, so organise by year:

```
src/content/blog/2026/my-new-post.md   →   /posts/2026/my-new-post/
```

Frontmatter:

```yaml
---
title: "My New Post"
description: "One sentence shown in lists, RSS and search results."
pubDatetime: 2026-05-01T09:00:00+05:30
tags: ["rust", "systems"]
featured: false # true pins it to the "Featured" section on the home page
draft: true # true = only visible in `npm run dev`
---
```

Optional fields: `modDatetime`, `heroImage`, `ogImage`, `canonicalURL`,
`hideEditPost`, `timezone`, `author`.

**Drafts.** Set `draft: true` and the post is excluded from the build, the tag
pages, the RSS feed and the sitemap — but still visible locally in `npm run dev`.
There is currently one draft: `python-rust-and-beyond.md`.

**Ignoring a file entirely.** Prefix the filename or folder with `_` and the
loader skips it.

---

## 🎨 Changing the colours

Every colour lives in **one place**: the token block at the top of
`src/styles/global.css`.

```css
:root,
html[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #b7410e; /* rust orange, darkened for contrast on white */
  --muted: #e6e6e6;
  --border: #ece9e9;
}

html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff7a45; /* rust orange, brightened for the dark background */
  --muted: #343f60bf;
  --border: #8a3f0d;
}
```

Change `--accent` and the links, headings, focus rings, list markers, tag
buttons, the reading-progress bar and text selection all follow.

Only these five colours exist — the palette is deliberately emptied
(`--color-*: initial`) so nothing else can sneak in.

---

## 🗂 Project structure

```
src/
├── config.ts              # site title, author, tagline, socials-adjacent settings
├── constants.ts           # social links (GitHub / X / email)
├── content.config.ts      # blog collection schema
├── content/blog/          # your posts — organised by year
├── components/            # Header, Footer, Card, Socials, Tag, ...
├── layouts/
│   ├── Layout.astro       # <head>, meta tags, theme bootstrapping
│   ├── PostDetails.astro  # single post: progress bar, tags, prev/next
│   └── Main.astro         # generic titled page
├── pages/
│   ├── index.astro        # home: hero + featured + recent
│   ├── posts/[...page].astro      # paginated post list
│   ├── posts/[...slug]/index.astro # single post
│   ├── tags/              # tag index + per-tag pages
│   ├── about.astro        # blank template, ready for copy
│   ├── rss.xml.ts         # /rss.xml
│   └── robots.txt.ts      # /robots.txt
├── styles/
│   ├── global.css         # colour tokens, base styles, dark mode
│   └── typography.css     # prose styles + code block theming
└── utils/                 # date formatting, reading time, sorting, paths
public/
├── avatar.jpg             # ← your photo
├── favicon.svg            # ← your favicon
├── toggle-theme.js        # light/dark switcher (no flash on load)
└── CNAME                  # heyayam.me — only used for branch-based Pages deploys
```

---

## 🌗 Light & dark mode

- Toggles via the sun/moon button in the header.
- Defaults to your OS preference (`prefers-color-scheme`).
- An explicit choice is stored in `localStorage` and honoured for 24 hours,
  after which the site follows the OS again.
- The theme is applied **before first paint**, so there's no flash of the wrong
  theme. Uses the View Transitions API for a smooth cross-fade where supported.

---

## 🚀 Deploying

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full walkthrough
(GitHub Pages + Cloudflare DNS, plus a VPS/nginx alternative).

**Short version:** push to `main`. The workflow in
`.github/workflows/deploy.yml` type-checks, builds and publishes to GitHub
Pages automatically.

Two things that must be done once, by hand, in the GitHub UI — they can't be
committed (see [DEPLOYMENT.md](./DEPLOYMENT.md) for the walkthrough):

1. **Settings → Pages → Source = GitHub Actions.**
2. **Settings → Pages → Custom domain = `heyayam.me`.** The `public/CNAME` file
   is *ignored* when deploying via a custom Actions workflow, so the domain must
   be set here.

---

## Credits

- Design inspired by [steipete.me](https://steipete.me) by Peter Steinberger
  (MIT code / CC BY 4.0 content) — rebuilt from scratch for this site.
- Icons: [Tabler Icons](https://tabler.io/icons) (MIT).
