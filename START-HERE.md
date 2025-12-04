# NetNuggets - Quick Fix Guide 🚀

## Issues Fixed ✅

1. ✅ Created `.env` files for both backend and frontend
2. ✅ Improved MongoDB connection handling with better error messages
3. ✅ Updated frontend title in `index.html`
4. ✅ All dependencies are installed

## How to Run the Project

### Option 1: Using Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Using Root Scripts

**Terminal 1:**
```bash
npm run backend
```

**Terminal 2:**
```bash
npm run frontend
```

## Important: MongoDB Setup

The project requires MongoDB to be running. You have two options:

### Option A: Local MongoDB

1. **Install MongoDB** (if not installed):
   - Windows: Download from https://www.mongodb.com/try/download/community
   - Mac: `brew install mongodb-community`
   - Linux: `sudo apt-get install mongodb`

2. **Start MongoDB:**
   - Windows: MongoDB usually starts automatically as a service
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongodb`

3. **Verify MongoDB is running:**
   - The backend will show: `✅ Connected to MongoDB`
   - If you see: `❌ MongoDB connection error`, MongoDB is not running

### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string
4. Update `backend/.env`:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```

## First Time Setup

1. **Seed the database** (creates admin and sample data):
   ```bash
   cd backend
   npm run seed
   ```

2. **Start the servers** (see "How to Run" above)

3. **Open your browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api/health

## Default Login Credentials

After running `npm run seed`:

**Admin:**
- Email: `admin@netnuggets.com`
- Password: `admin123`
- Role: Select "Admin" when logging in

**User:**
- Email: `user@example.com`
- Password: `user123`
- Role: Select "User" when logging in

## Troubleshooting

### Backend won't start
- ✅ Check if MongoDB is running
- ✅ Check if port 5000 is available
- ✅ Verify `.env` file exists in `backend/` folder

### Frontend won't start
- ✅ Check if port 5173 is available
- ✅ Verify `.env` file exists in `frontend/` folder
- ✅ Run `npm install` in `frontend/` folder

### "Cannot connect to backend" error
- ✅ Make sure backend is running on port 5000
- ✅ Check `frontend/.env` has correct `VITE_API_URL`
- ✅ Check browser console for CORS errors

### MongoDB connection errors
- ✅ Make sure MongoDB is installed and running
- ✅ Check `backend/.env` has correct `MONGODB_URI`
- ✅ For MongoDB Atlas, ensure your IP is whitelisted

## Environment Variables

### Backend (`backend/.env`)
```
MONGODB_URI=mongodb://localhost:27017/netnuggets
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
ADMIN_SECRET_CODE=admin123secret
PORT=5000
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_CODE=admin123secret
```

## Project Structure

- `backend/` - Node.js/Express API server
- `frontend/` - React/TypeScript frontend
- Both have their own `package.json` and `.env` files

## Need Help?

1. Check the console output for error messages
2. Verify all `.env` files are created correctly
3. Make sure MongoDB is running
4. Ensure both servers are running on different terminals

---

**Happy Coding! 🌐✨**



