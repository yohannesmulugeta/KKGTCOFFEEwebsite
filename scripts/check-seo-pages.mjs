import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..', 'dist');
const sitemap = readFileSync(resolve(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]));
if (!urls.length) throw new Error('Sitemap contains no URLs');
const unique = new Set(urls.map(url => url.href));
if (unique.size !== urls.length) throw new Error('Duplicate URLs in sitemap');
const robots = readFileSync(resolve(root, 'robots.txt'), 'utf8');
if (!robots.includes('Sitemap:')) throw new Error('robots.txt is missing sitemap reference');
for (const url of urls) {
  const file = resolve(root, url.pathname.replace(/^\/+/, ''), 'index.html');
  if (!existsSync(file)) throw new Error(`Missing generated HTML for ${url.pathname}`);
  const html = readFileSync(file, 'utf8');
  const checks = [
    ['page title', /<title>[^<]+<\/title>/],
    ['description', /<meta name="description" content="[^"]+"/],
    ['readable heading', /<main id="seo-readable-content"[\s\S]*?<h1>[^<]+<\/h1>/],
    ['internal link', /<a href="\/coffee\/guji\/"/],
  ];
  for (const [label, pattern] of checks) {
    if (!pattern.test(html)) throw new Error(`Missing ${label} in ${url.pathname}`);
  }
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical !== url.href) throw new Error(`Canonical mismatch for ${url.pathname}: ${canonical}`);
  const robotsMeta = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? '';
  if (robotsMeta.includes('noindex')) throw new Error(`Sitemap URL marked noindex: ${url.pathname}`);
}
const notFound = readFileSync(resolve(root, '404.html'), 'utf8');
const notFoundRobots = notFound.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? '';
if (!notFoundRobots.includes('noindex')) throw new Error('404 page must be noindex');
const expectedRoutes = ['/coffee/guji/', '/coffee/yirgacheffe/', '/coffee/sidama/', '/coffee/limmu/', '/coffee/jimma/', '/coffee/lekempti/'];
for (const route of expectedRoutes) {
  if (!urls.some(url => url.pathname === route)) throw new Error(`Missing origin from sitemap: ${route}`);
}
console.log(`SEO HTML checks passed for ${urls.length} routes, including 404 and origin coverage`);
