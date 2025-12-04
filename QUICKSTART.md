# NetNuggets - Quick Start Guide 🚀

## Get Started in 5 Minutes!

### Step 1: Install MongoDB (if not installed)
```bash
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb
```

### Step 2: Setup Backend
```bash
cd backend
npm install
npm run seed    # Creates sample data and admin account
npm run dev     # Starts backend on port 5000
```

### Step 3: Setup Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev     # Starts frontend on port 5173
```

### Step 4: Add Background Image (Optional)
Place your background image at: `frontend/public/login-bg.jpg`

### Step 5: Login & Explore! 🎉

Open browser to `http://localhost:5173`

**Admin Login:**
- Email: `admin@netnuggets.com`
- Password: `admin123`
- Select: "Admin" role

**User Login:**
- Email: `user@example.com`
- Password: `user123`
- Select: "User" role

## What Can You Do?

### As a User:
✅ Browse 12 pre-loaded websites
✅ Search and filter by category
✅ Rate websites (1-5 stars)
✅ Bookmark your favorites
✅ Submit new websites for review

### As an Admin:
✅ All user features PLUS:
✅ Access Admin Panel (click "Admin Panel" button)
✅ Approve/reject submitted websites
✅ Add websites manually
✅ Mark websites as "featured"
✅ Delete websites
✅ Manage users

## Need to Register a New Admin?
Use admin code: `admin123secret` when registering

## Troubleshooting

**MongoDB not connecting?**
- Make sure MongoDB is running: `sudo systemctl start mongodb` (Linux) or `brew services start mongodb-community` (Mac)
- Or update `backend/.env` with your MongoDB Atlas connection string

**Port already in use?**
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.ts`

**API not connecting?**
- Check `frontend/.env` has correct `VITE_API_URL`
- Make sure backend is running on port 5000

---

Enjoy exploring NetNuggets! 🌐✨
