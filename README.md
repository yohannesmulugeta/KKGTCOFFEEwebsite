# KKGT Coffee — public demo

A dedicated React/Vite/TypeScript coffee experience for KKGT Import Export. This repository is separate from the corporate `kkgt website` repository.

Live demo: https://yohannesmulugeta.github.io/KKGTCOFFEEwebsite/

The current local design uses a five-chapter scroll story on the homepage and a matching dark forest, olive, cream, and KKGT orange visual theme across the other pages. The artwork moves from coffee cherry through green bean to an illustrative cup. The original copy, origin pages, Team and Gallery sections, and email-draft inquiry path remain. Visitors who request reduced motion see the chapters as regular stacked sections.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev -- --port 5174 --strictPort
```

Open the URL printed by Vite. Build verification:

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run build:pages
```

## Routes

- `/` — home
- `/coffee` — buyer-focused coffee portfolio
- `/origins` — origin index
- `/coffee/:slug` — one page for each of the five named origins
- `/journey` — quality and buyer journey
- `/team` — draft team roster with portrait slots
- `/gallery` — illustrative image gallery ready for KKGT photography
- `/about` — KKGT context
- `/contact` — inquiry draft and direct channels

## Content and media

The KKGT logo, brand colors, company channels, and five origins were taken from the existing corporate repository. The corporate site URL was checked and returned HTTP 200 on 2026-10-02. The three WebP images were generated for this demo and are **illustrative**, not photos of KKGT farms, employees, facilities, or actual lots.

The Team page uses six draft names and titles from the corporate repository's `DATA_REQUIRED.md`. It shows neutral SVG silhouettes in place of portraits. Confirm every name and role and provide approved portraits before treating the demo as verified company information. The origin map is illustrative and its markers are approximate.

The form creates a `mailto:` draft in the visitor's email app. It does not submit, store, or deliver anything on its own. A production form needs a real endpoint, spam protection, and a delivery test. See [CONTENT_CHECKLIST.md](CONTENT_CHECKLIST.md) for remaining verification work.

Local development uses browser history routes. The GitHub Pages build uses hash routes such as `/#/coffee` and `/#/contact`, so direct links work on static hosting. GitHub Actions builds and deploys the Pages version on each push to `main`.

## Initial review captures

- `output/screenshots/home-desktop.png` — full desktop homepage at 1440 px
- `output/screenshots/home-mobile.png` — full mobile homepage at 390 px
- `output/clips/origin-card-hover.webm` — short desktop card interaction
- `output/clips/mobile-menu.webm` — short mobile menu and route interaction

These captures show the first local design before the navigation, Team, Gallery, footer, and scroll-story expansion. They are not current screenshots or deployment evidence.
