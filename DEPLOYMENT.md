# NetNuggets Deployment Guide

This guide covers deploying NetNuggets to production using free hosting services.

## Architecture Overview

- **Frontend**: React + TypeScript + Vite (Static Site)
- **Backend**: Node.js + Express API
- **Database**: MongoDB

## Recommended Deployment Stack (Free Tier)

1. **Database**: MongoDB Atlas (Free 512MB)
2. **Backend**: Render or Railway (Free tier available)
3. **Frontend**: Vercel or Netlify (Free tier available)

---

## Step 1: Set Up MongoDB Atlas (Database)

### Create Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Create a new FREE cluster (M0 Sandbox - 512MB)
4. Wait for cluster to be created (~5 minutes)

### Configure Database Access

1. **Database Access** → Add New Database User
   - Username: `netnuggets`
   - Password: Generate a secure password (save it!)
   - Permissions: `Read and write to any database`

2. **Network Access** → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This allows connections from any IP (required for serverless deployments)

### Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://netnuggets:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name before the `?`:
   ```
   mongodb+srv://netnuggets:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/netnuggets?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy Backend (Render)

### Option A: Deploy to Render (Recommended)

1. Go to [Render](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `netnuggets-backend`
   - **Region**: Choose closest to you
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. **Environment Variables** (Click "Advanced"):
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://netnuggets:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/netnuggets?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-random-string-change-this
   ```

   **Important**: Generate a strong JWT_SECRET using:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

7. Click "Create Web Service"
8. Wait for deployment (~5 minutes)
9. Copy your backend URL (e.g., `https://netnuggets-backend.onrender.com`)

### Option B: Deploy to Railway

1. Go to [Railway](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-secret-key
   ```
6. Set root directory to `backend`
7. Deploy and get your URL

### Seed the Database (Optional)

After backend is deployed, you can seed initial data:

1. In Render dashboard, go to your service
2. Click "Shell" tab
3. Run: `npm run seed`

---

## Step 3: Deploy Frontend (Vercel)

### Option A: Deploy to Vercel (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. **Environment Variables**:
   ```
   VITE_API_URL=https://netnuggets-backend.onrender.com/api
   ```
   (Use your actual backend URL from Step 2)

7. Click "Deploy"
8. Wait for deployment (~2 minutes)
9. Your site will be live at `https://your-project.vercel.app`

### Option B: Deploy to Netlify

1. Go to [Netlify](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select your repository
5. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

6. **Environment Variables**:
   ```
   VITE_API_URL=https://netnuggets-backend.onrender.com/api
   ```

7. Click "Deploy site"
8. Your site will be live at `https://your-project.netlify.app`

---

## Step 4: Verify Deployment

### Test Backend

Visit: `https://your-backend-url.onrender.com/api/health`

Expected response:
```json
{
  "status": "ok",
  "message": "NetNuggets API is running"
}
```

### Test Frontend

1. Visit your frontend URL
2. Try registering a new user
3. Try logging in
4. Test creating and viewing websites

---

## Environment Variables Summary

### Backend Environment Variables

```bash
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/netnuggets
JWT_SECRET=your-64-character-random-secret-key
```

### Frontend Environment Variables

```bash
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Post-Deployment Configuration

### Update CORS (if needed)

If you encounter CORS errors, update [backend/src/server.js](backend/src/server.js) line 14:

```javascript
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app',
  credentials: true
}));
```

### Custom Domain (Optional)

#### Vercel/Netlify:
1. Go to project settings
2. Add custom domain
3. Follow DNS configuration instructions

#### Render:
1. Go to service settings
2. Add custom domain
3. Configure DNS records

---

## Monitoring & Logs

### Render
- Dashboard → Your Service → "Logs" tab
- View real-time logs and errors

### Vercel/Netlify
- Dashboard → Your Project → "Deployments" → Select deployment → "Functions" (for logs)

### MongoDB Atlas
- Dashboard → Cluster → "Metrics"
- Monitor database performance and connections

---

## Troubleshooting

### Backend won't connect to MongoDB
- Check MongoDB Atlas Network Access allows 0.0.0.0/0
- Verify MONGODB_URI is correct with password replaced
- Check MongoDB Atlas user has read/write permissions

### Frontend can't connect to backend
- Verify VITE_API_URL is correct (must end with `/api`)
- Check backend is running at the health endpoint
- Verify CORS is configured properly

### Application errors
- Check backend logs in Render/Railway
- Check browser console for frontend errors
- Verify all environment variables are set correctly

---

## Cost & Limits (Free Tier)

### MongoDB Atlas
- 512MB storage
- Shared CPU
- No credit card required

### Render
- 750 hours/month (enough for 1 service)
- Spins down after 15 min inactivity
- 100GB bandwidth/month

### Vercel
- 100GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

### Railway (Alternative)
- $5 free credit/month
- Pay-as-you-go after

---

## Continuous Deployment

Both Render and Vercel/Netlify automatically redeploy when you push to GitHub:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Your changes will be live in ~2-5 minutes!

---

## Security Checklist

- [ ] MongoDB password is strong and unique
- [ ] JWT_SECRET is random and secure (64+ characters)
- [ ] MongoDB Network Access is configured
- [ ] Environment variables are set in hosting platforms (not in code)
- [ ] CORS is configured to allow only your frontend domain
- [ ] HTTPS is enabled (automatic on Vercel/Render)

---

## Support

If you encounter issues:
1. Check the logs in your hosting platform
2. Verify all environment variables
3. Test backend health endpoint
4. Check MongoDB connection in Atlas

---

## Quick Deploy Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0)
- [ ] Backend deployed to Render/Railway
- [ ] Backend environment variables set
- [ ] Backend health endpoint returns OK
- [ ] Frontend deployed to Vercel/Netlify
- [ ] Frontend environment variable (VITE_API_URL) set
- [ ] Test registration and login
- [ ] Test creating websites

🎉 **Your NetNuggets app is now live!**
