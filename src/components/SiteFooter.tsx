import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { company } from '../data/site';

export function SiteFooter() {
  return <footer className="site-footer site-footer--expanded">
    <div className="wrap footer-invitation">
      <div><span className="kicker">YOUR NEXT COFFEE CONVERSATION</span><h2>Start with an origin.<br /><em>Continue with us.</em></h2></div>
      <Link className="button button--primary" to="/contact?interest=coffee">Request Coffee Inquiry <ArrowUpRight size={18} aria-hidden="true" /></Link>
    </div>
    <div className="wrap footer-main">
      <div className="footer-about"><Link className="footer-wordmark" to="/">KKGT <em>COFFEE</em></Link><p>Explore Ethiopian origins with KKGT Import Export and ask directly about current green coffee opportunities.</p></div>
      <div><span className="kicker">COFFEE</span><Link to="/coffee">Our Coffee</Link><Link to="/origins">Origins</Link><Link to="/contact?interest=coffee">Buyer inquiry</Link></div>
      <div><span className="kicker">DISCOVER</span><Link to="/journey">Journey / Quality</Link><Link to="/gallery">Gallery</Link><Link to="/about">About KKGT</Link></div>
      <div><span className="kicker">CONTACT</span><a href={`mailto:${company.email}`}><Mail size={15} aria-hidden="true" /> {company.email}</a><a href={`tel:${company.phoneHref}`}><Phone size={15} aria-hidden="true" /> {company.phone}</a><a href={company.corporateUrl} target="_blank" rel="noopener noreferrer">KKGT Import Export <ArrowUpRight size={15} aria-hidden="true" /></a></div>
    </div>
    <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} KKGT Coffee</span><span>Illustrative imagery · Addis Ababa, Ethiopia</span></div>
  </footer>;
}
