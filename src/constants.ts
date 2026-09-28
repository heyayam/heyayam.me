import { SITE } from "./config.ts";

export interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: "github" | "twitter" | "mail";
  active: boolean;
}

const socials: Social[] = [
  {
    name: "Github",
    href: "https://github.com/heyayam",
    linkTitle: `${SITE.author} on Github`,
    icon: "github",
    active: true,
  },
  {
    name: "X",
    href: "https://x.com/heyayam_",
    linkTitle: `${SITE.author} on X`,
    icon: "twitter",
    active: true,
  },
];

// The Mail icon shows up automatically once you set `email` in src/config.ts.
// It is intentionally absent right now so no personal address is published.
if (SITE.email) {
  socials.push({
    name: "Mail",
    href: `mailto:${SITE.email}`,
    linkTitle: `Send an email to ${SITE.author}`,
    icon: "mail",
    active: true,
  });
}

export const SOCIALS = socials;

/** Profile URLs identifying the same person, for schema.org `sameAs`. */
export const SAME_AS = SOCIALS.filter((social) => social.href.startsWith("http")).map(
  (social) => social.href,
);

export const SHARE_LINKS = [
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: "Share this post on X",
    icon: "twitter",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/sharing/share-offsite/?url=",
    linkTitle: "Share this post on LinkedIn",
    icon: "linkedin",
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: "Share this post via email",
    icon: "mail",
  },
] as const;
