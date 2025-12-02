# AI Solo Business — Cloudflare Full Build

This repository is a production-lean starter kit to run a highly automated solo business on **Cloudflare** using **Pages**, **Workers**, **Queues**, **KV**, **R2**, and **D1**.

> This package is crafted to be compatible with Cloudflare Free Tier for static hosting (Pages), with optional paid features for Queues, D1, and R2.

## What's included
- Static frontend (Tailwind via CDN) — `index.html`, `products.html`, `support.html`, `admin.html`
- Support Pages Function: `functions/api/support.js` — consults KV and creates tickets
- Worker templates: `workers/ai_orchestrator.js`, `workers/consumer.js`
- Wrangler config sample: `wrangler.toml`
- D1 schema: `d1_schema.sql`
- GitHub Actions CI for Pages deploy
- README with deployment steps and security best practices

## Quick deploy (Pages - free tier)
1. Create a new Cloudflare Pages site.
2. Connect your git repo (upload this package to GitHub first).
3. Set the build command to `""` (no build) and the build output directory to `/`.
4. Add KV namespace binding in Pages (Settings > Variables) with name `KB`.
5. Deploy.

## Optional (recommended) — Workers + R2 + Queues
1. Install Wrangler.
2. Create R2 bucket `artifacts`.
3. Create KV namespace and update `wrangler.toml` with the namespace id.
4. Create Queues (`content-jobs`, `escalations`) in Cloudflare dashboard.
5. Provision D1 and run `d1_schema.sql` to create required tables.
6. Configure secrets (OpenAI, Stripe) as environment variables in Pages/Workers.

## Security & Production Notes
- Protect admin pages using Cloudflare Access (Zero Trust).
- Never store raw PII in KV without encryption.
- Use versioned keys in KV for KB updates and schema migrations.
- Use DLQs and exponential backoff on queue consumers.
- For heavy jobs (video encoding), use external renderers — upload results to R2.

## Files to edit before deploying
- `wrangler.toml` — replace KV and account ids.
- `functions/api/support.js` — customize KB lookup logic and queue bindings.
- `workers/*.js` — wire your API keys (use secrets, not hard-coded keys).
- `d1_schema.sql` — adjust schema to your product needs.

## Support
If you'd like, I can:
- Generate a GitHub-ready repo with commit history.
- Scaffold a Stripe Checkout integration (serverless).
- Add a basic AI prompt-engineered KB and seed KV writes.
- Produce a full production runbook and SLA checks as Workers cron jobs.

