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
  '/': ['KKGT Coffee | Ethiopian Green Coffee Origins', 'Explore Ethiopian coffee origins with KKGT and start a direct green coffee inquiry.', '/media/social-preview.jpg'],
  '/coffee': ['Ethiopian Green Coffee | KKGT Coffee', 'Explore KKGT’s Ethiopian green coffee portfolio and start with an origin before confirming current lot details, specifications and availability.', '/media/social-preview.jpg'],
  '/origins': ['Ethiopian Coffee Origins | KKGT Coffee', 'Explore Guji, Nekemte, Yirgacheffe, Sidama, Limmu and Jimma coffee origins with KKGT.', '/media/social-preview.jpg'],
  '/journey': ['Coffee Journey & Quality | KKGT Coffee', 'See the buyer journey from origin and requirements through offer review, quality information and shipment coordination.', '/media/social-preview.jpg'],
  '/gallery': ['Coffee Gallery | KKGT Coffee', 'Explore visual highlights from KKGT Coffee and its Ethiopian coffee origin experience.', '/media/social-preview.jpg'],
  '/about': ['About KKGT Coffee | Ethiopian Coffee Export', 'Learn about the KKGT Coffee website and its focus on connecting green coffee buyers with KKGT Import Export’s Ethiopian origin portfolio.', '/media/social-preview.jpg'],
  '/contact': ['Coffee Inquiry | KKGT Coffee', 'Contact KKGT with your Ethiopian green coffee requirements, including origin, quantity, destination, timing and specifications.', '/media/social-preview.jpg'],
  '/coffee/guji': ['Guji Coffee | KKGT Coffee', 'Explore Guji coffee with KKGT and ask about current lot details, process, grade, quantity, packing and availability.', '/media/social-preview.jpg'],
  '/coffee/yirgacheffe': ['Yirgacheffe Coffee | KKGT Coffee', 'Explore Yirgacheffe in KKGT’s Ethiopian coffee portfolio and ask about current lot details, process, grade, quantity, packing and availability.', '/media/social-preview.jpg'],
  '/coffee/sidama': ['Sidama Coffee | KKGT Coffee', 'Explore Sidama in KKGT’s Ethiopian coffee portfolio and ask about current lot details, process, grade, quantity, packing and availability.', '/media/social-preview.jpg'],
  '/coffee/limmu': ['Limmu Coffee | KKGT Coffee', 'Explore Limmu in KKGT’s Ethiopian coffee portfolio and ask about current lot details, process, grade, quantity, packing and availability.', '/media/social-preview.jpg'],
  '/coffee/jimma': ['Jimma / Djimmah Coffee | KKGT Coffee', 'Explore Jimma / Djimmah in KKGT’s Ethiopian coffee portfolio and ask about current lot details, process, grade, quantity, packing and availability.', '/media/social-preview.jpg'],
  '/coffee/lekempti': ['Nekemte Coffee | KKGT Coffee', 'Explore Nekemte in KKGT’s Ethiopian coffee portfolio and ask about current lot details, process, grade, quantity, packing and availability.', '/media/social-preview.jpg'],
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
    '/media/social-preview.jpg',
  ];
  const canonical = route === '/' ? `${siteBase}/` : `${siteBase}${route}/`;
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


