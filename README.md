# CareQueue — Smart Healthcare Queue & Room Allocation Platform

A complete, production-ready **Smart Healthcare Queue Management Platform** built with React, TypeScript, Tailwind CSS, Node.js/Express, Prisma, and Socket.IO.

---

## 🚀 Vercel Deployment Instructions

This monorepo is pre-configured with `vercel.json` and an `/api` serverless entrypoint for zero-config Vercel deployment.

### Option 1: Vercel CLI (1-Click Command)
1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Navigate to project root and deploy:
   ```bash
   vercel
   ```

### Option 2: GitHub + Vercel Dashboard
1. Push this repository to GitHub.
2. Open [Vercel Dashboard](https://vercel.com/new) -> **Import Project**.
3. Vercel will automatically read `vercel.json` and build both frontend static assets and serverless backend handlers.

---

## 🛠 Local Development Setup

### 1. Start Backend Server
```bash
cd backend
npm install
npx prisma db push --accept-data-loss
npx prisma db seed
npm run dev
```
*(Backend runs at http://localhost:5000)*

### 2. Start Frontend Dev Server
```bash
cd frontend
npm install
npm run dev
```
*(Frontend runs at http://localhost:3000)*

---

## 🔑 Demo Credentials

- **Patient**: `patient@hospital.org` / `password123`
- **Receptionist**: `receptionist@hospital.org` / `password123`
- **Doctor**: `doctor@hospital.org` / `password123`
- **Admin**: `admin@hospital.org` / `password123`

*(Use top navigation **Demo Role Switcher** pills to switch between roles with 1 click!)*
