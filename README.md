<div align="center">
	<h1>FitnessMomentum</h1>
	<p><strong>Modern fitness tracking, workout logging, body metrics, nutrition planning & membership presentation in one unified Next.js 14 application.</strong></p>
	<sup>Built with App Router • TypeScript • Prisma • NextAuth • Tailwind</sup>
</div>

---

## Contents
1. Overview
2. Live Feature Summary
3. Tech Stack
4. Architecture & Folder Layout
5. Data Model (Summary)
6. Authentication & Authorization
7. Feature Details
8. Environment Variables
9. Local Development
10. Design System Notes
11. Performance & DX Choices
12. Roadmap
13. Contributing
14. License

---

## 1. Overview
FitnessMomentum is a modular fitness platform focusing on fast workout session capture, structured progress data, and a foundation for future coaching + nutrition intelligence. The project emphasizes clean domain modeling, server actions, low client-side complexity, and incremental feature layering.

---

## 2. Live Feature Summary
Implemented now:
- Landing / marketing page with value props & CTAs
- Auth (Credentials + optional Google OAuth)
- Protected dashboard route group
- Workout sessions: create, list, view details, add sets (exercise, reps, weight) with per-exercise set numbering
- Workout set stats (volume, unique exercises)
- Exercise model & linkage to sets
- Body metrics tracking (weight, composition fields) with table + basic derived stats
- Personal records model placeholder (future integration)
- Meals API (create + fetch today’s meals) groundwork
- Nutrition section scaffolding (macro targets card, intake card, BMR planner client component placeholder)
- Training plans / membership pricing presentation (membership tiers, personal training, special passes, FAQs)
- Coaches section (image cards with roles & contact icons)
- Profile preferences panes (account, appearance, notifications, privacy, profile)
- Theming & gradient-rich design system (Tailwind + custom utility patterns)
- Health check API endpoint
- Central Prisma client reuse + NextAuth PrismaAdapter integration
- Zod validation for signup flow

Recently added UX improvements:
- Jump links & FAQ on Training page
- Coach card image aspect ratio fix (portrait 4:5, top-aligned)
- Auth hardening (layout & middleware guards strategy – may be toggled per deployment preference)

---

## 3. Tech Stack
- Next.js 14 (App Router, Server Components, Route Handlers, Dynamic Rendering)
- TypeScript strict-ish setup
- Prisma ORM (SQLite in dev – easily switchable to Postgres)
- NextAuth (JWT session strategy) with Credentials + optional Google provider
- Tailwind CSS (with custom gradients & utility layers)
- React Hook Form + Zod (forms & validation)
- Recharts (planned usage for charts / not fully wired yet)
- Zustand (available; currently minimal usage)

Dev / Tooling:
- Docker Compose (optional DB services)
- Prisma migrations + seed script
- ESLint (Next built-in) & TypeScript for type safety

---

## 4. Architecture & Folder Layout
Key structure (abridged):
```
src/
	app/
		page.tsx                 # Landing (can be public or protected depending on middleware config)
		layout.tsx               # Root layout & Theme provider
		(dashboard)/
			dashboard/
				layout.tsx           # Dashboard shell (server guarded)
				page.tsx             # Dashboard home / workouts overview
				workouts/            # Workouts list, new session redirect, detail editing
				metrics/             # Body metrics list & entry (plus new page)
				nutrition/           # Nutrition placeholder + macro/BMR cards
				training/            # Pricing + memberships + PT plans + special passes + FAQ
				about/               # About + mission + coaches section
				profile/             # Profile prefs pages
			...
		api/
			auth/[...nextauth]/route.ts   # NextAuth route
			meals/route.ts                # Meals CRUD (basic)
			meals/today/route.ts          # Today filter
			meals/[id]/route.ts           # Single meal operations
			health/route.ts               # Health check
	components/
		navigation/                     # Sidebar, mobile nav, signout
		nutrition/                      # Macro & BMR cards
		profile/                        # Account + prefs cards
		ui/button.tsx                   # Base button primitive
	lib/
		prisma.ts                       # Prisma singleton
		auth.ts                         # NextAuth options + helper
		validators/                     # Zod schemas
	prisma/
		schema.prisma                   # Data model
		seed.js                         # (optional) seeding logic
public/
	images/                          # Static assets
```

Principles:
- Feature folders per domain under `(dashboard)`
- Shared components organized by domain or layer (navigation, nutrition, profile, ui)
- API route handlers colocated with feature domains under `app/api`

