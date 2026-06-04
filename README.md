# CodeChef VIT Chennai - Club Management System

A production-quality fullstack web application built for the **CodeChef VIT Chennai** technical club recruitment assignment. The interface is designed around a dense, high-end cyberpunk technical editorial theme: sharp borders, monospace typography, terminal panels, asymmetric grids, scanline avatars, and layout-preserving accordion motion.

This project is built as a monorepo containing:
1. **Frontend**: Next.js 15 (App Router) + React 19 + Tailwind CSS + Framer Motion (located in the root directory).
2. **Backend**: Node.js + Express.js + TypeScript + Prisma ORM + PostgreSQL (located in the `backend/` directory).

---

## 🛠️ Key Features & Technical Deep Dive

### 🎨 Frontend UI & UX Architecture

#### 1. Cyberpunk Aesthetic & Visual Engine
- **Dense Grid & Monospace Design**: Designed around custom HSL tailored color schemes, thin sharp borders (`border-[var(--border)]`), Outfit/Space Grotesk typography for main display elements, and JetBrains Mono for command outputs and terminals.
- **Visual Effects Layer**: Features a fixed grain noise filter, scanline animation sweepers on terminal windows, dynamic theme-aligned radial gradients that follow cursor vectors, and interactive custom hover animations.
- **Dual-Theme Engine**: Fully optimized Dark and Light modes toggled via CSS variable tokens (`globals.css`) mapped to active DOM attributes. Transitions between themes are smoothed over a `300ms` window.

#### 2. SYSTEM_NAV Collapsible Navigation
- **Visibility Triggering**: On the home page (`/`) within the hero section, the compilation console and menu items remain fully expanded. Once the user scrolls past `150px`, or when they visit any other subpage (Events, Club, Register, Contact), the navbar collapses into a right-aligned toggle button (`>_ NAV`).
- **Interaction Model**: Clicking the trigger expands the console/menu from the right edge. Clicking it again or clicking anywhere outside the menu triggers click-outside listeners to collapse it back.
- **Exit & Entrance Animations**: Controlled using `AnimatePresence` and custom Framer Motion variants, ensuring smooth slide-in, fade, and scale animations without layout shifting.

#### 3. Redesigned Events Information Architecture
- **Categorization Sections**: Filters, sorts, and breaks events into two distinct sections:
  - **`ACTIVE_EVENTS`**: Displays upcoming open opportunities sorted chronologically (soonest event first). Features the nearest upcoming event with a large grid layout.
  - **`ARCHIVED_EVENTS`**: Displays past, concluded events sorted reverse-chronologically (most recent completed event first). Past events are rendered with slightly lower opacity and disabled hover translations to feel visually distinct.
- **Date-Driven Logic**: Event status (upcoming vs past) is computed dynamically at runtime using the event's ISO date, keeping the system future-proof.
- **Dynamic Post-Event Action Buttons**: 
  - **`> Register / Join Queue`**: Neon accent link for active, upcoming events.
  - **`> View Recap`**: Active link displayed for completed events when a recap or archive link is configured in the database.
  - **`> Completed`**: Muted, disabled status block if a past event has no link resource.
- **Auto-Adjusting aspect-ratio container**: Embedded card images use `w-full h-auto object-contain` to ensure that user-supplied assets display in full resolution without getting cropped or distorted.

#### 4. Secured Forms & Route Banners
- **Zod & React Hook Form**: Form inputs are validated client-side with Zod schema assertions (e.g. strict email formatting, registration number lengths) before submitting.
- **Past Event Warning Banner**: If a user directly visits `/register?event=[past-event-id]`, a warning banner alerts them that registration has closed, and the select option defaults to the nearest active opportunity.

---

### ⚡ Backend API & Database Architecture

#### 1. Restful Express API
- **TypeScript Compiler Layer**: Built using Express and TypeScript with strict typing. Uses `ts-node-dev` in development for fast hot-reloading and modular route segmentation.
- **Graceful Error Handling Middleware**: Global error interceptor catches and logs unhandled exceptions, formatting them into clear JSON error payloads with corresponding HTTP status codes.

