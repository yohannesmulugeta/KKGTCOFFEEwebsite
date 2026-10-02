import { ClipboardList, FileCheck2, MapPin, Ship } from 'lucide-react';
import { journey } from '../data/site';

const icons = [MapPin, ClipboardList, FileCheck2, Ship] as const;

export function JourneySteps({ large = false }: { large?: boolean }) {
  return <div className={`journey-steps${large ? ' journey-steps--large' : ''}`} aria-label="Four steps from origin to shipment">
    {journey.map((step, index) => {
      const Icon = icons[index];
      return <div key={step.number} className="journey-step-shell">
        <article className="journey-step">
          <div className="journey-step__top"><span>{step.number} / 04</span><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></div>
          <h3>{step.title}</h3>
          <p>{step.detail}</p>
        </article>
      </div>;
    })}
  </div>;
}
