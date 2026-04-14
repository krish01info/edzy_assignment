i will  upload the  ai_prompt file before noon , my apoligies that i  didn't uploaded it on time , i hope you will under stand else i tried to complete assigentm.
My goal was to completet the project with the max output with in the limited period of time.

🍱 CanteenHub — School Canteen Digital Ordering System
A browser-based prototype for snack browsing, student management, and order tracking.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| React Hook Form | Form handling & validation |
| Zustand | Global state management |
| TanStack React Query | Data fetching & caching |
| TailwindCSS v3 | Styling |
| JSON Server | Mock REST API |
| Axios | HTTP client |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Running the Application

You need to run **two terminals**:

**Terminal 1 — Mock API Server:**
```bash
npm run server
```
This starts JSON Server on `http://localhost:3001` with seed data from `db.json`.

**Terminal 2 — Vite Dev Server:**
```bash
npm run dev
```
This starts the React app on `http://localhost:5173`.

### Available Routes

| Route | Description |
|---|---|
| `/snacks` | Browse snack menu and place orders |
| `/students` | View student list and create new students |
| `/students/:id` | Student detail with order history |

## API Endpoints

Base URL: `http://localhost:3001`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/snacks` | Get all snacks |
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get student by ID |
| POST | `/students` | Create new student |
| POST | `/orders` | Create new order |
| GET | `/orders?studentId=:id` | Get orders for a student |





## Seed Data

The `db.json` includes:
- **8 snacks** with varying prices and order counts
- **3 students** with referral codes and spending
- **8 sample orders** linking students to snacks

## libraries/framework which i used are
react router dom
axios
react - query
zustland
tailwindcss

#  core dependencies
npm install react-router-dom lucide-react clsx tailwind-merge
npm install react-hook-form @tanstack/react-query axios
npm install -D tailwindcss postcss autoprefixer

