# Deploy: Vercel + Neon

Step-by-step setup for a persistent production database. Vercel serverless cannot use SQLite or a local `dev.db` file — you need hosted PostgreSQL (Neon).

## Part 1 — Neon database

1. Go to [https://console.neon.tech](https://console.neon.tech) and sign in (GitHub is fine).
2. **New Project** → name it `oneatlas` → pick a region close to you → **Create**.
3. Open the project → **Dashboard** → **Connect**.
4. Copy **two** connection strings:

   | Neon label | Environment variable |
   |------------|----------------------|
   | **Pooled connection** | `DATABASE_URL` |
   | **Direct connection** | `DIRECT_URL` |

   Both should include `?sslmode=require`.  
   The direct URL must **not** use the `-pooler` hostname.

5. On your machine, create or update `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require"
```

6. Push the schema to Neon:

```bash
npm install
npm run db:push
```

7. Smoke test locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and generate one app.

---

## Part 2 — GitHub

```bash
git init
git add .
git commit -m "Track 3: OneAtlas runtime workflow"
git branch -M main
git remote add origin https://github.com/YOUR_USER/oneatlas-enterprise.git
git push -u origin main
```

Use several commits over time if submitting the engineering trial (generation → edits → previews → deploy).

---

## Part 3 — Vercel deployment

1. Go to [https://vercel.com/new](https://vercel.com/new) → **Import** your GitHub repository.
2. Framework should auto-detect **Next.js**.
3. **Environment variables** → add for Production, Preview, and Development:

   | Name | Value |
   |------|--------|
   | `DATABASE_URL` | Neon **pooled** connection string |
   | `DIRECT_URL` | Neon **direct** connection string |

4. **Deploy**.

   Build runs (via `vercel.json`):

   - `prisma generate`
   - `prisma db push` (creates/updates tables on Neon)
   - `next build`

5. After deploy, open your `https://your-app.vercel.app` URL and verify:

   - Generate app from a prompt
   - Builder conversational edits + undo
   - Preview link copies and opens frozen snapshot

6. If you change env vars later: **Deployments** → **⋯** → **Redeploy**.

---

## Local Postgres alternative (optional)

If you prefer not to use Neon while developing locally, use `docker-compose.yml`:

```bash
docker compose up -d
```

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/oneatlas?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/oneatlas?schema=public"
```

```bash
npm run db:push
npm run dev
```

For the **trial submission live URL**, still deploy to Vercel with **Neon** env vars.

---

## Troubleshooting

### Build fails: `Can't reach database server`

- Confirm `DATABASE_URL` and `DIRECT_URL` are set in Vercel.
- `DIRECT_URL` must be the **non-pooler** host.

### Build fails: `Environment variable not found: DIRECT_URL`

- Add `DIRECT_URL` in Vercel — Prisma requires it for `db push` with Neon.

### App works locally but not on Vercel

- Redeploy after changing environment variables.
- Check **Functions** / **Runtime Logs** in Vercel for Prisma errors.

### `prisma db push` warns about data loss

- Safe on a new empty Neon database.
- Review warnings if you already have production data.

---

## Optional: Neon ↔ Vercel integration

In Neon: **Integrations** → **Vercel** → connect your Vercel account. New projects can receive `DATABASE_URL` automatically.

---

## Submission checklist

- [ ] Live Vercel URL in README
- [ ] `DATABASE_URL` / `DIRECT_URL` only in Vercel (never committed in `.env`)
- [ ] End-to-end flow tested on production URL
- [ ] README + curl examples for APIs
- [ ] Optional: 5–10 min Loom walkthrough
