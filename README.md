# FitnessMomentum

Modern fitness logging & progress dashboard built with Next.js 14 (App Router), TypeScript, Prisma, NextAuth, and Tailwind.

## Vision

Phased fitness platform to log workouts, track body progress, and (later) provide AI-assisted coaching.

### Core Goals
1. Attract: Clear marketing landing, fast load, value props
2. Convert: Low-friction sign up (email + Google)
3. Retain: Personal dashboard, streaks, progress graphs
4. Scale: Modular feature folders, clean domain models, typed APIs

### Phase 1 (MVP)
- Auth (email/password + OAuth Google)
- User profile (height, weight, goals)
- Workout library (exercises grouped by category)
- Create / log workout sessions (sets, reps, weight, RPE optional)
- Dashboard (today plan + recent activity)
- Progress tracking (body weight, measurements, PRs)
- Responsive UI (dark / light)

### Phase 2 (Planned)
- Nutrition tracking (meals, macros)
- AI recommendations
- Social (feed / likes)
- Coach mode & templated plans
- Wearable / device integrations

## Tech Stack
- Next.js 14 (App Router, Server Components)
- TypeScript
- Prisma + PostgreSQL
- NextAuth (Auth.js) for sessions & OAuth
- Tailwind CSS + (optionally shadcn/ui)
- Zustand (light client state where needed)
- Zod + React Hook Form for validation
- Recharts (progress graphs)
- Deployment: Vercel
- Emails: Resend (planned)
- Analytics: PostHog / Vercel (planned)

## Directory Structure (initial)
```
prisma/
	schema.prisma
src/
	app/
		api/auth/[...nextauth]/route.ts
		api/health/route.ts
		(marketing)/page.tsx            # Landing
		(dashboard)/dashboard/page.tsx  # Auth protected
		layout.tsx
		page.tsx                        # Alias to landing
	lib/
		auth.ts
		prisma.ts
		utils.ts
	components/
		ui/button.tsx
		navigation/sidebar.tsx
		navigation/mobile-nav.tsx
	middleware.ts (root exported)
```

## Prisma Data Model (excerpt)
See `prisma/schema.prisma` – core models: User, Profile, Exercise, WorkoutTemplate, WorkoutExercise, Session, SessionSet, BodyMetric, PersonalRecord.

## Getting Started
1. Install deps:
	 ```bash
	 pnpm install # or yarn / npm
	 ```
2. Copy env file:
	 ```bash
	 cp .env.example .env
	 ```
3. Start Postgres locally (docker):
	```bash
	docker compose up -d
	```
4. Set a PostgreSQL DATABASE_URL in `.env` (matches compose):
	```
	DATABASE_URL=postgresql://fm:fm@localhost:5432/fitnessmomentum?schema=public
	```
5. Generate + run migrations:
	 ```bash
	 npx prisma migrate dev --name init
	 ```
6. (Optional) Seed base exercises:
	```bash
	npm run seed
	```
7. Start dev server:
	 ```bash
	 pnpm dev
	 ```

## Environment Variables
See `.env.example`.

## Auth Protection
Middleware redirects unauthenticated users away from `(dashboard)` segment.

## Next Steps
- Flesh out dashboard tiles (streak, total volume, recent PRs)
- Implement workout builder & logging UI
- Add body metrics entry form + charts
- Integrate chart library (Recharts / Tremor)
- Add unit tests (Vitest) & e2e (Playwright) in Phase 2

---
Contributions & feedback welcome.
