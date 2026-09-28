export const BLOG_PATH = "src/content/blog";

interface Site {
  /** Public production URL. Used for canonical URLs, RSS and the sitemap. */
  website: string;
  /** Display name shown in the header, footer and meta tags. */
  author: string;
  /** Handle used in the hero, e.g. `Hi, I'm @heyayam.` */
  handle: string;
  /**
   * Optional public contact address.
   *
   * Deliberately empty: no email is published anywhere while this is "". The
   * social row shows only GitHub and X, and structured data omits the email
   * field. Set a real address here (ideally an alias such as
   * `hey@heyayam.me` rather than a personal inbox) and the Mail icon appears
   * automatically — see `src/constants.ts`.
   */
  email: string;
  /** Tagline under the hero heading. Each string renders on its own line. */
  desc: string[];
  title: string;
  /** Short bio used for meta descriptions and structured data. */
  bio: string;
  /** Profile picture in `public/`. Also used as the Open Graph share image. */
  profileImage: string;
  /** Image shown on the About page, in `public/`. */
  aboutImage: string;
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
  email: "",
  desc: [
    "AI Engineering from data and models to systems and software",
    "Every project starts with curiosity and ends on GitHub.",
  ],
  title: "Ayam Dhotekar",
  bio: "AI Engineer interested in the systems and tools that make AI useful. Writing about AI, machine learning, data, systems, programming and infrastructure.",
  profileImage: "avatar.jpg",
  aboutImage: "about-image.jpg",
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
