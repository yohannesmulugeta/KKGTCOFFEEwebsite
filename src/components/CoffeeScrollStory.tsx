import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const chapters = [
  {
    eyebrow: 'FROM ETHIOPIA, WITH PURPOSE',
    title: <>Every origin<br />has a <em>story.</em></>,
    text: 'Explore the Ethiopian coffee origins represented by KKGT, then speak directly with us about your green coffee requirements.',
    state: 'Born in Ethiopia',
    cue: 'ORIGIN · COFFEE CHERRY',
    action: { label: 'Explore Origins', to: '/origins' },
    secondAction: { label: 'Request Coffee Inquiry', to: '/contact?interest=coffee' },
    artLabel: 'Illustrative ripe coffee cherry above Ethiopian highlands',
  },
  {
    eyebrow: 'THE LAND BEHIND THE LOT',
    title: <>Coffee starts long before a <em>shipment.</em></>,
    text: 'Place, people, and preparation shape the journey of green coffee. We present that journey with care and ask buyers to judge each offer by current, verifiable lot information.',
    state: 'The coffee journey',
    cue: 'CHERRY · SEED REVEALED',
    action: { label: 'See the Journey', to: '/journey' },
    artLabel: 'Illustrative coffee cherry opening to reveal its seed',
  },
  {
    eyebrow: 'COFFEE WITH A SENSE OF PLACE',
    title: <>Rooted in Ethiopia.<br /><em>Ready for conversation.</em></>,
    text: 'Explore six Ethiopian coffee origins, then discuss current grade, process, quantity, and availability for the actual lot with KKGT.',
    state: 'Six named origins',
    cue: 'ORIGIN · GREEN COFFEE',
    action: { label: 'Discover Our Coffee', to: '/coffee' },
    artLabel: 'Illustrative green coffee bean',
  },
  {
    eyebrow: 'FROM INTEREST TO OFFER',
    title: <>A clear path<br /><em>from origin<br />to inquiry.</em></>,
    text: 'Four practical steps guide the conversation. Each commercial detail is confirmed for the specific inquiry.',
    state: 'A clear buying brief',
    cue: 'REQUIREMENT · CURRENT OFFER',
    action: { label: 'Explore the Journey', to: '/journey' },
    artLabel: 'Illustrative green coffee bean with a buyer brief outline',
  },
  {
    eyebrow: 'QUALITY, WITH CONTEXT',
    title: <>Ask for the facts<br /><em>behind the coffee.</em></>,
    text: 'We do not publish generic tasting scores, grades, crop years, certifications, or shipment volumes as if they apply to every lot. Tell KKGT what you need so the team can respond with current details.',
    state: 'Start a conversation',
    cue: 'FINAL CHAPTER · COFFEE CUP',
    action: { label: 'Request Coffee Inquiry', to: '/contact?interest=coffee' },
    secondAction: { label: 'How we discuss quality', to: '/journey' },
    artLabel: 'Illustrative cup of coffee as the final visual chapter',
  },
] as const;

