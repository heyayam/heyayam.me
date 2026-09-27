export const BLOG_PATH = "src/content/blog";

interface Site {
  /** Public production URL. Used for canonical URLs, RSS and the sitemap. */
  website: string;
  /** Display name shown in the header, footer and meta tags. */
  author: string;
  /** Handle shown in the hero, e.g. `Hi, I'm @heyayam.` */
  handle: string;
  email: string;
  /** Tagline under the hero heading. Each string is rendered on its own line. */
  desc: string[];
  title: string;
  /** Short bio used for meta descriptions and structured data. */
  bio: string;
  ogImage: string;
  lightAndDarkMode: boolean;
  postPerIndex: number;
  postPerPage: number;
  showBackButton: boolean;
  editPost: {
    enabled: boolean;
    text: string;
    url: string;
  };
  lang: string;
  timezone: string;
}

export const SITE: Site = {
  website: "https://heyayam.me/",
  author: "Ayam Dhotekar",
  handle: "@heyayam",
  email: "ayamdhotekar@gmail.com",
  desc: [
    "Low-level systems from Rust roots to intelligent infrastructure.",
    "Every project starts with curiosity and ends on GitHub.",
  ],
  title: "Ayam Dhotekar",
  bio: "Low-level systems from Rust roots to intelligent infrastructure. Every project starts with curiosity and ends on GitHub.",
  ogImage: "avatar.jpg",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 10,
  showBackButton: false,
  editPost: {
    enabled: true,
    text: "Edit on GitHub",
    url: "https://github.com/heyayam/heyayam.me/edit/main/",
  },
  lang: "en",
  timezone: "Asia/Kolkata",
};
