import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { origins } from '../data/site';

const SITE_URL = 'https://kkgtcoffee.com';
const DEFAULT_IMAGE = `${SITE_URL}/media/social-preview.jpg`;

type SeoMeta = {
  title: string;
  description: string;
  noindex?: boolean;
};

const fixedMeta: Record<string, SeoMeta> = {
  '/': {
    title: 'KKGT Coffee | Ethiopian Green Coffee Origins',
    description: 'Explore Ethiopian coffee origins with KKGT and start a direct green coffee inquiry.',
  },
  '/coffee': {
    title: 'Ethiopian Green Coffee | KKGT Coffee',
    description: 'Explore KKGT’s Ethiopian green coffee portfolio and start with an origin before confirming current lot details, specifications and availability.',
  },
  '/origins': {
    title: 'Ethiopian Coffee Origins | KKGT Coffee',
    description: 'Explore Guji, Nekemte, Yirgacheffe, Sidama, Limmu and Jimma coffee origins with KKGT.',
  },
  '/journey': {
    title: 'Coffee Journey & Quality | KKGT Coffee',
    description: 'See the buyer journey from origin and requirements through offer review, quality information and shipment coordination.',
  },
  '/gallery': {
    title: 'Coffee Gallery | KKGT Coffee',
    description: 'Explore visual highlights from KKGT Coffee and its Ethiopian coffee origin experience.',
  },
  '/about': {
    title: 'About KKGT Coffee | Ethiopian Coffee Export',
    description: 'Learn about the KKGT Coffee website and its focus on connecting green coffee buyers with KKGT Import Export’s Ethiopian origin portfolio.',
  },
  '/contact': {
    title: 'Coffee Inquiry | KKGT Coffee',
    description: 'Contact KKGT with your Ethiopian green coffee requirements, including origin, quantity, destination, timing and specifications.',
  },
};

function normalizePath(pathname: string) {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}


function getMeta(pathname: string): SeoMeta {
  const path = normalizePath(pathname);
  if (fixedMeta[path]) return fixedMeta[path];

  const match = path.match(/^\/coffee\/([^/]+)$/);
  if (match) {
    const origin = origins.find((item) => item.slug === match[1]);
    if (origin) {
      return {
        title: `${origin.name} Coffee | KKGT Coffee`,
        description: `${origin.short} Ask KKGT about current lot details, process, grade, quantity, packing and availability.`,
      };
    }
  }

  return {
    title: 'Page Not Found | KKGT Coffee',
    description: 'The requested page could not be found on the KKGT Coffee website.',
    noindex: true,
  };
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

export function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = normalizePath(pathname);
    const meta = getMeta(path);
    const canonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
    document.title = meta.title;
    setCanonical(canonical);
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'KKGT Coffee');
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', DEFAULT_IMAGE);
    setMeta('property', 'og:image:type', 'image/jpeg');
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', 'KKGT Coffee');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', DEFAULT_IMAGE);
    setMeta('name', 'twitter:image:alt', 'KKGT Coffee');

    let schema = document.getElementById('seo-webpage-schema') as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'seo-webpage-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: meta.title,
      description: meta.description,
      url: canonical,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': 'https://kkgtimportexport.com/#organization' },
    });
  }, [pathname]);

  return null;
}
