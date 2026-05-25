
# OneAtlas Enterprise Runtime Builder

Track 3 (Full Stack) implementation per `ONEATLAS_TRIAL_TASK.pdf` — end-to-end prompt → schema → builder → conversational edits → frozen previews.

## Design system (PDF)

- **Colors:** `#635BFF`, `#7A73FF`, `#0A2540`, `#1A1F36`, `#FF5996`, `#FFB17A`, `#00D4B1`, `#00D4FF`, `#F8BC42`
- **Typography:** Inter + system-ui
- **UI:** Light operational theme, glass navbar, modular cards, subtle hovers (not dark/generic SaaS clone)

## Track 3 workflow

1. User enters a prompt on the landing page
2. Keyword matcher picks a template (confidence threshold + matched keywords)
3. Schema is stored in the database
4. Builder renders a live canvas + human-readable schema preview
5. Conversational edits apply incremental mutations (5+ patterns, suggestions on failure)
6. Undo reverts schema in the database
7. Preview creates a frozen snapshot with shareable URL + clipboard feedback

## Supported templates

CRM Workspace · Analytics Dashboard · HR Dashboard · Admin Panel · Inventory System

## Stack

- Next.js 15 · TypeScript · TailwindCSS · Zustand · Prisma · **PostgreSQL (Neon)**

## Local setup

**Option A — Neon (recommended, same as production)**

```bash
cp .env.example .env
# Add Neon DATABASE_URL (pooled) + DIRECT_URL from console.neon.tech
npm install
npm run db:push
npm run dev
```

**Option B — Docker Postgres (`docker-compose.yml`)**

Runs a local PostgreSQL 16 container so you do not need Neon while developing:

```bash
docker compose up -d
```

Then set `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/oneatlas?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/oneatlas?schema=public"
```

```bash
npm run db:push
npm run dev
```

Stop the database with `docker compose down`. Data persists in the `oneatlas_pg_data` volume until you remove it.

## Deploy (Vercel + Neon)

See **[DEPLOY.md](./DEPLOY.md)** for the full walkthrough (Neon project → env vars → Vercel import → redeploy).

## API (curl examples)

```bash
# Generate
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Build a CRM dashboard with sales analytics"}'

# Edit schema
curl -X POST http://localhost:3000/api/apps/APP_ID/edit \
  -H "Content-Type: application/json" \
  -d '{"instruction":"Add a priority field to tasks"}'

# History
curl http://localhost:3000/api/apps/APP_ID/history

# Undo
curl -X POST http://localhost:3000/api/apps/APP_ID/undo

# Create preview
curl -X POST http://localhost:3000/api/apps/APP_ID/preview

# Read frozen preview
curl http://localhost:3000/api/preview/TOKEN
```

## Mutation examples (try in builder)

- `Add a priority field to tasks`
- `Rename contact to client`
- `Remove the notes column`
- `Add revenue chart`
- `Move analytics to the top`

## Architecture

```
/app          → pages (landing, builder, preview)
/app/api      → generate, apps/:id/edit|undo|history|preview
/services     → templateMatcher, mutationEngine
/types/app.ts → shared frontend/backend contract
/components   → SchemaRenderer (builder + preview), marketing UI
```
# ONEATLAS-TASK
