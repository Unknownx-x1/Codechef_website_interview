# CodeChef VIT Chennai

A production-quality frontend for the CodeChef VIT Chennai technical club recruitment assignment. The interface is designed as a dense technical editorial system: sharp borders, monospace metadata, terminal panels, asymmetric layouts, and restrained motion.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For production:

```bash
npm run build
npm run start
```

## Folder Structure

```text
src/
  app/                 Next.js App Router pages and route layouts
  components/          Hand-built reusable UI components
  data/                Mock event and club content
  hooks/               Countdown and typewriter hooks
  lib/                 API client and formatting helpers
  types/               Shared TypeScript interfaces
```

## Design Decisions

- The visual direction follows "hacker magazine meets modern editorial" instead of a generic SaaS landing page.
- The hero uses an asymmetric 60/40 layout with independent word animation and a live terminal event panel.
- Events avoid standard card grids. The listing page uses a newspaper-style editorial grid with a full-width lead event and uneven secondary event spans.
- Club identity avoids photography and generated illustrations. It uses ASCII-style branding, initial avatars, monospace facts, and document-like section labels.
- Motion is intentionally sparse: hero stagger, page entry, marquee ticker, hover lifts, countdowns, and typewriter text.

## Theme System

Dark mode is the default:

- Background: `#0A0A0A`
- Surface: `#111111`
- Border: `#222222`
- Accent: `#E8FF47`
- Text: `#F0F0F0`
- Muted: `#888888`

Light mode switches to a paper-like editorial palette:

- Background: `#F5F5F0`
- Text: `#0A0A0A`
- Accent: `#1A1A1A`

The active theme is stored in `localStorage` under `cc-vitc-theme`, applied to `document.documentElement.dataset.theme`, and animated through CSS transitions.

## API Architecture

The API boundary lives in `src/lib/api.ts` and exposes:

- `getEvents()` for `GET /events`
- `getEventById(id)` for `GET /events/:id`
- `createRegistration(payload)` for `POST /registrations`

By default the app uses local mock data and a short mock delay. To connect a FastAPI backend later, set:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Then implement compatible endpoints in FastAPI:

- `GET /events` returns an array of `ClubEvent`
- `GET /events/{id}` returns one `ClubEvent`
- `POST /registrations` accepts `RegistrationPayload` and returns `{ id, status: "confirmed" }`

## Form Validation

The registration form uses React Hook Form with a Zod schema. It includes floating labels, terminal styling, error messages, loading state, and a confirmation state.

## Accessibility

- Semantic page sections and headings
- Keyboard-accessible navigation and filters
- ARIA labels for menu, theme toggle, countdowns, and terminal panels
- Strong focus outlines
- High-contrast dark palette with a readable light mode
- Responsive layouts with no intentional horizontal overflow
