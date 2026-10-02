import { mediaUrl } from '../media';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const galleryImages = [
  { src: mediaUrl('ethiopian-highlands.webp'), alt: 'Illustrative Ethiopian highland coffee landscape', label: '01 / LANDSCAPE', title: 'The place' },
  { src: mediaUrl('coffee-cherries.webp'), alt: 'Illustrative hands inspecting ripe coffee cherries', label: '02 / CHERRY', title: 'The beginning' },
  { src: mediaUrl('green-coffee.webp'), alt: 'Illustrative green coffee beans on a woven tray', label: '03 / GREEN COFFEE', title: 'The lot' },
] as const;

export function GalleryTeaser() {
  return <section className="gallery-teaser section"><div className="wrap gallery-teaser__head"><div><span className="kicker">VISUAL JOURNAL</span><h2>Look closer at<br /><em>the coffee journey.</em></h2></div><Link className="inline-link" to="/gallery">Open gallery <ArrowUpRight size={18} aria-hidden="true" /></Link></div><div className="wrap gallery-teaser__grid">{galleryImages.map((image, index) => <figure key={image.src} className={`gallery-teaser__item gallery-teaser__item--${index}`}><img src={image.src} alt={image.alt} loading="lazy" /><figcaption>{image.label}<strong>{image.title}</strong></figcaption></figure>)}</div><p className="wrap gallery-disclaimer">Illustrative imagery for this demo. KKGT images can replace these in the same layouts.</p></section>;
}

export function GalleryPage() {
  return <>
    <header className="wrap page-intro"><span className="kicker">VISUAL JOURNAL</span><h1>A closer look at<br />the coffee journey.</h1><p>Three illustrative moments connect landscape, cherry, and prepared green coffee. This gallery is ready for KKGT’s own photography.</p></header>
    <section className="gallery-page wrap">{galleryImages.map((image, index) => <figure key={image.src} className={`gallery-page__item gallery-page__item--${index}`}><img src={image.src} alt={image.alt} width={index === 0 ? 1920 : 1280} height={index === 0 ? 1081 : 853} loading={index === 0 ? 'eager' : 'lazy'} /><figcaption><span>{image.label}</span><h2>{image.title}</h2></figcaption></figure>)}</section>
    <div className="wrap gallery-page__end"><p>All images on this page are illustrative and do not document a specific KKGT farm, team member, facility, or lot.</p><Link className="inline-link" to="/origins">Explore the origins <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
  </>;
}
