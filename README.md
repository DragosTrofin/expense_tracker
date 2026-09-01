# Expense Tracker API

A secure backend API for personal expense management, built with a 3-layer architecture (Controller, Service, Repository) focusing on performance, strict data validation, and automated testing.

## Tech Stack
* **Core:** Node.js, Express, TypeScript
* **Database & Storage:** PostgreSQL (via Supabase), Multer
* **Security:** Custom JWT Authentication, bcrypt
* **Validation:** Zod
* **Testing:** Vitest, Supertest

## Prerequisites
* [Node.js](https://nodejs.org/) (v18+)
* [Supabase CLI](https://supabase.com/docs/guides/cli) (for running the database locally)

## Setup and Installation

1. **Install dependencies:**
   ```bash
   npm install

**Environment Variables Configuration:**
Create an environment file using the provided template:

**cp .env.example .env**
Fill in the .env file with your actual SUPABASE_URL, SUPABASE_KEY, and a secure JWT_SECRET.

**Start the Database (Local Supabase):**


**supabase start**


Available Commands
Start the development server:


**npm run dev**

**Run the automated test suite (Auth & CRUD flows):**

**npm run test**