# shoppingsnx (mediasky)

This repository contains a demo scaffold for the shoppingsnx marketplace integrated into MEDIA sky. It is a Next.js + Prisma (SQLite) starter meant for local development and later deployment to Vercel + Postgres.

Quick start (local)

1. Install dependencies
   npm install

2. Generate Prisma client and push schema
   npx prisma generate
   DATABASE_URL="file:./dev.db" npx prisma db push

3. Seed sample data
   npm run seed

4. Start dev server
   npm run dev

Environment
- DATABASE_URL - defaults to SQLite file: file:./dev.db
- NEXT_PUBLIC_SITE_URL - set to http://localhost:3000 for local dev, or to your Vercel URL when deployed

Payments & Production
- Configure Stripe (STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY) and your Mobile Money provider keys as environment variables on Vercel; never store card numbers in the repo.

Notes
- This is a scaffold: admin auth, production readiness (caching, rate-limits, image CDN), and payment flows are intentionally placeholders. I can continue to implement those next (auth, Stripe checkout, MoMo integration, one-click cross-posting to socials) if you want.
