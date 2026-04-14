# 🍱 CanteenHub — School Canteen Digital Ordering System

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

## Project Structure

```
src/
├── api/           # API client functions
├── components/
│   ├── layout/    # Navbar
│   ├── orders/    # OrderForm, OrderModal, OrderHistoryTable
│   ├── snacks/    # SnackCard
│   ├── students/  # StudentListItem, CreateStudentForm
│   └── ui/        # Toast, LoadingSkeleton, EmptyState, ErrorState
├── hooks/         # React Query hooks
├── pages/         # SnacksPage, StudentsPage, StudentDetailPage
├── store/         # Zustand global store
└── types/         # TypeScript interfaces
```

## Features

- ✅ Snack browsing with card grid layout
- ✅ Order placement with student selector
- ✅ Student management (list, create, detail view)
- ✅ Order history per student
- ✅ Form validation with inline errors (React Hook Form)
- ✅ Global toast notification system
- ✅ Loading skeletons, error states, empty states
- ✅ Responsive design (375px, 768px, 1280px)
- ✅ localStorage persistence for recent orders
- ✅ Auto-generated referral codes
- ✅ Dark theme with glassmorphism effects

## Seed Data

The `db.json` includes:
- **8 snacks** with varying prices and order counts
- **3 students** with referral codes and spending
- **8 sample orders** linking students to snacks
