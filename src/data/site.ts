import { mediaUrl } from '../media';
// Origin names and company channels are adapted from the existing KKGT corporate repository.
// Lot specifications and company facilities remain unconfirmed; see CONTENT_CHECKLIST.md.
export const company = {
  name: 'KKGT Import Export',
  email: 'info@kkgtimportexport.com',
  phone: '+251 99 182 8202',
  phoneHref: '+251991828202',
  corporateUrl: 'https://yohannesmulugeta.github.io/kkgt-website/',
} as const;

export type Origin = {
  slug: string;
  name: string;
  region: string;
  short: string;
  story: string;
  image: string;
  imageAlt: string;
};

export const origins: Origin[] = [
  {
    slug: 'yirgacheffe', name: 'Yirgacheffe', region: 'Gedeo area · Southern Ethiopia',
    short: 'A highland name from southern Ethiopia, and one of KKGT’s listed coffee origins.',
    story: 'Yirgacheffe is associated with the Gedeo highlands. For buyers, the origin starts the conversation; the exact lot, process, grade, and current availability are confirmed with KKGT.',
    image: mediaUrl('ethiopian-highlands.webp'), imageAlt: 'Illustrative Ethiopian highland landscape with coffee cherries',
  },
  {
    slug: 'sidama', name: 'Sidama', region: 'Southern Ethiopia',
    short: 'A southern Ethiopian coffee origin in KKGT’s public portfolio.',
    story: 'Sidama connects coffee to a broad agricultural landscape and long local knowledge. KKGT can discuss current green coffee options against your destination and specifications.',
    image: mediaUrl('coffee-cherries.webp'), imageAlt: 'Illustrative close view of ripe coffee cherries on a branch',
  },
  {
    slug: 'limmu', name: 'Limmu', region: 'Western Ethiopia',
    short: 'A western origin represented in KKGT’s coffee offering.',
    story: 'Limmu is part of Ethiopia’s western coffee landscape. A commercial offer depends on the available lot, its preparation, and your requirements rather than a generic origin description.',
    image: mediaUrl('green-coffee.webp'), imageAlt: 'Illustrative green coffee beans on a woven tray',
  },
  {
    slug: 'jimma', name: 'Jimma / Djimmah', region: 'Southwestern Ethiopia',
    short: 'An established southwestern coffee name listed by KKGT.',
    story: 'Jimma is widely connected with southwestern Ethiopian coffee country. Ask KKGT for the current lot details that matter to your purchase, including preparation, volume, and packing.',
    image: mediaUrl('ethiopian-highlands.webp'), imageAlt: 'Illustrative Ethiopian highland coffee landscape',
  },
  {
    slug: 'lekempti', name: 'Lekempti', region: 'Western Oromia · Ethiopia',
    short: 'A western Ethiopian trade origin in KKGT’s coffee portfolio.',
    story: 'Lekempti is associated with the wider Nekemte area of western Ethiopia. KKGT can confirm the available origin, lot details, and shipment requirements for a specific inquiry.',
    image: mediaUrl('coffee-cherries.webp'), imageAlt: 'Illustrative coffee cherries growing among green leaves',
  },
];

export const journey = [
  { number: '01', title: 'Start with origin', detail: 'Tell KKGT which Ethiopian origin you want to explore.' },
  { number: '02', title: 'Define the requirement', detail: 'Share your preferred process, grade, quantity, destination, and timing.' },
  { number: '03', title: 'Review the offer', detail: 'Ask for the current lot information and supporting documents before agreeing terms.' },
  { number: '04', title: 'Coordinate shipment', detail: 'Packing, documentation, and delivery terms are agreed for the transaction.' },
] as const;

// Demo roster adapted from the corporate DATA_REQUIRED.md and user updates.
// Confirm current roles and portraits with KKGT before treating it as verified company information.
export const teamMembers = [
  { name: 'Kalbessa Kekeba', role: 'CEO', initials: 'KK', portrait: '' },
  { name: 'Firaol Kelbesa', role: 'Deputy General Manager', initials: 'FK', portrait: '' },
  { name: 'Diriba Mengesha', role: 'Quality Manager', initials: 'DM', portrait: '' },
  { name: 'Seada Kamale', role: 'Export Operations', initials: 'SK', portrait: '' },
  { name: 'Embet Berhanu', role: 'Finance Department Head', initials: 'EB', portrait: '' },
  { name: 'Tashale Badhassa', role: 'Marketing & Sales', initials: 'TB', portrait: '' },
] as const;
