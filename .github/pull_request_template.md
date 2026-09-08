# 🚀 Production Migration: Vercel + PostgreSQL + MoMo Integration

## Overview
This PR addresses all three key requirements from the repository review:
1. ✅ **Database Migration**: SQLite → PostgreSQL (Supabase)
2. ✅ **Payment Integration**: Flutterwave MoMo alongside Stripe
3. ✅ **Auth Consolidation**: Single NextAuth flow

## What Changed

### 📊 Database (Prisma)
- **Provider**: SQLite → PostgreSQL
- **New Fields**: 
  - `Product.updatedAt` (tracking)
  - `Wholesaler.createdAt` (tracking)
  - `Order.paymentMethod` (payment type)
  - `Order.paymentId` (external reference)
  - `Order.updatedAt` (tracking)

**Migration Command**:
```bash
DATABASE_URL="your_postgres_url" npx prisma db push
```

### 💳 Payment Processing
**New Endpoints**:
- `POST /api/checkout` - supports `paymentMethod` parameter (stripe|momo)
- `GET/POST /api/payments/momo` - Flutterwave MoMo integration + webhooks
- `GET /api/payments/status` - Verify payment status with Flutterwave

**Stripe** (unchanged): Card payments via Stripe Checkout
**MoMo** (new): USSD/Mobile Money via Flutterwave with webhook verification

### 🔐 Authentication
- **Old Flow**: `/api/admin/login` (custom JWT) + `/api/admin/me`
- **New Flow**: Single NextAuth provider with JWT strategy
- **Credentials**: Email/password via env vars or database
- **Features**:
  - Session protection on admin routes
  - Automatic redirect to login
  - Better error handling in UI

**Updated Files**:
- `pages/api/auth/[...nextauth].js` - Main auth provider
- `pages/admin/login.js` - Improved login form with NextAuth integration
- `pages/admin/products.js` - Session-protected admin dashboard
- `pages/api/admin/me.js` - Simplified session endpoint
- `lib/auth.js` - Helper functions using NextAuth

### 🌐 Vercel Deployment
**New Files**:
- `vercel.json` - Build & deployment config
- `README_DEPLOYMENT.md` - Step-by-step production deployment guide
- `.env.example` - All required environment variables documented

## Environment Variables Required

### Core
```
NEXTAUTH_URL=https://mediasky-1vercel.app
NEXTAUTH_SECRET=<openssl rand -base64 32>
JWT_SECRET=<openssl rand -base64 32>
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SITE_URL=https://mediasky-1vercel.app
```

### Payments
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
FLUTTERWAVE_SECRET_KEY=flw_live_...
FLUTTERWAVE_PUBLIC_KEY=pk_live_...
FLUTTERWAVE_WEBHOOK_SECRET=<random>
```

### Admin
```
ADMIN_EMAIL=admin@mediasky.com
ADMIN_PASSWORD=<secure password>
```

## Testing Checklist

- [ ] Run `npm install`
- [ ] Run `npx prisma generate`
- [ ] Run `DATABASE_URL="..." npx prisma db push`
- [ ] Run `npm run seed`
- [ ] Start dev server: `npm run dev`
- [ ] Test admin login: `/admin/login` (use env creds)
- [ ] Test product creation: `/admin/products`
- [ ] Test homepage product listing: `/`
- [ ] Test Stripe checkout: Click "View" on product
- [ ] Test MoMo checkout: (requires Flutterwave test keys)

## Deployment Steps

1. **Create Supabase database** (free tier)
2. **Push to Vercel**: Connect `vercel-migration` branch
3. **Set env variables** in Vercel dashboard
4. **Configure webhooks**:
   - Stripe: `https://mediasky-1vercel.app/api/webhooks/stripe`
   - Flutterwave: `https://mediasky-1vercel.app/api/payments/momo`
5. **Seed database**: `DATABASE_URL="..." npm run seed`
6. **Custom domain**: `mediasky-1vercel.app`

See `README_DEPLOYMENT.md` for complete guide.

## Breaking Changes

⚠️ **Old auth endpoints deprecated**:
- `POST /api/admin/login` - Use NextAuth at `/api/auth/signin` instead
- Cookie-based JWT (`ms_token`) - Switch to NextAuth session

## Notes

- Admin credentials from env vars are for demo only—implement bcryptjs password hashing in production
- All secrets (API keys) stored in Vercel env, never in repo
- Database backups recommended in Supabase settings
- Error tracking (Sentry) recommended for production monitoring

## Related Issues

Addresses all three questions from repo overview:
1. How to integrate MoMo via Flutterwave → ✅ Implemented with webhook support
2. Auth flow consolidation → ✅ Single NextAuth provider
3. SQLite to Postgres migration → ✅ PostgreSQL schema ready

---

**Ready to merge after testing on local environment.**
