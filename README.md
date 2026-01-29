# 🔐 Backend Authentication & Authorization API

A complete **Node.js + Express + PostgreSQL** backend project implementing  
**JWT-based Authentication**, **Role-Based Authorization (RBAC)**, and  
**Secure Password Recovery using OTP & Email**.

This project is built following **industry-standard backend architecture**  
using **Sequelize ORM**, **Migrations**, **Transactions**, and **Validation**.

---

## 🚀 Features

### 🔑 Authentication
- User Registration
- User Login (JWT)
- Change Password
- Forgot Password (OTP via Email)
- Reset Password using OTP

### 🛡 Authorization
- JWT Authentication Middleware
- Role-Based Access Control (User / Admin)
- Protected Routes
- Ownership-based access (`/me` APIs)

### 👤 User Management
- Get Logged-in User Profile
- Update Own Profile
- Delete Own Account
- Admin-only: Get All Users

### 🔐 Security Best Practices
- Password hashing using **bcrypt**
- OTP expiry handling
- Anti user-enumeration protection
- Database transactions for critical operations
- No sensitive data exposed in API responses

---

## 🧱 Tech Stack

| Technology | Usage |
|---------|------|
| Node.js | Runtime |
| Express.js | Web Framework |
| PostgreSQL | Database |
| Sequelize | ORM |
| JWT | Authentication |
| bcrypt | Password hashing |
| Zod | Request validation |
| Nodemailer | Email (OTP) |
| Sequelize CLI | Migrations & Seeders |

---

## 📁 Project Structure

backend/
├── migrations/
├── seeders/
├── src/
│ ├── config/
│ │ ├── database.js
│ │ └── mail.js
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── validators/
│ ├── app.js
│ └── server.js
├── .env
├── .sequelizerc
├── package.json
└── README.md


---

## 🔄 Authentication Flow

1. User registers → password is hashed & stored
2. User logs in → JWT token generated
3. Token sent in `Authorization: Bearer <token>`
4. JWT middleware verifies token
5. Role middleware checks permissions
6. Controller executes logic

---

## 📡 API Endpoints

### 🔐 Auth APIs
| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login & get JWT |
| PUT | `/api/auth/change-password` | Change password |
| POST | `/api/auth/forgot-password` | Send OTP |
| POST | `/api/auth/reset-password` | Reset password |

### 👤 User APIs
| Method | Endpoint | Access |
|------|--------|-------|
| GET | `/api/users/me` | Authenticated |
| PUT | `/api/users/me` | Authenticated |
| DELETE | `/api/users/me` | Authenticated |

### 🛡 Admin APIs
| Method | Endpoint | Access |
|------|--------|-------|
| GET | `/api/admin/users` | Admin only |

---

## ⚙️ Environment Variables

Create a `.env` file in root:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=backend_db
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_jwt_secret

MAIL_USER=your_email@gmail.com
MAIL_PASS=your_gmail_app_password
🛠 Setup & Run
1️⃣ Install dependencies
npm install
2️⃣ Run migrations
npx sequelize-cli db:migrate
3️⃣ Start server
npm run dev
🧪 Testing
Use Postman

Test auth first (register → login)

Use JWT token in headers

Test role-based routes with admin/user roles

🎓 Academic Note
This project demonstrates:

Backend Authentication

Authorization (RBAC)

Secure password handling

Industry-level backend architecture

Suitable for:

College Projects

Internship Submissions

Backend Learning Reference

👨‍💻 Author
Chirag
Backend Developer (Learning MERN Stack)

📜 License
This project is for educational purposes.