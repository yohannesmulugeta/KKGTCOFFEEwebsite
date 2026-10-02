# KKGT Coffee design and implementation record

## Current state at start

- The target `kkgt coffee website` folder contained only an empty Git repository.
- The corporate `kkgt website` repository was a React/Vite/TypeScript app with React Router, Framer Motion, the KKGT logo and palette, five coffee origins, and contact channels. It had uncommitted changes, which were not modified.
- The corporate `DATA_REQUIRED.md` lists company details, current coffee specifications, capabilities, and proof that still need confirmation for publication.
- No KKGT-owned coffee video or approved local photo library was present in the inspected source files.

## Sitemap

```text
Home
├── Our Coffee
│   └── Yirgacheffe / Sidama / Limmu / Jimma-Djimmah / Lekempti
├── Origins (index to the same five detail pages)
├── Journey / Quality
├── Our Team
├── Gallery
├── About KKGT
└── Contact / Coffee Inquiry
```

## Low-fidelity wireframe outline

1. **Home:** persistent brand/nav/inquiry → landscape hero with two actions → five-origin portfolio → coffee landscape and people → four-step buyer journey → lot-specific quality statement → FAQ → inquiry band.
2. **Coffee:** page introduction → green coffee buyer context → five origin cards → inquiry band.
3. **Origins:** index of five linked origin names → image cards → inquiry band.
4. **Origin detail:** image and origin name → concise place/story → specific buying brief CTA → next origin.
5. **Journey:** illustrative cherry image and process context → buyer steps → green coffee quality context → inquiry band.
6. **About:** modest KKGT story → checked corporate site link → inquiry band.
7. **Contact:** direct email/phone → labeled buyer form → explicit email-draft handoff.

## Motion map

- Hero: static local still, so content appears immediately and there is no video dependency.
- Section entrance: small vertical movement with content fully visible before the movement finishes.
- Origin cards: short image scale and card lift on hover/focus; touch access works through the links.
- Mobile menu: immediate overlay with focus containment and Escape/trigger focus return.
- Reduced motion: CSS removes transitions, and Framer Motion skips entrance motion.

## Files added

- `src/App.tsx`, `src/main.tsx`, `src/styles.css`, `src/data/site.ts`, `src/vite-env.d.ts`
- `public/media/kkgt-logo.svg` and three optimized illustrative WebP images
- `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `.gitignore`
- `README.md`, `CONTENT_CHECKLIST.md`, this record

## Data and deployment risks

- No database is connected or changed.
- The local `mailto:` path requires the buyer to send the draft from an email app; there is no endpoint or delivery confirmation.
- Current specifications, certifications, facility claims, exact legal details, and office address remain a publication gate.
- Local Vite direct routes work. A production host needs route fallback configuration.

## Design expansion for the local demo

- Grouped the desktop navigation under Our Coffee and Discover, and organized the mobile menu with the same sections. Kept the inquiry action prominent.
- Added a Team preview and full Team page. The initial cards use initials until KKGT supplies approved portraits; the draft roster is labeled clearly.
- Added a gallery preview and full Gallery page using the existing illustrative imagery, with space for approved photography later.
- Added an illustrative origin map, an image-led origin detail section, and a buyer fact strip without inventing lot specifications.
- Expanded the footer with a clear inquiry invitation, useful page links, and verified contact channels.
- New implementation files: `src/components/SiteHeader.tsx`, `SiteFooter.tsx`, `TeamContent.tsx`, `GalleryContent.tsx`, `OriginMap.tsx`, and `src/enhancements.css`. Updated `src/App.tsx`, `src/main.tsx`, and `src/data/site.ts`.
- The footer has no social links pending verified profile URLs. The source roster and illustrative imagery remain publication gates.

## Five-chapter visual redesign

- Replaced the static homepage opening with a scroll story that moves from Ethiopian origin through cherry, seed, green coffee, buying brief, and inquiry. Existing homepage copy and buyer links are carried into the chapters.
- Added chapter navigation, a progress rail, layered highland illustration, and vector coffee artwork. Reduced-motion users receive the same chapters as ordinary stacked sections.
- Applied one dark forest, olive, cream, and KKGT orange visual theme to navigation, portfolio, Journey, Team, Gallery, Contact, and footer. The KKGT logo and original page routes remain.
- Files added: `src/components/CoffeeScrollStory.tsx` and `src/cinematic.css`. Files updated: `src/App.tsx`, `src/main.tsx`, `README.md`, and this record.
- No database, API, or deployment configuration changed. The prior local design is preserved in the fallback ZIP outside this repository.

## Continuous story correction

- Replaced chapter-by-chapter artwork replacement with one mounted SVG. Scroll progress now opens the cherry, reveals the seed, transitions into a green bean, and adds the buyer brief and inquiry frame continuously.
- Cross-faded chapter copy and background scenes, centered the artwork, and reduced the amount of competing motion. Tightened mobile spacing for short and narrow screens.
- Removed the visible logo background using a white-on-dark CSS treatment of the existing mark. Added a clear image-led opening to Our Coffee and neutral SVG Team portrait placeholders.
- No new runtime dependencies, database changes, or deployment changes.

## Cup and layout refinement

- The last chapter now fades the green bean and buyer brief into an illustrative cup, including in the reduced-motion static chapters. The cup is a visual end point, not a claim that KKGT sells roasted coffee.
- Enlarged the mobile illustration, reduced the empty gap before the copy, and simplified small-screen labels and actions. Aligned the desktop story copy with the scroll cue and balanced the longer chapter heading.
