# Debug Deployment Issues

## Current Issues:
1. Pomodoro page: 404 Not Found
2. Workspace pages: 404 Not Found  
3. Workspaces not showing in sidebar

## Debugging Steps:

### 1. Check if database is properly migrated
- Run: `npx prisma db push` after deployment
- Check if tables exist in your Neon database

### 2. Check API endpoints directly
Visit these URLs in browser to see what's happening:
- https://focusly-hzfx8viw6-sarthak-rawats-projects.vercel.app/api/pomodoro/get_settings?userId=YOUR_USER_ID
- https://focusly-hzfx8viw6-sarthak-rawats-projects.vercel.app/api/workspace/get/user_workspaces?userId=YOUR_USER_ID

### 3. Check Vercel logs
- Go to Vercel dashboard
- Check function logs for errors
- Look for database connection issues

### 4. Verify environment variables
Make sure these are set in Vercel:
- DATABASE_URL
- NEXTAUTH_URL
- All other required env vars

## Possible Root Causes:
1. Database not migrated (no tables)
2. Database connection failing
3. Environment variables not set correctly
4. API routes returning errors
5. Server-side rendering failing due to API errors