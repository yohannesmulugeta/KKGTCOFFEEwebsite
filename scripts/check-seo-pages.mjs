import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..', 'dist');
const sitemap = readFileSync(resolve(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
if (!urls.length) throw new Error('Sitemap contains no URLs');
for (const url of urls) {
  const file = resolve(root, url.replace(/^\/+/, ''), 'index.html');
  if (!existsSync(file)) throw new Error(`Missing generated HTML for ${url}`);
  const html = readFileSync(file, 'utf8');
  const checks = [
    ['page title', /<title>[^<]+<\/title>/],
    ['description', /<meta name="description" content="[^"]+"/],
    ['canonical', /<link rel="canonical" href="[^"]+"/],
    ['readable heading', /<main id="seo-readable-content"[\s\S]*?<h1>[^<]+<\/h1>/],
    ['internal link', /<a href="\/coffee\/guji\/"/],
  ];
  for (const [label, pattern] of checks) {
    if (!pattern.test(html)) throw new Error(`Missing ${label} in ${url}`);
  }
}
console.log(`SEO HTML checks passed for ${urls.length} routes`);
