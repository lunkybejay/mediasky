# MediaSky Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: https://vercel.com
2. **PostgreSQL Database** (Supabase, Heroku, or AWS RDS)
3. **Stripe Account** (payment processing)
4. **Flutterwave Account** (MoMo payments)
5. **Cloudinary Account** (media uploads)

## Step 1: Prepare Database (Supabase)

1. Create a free Postgres database on [Supabase](https://supabase.com)
2. Copy the connection string: `postgresql://user:password@host:5432/database`
3. Run migrations:
   ```bash
   DATABASE_URL="your_connection_string" npx prisma db push
   ```

## Step 2: Deploy to Vercel

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin vercel-migration
   ```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New" → "Project"
4. Select your GitHub repository `mediasky`
5. Configure environment variables:

### Required Environment Variables

```
NEXTAUTH_URL=https://mediasky-1vercel.app
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
JWT_SECRET=<generate with: openssl rand -base64 32>
DATABASE_URL=postgresql://...

STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx

FLUTTERWAVE_SECRET_KEY=flw_live_xxx
FLUTTERWAVE_PUBLIC_KEY=pk_live_xxx
FLUTTERWAVE_WEBHOOK_SECRET=<random secret>

CLOUDINARY_URL=cloudinary://...
ADMIN_EMAIL=admin@mediasky.com
ADMIN_PASSWORD=<strong password>
NEXT_PUBLIC_SITE_URL=https://mediasky-1vercel.app
```

6. Click "Deploy"

## Step 3: Set Custom Domain

1. After deployment, go to project settings
2. Navigate to **Domains**
3. Add domain: `mediasky-1vercel.app`
4. Vercel will provide DNS records to add

## Step 4: Post-Deployment Setup

### Stripe Webhooks

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Webhooks**
3. Add endpoint: `https://mediasky-1vercel.app/api/webhooks/stripe`
4. Subscribe to: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy signing secret to Vercel env: `STRIPE_WEBHOOK_SECRET`

### Flutterwave Webhooks

1. Go to [Flutterwave Dashboard](https://dashboard.flutterwave.com)
2. Navigate to **Webhooks**
3. Add URL: `https://mediasky-1vercel.app/api/payments/momo`
4. Verify webhook secret is set in env vars

### Seed Database

1. Connect via Supabase client or CLI
2. Run seed script:
   ```bash
   DATABASE_URL="your_connection_string" npm run seed
   ```

## Step 5: Verify Deployment

1. Visit https://mediasky-1vercel.app
2. Test admin login: `/admin/login`
3. Create a test product
4. Verify both payment options (Stripe & MoMo)

## Troubleshooting

### Build Fails
- Check logs: Vercel dashboard → Deployments → Build Logs
- Ensure all env variables are set
- Verify Prisma schema is valid

### Database Connection Issues
- Test connection locally: `DATABASE_URL="..." npx prisma studio`
- Verify IP whitelist in database provider

### Payment Integration Issues
- Check API keys are correct (live keys, not test)
- Verify webhook URLs are accessible
- Check payment provider logs

## Next Steps

1. **SSL/HTTPS**: Vercel provides automatic SSL
2. **CDN**: Vercel includes built-in CDN for images
3. **Analytics**: Set up Vercel Analytics in project settings
4. **Monitoring**: Configure error tracking (Sentry recommended)
5. **Database Backups**: Enable auto-backups in Supabase
