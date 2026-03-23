# E-Commerce Online Store (Algeria COD)

Production-ready full-stack web application designed for an online watch store in Algeria with Cash on Delivery (COD) functionality.

## Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS, TypeScript
- **Backend**: Go (Golang), Gin Framework, GORM
- **Database**: PostgreSQL
- **Integrations**: Google Sheets API

## Setup Instructions

### 1. Database Setup (PostgreSQL)
1. Ensure PostgreSQL is installed and running.
2. Create a database named `ecommerce`:
   ```sql
   CREATE DATABASE ecommerce;
   ```
3. Copy `backend/.env.example` to `backend/.env` and update `DB_PASSWORD` and other details.

### 2. Google Sheets API Integration
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project and enable the **Google Sheets API**.
3. Create a **Service Account**, and generate a JSON key.
4. Rename that JSON key to `credentials.json` and place it in the `backend/` directory.
5. Create a new Google Sheet. Share it with your Service Account email (give "Editor" access).
6. Copy the Spreadsheet ID from the URL (the long string between `/d/` and `/edit`) and set it as `SPREADSHEET_ID` in `backend/.env`.
7. Ensure your sheet is named `Sheet1` or update `backend/services/sheets.go` to match. 
   *(Required Columns: Name, Phone, Wilaya, Commune, Product, Date)*

### 3. Running the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Download dependencies and run the server:
   ```bash
   go mod tidy
   go run main.go
   ```
3. The server runs on `http://localhost:8080`.
The database schemas and seed products will automatically run on startup.

### 4. Running the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access the store at `http://localhost:3000`.
