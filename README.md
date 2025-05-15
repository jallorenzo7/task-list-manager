
- **Laravel 12 API (Sanctum API Token-based Authentication)**
- **Vue 3 + Pinia (standalone frontend in `ui/`)**

---

## 📁 Project Structure

```
/
├── api/         # Laravel 12 API (backend)
└── ui/          # Vue 3 + Pinia frontend (independent from Laravel)
```

---

## 🔧 Tech Stack

### Backend (Laravel 12 API)
- Laravel 12.x (API-only)
- Sanctum API Tokens
- Eloquent ORM
- Dependency Injection (Controller → Service → Repository)
- Policy-based Authorization (per-task ownership validation)

### Frontend (Vue 3 + Pinia)
- Vue 3 Composition API
- Pinia (state management)
- Vue Router (SPA Navigation)
- Axios (API communication)
- Vite (build tool)

---

## ⚙ Project Setup Guide

### 1. Setup Laravel API (`api` folder)

```bash
cd api

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate

php artisan serve
```

- API will run at `http://127.0.0.1:8000`
- Sanctum token issued at `/api/login`

---

### 2. Setup Vue UI (`ui` folder)

```bash
cd ui

npm install

npm run dev
```

- Frontend will run at `http://localhost:5173`
- Axios is pre-configured to connect to API (`http://127.0.0.1:8000`)

---

## 🔐 API Endpoints Summary

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| POST   | /api/register     | Register user          |
| POST   | /api/login        | Login & get token      |
| GET    | /api/tasks        | List tasks (owned)     |
| POST   | /api/tasks        | Create task            |
| PUT    | /api/tasks/{id}   | Update task            |
| DELETE | /api/tasks/{id}  | Delete task            |

> Protected routes require `Authorization: Bearer {API_TOKEN}`

---

## 📋 Features Implemented

- ✅ User Registration & Login (API Token Auth)
- ✅ Task CRUD (with ownership validation)
- ✅ Fully decoupled Laravel API and Vue UI
- ✅ Vue 3 Composition API with Pinia store
- ✅ Clean code with DI & Repository pattern in Laravel
- ✅ Friendly UI with validation & error handling

---

## 💻 Development Scripts (UI)

| Command         | Description                  |
|-----------------|------------------------------|
| npm run dev      | Start development server     |
| npm run build    | Build production assets      |
| npm run preview  | Preview production build     |

---

## 🛡 Security Notes

- Laravel Sanctum protects all task-related endpoints.
- Ownership of tasks is enforced through **Policies** and checked per action.
- CORS is configured to allow requests from UI origin.

---

## 🚀 Bonus Recommendations

- Use `.env` variables to adjust API base URLs in production.
- Use Axios interceptors in Vue to handle token expiration globally.
- Use a `.gitignore` for Laravel and Vue folders separately.

---
