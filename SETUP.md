# Setup Instructions - Nexus CRM

This document provides detailed step-by-step instructions for setting up the Nexus CRM application.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB** - Either local installation or MongoDB Atlas cloud service

### Optional Software
- **MongoDB Compass** - GUI for MongoDB [Download](https://www.mongodb.com/products/tools/compass)
- **Postman** - API testing tool [Download](https://www.postman.com/)
- **Visual Studio Code** - Code editor [Download](https://code.visualstudio.com/)

## Step-by-Step Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/crm-app.git

# Navigate to project directory
cd crm-app

# View project structure
ls -la
```

### Step 2: Setup MongoDB

Choose one of the following options:

#### Option A: Local MongoDB Installation

**Windows:**
```bash
# Download and install MongoDB Community Edition from:
# https://www.mongodb.com/try/download/community

# Start MongoDB service
# On Windows, MongoDB runs as a service automatically after installation

# Verify MongoDB is running
mongo --version
```

**macOS:**
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
mongosh --version
```

**Linux:**
```bash
# Follow instructions at:
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
sudo systemctl start mongod

# Verify MongoDB is running
mongosh --version
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Go to "Database Access" and create a user
5. Go to "Network Access" and allow all IPs (0.0.0.0/0)
6. Click "Connect" and copy your connection string
7. Replace `<username>`, `<password>`, and `<cluster>` in the connection string
8. Keep this connection string safe - you'll use it in Step 5

### Step 3: Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your MongoDB connection
# On Windows:
notepad .env

# On macOS/Linux:
nano .env
# or
vim .env
```

**Edit the `.env` file:**

```env
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/crm-app

# For MongoDB Atlas (replace placeholders):
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/crm-app

# JWT Secret - use a strong random string
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Generate a secure JWT secret:**
```bash
# On any system
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copy the output and paste in .env as JWT_SECRET value
```

**Verify backend setup:**
```bash
# Test if server starts without errors
npm start

# You should see: "Server running on 5000"
# Press Ctrl+C to stop
```

### Step 4: Setup Frontend

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create .env file (optional - defaults are fine)
cp .env.example .env

# The default API URL (http://localhost:5000/api) should work
```

### Step 5: Create Database Collections

The database will auto-create collections when you first run the application. However, you can manually create them:

**Option A: Using MongoDB Shell**

```bash
# Connect to MongoDB
mongosh

# Switch to crm-app database
use crm-app

# Create collections
db.createCollection("users")
db.createCollection("leads")
db.createCollection("notes")

# Add test user (optional - login will work without this)
db.users.insertOne({
  email: "admin@example.com",
  password: "password123"
})

# Exit MongoDB shell
exit
```

**Option B: Using MongoDB Compass**

1. Open MongoDB Compass
2. Connect to your MongoDB instance
3. Create new database: `crm-app`
4. Create three collections: `users`, `leads`, `notes`

### Step 6: Start the Application

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm start

# Expected output:
# MongoDB connected
# Server running on 5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start

# The browser should automatically open http://localhost:3000
# If not, manually open http://localhost:3000
```

### Step 7: Login to Application

1. The application should load with the login page
2. Use these credentials:
   - **Email:** admin@example.com
   - **Password:** password123
3. Click "Sign In"
4. You should be redirected to the Dashboard

## Troubleshooting

### MongoDB Connection Issues

**Error: "connect ECONNREFUSED"**
```
Solution: Make sure MongoDB is running
- Check MongoDB status: mongosh
- Start MongoDB service if not running
```

**Error: "Authentication failed"**
```
Solution: Check MongoDB connection string in .env
- For local: mongodb://localhost:27017/crm-app
- For Atlas: mongodb+srv://username:password@cluster.mongodb.net/crm-app
```

### Backend Issues

**Error: "Cannot find module"**
```bash
# Solution: Reinstall dependencies
cd server
rm -rf node_modules package-lock.json
npm install
```

**Error: "JWT_SECRET is not defined"**
```
Solution: Check .env file in server directory
- Make sure .env exists (copied from .env.example)
- Make sure JWT_SECRET is set
```

**Error: "Port 5000 is already in use"**
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or change port in server.js and .env
```

### Frontend Issues

**Error: "Cannot connect to API"**
```
Solution: Check if backend is running on port 5000
- Make sure npm start in server is running
- Check browser console for exact error
```

**Error: "npm install fails"**
```bash
# Clear npm cache
npm cache clean --force

# Try installing again
npm install
```

**Port 3000 already in use:**
```bash
# Kill the process using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Login Issues

**Can't login with credentials:**
```
- Make sure backend is running (check Terminal 1)
- Check MongoDB connection in backend logs
- Try using exact credentials: admin@example.com / password123
```

**Token-related errors:**
```bash
# Clear browser storage
# In browser console, run:
localStorage.clear()

# Refresh page and try login again
```

## Verifying Installation

After setup, verify everything works:

### Backend Check
```bash
# In Terminal 1, you should see:
# ✓ MongoDB connected
# ✓ Server running on 5000
```

### Frontend Check
```bash
# In Terminal 2, you should see:
# ✓ webpack compiled
# ✓ Compiled successfully
```

### Application Check
1. Open http://localhost:3000 in browser
2. Login page should load
3. Login with admin@example.com / password123
4. Dashboard should display with data
5. Click "Leads" to see leads list
6. Click "New Lead" to create a lead

## Running in Production

When deploying to production:

1. **Update environment variables:**
   ```env
   NODE_ENV=production
   JWT_SECRET=use_a_strong_random_string
   MONGO_URI=use_production_mongodb_uri
   ```

2. **Build frontend:**
   ```bash
   cd client
   npm run build
   ```

3. **Set up HTTPS** - Use Let's Encrypt or similar

4. **Use a process manager** - pm2 or systemd for Node

5. **Setup reverse proxy** - nginx or Apache

## Next Steps

- Read [README.md](./README.md) for feature overview
- Read [REFLECTION.md](./REFLECTION.md) for project insights
- Check API endpoints in `server/routes/`
- Explore React components in `client/src/`
- Start developing!

## Support

For issues or questions:
1. Check this troubleshooting section
2. Check browser console for error messages
3. Check backend terminal for server errors
4. Check MongoDB connection
5. Try clearing browser cache and localStorage

---

**Last Updated:** May 5, 2026
