import { mediaUrl } from '../media';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const coffeeLinks = [
  { to: '/coffee', label: 'Our Coffee' },
  { to: '/origins', label: 'Explore Origins' },
];

const storyLinks = [
  { to: '/journey', label: 'Journey / Quality' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About KKGT' },
];

export function SiteHeader() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const coffee = useRef<HTMLDetailsElement>(null);
  const story = useRef<HTMLDetailsElement>(null);

  function closeMobile(returnFocus = false) {
    setMobileOpen(false);
    if (returnFocus) requestAnimationFrame(() => trigger.current?.focus());
  }

  useEffect(() => {
    setMobileOpen(false);
    if (coffee.current) coffee.current.open = false;
    if (story.current) story.current.open = false;
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLElement>('a')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMobile(true);
        return;
      }
      if (event.key !== 'Tab' || !panel.current) return;
      const focusable = Array.from(panel.current.querySelectorAll<HTMLElement>('a, button:not([disabled])'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => { if (window.innerWidth > 1080) closeMobile(); };
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (coffee.current && !coffee.current.contains(event.target as Node)) coffee.current.open = false;
      if (story.current && !story.current.contains(event.target as Node)) story.current.open = false;
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const current = coffee.current?.open ? coffee.current : story.current?.open ? story.current : null;
      if (!current) return;
      current.open = false;
      current.querySelector('summary')?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  const isHome = location.pathname === '/';
  const headerClass = ['site-header', isHome && 'site-header--home', scrolled && 'site-header--scrolled'].filter(Boolean).join(' ');

  return <>
    <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a>
    <header className={headerClass}>
      <div className="header-inner wrap">
        <Link className="brand" to="/" aria-label="KKGT Coffee home" onClick={() => closeMobile()}>
          <img src={mediaUrl('kkgt-logo-header.webp')} width="106" height="50" alt="" />
          <span className="brand-rule" aria-hidden="true" />
          <span className="brand-name">COFFEE</span>
        </Link>

        <nav className="nav-main" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <details ref={coffee} className="nav-dropdown" onToggle={event => { if (event.currentTarget.open && story.current) story.current.open = false; }}>
            <summary>Our Coffee <ChevronDown size={15} aria-hidden="true" /></summary>
            <div className="nav-dropdown__menu">
              <span>FIND YOUR COFFEE</span>
              {coffeeLinks.map(item => <NavLink key={item.to} to={item.to}>{item.label}<ArrowUpRight size={16} aria-hidden="true" /></NavLink>)}
            </div>
          </details>
          <details ref={story} className="nav-dropdown" onToggle={event => { if (event.currentTarget.open && coffee.current) coffee.current.open = false; }}>
            <summary>Discover <ChevronDown size={15} aria-hidden="true" /></summary>
            <div className="nav-dropdown__menu nav-dropdown__menu--wide">
              <span>BEHIND THE COFFEE</span>
              {storyLinks.map(item => <NavLink key={item.to} to={item.to}>{item.label}<ArrowUpRight size={16} aria-hidden="true" /></NavLink>)}
            </div>
          </details>
        </nav>
        <Link className="header-cta" to="/contact?interest=coffee">Request Coffee Inquiry <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <button ref={trigger} className="menu-trigger" type="button" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-controls="mobile-menu" aria-expanded={mobileOpen} onClick={() => mobileOpen ? closeMobile(true) : setMobileOpen(true)}>{mobileOpen ? <X size={25} /> : <Menu size={25} />}</button>
      </div>
    </header>

    {mobileOpen && <div className="mobile-overlay" onMouseDown={event => { if (event.target === event.currentTarget) closeMobile(true); }}>
      <div ref={panel} id="mobile-menu" className="mobile-panel mobile-panel--grouped" role="dialog" aria-modal="true" aria-label="Main menu">
        <div className="mobile-panel__head"><span>EXPLORE KKGT COFFEE</span><button type="button" aria-label="Close menu" onClick={() => closeMobile(true)}><X size={24} /></button></div>
        <nav aria-label="Mobile navigation">
          <NavLink to="/" end onClick={() => closeMobile()}>Home <ArrowUpRight size={18} aria-hidden="true" /></NavLink>
          <span className="mobile-panel__label">COFFEE</span>
          {coffeeLinks.map(item => <NavLink key={item.to} to={item.to} onClick={() => closeMobile()}>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></NavLink>)}
          <span className="mobile-panel__label">DISCOVER</span>
          {storyLinks.map(item => <NavLink key={item.to} to={item.to} onClick={() => closeMobile()}>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></NavLink>)}
        </nav>
        <Link className="button button--primary mobile-panel__cta" to="/contact?interest=coffee" onClick={() => closeMobile()}>Request Coffee Inquiry <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </div>}
  </>;
}
