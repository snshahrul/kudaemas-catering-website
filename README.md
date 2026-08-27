# KudaEmas Catering Website

The golden standard of Nusantara catering — a premium Indonesian catering house website for weddings, corporate summits, and private celebrations.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Database:** PostgreSQL via Drizzle ORM
- **Runtime:** React 19

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL running locally

### Installation

```bash
npm install
```

### Environment Setup

Copy the example env file and adjust if needed:

```bash
cp .env.local.example .env.local
```

The default `DATABASE_URL` points to a local PostgreSQL instance:

```
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/app_db"
```

### Database Setup

Create the database tables and seed sample data:

```bash
npx drizzle-kit push
npm run seed
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type check |
| `npm run seed` | Seed database with sample menu items and testimonials |

## Project Structure

```
src/
  app/
    api/
      bookings/route.ts    # POST create booking, GET booking count
      health/route.ts      # Database health check
      menu/route.ts        # GET menu items
      testimonials/route.ts # GET testimonials
    globals.css            # Global styles & Tailwind theme
    layout.tsx             # Root layout with fonts
    page.tsx               # Home page (server component)
  components/
    about.tsx              # About section with stats
    booking-form.tsx       # Event inquiry form with validation
    footer.tsx             # Site footer
    gallery.tsx            # Photo gallery grid
    hero.tsx               # Hero section with parallax
    logo.tsx               # Brand logo & horse mark
    menu-section.tsx       # Menu items with category filter
    navbar.tsx             # Fixed navigation with mobile drawer
    reveal.tsx             # Scroll-reveal animation wrappers
    services.tsx           # Services cards
    testimonials.tsx       # Client stories carousel
  db/
    index.ts               # Drizzle + pg pool singleton
    schema.ts              # Database schema (bookings, menu_items, testimonials)
scripts/
  seed.mjs                 # Database seed script
```

## Database Schema

Three tables managed by Drizzle ORM:

- **bookings** — Event inquiry submissions (name, email, phone, event type, date, guests, package, message, status)
- **menu_items** — Catering menu catalogue (name, description, category, price, image, featured, sort order)
- **testimonials** — Client reviews (name, role, quote, rating)

## License

Private project. All rights reserved.
