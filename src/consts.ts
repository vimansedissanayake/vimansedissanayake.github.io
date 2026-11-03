export const AUTHOR = 'Vimanse Dissanayake';

export const SITE_TITLE = AUTHOR;

export const SITE_HEADLINE = 'Engineer building agentic AI systems.';

export const SITE_TAGLINE = `${SITE_HEADLINE} I also make films.`;

export const SITE_DESCRIPTION =
  'Vimanse Dissanayake builds production AI systems, from billion-scale search to agentic AI backends, and makes films on the side.';

export const LOCATION = 'Colombo, Sri Lanka';

export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/vimanse-dissanayake',
  youtube: 'https://www.youtube.com/@vimanse_dissanayake',
  instagram: 'https://www.instagram.com/vimanse_dissanayake',
  tiktok: 'https://www.tiktok.com/@vimanse_dissanayake',
  x: 'https://x.com/vimanse_d',
} as const;

/** Profiles shown in the footer and on About, in display order. */
export const SOCIALS = [
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'YouTube', href: LINKS.youtube },
  { label: 'Instagram', href: LINKS.instagram },
  { label: 'TikTok', href: LINKS.tiktok },
  { label: 'X', href: LINKS.x },
] as const;

export const NAV = [
  { href: '/writing', label: 'Writing' },
  { href: '/films', label: 'Films' },
  { href: '/about', label: 'About' },
] as const;
