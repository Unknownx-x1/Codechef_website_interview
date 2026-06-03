# CodeChef VIT Chennai - Club Management System

A production-quality fullstack web application for the **CodeChef VIT Chennai** technical club recruitment assignment. The interface is designed around a dense, high-end cyberpunk technical editorial theme: sharp borders, monospace typography, terminal panels, asymmetric grids, scanline avatars, and layout-preserving accordion motion.

This project is built as a monorepo containing:
1. **Frontend**: Next.js (App Router) + React + Tailwind CSS + Framer Motion (located in the root directory).
2. **Backend**: Node.js + Express.js + TypeScript + Prisma ORM + PostgreSQL (located in the `backend/` directory).

---

## 🛠️ Tech Stack & Architecture

### Frontend (Root Directory)
* **Core**: Next.js 15 (App Router), React 19, TypeScript
* **Styling**: Tailwind CSS (customized for dark/cyberpunk/light themes)
* **Animations**: Framer Motion (accordion transitions, page loads, terminal typewriter effects)
* **Form Handling**: React Hook Form with Zod validation
* **Deployment**: Hosted on **Vercel**

### Backend (`backend/` Directory)
* **Core**: Node.js, Express.js, TypeScript
* **Database**: PostgreSQL (hosted on **Neon.tech**) connected via **Prisma ORM**
* **Validation**: Zod schema validation middleware
* **Process Manager**: `ts-node-dev` for hot-reloads in development
* **Deployment**: Hosted on **Render** (as a Web Service running Node)

---

## 📂 Project Directory Structure

```text
├── backend/                      # Node.js + Express.js + Prisma Backend
│   ├── prisma/                   # Prisma Schema and DB Seed Scripts
│   │   ├── schema.prisma         # Database model definitions
│   │   └── seed.ts               # Pre-seeding script for events & clubs
│   ├── src/
│   │   ├── controllers/          # Request handlers for endpoints
│   │   ├── middleware/           # Zod validations & global error handling
│   │   ├── routes/               # API endpoint route declarations
│   │   ├── validations/          # Zod request validation schemas
│   │   └── index.ts              # Express Server entry point
│   ├── tsconfig.json             # TypeScript settings for backend
│   └── package.json              # Backend package configuration
│
├── src/                          # Next.js 15 Frontend
│   ├── app/                      # Page components & routing
│   ├── components/               # High-fidelity custom React components
│   ├── data/                     # Static fallback assets & leadership rosters
│   ├── lib/                      # API client integration helpers
│   ├── types/                    # Shared TypeScript interfaces
│   └── hooks/                    # Live countdown & typewriter hooks
│
├── tsconfig.json                 # Frontend TypeScript config (excludes backend)
├── eslint.config.mjs             # ESLint config (ignores backend)
└── package.json                  # Frontend package configuration
```

---

## 🚀 Local Setup & Installation

Follow these steps to run both the frontend and backend servers locally on your machine:

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* A PostgreSQL instance (local, Docker, or hosted like Neon.tech/Supabase)

---

### 2. Backend Setup
1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   DATABASE_URL="your-postgresql-connection-string"
   ```
4. Push the schema to your database and generate the Prisma Client:
   ```bash
   npx prisma db push
   ```
5. Seed the database with VITC clubs and competitive programming events:
   ```bash
   npx prisma db seed
   ```
6. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will start running on **`http://localhost:5000`**.

---

### 3. Frontend Setup
1. Open a new terminal window and navigate to the project's root folder:
   ```bash
   # Go back to the root if you are inside backend/
   cd ..
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root folder:
   ```env
   NEXT_PUBLIC_API_BASE_URL="http://localhost:5000"
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   Open **`http://localhost:3000`** in your browser to view the application.

---

## 📡 API Endpoints Reference

The backend exposes the following REST APIs:

### 🏢 Club APIs
* `GET /clubs` - Get all clubs (includes their hosted events).
* `GET /clubs/:id` - Get details of a specific club by UUID.
* `POST /clubs` - Create a new club (Zod-validated).
* `PUT /clubs/:id` - Update club details.
* `DELETE /clubs/:id` - Delete a club and cascade-delete all its events.

### 📅 Event APIs
* `GET /events` - Get all competitive programming events (includes club relation).
* `GET /events/:id` - Get details of an event (supports custom slugs like `graph-theory-sprint`).
* `POST /events` - Create a new event.
* `PUT /events/:id` - Update event details.
* `DELETE /events/:id` - Delete an event.

### 📝 Registration APIs
* `GET /registrations` - Retrieve all event registrations.
* `POST /registrations` - Register a student for an event. Prevents double-registrations for the same email.
* `DELETE /registrations/:id` - Cancel/delete a registration.

---

## 🌐 Production Deployment Guide

### Backend Deployment (Render)
1. Push your repository to **GitHub**.
2. Log in to **[Render](https://render.com/)** and create a new **Web Service**.
3. Link your GitHub repository.
4. Set the following configuration settings:
   * **Root Directory**: `backend` (very important)
   * **Build Command**: `npm install && npm run build`
   * **Start Command**: `npm start`
   * **Environment Variables**: Add your `DATABASE_URL` PostgreSQL connection string.

### Frontend Deployment (Vercel)
1. Create a project on **[Vercel](https://vercel.com/)** and link your repository.
2. In the Vercel dashboard, go to **Settings** > **Environment Variables** and add:
   * **Key**: `NEXT_PUBLIC_API_BASE_URL`
   * **Value**: Your live Render URL (e.g., `https://codechef-backend.onrender.com` without a trailing `/`).
3. Deploy/Redeploy the project.

---

## ⚙️ Monorepo Build Exclusions (Vercel & TS Settings)
To prevent Vercel's build process from throwing typescript or linting errors due to the nested `backend/` directory, the following configurations are implemented:
* **TypeScript Exclusion**: Root [`tsconfig.json`](./tsconfig.json) excludes `"backend"` from compilation checks to avoid conflicts with backend-only type files.
* **ESLint Exclusion**: Root [`eslint.config.mjs`](./eslint.config.mjs) ignores `"backend/**"` so only the Next.js app directory is linted during Vercel's deployment check.
