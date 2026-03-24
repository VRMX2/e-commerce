# ⌚ E-Commerce Watch Store (Algeria)

A stunning, production-ready, full-stack e-commerce application tailored specifically for the Algerian market. Focused on selling high-end women's watches, this application provides an ultra-premium dark-mode UI with a seamless **Cash on Delivery (COD)** checkout experience.

---

## 🚀 Features

- **Premium UI/UX:** A responsive glassmorphism aesthetic tailored for high-ticket luxury items with pure custom CSS animations.
- **Localized Checkout:** Built-in form validation specifically for Algerian phone numbers (`05/06/07`) and a complete 58-Wilaya dropdown list.
- **Workflow Automation:** Instantly synchronizes every single order into an **n8n Automation System** via native webhooks.
- **Google Sheets Sync:** Directly routes the n8n automated payload directly into a master tracking Google Sheet.
- **Fully Integrated Backend:** Node.js Express server connected securely to a scalable PostgreSQL database.

---

## 🛠️ Technology Stack

1. **Frontend:** React + Next.js (TypeScript)
2. **Backend:** Node.js + Express.js
3. **Database:** PostgreSQL
4. **Automation Pipeline:** n8n 
5. **Data Storage:** Google Sheets via webhook execution

---

## ⚙️ How to Run Locally

### 1. Database Setup
Ensure PostgreSQL is running on your machine.
Run the database creation scripts exactly as provided in `db/schema.sql` and `backend/seed.js` to initialize the store's inventory.

### 2. Backend API
1. Open a terminal and navigate to: `cd backend`
2. Install dependencies: `npm install`
3. Configure your `.env` file containing your Postgres credentials and `N8N_WEBHOOK_URL`.
4. Start the server: `npm run dev`
*(Runs automatically on `http://localhost:5000`)*

### 3. Frontend Application
1. Open a new terminal and navigate to: `cd frontend`
2. Install dependencies: `npm install`
3. Configure your `.env.local` file `NEXT_PUBLIC_API_URL=http://localhost:5000`.
4. Start Next.js: `npm run dev`
*(Runs beautifully on `http://localhost:3000`)*

---

## 🌍 Production Deployment

This project consists of all configuration files needed for a free, scalable, production launch.

- **Vercel** (`frontend/vercel.json`): One-click frontend deployment optimized for Next.js features and security headers.
- **Render.com** (`backend/render.yaml`): Seamless Web Service deployment connecting directly to backend Git pushes.
- **Supabase API**: Easy drop-in configuration for cloud PostgreSQL databases.

Visit `artifacts/deployment_guide.md` and `artifacts/n8n_setup.md` in the project configuration notes for the exact 3-step blueprint for a perfect production launch!
