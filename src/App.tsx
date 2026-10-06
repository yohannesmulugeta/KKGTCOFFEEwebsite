import { mediaUrl } from './media';
import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import { Link, Navigate, Route, Routes, useParams, useSearchParams } from 'react-router-dom';
import { SiteHeader } from './components/SiteHeader';
import { SeoManager } from './components/SeoManager';
import { SiteFooter } from './components/SiteFooter';
import { GalleryPage, GalleryTeaser } from './components/GalleryContent';
import { OriginMap } from './components/OriginMap';
import { CoffeeScrollStory } from './components/CoffeeScrollStory';
import { GreenBeanFeature } from './components/GreenBeanFeature';
import { JourneySteps } from './components/JourneySteps';
import { company, origins, type Origin } from './data/site';

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 1, y: 16 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Kicker({ children }: { children: ReactNode }) { return <span className="kicker">{children}</span>; }

function ButtonLink({ to, children, secondary = false, light = false }: { to: string; children: ReactNode; secondary?: boolean; light?: boolean }) {
  return <Link to={to} className={`button ${secondary ? 'button--secondary' : 'button--primary'} ${light ? 'button--light' : ''}`}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <header className="page-intro wrap"><Kicker>{eyebrow}</Kicker><h1>{title}</h1><p>{copy}</p></header>;
}

function InquiryBand({ title = 'Looking for Ethiopian green coffee?' }: { title?: string }) {
  return <section className="inquiry-band"><div className="wrap inquiry-band__inner"><div className="inquiry-band__copy"><Kicker>LET’S BEGIN WITH YOUR REQUIREMENTS</Kicker><h2>{title}</h2><p>Bring the details you know. KKGT can confirm what applies to the current offer.</p><ul className="inquiry-band__checklist" aria-label="Useful details for your inquiry"><li>Origin</li><li>Quantity</li><li>Destination</li><li>Timing</li></ul></div><ButtonLink to="/contact?interest=coffee" light>Request Coffee Inquiry</ButtonLink></div></section>;
}

function OriginCard({ origin, index }: { origin: Origin; index: number }) {
  return <Reveal delay={index * 0.045}><Link className="origin-card" to={`/coffee/${origin.slug}`}>
    <div className="origin-card__image"><img src={origin.image} alt={origin.imageAlt} width="1280" height="853" loading="lazy" decoding="async" /><span>0{index + 1}</span></div>
    <div className="origin-card__body"><span className="eyebrow">{origin.region}</span><h3>{origin.name}</h3><p>{origin.short}</p><span className="text-link">Explore origin <ArrowUpRight size={17} aria-hidden="true" /></span></div>
  </Link></Reveal>;
}

function Home() {
  return <>
    <CoffeeScrollStory />
    <section className="section origins-preview"><div className="wrap"><div className="section-heading"><Reveal><Kicker>THE PORTFOLIO</Kicker><h2>{origins.length} origins.<br /><em>One direct conversation.</em></h2></Reveal><Link className="inline-link" to="/origins">View all origins <ArrowUpRight size={18} /></Link></div><div className="origin-grid origin-grid--home">{origins.slice(0, 3).map((origin, index) => <OriginCard key={origin.slug} origin={origin} index={index} />)}</div><div className="origin-listline"><span>Also explore</span>{origins.slice(3).map(origin => <Link key={origin.slug} to={`/coffee/${origin.slug}`}>{origin.name} <ArrowUpRight size={16} /></Link>)}</div></div></section>
    <GreenBeanFeature />
    <section className="section journey-preview"><div className="wrap"><div className="section-heading"><Reveal><Kicker>FROM INTEREST TO OFFER</Kicker><h2>A clear path from<br /><em>origin to inquiry.</em></h2></Reveal><p>Four practical steps guide the conversation. Each commercial detail is confirmed for the specific inquiry.</p></div><JourneySteps /><Link className="journey-more inline-link" to="/journey">Explore the full journey <ArrowUpRight size={18} aria-hidden="true" /></Link></div></section>
    <GalleryTeaser />
    <section className="section faq-section"><div className="wrap faq-grid"><div><Kicker>BUYER QUESTIONS</Kicker><h2>Good questions make better coffee conversations.</h2></div><div className="faq-list"><details><summary>Which origins can I ask about?<ChevronDown size={19} /></summary><p>KKGT’s coffee list includes {origins.map(origin => origin.name).join(', ')}. Ask which lots are available now.</p></details><details><summary>Can I request grade, process, or crop year?<ChevronDown size={19} /></summary><p>Yes. Include your preferred specifications in the inquiry. KKGT will need to confirm them against current lots.</p></details><details><summary>Is this a retail shop?<ChevronDown size={19} /></summary><p>This site is for green coffee and wholesale conversations. It does not take retail orders.</p></details><details><summary>What should I include in an inquiry?<ChevronDown size={19} /></summary><p>Origin interest, preferred quantity, destination, timing, and any required documents or quality details are a useful start.</p></details></div></div></section>
    <InquiryBand />
  </>;
}

