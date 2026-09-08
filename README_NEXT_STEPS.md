# Next steps implemented: Auth, Cloudinary & Social placeholders

I implemented the following features on top of the scaffold:

1) NextAuth integration (Credentials provider)
   - pages/api/auth/[...nextauth].js using Prisma adapter and the local Prisma client.
   - You can sign in using the ADMIN_EMAIL + ADMIN_PASSWORD env vars, or create users in the database.
   - Please set NEXTAUTH_SECRET (or JWT_SECRET) for production.

2) Prisma schema extended for NextAuth
   - prisma/schema.prisma now includes User, Account, Session, VerificationToken models required by next-auth/prisma-adapter.
   - Run `npx prisma generate` and `npx prisma db push` after pulling.

3) Prisma client singleton
   - lib/prisma.js exports a single PrismaClient instance to avoid hot-reload issues.

4) Cloudinary upload endpoint
   - POST /api/upload { imageUrl } -> uploads to Cloudinary using CLOUDINARY_URL environment variable.
   - Used for product media uploads.

5) Social publish placeholder
   - POST /api/social/publish { content, platforms } -> returns a queued job id (placeholder). Will integrate with real APIs when you provide tokens.

6) package.json updated with next-auth and cloudinary dependencies

Environment variables you must set (do NOT put secrets into the repo)
- NEXTAUTH_SECRET or JWT_SECRET
- CLOUDINARY_URL (e.g., cloudinary://api_key:api_secret@cloud_name)
- ADMIN_EMAIL, ADMIN_PASSWORD
- STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY
- DATABASE_URL (for production use a Postgres URL)

Local commands after update
- npm install
- npx prisma generate
- DATABASE_URL="file:./dev.db" npx prisma db push
- npm run seed
- npm run dev

Next recommended tasks (I can implement next)
1) Replace Credentials provider with NextAuth providers (Email or OAuth) and add secure password storage (bcrypt) using Prisma User model.
2) Switch DB to Postgres (Supabase) and migrate seed data.
3) Implement Mobile Money (MoMo) integration with Flutterwave or local provider and webhook handlers.
4) Implement background worker (e.g., Redis + BullMQ) to process social publish jobs and delivery updates.
5) Build production admin UI for wholesaler approval, order assignment, delivery tracking, and feedback notifications.
6) Add automated tests & CI, and role-based access control on admin routes.

Tell me which of the next recommended tasks to start with and I will implement it next.