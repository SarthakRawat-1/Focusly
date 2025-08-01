# Focusly - Vercel Deployment Guide

## Prerequisites

Before deploying to Vercel, ensure you have:

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Database**: PostgreSQL database (recommended: Neon, Supabase, or PlanetScale)
3. **OAuth Apps**: Set up Google, GitHub, and/or Apple OAuth applications
4. **UploadThing Account**: For file uploads
5. **Supabase Account**: If using Supabase features

## Environment Variables

Set these environment variables in your Vercel project settings:

### Required Variables

```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."  # For connection pooling

# NextAuth
NEXTAUTH_SECRET="generate-a-random-32-character-string"
NEXTAUTH_URL="https://your-app.vercel.app"

# OAuth Providers (at least one required)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
APPLE_CLIENT_ID="your-apple-client-id"
APPLE_CLIENT_SECRET="your-apple-client-secret"

# UploadThing (for file uploads)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

## Deployment Steps

### 1. Database Setup

**Option A: Neon (Recommended)**
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Use it for both `DATABASE_URL` and `DIRECT_URL`

**Option B: Supabase**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get the connection string from Settings > Database
4. Also get the public URL and anon key for Supabase features

### 2. OAuth Setup

**Google OAuth:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Add `https://your-app.vercel.app/api/auth/callback/google` to redirect URIs

**GitHub OAuth:**
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to `https://your-app.vercel.app/api/auth/callback/github`

### 3. UploadThing Setup

1. Go to [uploadthing.com](https://uploadthing.com)
2. Create an account and new app
3. Get your App ID and Secret from the dashboard

### 4. Deploy to Vercel

**Method 1: Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

**Method 2: GitHub Integration**
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### 5. Post-Deployment

1. **Run Database Migrations:**
   ```bash
   npx prisma db push
   ```
   Or use Vercel's build command to include this

2. **Update OAuth Redirect URIs:**
   - Update all OAuth apps with your new Vercel URL
   - Replace `localhost:3000` with `your-app.vercel.app`

3. **Test the Application:**
   - Sign up/login functionality
   - File upload features
   - Database operations

## Troubleshooting

### Common Issues

1. **Database Connection Errors:**
   - Ensure `DATABASE_URL` is correct
   - Check if database allows external connections
   - Verify SSL settings

2. **OAuth Errors:**
   - Check redirect URIs match exactly
   - Ensure `NEXTAUTH_URL` is set correctly
   - Verify OAuth app is approved/published

3. **Build Errors:**
   - Check TypeScript errors
   - Ensure all dependencies are in `package.json`
   - Verify environment variables are set

4. **File Upload Issues:**
   - Verify UploadThing credentials
   - Check file size limits
   - Ensure proper CORS settings

### Performance Optimization

1. **Database Optimization:**
   - Use connection pooling with `DIRECT_URL`
   - Consider database indexes for better performance
   - Monitor query performance

2. **Image Optimization:**
   - Ensure Next.js Image component is used
   - Configure image domains in `next.config.js`

3. **Caching:**
   - Implement proper cache headers
   - Use React Query for client-side caching

## Security Checklist

- [ ] Strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] OAuth apps configured with correct domains
- [ ] Database credentials secured
- [ ] Environment variables not exposed to client
- [ ] HTTPS enforced in production
- [ ] File upload restrictions in place

## Monitoring

Consider setting up:
- Vercel Analytics
- Error tracking (Sentry)
- Database monitoring
- Performance monitoring

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console for client-side errors
3. Check database logs
4. Verify all environment variables are set correctly