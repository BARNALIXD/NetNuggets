# NetNuggets 🌐

A beautiful website directory for discovering and sharing cool websites across the web. Built with React, TypeScript, Node.js, Express, and MongoDB.

## Features ✨

### User Features
- 🔐 **Authentication**: Separate login/register pages with role selection (User/Admin)
- 🎨 **Beautiful UI**: Pink & black themed interface with Aceternity UI 3D card animations
- 🔍 **Search & Filter**: Find websites by name, description, or category
- ⭐ **Rating System**: Rate your favorite websites (1-5 stars)
- 🔖 **Bookmarks**: Save websites to your personal collection
- 📝 **Submit Websites**: Suggest new websites for admin review
- 📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop

### Admin Features
- 👑 **Admin Panel**: Comprehensive dashboard for managing the platform
- ✅ **Approve Submissions**: Review and approve user-submitted websites
- ➕ **Add Websites**: Manually add new websites
- ✏️ **Edit Websites**: Update existing website information
- 🗑️ **Delete Websites**: Remove websites from the directory
- ⭐ **Feature Websites**: Mark websites as featured for prominence
- 👥 **User Management**: View and manage registered users

## Tech Stack 💻

### Frontend
- **React** with TypeScript
- **Vite** for fast development
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Aceternity UI** for 3D card animations
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing

## Project Structure 📁

```
NetNuggets/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # Aceternity UI components
│   │   │   ├── Header.tsx           # Main header with search
│   │   │   ├── WebsiteCard.tsx      # 3D card for websites
│   │   │   ├── SubmitForm.tsx       # Website submission form
│   │   │   └── ProtectedRoute.tsx   # Route protection
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx        # Login with role selection
│   │   │   ├── RegisterPage.tsx     # Register with admin code
│   │   │   ├── HomePage.tsx         # Main website directory
│   │   │   └── AdminPanel.tsx       # Admin dashboard
│   │   ├── context/
│   │   │   └── AuthContext.tsx      # Global auth state
│   │   ├── services/
│   │   │   └── api.ts               # API service layer
│   │   └── types/
│   │       └── index.ts             # TypeScript interfaces
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js              # User model with roles
│   │   │   ├── Website.js           # Website model
│   │   │   └── Submission.js        # Submission model
│   │   ├── routes/
│   │   │   ├── auth.js              # Authentication routes
│   │   │   ├── websites.js          # Website CRUD routes
│   │   │   ├── user.js              # User-specific routes
│   │   │   └── admin.js             # Admin-only routes
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification
│   │   │   └── admin.js             # Admin role check
│   │   ├── server.js                # Express server
│   │   └── seed.js                  # Database seeding
│   └── package.json
└── README.md
```

## Setup Instructions 🚀

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd NetNuggets
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the following and update MongoDB URI if needed:
```

Create `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/netnuggets
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
ADMIN_SECRET_CODE=admin123secret
PORT=5000
```

```bash
# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_CODE=admin123secret
```

```bash
# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Add Background Image

Place your custom background image at:
```
frontend/public/login-bg.jpg
```

Recommended size: 1920x1080 or higher

### 5. Install MongoDB (if not already installed)

**Windows:**
```bash
# Download from: https://www.mongodb.com/try/download/community
# Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## Default Credentials 🔑

After running `npm run seed`:

**Admin Account:**
- Email: `admin@netnuggets.com`
- Password: `admin123`

**User Account:**
- Email: `user@example.com`
- Password: `user123`

**Admin Registration Code:**
- Code: `admin123secret` (required when registering as admin)

## Usage Guide 📖

### For Users:
1. **Register/Login**: Choose "User" and create an account
2. **Browse Websites**: Explore the curated collection
3. **Search & Filter**: Use search bar and category filters
4. **Bookmark**: Click bookmark icon on any website
5. **Rate**: Click stars to rate (1-5)
6. **Submit**: Click "Submit Site" to suggest new websites

### For Admins:
1. **Register/Login**: Choose "Admin" and enter admin code
2. **Access Admin Panel**: Click "Admin Panel" in header
3. **Review Submissions**: Approve or reject user submissions
4. **Add Websites**: Manually add new websites with custom details
5. **Manage Websites**: Edit, feature, or delete existing websites
6. **View Users**: See all registered users

## API Endpoints 🛠️

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Websites
- `GET /api/websites` - Get all approved websites
- `GET /api/websites/:id` - Get website by ID
- `POST /api/websites` - Create website (admin)
- `PUT /api/websites/:id` - Update website (admin)
- `DELETE /api/websites/:id` - Delete website (admin)
- `POST /api/websites/:id/rate` - Rate website (auth)

### User
- `POST /api/user/bookmark` - Toggle bookmark (auth)
- `GET /api/user/bookmarks` - Get bookmarks (auth)
- `POST /api/user/submit` - Submit website (auth)

### Admin
- `GET /api/admin/submissions` - Get all submissions (admin)
- `POST /api/admin/submissions/:id/approve` - Approve submission (admin)
- `POST /api/admin/submissions/:id/reject` - Reject submission (admin)
- `GET /api/admin/users` - Get all users (admin)
- `DELETE /api/admin/users/:id` - Delete user (admin)

## Environment Variables 🔐

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/netnuggets
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
ADMIN_SECRET_CODE=admin123secret
PORT=5000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_CODE=admin123secret
```

## Development Scripts 📝

### Backend
```bash
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start production server
npm run seed     # Seed database with sample data
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Features Roadmap 🗺️

- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] User profiles with submission history
- [ ] Comments and discussions on websites
- [ ] Social sharing features
- [ ] Website screenshots/previews
- [ ] Advanced search with tags
- [ ] Newsletter subscription
- [ ] Analytics dashboard for admins

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

MIT License - feel free to use this project for personal or commercial purposes.

## Support 💬

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ and lots of ☕**

Happy discovering! 🌐✨
"# NetNuggets" 