const originNames = {
  guji: 'Guji', yirgacheffe: 'Yirgacheffe', sidama: 'Sidama',
  limmu: 'Limmu', jimma: 'Jimma / Djimmah', lekempti: 'Nekemte',
};
const publicLinks = [
  ['/', 'Home'], ['/coffee/', 'Green coffee'], ['/origins/', 'Coffee origins'],
  ['/journey/', 'Buyer journey'], ['/about/', 'About'], ['/contact/', 'Contact'],
];
function readablePageContent(route) {
  const originKey = route.split('/')[2];
  const originName = route.startsWith('/coffee/') ? originNames[originKey] : null;
  const heading = originName
    ? `${originName} Ethiopian Green Coffee | KKGT Coffee`
    : ({
      '/': 'KKGT Coffee — Ethiopian Green Coffee Origins',
      '/coffee': 'Ethiopian Green Coffee for Wholesale Buyers',
      '/origins': 'Explore Ethiopian Coffee Origins',
      '/journey': 'From Coffee Origin to Buyer Inquiry',
      '/gallery': 'KKGT Coffee Gallery',
      '/about': 'About KKGT Coffee',
      '/contact': 'Contact KKGT Coffee',
    }[route] ?? 'KKGT Coffee');
  const description = originName
    ? `Explore ${originName} coffee with KKGT. Ask about current green coffee lots, process, grade, crop year, quantity, packing, and availability before making purchasing decisions.`
    : ({
      '/': 'KKGT Coffee presents Ethiopian green coffee origins for wholesale and international buyers. Explore Guji, Yirgacheffe, Sidama, Limmu, Jimma, and Nekemte, then contact KKGT Import Export to discuss current availability and your buying requirements.',
      '/coffee': 'Explore Ethiopian green coffee origins and contact KKGT Import Export about current lots, specifications, quantities, and export inquiries.',
      '/origins': 'Explore Guji, Yirgacheffe, Sidama, Limmu, Jimma, and Nekemte green coffee origins. Current lot specifications and availability are confirmed per inquiry.',
      '/journey': 'Start with a coffee origin, share your requirements, review confirmed lot information, and coordinate commercial and shipment details with KKGT.',
      '/gallery': 'Explore illustrative Ethiopian coffee imagery and discover the origins presented by KKGT Coffee.',
      '/about': 'KKGT Coffee is the Ethiopian green coffee website for KKGT Import Export, connecting wholesale buyers with information about coffee origins and inquiries.',
      '/contact': 'Contact KKGT Import Export about Ethiopian green coffee. Include your preferred origin, quantity, destination, timing, and required specifications.',
    }[route] ?? 'Explore Ethiopian green coffee origins with KKGT Coffee.');
  const links = publicLinks.map(([url, label]) => `<a href="${url}">${escapeHtml(label)}</a>`).join(' · ');
  const originsList = Object.entries(originNames).map(([slug, name]) => `<li><a href="/coffee/${slug}/">${escapeHtml(name)} coffee</a></li>`).join('');
  return `<main id="seo-readable-content" style="max-width:72rem;margin:3rem auto;padding:1.5rem;font:inherit;color:inherit"><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(description)}</p><nav aria-label="Website pages">${links}</nav><h2>Ethiopian green coffee origins</h2><ul>${originsList}</ul><p>For current lot details and wholesale inquiries, <a href="/contact/">contact KKGT Coffee</a>.</p></main>`;
}
function injectReadableContent(html, route) {
  // This initial HTML is useful without JavaScript. React replaces it on startup,
  // preserving the original visual design and client-side interactions.
  return html.replace('<div id="root"></div>', `<div id="root">${readablePageContent(route)}</div>`);
}

writeFileSync(resolve(outputRoot, 'index.html'), injectReadableContent(injectMeta(baseHtml, '/'), '/'));
writeFileSync(resolve(outputRoot, '404.html'), injectMeta(baseHtml, '/404', true));

for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const routePath = new URL(match[1]).pathname;
  const route = routePath === '/' ? '/' : routePath.replace(/\/+$/, '');
  if (route === '/') continue;

  const routeDirectory = resolve(outputRoot, route.replace(/^\/+/, ''));
  mkdirSync(routeDirectory, { recursive: true });
  writeFileSync(resolve(routeDirectory, 'index.html'), injectReadableContent(injectMeta(baseHtml, route), route));
}

if (isGitHubPages) {
  sitemap = sitemap.replaceAll(productionSite, siteBase);
  writeFileSync(sitemapPath, sitemap);
  writeFileSync(
    resolve(outputRoot, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${siteBase}/sitemap.xml\n`,
  );
}

// Generate the unlisted NFC contact download without adding it to the sitemap.
await import('./prepare-firaol-contact.mjs');
