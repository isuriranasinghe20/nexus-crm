# Nexus CRM - Lead Management System

A professional Customer Relationship Management (CRM) application for managing sales leads, tracking pipeline progress, and managing lead interactions through notes.

## 📋 Project Overview

Nexus CRM is a full-stack web application designed to help sales teams efficiently manage their leads, track deal values, and maintain detailed communication records. The system provides real-time insights into the sales pipeline with an intuitive dashboard and comprehensive lead management features.



## 🏗️ Tech Stack

### Frontend
- **React** (v19.2.5) - UI library
- **React Router** (v7.14.2) - Client-side navigation
- **Tailwind CSS** (v3.4.1) - Utility-first CSS framework
- **react-icons** - Icon library (Material Design icons)
- **Recharts** (v3.8.1) - Data visualization
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## ✨ Features Implemented

### 1. **Authentication** ✅
- Email/password login system
- JWT token-based authentication
- Protected routes (frontend & backend)
- Remember me functionality
- Professional login UI

### 2. **Lead Management** ✅
- **Create** - Add new leads with comprehensive information
- **Read** - View all leads with filtering and search
- **Update** - Edit lead details and status
- **Delete** - Remove leads from the system
- **View Details** - See complete lead information

**Lead Fields:**
- Lead Name
- Company Name
- Email Address
- Phone Number
- Lead Source (Website, Email, Referral, Phone Call, LinkedIn, Advertisement, Event, Other)
- Assigned Salesperson
- Status (New, Contacted, Qualified, Proposal Sent, Won, Lost)
- Estimated Deal Value
- Created Date (auto-generated)
- Last Updated Date (auto-generated)

### 3. **Lead Notes** ✅
- Add notes to leads for tracking interactions
- Timeline view of all notes
- Note content, creator, and timestamp
- Real-time note updates

### 4. **Dashboard** ✅
- Total Leads count
- New Leads metrics
- Qualified Leads metrics
- Won Deals metrics
- Lost Deals metrics
- Total Estimated Deal Value
- Total Value of Won Deals
- Lead Status Distribution Chart (Bar Chart)
- Recent leads table with quick actions

### 5. **Search and Filtering** ✅
- Search by lead name, company, or email
- Filter by Status
- Filter by Company
- Filter by Lead Source
- Filter by Assigned Salesperson
- Multi-filter support

### 6. **User Interface** ✅
- Professional, modern design
- Responsive layout (mobile & desktop)
- Colorful avatars with initials
- Status badges with color coding
- Smooth transitions and hover effects
- Pagination support
- Professional forms with validation

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud instance)
- Git

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/crm-app.git
cd crm-app
```

#### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure your MongoDB connection and JWT secret in .env
# Then start the server
npm start
```

The backend will run on `http://localhost:5000`

#### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000`

### 4. Access the Application

1. Open your browser and navigate to `http://localhost:3000`
2. Use the test credentials below to log in
3. Start managing leads!

## 🔑 Test Login Credentials

| Field | Value |
|-------|-------|
| **Email** | admin@example.com |
| **Password** | password123 |

> **Note:** These are the default test credentials. In production, use proper user management and authentication.

## 🗄️ Database Setup

### MongoDB Connection

1. **Local MongoDB:**
   ```bash
   # Install MongoDB Community Edition (if not already installed)
   # Start MongoDB service
   mongod
   ```

2. **MongoDB Atlas (Cloud):**
   - Create an account at https://www.mongodb.com/cloud/atlas
   - Create a cluster
   - Get your connection string
   - Set `MONGO_URI` in your `.env` file

### Database Structure

The application uses three main collections:

**1. Users Collection**
```javascript
{
  email: String,
  password: String (hashed)
}
```

