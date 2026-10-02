import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { teamMembers } from '../data/site';

type Member = (typeof teamMembers)[number];

function TeamCard({ member, index }: { member: Member; index: number }) {
  return <article className="team-card">
    <div className={`team-card__portrait team-card__portrait--${index % 3}`} role={member.portrait ? undefined : 'img'} aria-label={member.portrait ? undefined : `Illustrative placeholder for ${member.name}; portrait to be added`}>
      {member.portrait ? <img src={member.portrait} alt={member.name} loading="lazy" /> : <svg className="team-card__placeholder" viewBox="0 0 240 280" aria-hidden="true"><circle cx="120" cy="102" r="43" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M41 251c5-55 33-84 79-84s74 29 79 84" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M23 251h194M120 30v-19M35 104H17M223 104h-18" fill="none" stroke="currentColor" strokeWidth="1" opacity=".52" /></svg>}
      <small>0{index + 1} / KKGT</small>
    </div>
    <div className="team-card__text"><span>{member.role}</span><h3>{member.name}</h3></div>
  </article>;
}

export function TeamPreview() {
  return <section className="team-preview section">
    <div className="wrap team-preview__head"><div><span className="kicker">OUR TEAM</span><h2>The people behind<br /><em>the conversation.</em></h2></div><div><p>Commercial, quality, and export conversations have people behind them. Meet the KKGT team as this demo takes shape.</p><Link className="inline-link" to="/team">Meet the team <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div>
    <div className="wrap team-grid team-grid--preview">{teamMembers.slice(0, 3).map((member, index) => <TeamCard key={member.name} member={member} index={index} />)}</div>
    <p className="wrap team-preview__note">Draft roster from KKGT’s corporate content checklist. Names, titles, and portraits are awaiting confirmation.</p>
  </section>;
}

export function TeamPage() {
  return <>
    <header className="wrap page-intro team-page-intro"><span className="kicker">OUR TEAM</span><h1>Meet the people<br />behind KKGT.</h1><p>A draft view of the team involved in KKGT’s wider business. Portraits and final profile details will be added when KKGT supplies them.</p></header>
    <section className="team-page-section section"><div className="wrap"><div className="team-page-section__intro"><h2 className="kicker">A HUMAN BUSINESS</h2><p>Every buyer conversation depends on clear commercial, quality, and export coordination. The names and titles below come from KKGT’s existing draft content list and are draft entries awaiting confirmation.</p></div><div className="team-grid">{teamMembers.map((member, index) => <TeamCard key={member.name} member={member} index={index} />)}</div></div></section>
    <section className="team-contact"><div className="wrap"><span className="kicker">SPEAK TO KKGT</span><h2>Start with your coffee requirement.</h2><Link className="button button--primary" to="/contact?interest=coffee">Request Coffee Inquiry <ArrowUpRight size={18} aria-hidden="true" /></Link></div></section>
  </>;
}
