# HRMS Lite

HRMS Lite is a lightweight, web-based Human Resource Management System built as part of a full-stack coding assignment.

The application allows an admin to manage employee records and track daily attendance through a clean, professional interface.  
The system focuses on essential HR operations with a simple and usable design.

---

## 🌐 Live Application

Frontend (Admin UI):  
👉 [https://YOUR-FRONTEND.vercel.app](https://hr-managemet-system.vercel.app/)

Backend API (FastAPI):  
👉 [https://YOUR-BACKEND.onrender.com](https://hrms-lite-backend-h1w7.onrender.com/)



---

## 📂 Repositories

- **Backend Repository:**  
 [ https://github.com/YOUR_USERNAME/hrms-lite-backend](https://github.com/choudharymehakk/hrms-lite-backend.git)

---

## ✨ Features

### Employee Management
- Add a new employee with:
  - Employee ID (unique)
  - Full Name
  - Email Address
  - Department
- View list of all employees

### Attendance Management
- Mark daily attendance (Present / Absent)
- View attendance records for each employee

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- Axios
- CSS (custom styling + animations)

### Backend
- FastAPI
- Python
- SQLAlchemy
- SQLite
- Uvicorn

### Deployment
- Frontend: **Vercel**
- Backend: **Render**

---

## 🧩 Application Flow

1. Admin uses the frontend UI to manage employees and attendance.
2. Frontend communicates with backend via RESTful APIs.
3. Backend handles validation, persistence, and business logic.
4. Data is stored using SQLite for simplicity.

---

## 🏃 Run Frontend Locally

```bash
npm install
npm run dev