---

## 5. Data Model (Summary)
Core Prisma entities:
- User, Account, Session, VerificationToken (Auth.js schema)
- Profile (height, weight, goals, unit system)
- Exercise (name, category, muscles)
- WorkoutTemplate + WorkoutExercise (future templating)
- WorkoutSession (started/ended, notes, totalVolume placeholder)
- WorkoutSet (exercise linkage, reps, weight, RPE)
- BodyMetric (body composition tracking)
- PersonalRecord (per exercise, unit)
- Meal (basic nutrition logging foundation)

Indexes target common queries (e.g., userId + timestamps). No soft-deletes yet.

---

## 6. Authentication & Authorization
- NextAuth credential-based sign-in with bcrypt hashing
- Optional Google OAuth if env keys present
- JWT session strategy; token.sub mapped to session.user.id
- `getCurrentUser()` helper wraps `getServerSession`
- Middleware pattern (withAuth) can protect full site or only dashboard scope (see `middleware.ts` matcher)
- Server component guards (redirect pattern) used on sensitive layouts & pages for defense-in-depth

---

## 7. Feature Details
### Workouts
- Create blank session -> redirected to detail page
- Add sets (exercise, reps, weight) via server action
- Automatic incremental set numbering per exercise per session
- Derived stats: total sets, unique exercises, estimated volume

### Metrics
- Table view of body metrics (weight, body fat %, waist, etc.)
- Basic aggregates (latest, average) with styling

### Nutrition (Scaffold)
- Macro targets + daily intake placeholder
- BMR planner (client component loaded dynamically)
- Planned expansions: meal composition, macro persistence, suggestions

### Training / Pricing
- Membership tiers (Bronze, Silver, Gold, Platinum) with features
- Personal training plans (Plus → Elite) with tag badges
- Special memberships (Student & Corporate) with requirement bullet lists
- FAQ component for clarity

### Coaches
- Grid of coach cards (name, role, image, contact icons: email, Facebook, Instagram placeholder links)
- Responsive image container (4:5 aspect, top focus)

### Profile / Preferences
- Account, Appearance, Notifications, Data Privacy, Profile preferences UI scaffolds

### API
- Health check: `/api/health`
- Meals: list/create/today/filter; structure ready for macro enrichment

---

## 8. Environment Variables (examples)
```
DATABASE_URL="file:./dev.db"        # SQLite dev (switch to Postgres in prod)
NEXTAUTH_SECRET=your-generated-secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```
Generate a secure secret: `openssl rand -base64 32`.

---

## 9. Local Development
Install & run:
```bash
npm install
npx prisma migrate dev
npm run dev
```
Optional: `node prisma/seed.js` (if seed logic filled in).

Prisma Studio:
```bash
npx prisma studio
```

---

## 10. Design System Notes
- Tailwind layer: heavy use of gradient backgrounds + blur + glassmorphism
- Utility-first components; minimal wrapper library
- Reusable stat cards & gradient accent patterns

---

## 11. Performance & DX Choices
- Server Components reduce client bundle for data-heavy pages
- Limited client state (mostly server-rendered data)
- Dynamic segments forced where fresh data required (`export const dynamic = 'force-dynamic'` on workout/metric pages)
- Prisma singleton prevents hot-reload connection storms

---

## 12. Roadmap
Short term:
- Charts for metrics & volume trends
- Persist macro targets & daily nutrition logging
- Personal Records auto-detection (PR updates when higher weight/reps)
- Workout templates builder & quick start from template

Mid term:
- AI-driven workout suggestions & macro plan adjustments
- Export / import data (CSV/JSON)
- Mobile PWA enhancements (offline queue for sets)

Long term:
- Social / community feed (optional privacy controls)
- Coach portal (assign templates, review client data)
- Device integration (Apple Health / Google Fit / wearables)

---

## 13. Contributing
1. Fork & create a feature branch
2. Run lint & type checks before commit
3. Provide a concise PR description (feature, fix, or refactor)
4. Include migration notes if schema changes

Potential contribution areas:
- Chart integrations
- Improved accessibility (ARIA landmarks, focus states)
- Internationalization
- Test coverage (unit + e2e)

---

## 14. License
Currently unlicensed (all rights reserved) – add a LICENSE file if you intend external contributions.

---
Feedback & ideas welcome. Stay consistent. Track everything. Build momentum.
