# Payments, Auth, and Admin

This update adds:

- Admin login (simple credentials using ADMIN_EMAIL & ADMIN_PASSWORD) — /admin/login and API /api/admin/login
- Admin products UI: /admin/products to create and list products
- Checkout API using Stripe (placeholder): POST /api/checkout { productId } -> returns session URL
- JWT cookie-based admin session (httpOnly cookie ms_token)
- .env.example with required vars

IMPORTANT
- Do NOT store real card numbers or secrets in the repo or chat. Use Stripe API keys and set them in Vercel/Netlify env variables.
- The admin auth here is a simple credentials check for demo only. For production, replace with a proper auth provider (NextAuth, OAuth, or Prisma with hashed passwords).

Next steps you can ask me to implement now:
- NextAuth integration with Prisma adapter (full auth, secure passwords)
- Wholesaler registration & approvals with email verification
- MoMo / Mobile Money integration via a provider (Flutterwave, Africa's Talking)
- Media uploads (Cloudinary or Supabase Storage)
- One-click multi-platform social publish integration (Buffer, Meta, X/Twitter)