function GreenBean({ x = 0, y = 0, scale = 1, rotate = -22 }: { x?: number; y?: number; scale?: number; rotate?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotate} 200 205) scale(${scale})`}>
    <ellipse cx="200" cy="205" rx="91" ry="62" fill="url(#beanBody)" stroke="#cbd7a8" strokeWidth="2" />
    <path d="M139 191c25 30 67 48 122 28M145 194c39-3 80-24 115-36" fill="none" stroke="#294831" strokeWidth="7" strokeLinecap="round" opacity=".65" />
    <path d="M146 158c31-24 87-31 118-9" fill="none" stroke="#fff4" strokeWidth="9" strokeLinecap="round" />
  </g>;
}

function StoryIllustration({ chapter }: { chapter: number }) {
  return <svg viewBox="0 0 400 400" role="img" aria-label={chapters[chapter].artLabel}>
    <defs>
      <radialGradient id="cherryBody" cx="34%" cy="28%"><stop stopColor="#f88b68" /><stop offset=".42" stopColor="#c54c3b" /><stop offset="1" stopColor="#662821" /></radialGradient>
      <linearGradient id="beanBody" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c8d49e" /><stop offset=".5" stopColor="#8fa570" /><stop offset="1" stopColor="#466d4b" /></linearGradient>
      <radialGradient id="seedBody"><stop stopColor="#f3e8c8" /><stop offset="1" stopColor="#c8ab80" /></radialGradient>
      <linearGradient id="staticCupRim" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff7e6" /><stop offset="1" stopColor="#c9bfa6" /></linearGradient>
      <filter id="artShadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16" /></filter>
    </defs>
    <ellipse cx="200" cy="325" rx="112" ry="21" fill="#020e0b" opacity=".42" filter="url(#artShadow)" />
    {chapter === 0 && <>
      <path d="M202 134c4-31 20-52 45-64" fill="none" stroke="#476d3d" strokeWidth="13" strokeLinecap="round" />
      <path d="M240 76c31-24 63-13 71 9-31 16-56 15-71-9Z" fill="#789f68" stroke="#b4c493" strokeWidth="2" />
      <ellipse cx="200" cy="218" rx="92" ry="105" fill="url(#cherryBody)" stroke="#e47a59" strokeWidth="2" />
      <path d="M148 154c15-18 31-27 50-29" fill="none" stroke="#fff4" strokeWidth="10" strokeLinecap="round" />
    </>}
    {chapter === 1 && <>
      <path d="M202 129c7-30 24-49 44-60" fill="none" stroke="#4e7347" strokeWidth="11" strokeLinecap="round" />
      <path d="M237 76c30-21 61-13 72 10-31 14-55 13-72-10Z" fill="#7d9d6a" />
      <ellipse cx="200" cy="219" rx="101" ry="103" fill="url(#cherryBody)" stroke="#ef8d6a" strokeWidth="3" />
      <ellipse cx="214" cy="218" rx="68" ry="84" fill="url(#seedBody)" stroke="#e3c298" strokeWidth="4" transform="rotate(22 214 218)" />
      <ellipse cx="216" cy="219" rx="42" ry="64" fill="#a1b18a" opacity=".9" transform="rotate(22 216 219)" />
      <path d="M199 181c13 27 15 52 9 79" fill="none" stroke="#576b4f" strokeWidth="8" strokeLinecap="round" transform="rotate(22 216 219)" />
    </>}
    {chapter === 2 && <GreenBean />}
    {chapter === 3 && <>
      <g transform="translate(-75 42) scale(.82)"><GreenBean /></g>
      <g transform="translate(89 -34) scale(.82)"><GreenBean /></g>
      <g transform="translate(0 74) scale(.88)"><GreenBean /></g>
      <path d="M93 112h40m-40 0v40M307 112h-40m40 0v40M93 300h40m-40 0v-40M307 300h-40m40 0v-40" fill="none" stroke="#e7e0c3" strokeWidth="2" opacity=".7" />
    </>}
    {chapter === 4 && <>
      <path d="M309 170c67-23 91 83 22 101" fill="none" stroke="#e1d6be" strokeWidth="28" strokeLinecap="round" />
      <circle cx="200" cy="210" r="117" fill="url(#staticCupRim)" stroke="#fff8e9" strokeWidth="3" />
      <circle cx="200" cy="210" r="94" fill="#3c2419" stroke="#ac8064" strokeWidth="3" />
      <ellipse cx="172" cy="175" rx="46" ry="26" fill="#bb784c" opacity=".28" />
      <path d="M147 246c36 29 86 34 125 5" fill="none" stroke="#d99b71" strokeWidth="4" opacity=".25" />
    </>}
  </svg>;
}

function ContinuousArtwork({ progress, label }: { progress: MotionValue<number>; label: string }) {
  const cherryOpacity = useTransform(progress, [0, .18, .37, .45], [1, 1, .55, 0]);
  const leftOpen = useTransform(progress, [.1, .35], [0, -37]);
  const rightOpen = useTransform(progress, [.1, .35], [0, 37]);
  const seedOpacity = useTransform(progress, [.12, .24, .42, .52], [0, 1, 1, 0]);
  const beanOpacity = useTransform(progress, [.36, .49, .65, .78], [0, 1, 1, 0]);
  const beanRotate = useTransform(progress, [.3, .65, 1], [-16, 4, 12]);
  const beanScale = useTransform(progress, [.3, .5, .78, 1], [.78, 1, .93, 1.05]);
  const briefOpacity = useTransform(progress, [.55, .66, .72, .79], [0, 1, 1, 0]);
  const inquiryOpacity = useTransform(progress, [.62, .7, .74, .8], [0, 1, 1, 0]);
  const cupOpacity = useTransform(progress, [.68, .8], [0, 1]);
  const cupScale = useTransform(progress, [.68, .82], [.76, 1]);
  const steamOpacity = useTransform(progress, [.79, .9], [0, .62]);
  const steamY = useTransform(progress, [.8, 1], [7, -8]);

  return <div className="coffee-story__art">
    <span className="coffee-story__orbit coffee-story__orbit--one" aria-hidden="true" />
    <span className="coffee-story__orbit coffee-story__orbit--two" aria-hidden="true" />
    <svg viewBox="0 0 400 400" role="img" aria-label={label}>
      <defs>
        <radialGradient id="journeyCherry" cx="33%" cy="28%"><stop stopColor="#fa9974" /><stop offset=".45" stopColor="#c6503d" /><stop offset="1" stopColor="#66261f" /></radialGradient>
        <radialGradient id="journeySeed" cx="32%" cy="27%"><stop stopColor="#f4e9c8" /><stop offset="1" stopColor="#bda878" /></radialGradient>
        <linearGradient id="journeyGreen" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d7dfa7" /><stop offset=".48" stopColor="#9dae78" /><stop offset="1" stopColor="#49684a" /></linearGradient>
        <linearGradient id="journeyCupRim" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff7e6" /><stop offset="1" stopColor="#c9bfa6" /></linearGradient>
        <filter id="journeyShadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="13" /></filter>
      </defs>
      <ellipse cx="200" cy="327" rx="103" ry="18" fill="#06150e" opacity=".5" filter="url(#journeyShadow)" />
      <motion.g style={{ opacity: cherryOpacity }}>
        <path d="M201 112c3-31 18-50 41-67" fill="none" stroke="#65855c" strokeWidth="12" strokeLinecap="round" />
        <path d="M238 54c32-20 57-12 68 9-27 17-49 16-68-9Z" fill="#7fa26b" stroke="#b7c59b" strokeWidth="2" />
        <motion.g style={{ x: leftOpen }}><ellipse cx="189" cy="213" rx="77" ry="106" fill="url(#journeyCherry)" stroke="#e88c66" strokeWidth="2" transform="rotate(-8 189 213)" /><path d="M145 150c18-21 39-29 61-27" fill="none" stroke="#fff4" strokeWidth="8" strokeLinecap="round" /></motion.g>
        <motion.g style={{ x: rightOpen }}><ellipse cx="211" cy="213" rx="77" ry="106" fill="url(#journeyCherry)" stroke="#e88c66" strokeWidth="2" transform="rotate(8 211 213)" /></motion.g>
      </motion.g>
      <motion.g style={{ opacity: seedOpacity }}><ellipse cx="200" cy="219" rx="54" ry="82" fill="url(#journeySeed)" stroke="#f1d8a8" strokeWidth="3" /><ellipse cx="200" cy="219" rx="37" ry="64" fill="#91a778" /><path d="M199 159c-17 36-13 83 3 121" fill="none" stroke="#4f6848" strokeWidth="8" strokeLinecap="round" /></motion.g>
      <motion.g className="coffee-story__bean" style={{ opacity: beanOpacity, rotate: beanRotate, scale: beanScale }}><path d="M103 203c10-75 64-125 127-116 66 9 101 80 66 151-31 64-93 103-145 83-42-16-57-62-48-118Z" fill="url(#journeyGreen)" stroke="#d8e0b0" strokeWidth="3" /><path d="M215 103c-29 45-30 80-19 124 10 41 3 74-28 91" fill="none" stroke="#395a43" strokeWidth="11" strokeLinecap="round" /><path d="M131 164c25-39 55-55 83-57" fill="none" stroke="#f5f3cd" strokeWidth="10" strokeLinecap="round" opacity=".52" /></motion.g>
      <motion.g style={{ opacity: briefOpacity }} fill="none" stroke="#eee5ca" strokeWidth="2"><path d="M68 132v-29h34M298 103h34v29M68 282v29h34M298 311h34v-29" /><circle cx="200" cy="207" r="123" opacity=".34" /></motion.g>
      <motion.g style={{ opacity: inquiryOpacity }}><rect x="48" y="65" width="304" height="287" rx="4" fill="none" stroke="#e1d5b3" strokeWidth="2" /><path d="M70 88h82M70 329h260" stroke="#e1d5b3" strokeWidth="2" opacity=".75" /><circle cx="314" cy="103" r="7" fill="#ef6a24" /></motion.g>
      <motion.g className="coffee-story__cup" style={{ opacity: cupOpacity, scale: cupScale }}>
        <path d="M309 170c67-23 91 83 22 101" fill="none" stroke="#e1d6be" strokeWidth="28" strokeLinecap="round" />
        <circle cx="200" cy="210" r="117" fill="url(#journeyCupRim)" stroke="#fff8e9" strokeWidth="3" />
        <circle cx="200" cy="210" r="94" fill="#3c2419" stroke="#ac8064" strokeWidth="3" />
        <ellipse cx="172" cy="175" rx="46" ry="26" fill="#bb784c" opacity=".28" />
        <path d="M147 246c36 29 86 34 125 5" fill="none" stroke="#d99b71" strokeWidth="4" opacity=".25" />
      </motion.g>
      <motion.g style={{ opacity: steamOpacity, y: steamY }} fill="none" stroke="#f7ead6" strokeWidth="3" strokeLinecap="round">
        <path d="M157 76c-10-14 13-20 3-36M199 67c-10-14 13-20 3-36M241 76c-10-14 13-20 3-36" />
      </motion.g>
    </svg>
  </div>;
}

export function CoffeeScrollStory() {
  const track = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const progressLabel = useTransform(scrollYProgress, value => `${Math.round(value * 100)}%`);
  const fieldScene = useTransform(scrollYProgress, [0, .2, .44], [1, 1, 0]);
  const selectionScene = useTransform(scrollYProgress, [.18, .42, .68], [0, 1, 0]);
  const inquiryScene = useTransform(scrollYProgress, [.57, .82, 1], [0, 1, 1]);

  useMotionValueEvent(scrollYProgress, 'change', value => {
    const next = Math.min(chapters.length - 1, Math.floor(value * chapters.length + 0.01));
    setActive(current => current === next ? current : next);
  });

  function jumpToChapter(index: number) {
    if (!track.current) return;
    const top = window.scrollY + track.current.getBoundingClientRect().top;
    const distance = track.current.scrollHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * ((index + .5) / chapters.length), behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  const chapter = chapters[active];

  return <section ref={track} className="coffee-story" aria-label="KKGT Coffee scroll story">
    <div className="coffee-story__viewport">
      <motion.div className="coffee-story__scene coffee-story__scene--field" style={{ opacity: fieldScene }} aria-hidden="true" />
      <motion.div className="coffee-story__scene coffee-story__scene--selection" style={{ opacity: selectionScene }} aria-hidden="true" />
      <motion.div className="coffee-story__scene coffee-story__scene--inquiry" style={{ opacity: inquiryScene }} aria-hidden="true" />
      <svg className="coffee-story__landscape" viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="coffee-story__ridge coffee-story__ridge--far" d="M0 450 190 345 320 408 530 257 717 406 934 280 1100 371 1280 255 1440 337V820H0Z" />
        <path className="coffee-story__ridge coffee-story__ridge--near" d="M0 592 177 490 340 570 552 430 720 575 937 449 1147 580 1332 420 1440 498V820H0Z" />
        <path className="coffee-story__ridge coffee-story__ridge--front" d="M0 692 184 572 345 670 541 552 752 661 939 568 1142 675 1325 560 1440 638V820H0Z" />
      </svg>
      <div className="coffee-story__grain" aria-hidden="true" />
      <div className="coffee-story__topline"><span>KKGT / COFFEE ORIGINS</span><span>SCROLL TO EXPLORE</span></div>
      <div className="coffee-story__centerlabel">THE STORY OF<br /><strong>ETHIOPIAN COFFEE</strong></div>
      <div className="coffee-story__rail" aria-label="Story chapters">
        <span className="coffee-story__rail-start">0{active + 1}</span>
        <div className="coffee-story__rail-line"><motion.span style={{ scaleY: scrollYProgress }} /></div>
        <span className="coffee-story__rail-end">0{chapters.length}</span>
      </div>
      <div className="coffee-story__copy-slot"><AnimatePresence initial={false} mode="sync">
        <motion.div key={`copy-${active}`} className="coffee-story__copy" initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -10 }} transition={{ duration: .28 }}>
          <span className="coffee-story__eyebrow">0{active + 1} / {chapter.eyebrow}</span>
          {active === 0 ? <h1>{chapter.title}</h1> : <h2>{chapter.title}</h2>}
          <p>{chapter.text}</p>
          <div className="coffee-story__actions"><Link className="button button--primary" to={chapter.action.to}>{chapter.action.label}<ArrowUpRight size={17} aria-hidden="true" /></Link>{'secondAction' in chapter && <Link className="coffee-story__secondary" to={chapter.secondAction.to}>{chapter.secondAction.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>}</div>
        </motion.div>
      </AnimatePresence></div>
      <div className="coffee-story__art-slot"><ContinuousArtwork progress={scrollYProgress} label={chapter.artLabel} /></div>
      <aside className="coffee-story__state" aria-label="Current story chapter"><span>CURRENT STATE</span><strong>{chapter.state}</strong><dl><div><dt>JOURNEY</dt><motion.dd>{progressLabel}</motion.dd></div><div><dt>CHAPTER</dt><dd>0{active + 1}</dd></div><div><dt>ORIGIN</dt><dd>ETHIOPIA</dd></div></dl></aside>
      <div className="coffee-story__cue">{chapter.cue}</div>
      <div className="coffee-story__nav" aria-label="Jump to story chapter">{chapters.map((item, index) => <button key={item.state} type="button" aria-label={`Go to chapter ${index + 1}: ${item.state}`} aria-current={index === active ? 'step' : undefined} onClick={() => jumpToChapter(index)} />)}</div>
      <div className="coffee-story__scroll">SCROLL <ArrowDown size={15} aria-hidden="true" /></div>
    </div>
    <div className="coffee-story__reduced">{chapters.map((item, index) => <article key={item.state}><div className="coffee-story__reduced-art"><StoryIllustration chapter={index} /></div><span className="coffee-story__eyebrow">0{index + 1} / {item.eyebrow}</span><h2>{item.title}</h2><p>{item.text}</p><Link className="button button--primary" to={item.action.to}>{item.action.label}<ArrowUpRight size={17} aria-hidden="true" /></Link></article>)}</div>
  </section>;
}
