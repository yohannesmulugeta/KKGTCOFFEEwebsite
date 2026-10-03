import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outputRoot = resolve(projectRoot, 'dist');
const isGitHubPages = process.argv.includes('--github-pages');
const productionSite = 'https://kkgtcoffee.com';
const siteBase = isGitHubPages ? 'https://yohannesmulugeta.github.io/KKGTCOFFEEwebsite' : productionSite;

const sitemapPath = resolve(outputRoot, 'sitemap.xml');
let sitemap = readFileSync(sitemapPath, 'utf8');
const baseHtml = readFileSync(resolve(outputRoot, 'index.html'), 'utf8');

const routeMeta = {
  '/': ['KKGT Coffee | Ethiopian Green Coffee Origins', 'Explore Ethiopian coffee origins with KKGT and start a direct green coffee inquiry.', '/media/ethiopian-highlands.webp'],
  '/coffee': ['Ethiopian Green Coffee | KKGT Coffee', 'Explore KKGT’s Ethiopian green coffee portfolio and start with an origin before confirming current lot details, specifications and availability.', '/media/green-coffee.webp'],
  '/origins': ['Ethiopian Coffee Origins | KKGT Coffee', 'Explore Yirgacheffe, Sidama, Limmu, Jimma and Lekempti coffee origins in KKGT’s published Ethiopian coffee portfolio.', '/media/ethiopian-highlands.webp'],
  '/journey': ['Coffee Journey & Quality | KKGT Coffee', 'See the buyer journey from origin and requirements through offer review, quality information and shipment coordination.', '/media/coffee-cherries.webp'],
  '/team': ['KKGT Coffee Team | KKGT Coffee', 'Meet the team presented on the KKGT Coffee website and find the right path for a green coffee inquiry.', '/media/ethiopian-highlands.webp'],
  '/gallery': ['Coffee Gallery | KKGT Coffee', 'Explore visual highlights from KKGT Coffee and its Ethiopian coffee origin experience.', '/media/coffee-cherries.webp'],
  '/about': ['About KKGT Coffee | Ethiopian Coffee Export', 'Learn about the KKGT Coffee website and its focus on connecting green coffee buyers with KKGT Import Export’s Ethiopian origin portfolio.', '/media/ethiopian-highlands.webp'],
  '/contact': ['Coffee Inquiry | KKGT Coffee', 'Contact KKGT with your Ethiopian green coffee requirements, including origin, quantity, destination, timing and specifications.', '/media/green-coffee.webp'],
  '/coffee/yirgacheffe': ['Yirgacheffe Coffee | KKGT Coffee', 'Explore Yirgacheffe in KKGT’s Ethiopian coffee portfolio and ask about current lot details, process, grade, quantity, packing and availability.', '/media/ethiopian-highlands.webp'],
  '/coffee/sidama': ['Sidama Coffee | KKGT Coffee', 'Explore Sidama in KKGT’s Ethiopian coffee portfolio and ask about current lot details, process, grade, quantity, packing and availability.', '/media/coffee-cherries.webp'],
  '/coffee/limmu': ['Limmu Coffee | KKGT Coffee', 'Explore Limmu in KKGT’s Ethiopian coffee portfolio and ask about current lot details, process, grade, quantity, packing and availability.', '/media/green-coffee.webp'],
  '/coffee/jimma': ['Jimma / Djimmah Coffee | KKGT Coffee', 'Explore Jimma / Djimmah in KKGT’s Ethiopian coffee portfolio and ask about current lot details, process, grade, quantity, packing and availability.', '/media/ethiopian-highlands.webp'],
  '/coffee/lekempti': ['Lekempti Coffee | KKGT Coffee', 'Explore Lekempti in KKGT’s Ethiopian coffee portfolio and ask about current lot details, process, grade, quantity, packing and availability.', '/media/coffee-cherries.webp'],
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function injectMeta(html, route, noindex = false) {
  const [title, description, imagePath] = routeMeta[route] ?? [
    'KKGT Coffee',
    'Explore Ethiopian coffee origins with KKGT.',
    '/media/ethiopian-highlands.webp',
  ];
  const canonical = route === '/' ? `${siteBase}/` : `${siteBase}${route}`;
  const image = `${siteBase}${imagePath}`;
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

  return html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/i, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta name="robots" content="[^"]*" \/>/i, `<meta name="robots" content="${robots}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/i, `<link rel="canonical" href="${escapeHtml(canonical)}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/i, `<meta property="og:url" content="${escapeHtml(canonical)}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/i, `<meta property="og:image" content="${escapeHtml(image)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/i, `<meta name="twitter:image" content="${escapeHtml(image)}" />`);
}

writeFileSync(resolve(outputRoot, 'index.html'), injectMeta(baseHtml, '/'));
writeFileSync(resolve(outputRoot, '404.html'), injectMeta(baseHtml, '/404', true));

for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const routePath = new URL(match[1]).pathname;
  const route = routePath === '/' ? '/' : routePath.replace(/\/+$/, '');
  if (route === '/') continue;

  const routeDirectory = resolve(outputRoot, route.replace(/^\/+/, ''));
  mkdirSync(routeDirectory, { recursive: true });
  writeFileSync(resolve(routeDirectory, 'index.html'), injectMeta(baseHtml, route));
}

if (isGitHubPages) {
  sitemap = sitemap.replaceAll(productionSite, siteBase);
  writeFileSync(sitemapPath, sitemap);
  writeFileSync(
    resolve(outputRoot, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${siteBase}/sitemap.xml\n`,
  );
}
