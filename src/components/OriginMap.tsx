const markers = [
  { name: 'Lekempti', left: '30%', top: '43%' },
  { name: 'Jimma', left: '42%', top: '62%' },
  { name: 'Limmu', left: '47%', top: '52%' },
  { name: 'Sidama', left: '61%', top: '69%' },
  { name: 'Yirgacheffe', left: '66%', top: '79%' },
] as const;

export function OriginMap() {
  return <div className="origin-map" role="img" aria-label="Illustrative outline of Ethiopia with approximate positions for KKGT’s five named coffee origins">
    <svg viewBox="0 0 520 520" aria-hidden="true"><path d="M111 94 190 61 258 72 302 49 355 83 414 77 451 128 435 178 463 222 430 272 439 334 385 362 348 416 292 401 239 449 193 418 139 425 108 377 67 345 82 292 55 248 82 202 70 154Z" /></svg>
    {markers.map(marker => <span key={marker.name} className="origin-map__pin" style={{ left: marker.left, top: marker.top }}><i />{marker.name}</span>)}
    <small>Approximate orientation · not lot coordinates</small>
  </div>;
}
