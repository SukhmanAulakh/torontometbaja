# Toronto Met Baja Racing — Official Website

🌐 **Live:** [torontometbaja.web.app](https://torontometbaja.web.app)

## About TMU Baja

Founded in 1983, **Toronto Met Baja Racing (TMBR)** is the oldest student design team at Toronto Metropolitan University. Each year, a crew of 75+ undergraduate members — spanning engineering, business, and design — designs, fabricates, and races a single-seat off-road vehicle in the international **SAE Baja** competition series.

SAE Baja events bring together 100+ universities worldwide to compete in static judging (cost, design, sales presentation) and dynamic events (acceleration, maneuverability, suspension & traction, and a grueling 4-hour endurance race).

## Architecture

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, static export) |
| UI Components | [HeroUI v2](https://heroui.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + [Tailwind Variants](https://tailwind-variants.org) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) (light/dark) |
| Gallery | Google Drive API (client-side) |
| Hosting | [Firebase Hosting](https://firebase.google.com/products/hosting) |
| CI/CD | GitHub Actions → Firebase deploy on push to `main` |

### Project Structure

```
app/
├── page.jsx              # Home
├── about/page.jsx        # About Us — mission, vision, SAE challenge, history
├── gallery/page.jsx      # Photo/video gallery (Google Drive integration)
├── join/page.jsx         # Join the team — subteam cards with responsibilities
├── sponsors/page.jsx     # Sponsorship tiers and current sponsors
├── team/page.jsx         # Leadership team roster
├── layout.tsx            # Root layout, providers, navbar, footer
└── providers.tsx         # HeroUI + theme provider
components/               # Shared UI (navbar, icons, primitives, theme switch)
config/data.ts            # All structured content (team, sponsors, subteams, etc.)
lib/google-drive.js       # Client-side Google Drive API utilities
resources/                # Images, headshots, sponsor logos, subteam photos
```

### Deployment Pipeline

```
Push to main → GitHub Actions → npm ci → npm run build → Firebase Hosting (live)
```

The site is statically exported (`output: 'export'` in `next.config.js`) and deployed to Firebase Hosting. SPA routing is handled via a Firebase rewrite rule (`** → /index.html`).

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build (outputs to out/)
npm run build
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```
NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY=your_key
NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID=your_folder_id
```

## License

Licensed under the [MIT license](./LICENSE).
