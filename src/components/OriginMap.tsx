import { Link } from 'react-router-dom';
import { origins } from '../data/site';

const markers = [
  { slug: 'guji', left: '78%', top: '56%', side: 'left' },
  { slug: 'lekempti', left: '30%', top: '43%' },
  { slug: 'jimma', left: '42%', top: '62%' },
  { slug: 'limmu', left: '47%', top: '52%' },
  { slug: 'sidama', left: '61%', top: '69%', side: 'left' },
  { slug: 'yirgacheffe', left: '66%', top: '79%', side: 'left' },
] as const;

export function OriginMap() {
  return <nav className="origin-map" aria-label="Explore coffee origins on an illustrative map of Ethiopia">
    <svg viewBox="0 0 520 520" aria-hidden="true"><path d="M111 94 190 61 258 72 302 49 355 83 414 77 451 128 435 178 463 222 430 272 439 334 385 362 348 416 292 401 239 449 193 418 139 425 108 377 67 345 82 292 55 248 82 202 70 154Z" /></svg>
    {markers.map(marker => {
      const origin = origins.find(item => item.slug === marker.slug);
      if (!origin) return null;
      return <Link
        key={origin.slug}
        className="origin-map__pin"
        data-side={'side' in marker ? marker.side : undefined}
        style={{ left: marker.left, top: marker.top }}
        to={`/coffee/${origin.slug}`}
        aria-label={`Explore ${origin.name} coffee origin`}
      ><i aria-hidden="true" /><span>{origin.name}</span></Link>;
    })}
    <small>Illustrative positions · select an origin</small>
  </nav>;
}
