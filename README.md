# Reach Disha - Psychometric Assessment Platform

A comprehensive, production-ready full-stack psychometric assessment and career guidance platform developed for **Reach India**. 

The platform evaluates candidates across 9 psychological and aptitude dimensions through 45 calibrated questions (available in English, Hindi, and Bengali) and provides immediate personalized career recommendations, stream matching, and administrative reporting.

---

## 🏗️ System Architecture

- **Frontend (`/`)**: React 19, Vite, Tailwind CSS, React Router v7, React Hook Form, Zod.
- **Backend (`/backend`)**: Node.js, Express 5, Prisma ORM 6, JWT Authentication, CORS.
- **Database**: MySQL (relational schema with Users, Questions, Options, and Assessment Results).
- **Deployment Ready**: Configured for Vercel (Frontend) and Railway / Render (Backend & MySQL).

---

## 📁 Project Directory Structure

```text
psychometric_test/
├── src/                          # Frontend React Source Code
│   ├── assets/                   # Images, logos, illustrations
│   ├── components/               # Reusable UI components (Navbar, Footer, Modal, etc.)
│   ├── constants/                # Career paths, scoring dimensions, assessment data
│   ├── data/translations/        # 45 multilingual question translations (EN, HI, BN)
│   ├── pages/                    # Views (Home, Login, Register, Assessment, Dashboards)
│   ├── routes/                   # App routing configuration
│   └── services/                 # API client wrappers (Auth, Assessment, Questions)
├── public/                       # Static public assets
├── backend/                      # Node.js + Express Backend
│   ├── prisma/                   # Prisma Schema & Database Seeder
│   │   ├── schema.prisma         # MySQL Data Models
│   │   └── seed.js               # Database seeder (Admins & 45 Multilingual Questions)
│   ├── scripts/                  # Deployment & Database migration scripts
│   ├── src/
│   │   ├── config/               # Prisma client & question bank configuration
│   │   ├── controllers/          # Route controller handlers
│   │   ├── middleware/           # JWT auth middleware, error handlers
│   │   ├── routes/               # API endpoints (/auth, /questions, /assessment, /admin)
│   │   ├── services/             # Scoring algorithms, career recommendation logic
│   │   └── server.js             # Express HTTP server entrypoint
│   ├── .env.example              # Sample backend environment variables
│   └── package.json              # Backend dependencies and scripts
├── .env.example                  # Sample frontend environment variables
├── vercel.json                   # Vercel SPA routing configuration
├── vite.config.js                # Vite build configuration
└── package.json                  # Frontend dependencies and scripts
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18 or higher (v20+ recommended)
- **npm**: v9 or higher
- **MySQL**: MySQL 8.x instance (Local or Cloud like Railway / Aiven)

---

### 1. Backend Setup & Run

1. Open terminal and navigate into the `backend` folder:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` file from the provided example:
   ```bash
   cp .env.example .env
   ```
   *Configure your MySQL connection string and JWT secrets:*
   ```env
   PORT=3000
   DATABASE_URL="mysql://username:password@localhost:3306/psychometric_db"
   JWT_ACCESS_SECRET="your_secure_jwt_access_secret_key"
   JWT_REFRESH_SECRET="your_secure_jwt_refresh_secret_key"
   JWT_ACCESS_EXPIRES_IN="15m"
   JWT_REFRESH_EXPIRES_IN="7d"
   ```

4. Push the schema to create MySQL tables:
   ```bash
   npx prisma db push
   ```

5. Seed administrator accounts and the 45 multilingual questions:
   ```bash
   node prisma/seed.js
   ```

6. Start the backend server:
   ```bash
   npm start
   ```
   The backend will be running at `http://localhost:3000`.

---

### 2. Frontend Setup & Run

1. Open a new terminal in the root directory:
   ```bash
   # From project root
   npm install
   ```

2. (Optional) Create `.env` for custom backend URL (defaults to `http://localhost:3000/api` in development):
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 🔑 Default Administrator Credentials

The database seeder automatically provisions two verified administrator accounts:

| Role | Mobile / ID | Password | Access Level |
|---|---|---|---|
| **Head Admin** | `9876543210` | `admin123` | Full Admin Dashboard & Reports |
| **Operations Admin** | `9876543211` | `admin123` | Student evaluations & Assessment views |

- Admin Login URL: `/admin/login`

---

## 🌐 Production Cloud Deployments

- **Frontend**: Configured with `vercel.json` for single-page routing on Vercel.
- **Backend**: Contains `railway.json` with Nixpacks configuration for Railway / Render container deployments.

---

## 📄 License & Attribution
Developed for **Reach India Pvt. Ltd.** All rights reserved.