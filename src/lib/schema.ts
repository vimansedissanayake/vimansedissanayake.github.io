import { AUTHOR, SITE_DESCRIPTION, SOCIALS } from '../consts';

export function personSchema(site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR,
    url: site?.href,
    description: SITE_DESCRIPTION,
    jobTitle: 'Senior AI Engineer',
    knowsAbout: ['Agentic AI', 'Large language models', 'Vector search', 'Machine learning infrastructure', 'Cinematography'],
    address: { '@type': 'PostalAddress', addressLocality: 'Colombo', addressCountry: 'LK' },
    sameAs: SOCIALS.map((social) => social.href),
  };
}