#### 2. PostgreSQL & Prisma ORM
- **Cloud Infrastructure**: Connected to a serverless PostgreSQL database hosted on **Neon.tech**.
- **Prisma Schema**: Features models for `Club`, `Event`, and `Registration` with:
  - Cascade deletes (e.g. deleting a club cascades to delete its events).
  - JSON objects to store arrays (e.g. event topics).
  - Relational mapping between clubs, events, and user registrations.
- **Schema Migration**: Managed through Prisma CLI to maintain table structure, constraints, and column defaults.

#### 3. Robust Data Fallback
- The client-side fetch wrapper in `src/lib/api.ts` implements robust connection handlers. If the database server is offline, the client catches the fetch network crash, warns the console, and gracefully falls back to local JSON datasets so pages never display blank.

---

## 📂 Project Directory Structure

```text
├── backend/                      # Node.js + Express.js + Prisma Backend
│   ├── prisma/                   # Prisma Schema and DB Seed Scripts
│   │   ├── schema.prisma         # Database model definitions
│   │   └── seed.ts               # Database seed configuration
│   ├── src/
│   │   ├── controllers/          # Endpoint controllers
│   │   ├── middleware/           # Validation and error-handling middlewares
│   │   ├── routes/               # API route definitions
│   │   ├── validations/          # Zod schema definitions
│   │   └── index.ts              # Express Server entry point
│   ├── tsconfig.json             # Backend TypeScript configuration
│   └── package.json              # Backend scripts and dependencies
│
├── src/                          # Next.js 15 Frontend
│   ├── app/                      # Page routing structure
│   ├── components/               # Cyberpunk UI React Components
│   ├── data/                     # Fallback mock datasets
│   ├── lib/                      # API client logic & utils
│   ├── types/                    # Common TypeScript type files
│   └── hooks/                    # Live countdown & typewriter hooks
│
├── public/                       # Static public assets
│   ├── events/                   # Location for event images
│   └── mascot.png                # Brand identity PNG
│
├── tsconfig.json                 # Frontend TypeScript configuration
├── eslint.config.mjs             # ESLint configuration
└── package.json                  # Frontend scripts and dependencies
```

---

## 📡 API Endpoints Reference

The backend API exposes REST endpoints for club, event, and registration modules:

### 1. Club APIs
- `GET /api/clubs` - Retrieve all clubs.
- `GET /api/clubs/:id` - Retrieve club details by ID.
- `POST /api/clubs` - Create a new club profile.
- `PUT /api/clubs/:id` - Update club details.
- `DELETE /api/clubs/:id` - Delete a club profile.

### 2. Event APIs
- `GET /api/events` - Retrieve all events.
- `GET /api/events/:id` - Retrieve details of a specific event (supports slug/UUID).
- `POST /api/events` - Create a new event.
- `PUT /api/events/:id` - Update event details.
- `DELETE /api/events/:id` - Delete an event.

### 3. Registration APIs
- `GET /api/registrations` - Fetch all event registrations.
- `POST /api/registrations` - Register a student for an event. Prevents double-registration of the same email for a single event.
- `DELETE /api/registrations/:id` - Cancel registration.

---

## 🚀 Local Setup & Installation

Follow these steps to run both the frontend and backend servers locally:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- A PostgreSQL database instance (local, Docker container, or hosted via Neon.tech)

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `backend/` folder:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"
   ```
4. Synchronize the Prisma schema with your database:
   ```bash
   npx prisma db push
   ```
5. Seed the database with CodeChef club details and events:
   ```bash
   npx prisma db seed
   ```
6. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will boot up at **`http://localhost:5000`**.

### 3. Frontend Setup
1. Return to the project root directory:
   ```bash
   cd ..
   ```
2. Install frontend dependencies:
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

## 🌐 Production Deployment Guide

### Backend (Render / Railway)
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment Variables**: Add your `DATABASE_URL` (connection string) and custom `PORT` variables.

### Frontend (Vercel)
- Set the framework preset to **Next.js**.
- In **Environment Variables**, add `NEXT_PUBLIC_API_BASE_URL` pointing to your deployed live backend API (e.g., `https://codechef-backend.onrender.com`).
- To prevent deployment linting/checking errors for nested backend packages, the root `tsconfig.json` and `eslint.config.mjs` exclude the `backend/` directory from root check scopes.
