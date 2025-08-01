# Focusly Vercel Deployment Checklist

## Pre-Deployment Setup

### 1. Database Setup ✅
- [ ] PostgreSQL database created (Neon/Supabase/PlanetScale)
- [ ] `DATABASE_URL` obtained
- [ ] `DIRECT_URL` configured (for connection pooling)
- [ ] Database allows external connections

### 2. OAuth Applications Setup ✅
- [ ] **Google OAuth App**
  - [ ] Created in Google Cloud Console
  - [ ] Google+ API enabled
  - [ ] Authorized origins: `https://your-domain.vercel.app`
  - [ ] Redirect URI: `https://your-domain.vercel.app/api/auth/callback/google`
- [ ] **GitHub OAuth App**
  - [ ] Created in GitHub Developer Settings
  - [ ] Redirect URI: `https://your-domain.vercel.app/api/auth/callback/github`
- [ ] **Apple OAuth App** (optional)
  - [ ] Created in Apple Developer Console
  - [ ] Redirect URI configured

### 3. Third-Party Services ✅
- [ ] **UploadThing Account**
  - [ ] App created
  - [ ] `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID` obtained
- [ ] **Supabase Account** (if using)
  - [ ] Project created
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` obtained

## Vercel Configuration

### 1. Environment Variables ✅
Set these in Vercel Dashboard > Project Settings > Environment Variables:

```bash
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# NextAuth
NEXTAUTH_SECRET=your-32-character-secret
NEXTAUTH_URL=https://your-app.vercel.app

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
APPLE_CLIENT_ID=your-apple-client-id (optional)
APPLE_CLIENT_SECRET=your-apple-client-secret (optional)

# UploadThing
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. Build Settings ✅
- [ ] Build Command: `npm run build` (automatically includes Prisma generation)
- [ ] Output Directory: `.next`
- [ ] Install Command: `npm install`
- [ ] Node.js Version: 18.x or higher

## Code Changes Made ✅

### 1. Package.json Scripts
- [x] Added `prisma generate` to build script
- [x] Added `postinstall` script for Prisma generation
- [x] Added database management scripts

### 2. Database Configuration
- [x] Fixed Prisma client initialization for production
- [x] Proper connection handling for serverless environment

### 3. Authentication
- [x] Updated NextAuth redirect handling for Vercel deployments
- [x] Added support for `NEXTAUTH_URL` environment variable

### 4. API Base URL Configuration ⚠️ CRITICAL
- [x] Fixed hardcoded localhost URLs in `lib/api.ts`
- [x] Added deployment-safe domain resolution
- [x] Uses `NEXTAUTH_URL` environment variable in production

### 5. Middleware
- [x] Optimized middleware matcher for better performance
- [x] Excluded static assets and API routes properly

### 6. Deployment Files
- [x] Created `vercel.json` configuration
- [x] Created `.vercelignore` file
- [x] Created `.env.example` template
- [x] Created deployment utility functions

## Deployment Steps

### 1. Deploy to Vercel
```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel login
vercel --prod

# Option 2: GitHub Integration
# Push to GitHub and connect repository in Vercel dashboard
```

### 2. Database Migration
After successful deployment:
```bash
# Run database migrations
npx prisma db push
# or
npm run db:push
```

### 3. Update OAuth Redirect URIs
- [ ] Update Google OAuth app with production URL
- [ ] Update GitHub OAuth app with production URL
- [ ] Update Apple OAuth app with production URL (if using)

## Post-Deployment Testing

### 1. Authentication Flow ✅
- [ ] Sign up with email/password
- [ ] Sign in with Google
- [ ] Sign in with GitHub
- [ ] Sign in with Apple (if configured)
- [ ] Password reset functionality

### 2. Core Features ✅
- [ ] Create workspace
- [ ] Invite users to workspace
- [ ] Create and edit tasks
- [ ] Create and edit mind maps
- [ ] File upload functionality
- [ ] Chat functionality
- [ ] Calendar view
- [ ] Pomodoro timer

### 3. Performance ✅
- [ ] Page load times acceptable
- [ ] Database queries performing well
- [ ] File uploads working
- [ ] Real-time features functioning

## Troubleshooting Common Issues

### Build Failures
- Check TypeScript errors in build logs
- Verify all environment variables are set
- Ensure Prisma schema is valid

### Database Connection Issues
- Verify `DATABASE_URL` format
- Check database firewall settings
- Ensure SSL is properly configured

### Authentication Issues
- Verify OAuth redirect URIs match exactly
- Check `NEXTAUTH_SECRET` is set
- Ensure `NEXTAUTH_URL` matches deployment URL

### File Upload Issues
- Verify UploadThing credentials
- Check file size limits in configuration
- Ensure proper CORS settings

## Performance Optimization

### 1. Database
- [ ] Enable connection pooling
- [ ] Add database indexes for frequently queried fields
- [ ] Monitor query performance

### 2. Caching
- [ ] Implement proper cache headers
- [ ] Use React Query for client-side caching
- [ ] Consider Redis for session storage

### 3. Images
- [ ] Optimize image sizes
- [ ] Use Next.js Image component
- [ ] Configure image domains in next.config.js

## Security Checklist

- [ ] Strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] OAuth apps restricted to production domains
- [ ] Database credentials secured
- [ ] Environment variables not exposed to client
- [ ] HTTPS enforced
- [ ] File upload restrictions in place
- [ ] Rate limiting implemented (consider)

## Monitoring Setup

Consider implementing:
- [ ] Vercel Analytics
- [ ] Error tracking (Sentry)
- [ ] Database monitoring
- [ ] Performance monitoring
- [ ] Uptime monitoring

## Final Verification

- [ ] All environment variables set correctly
- [ ] Database migrations completed
- [ ] OAuth apps updated with production URLs
- [ ] All core features tested
- [ ] Performance acceptable
- [ ] Error monitoring in place

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)