**2. Leads Collection**
```javascript
{
  name: String,
  company: String,
  email: String,
  phone: String,
  source: String,
  salesperson: String,
  status: String (enum: New, Contacted, Qualified, Proposal Sent, Won, Lost),
  dealValue: Number,
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

**3. Notes Collection**
```javascript
{
  leadId: ObjectId (reference to Lead),
  content: String,
  createdBy: String,
  createdAt: Date (auto-generated)
}
```

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `server` directory:

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/crm-app
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/crm-app

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here_change_in_production

# Server Port
PORT=5000
```

### Frontend

The frontend connects to the backend at `http://localhost:5000/api` by default. This is configured in `client/src/services/api.js`

## 📦 Project Structure

```
crm-app/
├── server/                          # Backend
│   ├── config/
│   │   └── db.js                   # Database connection
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT authentication
│   ├── models/
│   │   ├── Lead.js                 # Lead schema
│   │   ├── Note.js                 # Note schema
│   │   └── User.js                 # User schema
│   ├── routes/
│   │   ├── auth.js                 # Authentication routes
│   │   ├── leads.js                # Lead CRUD routes
│   │   └── notes.js                # Note routes
│   ├── .env.example                # Example environment variables
│   ├── server.js                   # Main server file
│   └── package.json
│
├── client/                          # Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js           # Navigation bar
│   │   │   ├── LeadForm.js         # Lead creation form
│   │   │   ├── EditLeadModal.js    # Lead edit modal
│   │   │   └── ProtectedRoute.js   # Route protection
│   │   ├── pages/
│   │   │   ├── Login.js            # Login page
│   │   │   ├── Dashboard.js        # Dashboard page
│   │   │   ├── Leads.js            # Leads list page
│   │   │   └── LeadDetails.js      # Lead details page
│   │   ├── services/
│   │   │   └── api.js              # API configuration
│   │   ├── App.js                  # Main app component
│   │   └── index.js                # Entry point
│   ├── public/
│   ├── .env.example                # Example environment variables
│   └── package.json
│
├── README.md                        # This file
├── REFLECTION.md                    # Project reflection
└── .gitignore
```

## 🐛 Known Limitations

1. **Authentication:**
   - Only one test user (admin@example.com)
   - No user registration system
   - No password reset functionality
   - No role-based access control (RBAC)

2. **Lead Management:**
   - No lead assignment workflow
   - No lead scoring system
   - No bulk operations (bulk import/export)
   - No lead activity timeline (only notes)

3. **Filtering & Search:**
   - Client-side pagination (no server-side pagination)
   - Limited to 5 leads per page
   - No advanced search filters

4. **UI/UX:**
   - No dark mode
   - Limited mobile optimization
   - No notifications/alerts system
   - No real-time updates

5. **Performance:**
   - No caching mechanism
   - No API rate limiting
   - No database indexing optimization
   - No load testing performed

6. **Security:**
   - JWT tokens don't expire
   - No rate limiting on login attempts
   - No HTTPS in development
   - Test credentials visible in code

## 📝 Reflection

### What Went Well
- Successfully implemented a complete CRUD system for lead management
- Clean separation of concerns (frontend/backend)
- Professional and intuitive UI design
- All core requirements implemented
- Proper authentication and authorization
- Responsive design across devices

### Challenges Faced
- Integrating Recharts for data visualization
- Managing state across multiple components
- Setting up proper error handling for API calls
- Understanding Mongoose schema relationships

### What I'd Improve
1. Add user registration and password management
2. Implement real-time notifications
3. Add lead scoring and pipeline analytics
4. Create mobile app version
5. Add export/import functionality
6. Implement advanced filtering with saved filters
7. Add activity timeline and audit logs
8. Performance optimization with pagination on backend

### Learning Outcomes
- Full-stack development with MERN stack
- JWT-based authentication
- RESTful API design
- Responsive UI with Tailwind CSS
- Database design with MongoDB
- Component-based architecture in React

## 🤝 Contributing

This is a personal project for educational purposes. Feel free to fork and extend!

## 📄 License

MIT License - feel free to use this project as you wish.



**Last Updated:** May 5, 2026

**Version:** 1.0.0
