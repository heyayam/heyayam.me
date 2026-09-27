import { SITE } from "./config.ts";

export const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/heyayam",
    linkTitle: `${SITE.author} on Github`,
    icon: "github",
    active: true,
  },
  {
    name: "X",
    href: "https://x.com/heyayam",
    linkTitle: `${SITE.author} on X`,
    icon: "twitter",
    active: true,
  },
  {
    name: "Mail",
    href: `mailto:${SITE.email}`,
    linkTitle: `Send an email to ${SITE.author}`,
    icon: "mail",
    active: true,
  },
] as const;

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