function Coffee() {
  return <><header className="coffee-page-hero"><img src={mediaUrl('green-coffee.webp')} alt="Illustrative green coffee beans on a woven tray" width="1280" height="853" /><div className="coffee-page-hero__shade" /><div className="coffee-page-hero__content wrap"><Kicker>THE KKGT COFFEE PORTFOLIO</Kicker><h1>Ethiopian coffee,<br /><em>explored by origin.</em></h1><p>Start with a place. Continue with the current lot details that matter to your business.</p><ButtonLink to="/origins">Explore the origins</ButtonLink></div><span className="coffee-page-hero__note">SIX ETHIOPIAN ORIGINS · ONE DIRECT CONVERSATION</span></header><nav className="coffee-origin-nav wrap" aria-label="Choose a coffee origin"><span>CHOOSE AN ORIGIN</span>{origins.map((origin, index) => <Link key={origin.slug} to={`/coffee/${origin.slug}`}><small>0{index + 1}</small>{origin.name}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</nav><section className="wide-feature wrap"><div><img src={mediaUrl('ethiopian-highlands.webp')} alt="Illustrative Ethiopian coffee-growing landscape" width="1920" height="1081" /></div><div><Kicker>FOR GREEN COFFEE BUYERS</Kicker><h2>Origin is the beginning, not the whole offer.</h2><p>KKGT lists six Ethiopian origins. The grade, processing method, crop year, quantity, and packing must be confirmed for the coffee actually available.</p><ButtonLink to="/contact?interest=coffee">Tell us what you need</ButtonLink></div></section><section className="section"><div className="wrap"><div className="section-heading"><div><Kicker>EXPLORE THE COLLECTION</Kicker><h2>Find your starting point.</h2></div></div><div className="origin-grid">{origins.map((origin, index) => <OriginCard key={origin.slug} origin={origin} index={index} />)}</div></div></section><InquiryBand title="Have a specific coffee requirement?" /></>;
}

function Origins() {
  return <><PageIntro eyebrow="A SMALL ATLAS OF ETHIOPIAN COFFEE" title="One country. Many places to begin." copy="Browse the six origins in KKGT’s coffee list. Each page opens a direct inquiry path." /><section className="origins-atlas wrap"><div className="atlas-copy"><Kicker>ORIGIN INDEX · 01—06</Kicker><p>Select a map marker or an origin below. Positions are illustrative; current lot details are confirmed when you inquire.</p><OriginMap /></div><div className="atlas-list">{origins.map((origin, index) => <Link key={origin.slug} to={`/coffee/${origin.slug}`}><span>0{index + 1}</span><strong>{origin.name}</strong><small>{origin.region}</small><ArrowUpRight size={21} /></Link>)}</div></section><section className="section origins-gallery"><div className="wrap origin-grid">{origins.map((origin, index) => <OriginCard key={origin.slug} origin={origin} index={index} />)}</div></section><InquiryBand title="Which origin interests you?" /></>;
}

function OriginDetail() {
  const { slug } = useParams();
  const origin = origins.find(item => item.slug === slug);
  if (!origin) return <NotFound />;
  const next = origins[(origins.indexOf(origin) + 1) % origins.length];
  return <>
    <div className="origin-hero"><img src={origin.image} alt={origin.imageAlt} width="1280" height="853" /><div className="origin-hero__shade" /><div className="wrap origin-hero__content"><Link to="/origins" className="back-link"><ArrowLeft size={17} /> All origins</Link><Kicker>KKGT COFFEE ORIGIN · {origin.region}</Kicker><h1>{origin.name}</h1><p>{origin.short}</p></div></div>
    <section className="section origin-detail"><div className="wrap origin-detail__grid"><div><Kicker>THE PLACE</Kicker><h2>An origin worth exploring.</h2></div><div><p>{origin.story}</p><p className="small-note">Images are illustrative and do not document a specific KKGT farm or lot.</p></div></div></section>
    <section className="origin-editorial"><div className="origin-editorial__image"><img src={origin.slug === 'limmu' ? mediaUrl('coffee-cherries.webp') : mediaUrl('green-coffee.webp')} alt="Illustrative coffee preparation detail" width="1280" height="853" loading="lazy" /></div><div className="origin-editorial__copy"><Kicker>FROM PLACE TO PROPOSAL</Kicker><h2>A better question starts with a clear brief.</h2><p>Origin tells you where to begin. Current lot information tells you what is actually on offer. Share your requirements so KKGT can confirm what applies to {origin.name} now.</p><Link className="inline-link" to={`/contact?interest=${encodeURIComponent(origin.name)}`}>Ask about this origin <ArrowUpRight size={18} aria-hidden="true" /></Link></div></section>
    <section className="origin-facts wrap" aria-label="Buyer information"><div><span>01 / ORIGIN</span><strong>{origin.region}</strong></div><div><span>02 / LOT DETAILS</span><strong>Confirmed per offer</strong></div><div><span>03 / NEXT STEP</span><strong>Share your buying brief</strong></div></section>
    <section className="lot-panel wrap"><div><Kicker>FOR YOUR BUYING TEAM</Kicker><h2>Make the next step specific.</h2><p>Ask about this origin and include your preferred process, grade, quantity, destination, and timing. KKGT can confirm current details before a commercial offer.</p></div><ButtonLink to={`/contact?interest=${encodeURIComponent(origin.name)}`}>Inquire about {origin.name}</ButtonLink></section>
    <Link className="next-origin wrap" to={`/coffee/${next.slug}`}><span>NEXT ORIGIN</span><strong>{next.name}</strong><ArrowRight size={26} /></Link>
  </>;
}

function Journey() {
  return <><PageIntro eyebrow="JOURNEY / QUALITY" title="From a place of origin to a clear offer." copy="A simple view of the buyer conversation, without assuming the details of a lot before they are verified." /><section className="journey-feature"><div className="journey-feature__image"><img src={mediaUrl('coffee-cherries.webp')} alt="Illustrative coffee cherries being inspected by hand" width="1280" height="853" /></div><div className="journey-feature__copy"><Kicker>THE WORK BEHIND THE COFFEE</Kicker><h2>Clarity at every step.</h2><p>KKGT’s company material describes sourcing, preparation, quality handling, commercial coordination, and delivery. The exact facilities, processes, and responsibilities depend on the lot and transaction.</p></div></section><section className="section"><div className="wrap"><div className="section-heading"><div><Kicker>A PRACTICAL BUYER JOURNEY</Kicker><h2>Four steps.<br /><em>One clear conversation.</em></h2></div></div><JourneySteps large /><div className="journey-followup"><div><span className="kicker">YOUR NEXT STEP</span><p>Choose an origin or tell us what your buying team needs. Current lot details are confirmed in the conversation.</p></div><div><Link className="inline-link" to="/origins">Explore origins <ArrowUpRight size={18} aria-hidden="true" /></Link><Link className="inline-link" to="/contact?interest=coffee">Prepare an inquiry <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></div></section><section className="quality-split"><div className="quality-split__image"><img src={mediaUrl('green-coffee.webp')} alt="Illustrative green coffee beans being inspected" width="1280" height="853" loading="lazy" /></div><div className="quality-split__copy"><Kicker>QUALITY IS LOT-SPECIFIC</Kicker><h2>Ask for evidence, not assumptions.</h2><p>Buyers can request current information on grade, processing, crop year, physical quality, packing, and documentation. KKGT must confirm what applies to the offered coffee.</p><ButtonLink to="/contact?interest=coffee">Discuss your specifications</ButtonLink></div></section><InquiryBand /></>;
}

function About() {
  return <><PageIntro eyebrow="ABOUT KKGT" title="An Ethiopian trading company with coffee in its portfolio." copy="This dedicated experience connects coffee buyers with KKGT Import Export and its Ethiopian origin list." /><section className="about-story wrap"><div><img src={mediaUrl('ethiopian-highlands.webp')} alt="Illustrative coffee-growing landscape in the Ethiopian highlands" width="1920" height="1081" /></div><div><Kicker>ROOTED IN ETHIOPIA</Kicker><h2>Business begins with understanding the place.</h2><p>KKGT Import Export’s corporate site presents coffee alongside agricultural commodities, crop-protection products, and import and trading activity. This coffee site presents six origins and gives buyers a direct path to ask about current lots.</p><p>For company-wide information, company details, and the broader KKGT business portfolio, visit the corporate site.</p><a className="inline-link" href={company.corporateUrl} target="_blank" rel="noopener noreferrer">Visit KKGT Import Export <ArrowUpRight size={18} /></a></div></section><InquiryBand title="Let’s talk about Ethiopian coffee." /></>;
}

function Contact() {
  const [params] = useSearchParams();
  const initialInterest = params.get('interest') ?? '';
  const [interest, setInterest] = useState(initialInterest);
  const [status, setStatus] = useState('');
  useEffect(() => setInterest(initialInterest), [initialInterest]);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = ['name', 'company', 'email', 'destination', 'interest', 'message'] as const;
    const labels = ['Name', 'Company', 'Email', 'Destination', 'Coffee interest', 'Message'];
    const body = fields.map((field, index) => `${labels[index]}: ${String(data.get(field) ?? '').trim()}`).join('\n\n');
    const subject = `KKGT Coffee inquiry — ${String(data.get('interest') || 'green coffee')}`;
    const href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('Your email app should open with a draft. Please send it there. If it does not open, use the email address shown on this page.');
    window.location.href = href;
  }

  return <><PageIntro eyebrow="COFFEE INQUIRY" title="Tell us what coffee you’re looking for." copy="Share your origin interest and buying requirements. We’ll prepare an email draft for you to review and send from your own email app." /><section className="contact-section wrap"><div className="contact-info"><Kicker>DIRECT CHANNELS</Kicker><h2>A real person starts with a clear brief.</h2><p>This form prepares an email draft in your email app; it does not send or store your message on this website.</p><a href={`mailto:${company.email}`}><Mail size={21} /> <span><small>EMAIL KKGT</small>{company.email}</span><ArrowUpRight size={18} /></a><a href={`tel:${company.phoneHref}`}><Phone size={21} /> <span><small>CALL KKGT</small>{company.phone}</span><ArrowUpRight size={18} /></a><div className="contact-note"><MapPin size={20} /><span>KKGT Import Export · Addis Ababa, Ethiopia<br /><small>Yobek Commercial Center, 7th Floor, Office 703A · Sengatera, Lideta</small></span></div></div><form className="contact-form" onSubmit={prepareEmail}><div className="form-top"><span>COFFEE BUYER INQUIRY</span><span>01 / 01</span></div><div className="form-grid"><label>Your name <span>*</span><input name="name" required autoComplete="name" placeholder="Your full name" /></label><label>Company <span>*</span><input name="company" required autoComplete="organization" placeholder="Company name" /></label><label>Email address <span>*</span><input name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></label><label>Destination <span>*</span><input name="destination" required placeholder="Country or port" /></label></div><label>Coffee interest <span>*</span><select name="interest" required value={interest} onChange={event => setInterest(event.target.value)}><option value="">Select an origin or general inquiry</option><option value="coffee">General green coffee inquiry</option>{origins.map(origin => <option key={origin.slug} value={origin.name}>{origin.name}</option>)}</select></label><label>Your requirements <span>*</span><textarea name="message" required minLength={12} rows={6} placeholder="Preferred origin, process, grade, quantity, timing, packing, or documents…" /></label><label className="consent"><input name="consent" type="checkbox" required /><span>I agree to include these details in an email draft addressed to KKGT. <strong>*</strong></span></label><button className="button button--primary" type="submit">Prepare email inquiry <ArrowUpRight size={18} /></button><p className="form-status" role="status" aria-live="polite">{status}</p></form></section></>;
}

function NotFound() { return <div className="not-found wrap"><Kicker>PAGE NOT FOUND</Kicker><h1>We lost this trail.</h1><p>The page you requested is not part of this coffee site.</p><ButtonLink to="/">Return home</ButtonLink></div>; }

export default function App() {
  return <><SeoManager /><SiteHeader /><main id="main" tabIndex={-1} style={{ '--botanical-image': `url("${mediaUrl('coffee-botanical.webp')}")` } as CSSProperties}><Routes><Route path="/" element={<Home />} /><Route path="/coffee" element={<Coffee />} /><Route path="/origins" element={<Origins />} /><Route path="/coffee/:slug" element={<OriginDetail />} /><Route path="/journey" element={<Journey />} /><Route path="/team" element={<Navigate to="/about" replace />} /><Route path="/gallery" element={<GalleryPage />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></main><SiteFooter /></>;
}
