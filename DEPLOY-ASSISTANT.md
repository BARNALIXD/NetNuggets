# 🚀 NetNuggets Deployment Assistant

I'll guide you through each step. Just follow along!

---

## ✅ Step 1: MongoDB Atlas Database (5 minutes)

### Action Required: Create MongoDB Database

1. **Open this link**: [MongoDB Atlas Sign Up](https://www.mongodb.com/cloud/atlas/register)

2. **Sign up** with Google/Email (fastest with Google)

3. **Create a FREE cluster**:
   - Choose **M0 FREE** tier
   - Select a region close to you
   - Click "Create Cluster"
   - Wait ~3-5 minutes for cluster creation

4. **Create Database User**:
   - Click "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Authentication Method: Password
   - Username: `netnuggets`
   - Click "Autogenerate Secure Password" - **COPY THIS PASSWORD!**
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

5. **Configure Network Access**:
   - Click "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String**:
   - Click "Database" (left sidebar)
   - Click "Connect" button on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://netnuggets:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with the password you copied
   - Add `/netnuggets` before the `?`:
     ```
     mongodb+srv://netnuggets:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/netnuggets?retryWrites=true&w=majority
     ```

### ✏️ Paste your MongoDB connection string here:
```
MONGODB_URI=
```

**Once you have this, come back and paste it to me!**

---

## ✅ Step 2: Deploy Backend to Render (5 minutes)

### Action Required: Deploy Backend

1. **Open this link**: [Render Sign Up](https://dashboard.render.com/register)

2. **Sign up with GitHub** (click "GitHub" button)

3. **Authorize Render** to access your GitHub repositories

4. **Create Web Service**:
   - Click "New +" (top right)
   - Click "Web Service"
   - Find and select your `NetNuggets` repository
   - Click "Connect"

5. **Configure the service**:
   ```
   Name: netnuggets-backend
   Region: [Choose closest to you - Oregon/Frankfurt/Singapore]
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

6. **Add Environment Variables** (Click "Advanced" then "Add Environment Variable"):

   Add these 4 variables one by one:

   **Variable 1:**
   ```
   Key: PORT
   Value: 5000
   ```

   **Variable 2:**
   ```
   Key: NODE_ENV
   Value: production
   ```

   **Variable 3:**
   ```
   Key: MONGODB_URI
   Value: [Paste your MongoDB connection string from Step 1]
   ```

   **Variable 4:**
   ```
   Key: JWT_SECRET
   Value: [I'll generate this for you - see below]
   ```

### 🔐 Your JWT Secret (copy this):
```
c5959f02f81cde29c88343233403c177800d522749cc1caccd6d0b523d9f753d7bda8c8c73c2dc5ae2b7403da428b4dc1de81ea60504fdb5c62d1353d018e8d8
```

7. **Click "Create Web Service"**

8. **Wait for deployment** (~5 minutes)
   - You'll see logs scrolling
   - Wait for "Your service is live 🎉"

9. **Copy your backend URL** (at the top, looks like):
   ```
   https://netnuggets-backend-xxxx.onrender.com
   ```

### ✏️ Paste your backend URL here:
```
BACKEND_URL=
```

**Test it by visiting**: `YOUR_BACKEND_URL/api/health`
- You should see: `{"status":"ok","message":"NetNuggets API is running"}`

**Once deployed, come back and paste the URL to me!**

---

## ✅ Step 3: Deploy Frontend to Vercel (2 minutes)

### Action Required: Deploy Frontend

1. **Open this link**: [Vercel Sign Up](https://vercel.com/signup)

2. **Sign up with GitHub** (click "Continue with GitHub")

3. **Authorize Vercel** to access your repositories

4. **Import Project**:
   - Click "Add New..." → "Project"
   - Find and select your `NetNuggets` repository
   - Click "Import"

5. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build (should auto-detect)
   Output Directory: dist (should auto-detect)
   ```

6. **Add Environment Variable**:
   - Click "Environment Variables" dropdown
   - Add variable:
     ```
     Key: VITE_API_URL
     Value: [Your backend URL from Step 2]/api
     ```
   - Example: `https://netnuggets-backend-xxxx.onrender.com/api`
   - **Important**: Add `/api` at the end!

7. **Click "Deploy"**

8. **Wait for deployment** (~2 minutes)
   - You'll see build logs
   - Wait for "Congratulations" screen

9. **Copy your frontend URL** (looks like):
   ```
   https://netnuggets-xxxx.vercel.app
   ```

### ✏️ Paste your frontend URL here:
```
FRONTEND_URL=
```

**Visit your frontend URL and test the app!**

---

## ✅ Step 4: Test Your Deployment

### Test Checklist:

1. **Backend Health Check**:
   - Visit: `YOUR_BACKEND_URL/api/health`
   - Should show: `{"status":"ok","message":"NetNuggets API is running"}`

2. **Frontend Access**:
   - Visit: `YOUR_FRONTEND_URL`
   - Should see the NetNuggets login page

3. **Registration Test**:
   - Click "Register"
   - Fill in details
   - Try to register

4. **Login Test**:
   - Try logging in with the account you created

5. **Full Functionality**:
   - Try adding a website
   - Try bookmarking
   - Test all features

---

## 🎉 Success!

If all tests pass, your app is live!

### Your Deployed App:
- **Frontend**: `YOUR_FRONTEND_URL`
- **Backend**: `YOUR_BACKEND_URL`
- **Database**: MongoDB Atlas

### What's Next?

1. **Share your app** with the frontend URL
2. **Monitor logs**:
   - Render: Dashboard → netnuggets-backend → Logs
   - Vercel: Dashboard → NetNuggets → Deployments
3. **Auto-deploy**: Every git push to main will automatically deploy!

---

## ⚠️ Troubleshooting

### Frontend can't connect to backend:
- Verify `VITE_API_URL` in Vercel has `/api` at the end
- Check backend is running: visit `BACKEND_URL/api/health`

### Backend errors:
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Verify all environment variables are set

### Database connection failed:
- Check MongoDB Atlas Network Access allows 0.0.0.0/0
- Verify password in connection string is correct
- Check database user exists

---

## 📞 Need Help?

Paste me:
1. Your MongoDB connection string (I'll verify format)
2. Your backend URL (I'll test it)
3. Your frontend URL (I'll check it)
4. Any error messages you see

Let's get your app live! 🚀
