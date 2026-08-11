# Blog Backend API

A RESTful backend API for a blog application built with **Node.js, Express.js, MongoDB, and Mongoose**.

The project focuses on building a structured and secure backend with **JWT authentication, role-based authorization, request validation, password hashing, and a service/controller architecture**.

## ✨ Features

* User registration and login
* JWT-based authentication
* Protected user profile endpoint
* Role-based authorization (`admin` / `user`)
* Admin-only category creation
* Request validation using Joi
* Password hashing using bcrypt
* MongoDB integration with Mongoose
* Service and controller separation
* Environment variable support
* Docker Compose configuration

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcrypt**
* **Joi**
* **Docker**
* **Nodemon**

## 📁 Project Structure

```text
backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── categoryController.js
│   │
│   ├── dto/
│   │   ├── authDto.js
│   │   └── categoryDto.js
│   │
│   ├── helpers/
│   │   └── generateTokens.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── authorizeMiddleware.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   ├── categoryModel.js
│   │   └── postModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── categoryRoutes.js
│   │
│   └── services/
│       ├── authService.js
│       └── categoryService.js
│
├── .gitignore
├── docker-compose.yml
├── package.json
├── package-lock.json
└── server.js
```

## 🏗️ Architecture

The application follows a layered backend architecture:

```text
Client
  │
  ▼
Routes
  │
  ▼
Middleware
  │
  ├── Authentication
  ├── Authorization
  └── Validation
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ▼
Models
  │
  ▼
MongoDB
```

### Routes

Define API endpoints and connect them with the appropriate middleware and controllers.

### Middleware

Handles:

* JWT authentication
* Role-based authorization
* Request validation and sanitization

### Controllers

Handle HTTP requests and responses.

### Services

Contain the application's business logic and database operations.

### Models

Define MongoDB schemas using Mongoose.

## 🔐 Authentication

Authentication is implemented using **JSON Web Tokens (JWT)**.

After successful login, the API returns a JWT containing the user's ID and role.

Protected endpoints require the token in the request header:

```http
Authorization: Bearer <your_token>
```

The token currently expires after **15 minutes**.

## 👤 Authentication API

### Register

```http
POST /api/auth/signup
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Successful response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "USER_ID",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

The response contains a JWT token that can be used to access protected routes.

### Get Profile

```http
GET /api/auth/profile
```

Authentication required.

Header:

```http
Authorization: Bearer <your_token>
```

## 🏷️ Category API

### Create Category

```http
POST /api/categories
```

Authentication required.

Only users with the `admin` role can create categories.

Request body:

```json
{
  "name": "Technology"
}
```

The category name must be between **2 and 30 characters**.

## 🗃️ Data Models

### User

The user model contains:

```text
name
email
password
role
isVerified
emailVerificationToken
refreshToken
resetPasswordToken
resetPasswordExpiry
createdAt
updatedAt
```

Supported roles:

```text
user
admin
```

Passwords are hashed using **bcrypt** before being stored.

### Category

```text
name
createdAt
updatedAt
```

Category names are unique.

### Post

The project also defines a post model with:

```text
title
content
author
category
createdAt
updatedAt
```

Posts reference both the `User` and `Category` models using MongoDB ObjectIds.

> Post routes and controllers are not implemented yet.

## ✅ Request Validation

Incoming request bodies are validated using **Joi**.

Invalid requests return a structured response containing the validation errors.

Example:

```json
{
  "success": false,
  "errors": [
    "\"email\" must be a valid email"
  ]
}
```

Unknown fields are stripped from validated request bodies.

## 🔑 Environment Variables

Create a `.env` file in the backend root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Environment variables

| Variable     | Description                    |
| ------------ | ------------------------------ |
| `PORT`       | Port on which the server runs  |
| `MONGO_URI`  | MongoDB connection string      |
| `JWT_SECRET` | Secret used to sign JWT tokens |

> Never commit your `.env` file or expose your JWT secret and database credentials.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hasanfattamd/blog-backend.git
cd blog-backend
```

If the backend branch is being used:

```bash
git checkout backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the development server

```bash
npm run dev
```

The server will start using Nodemon.

## 🐳 Docker

The project also includes a `docker-compose.yml` configuration for running the backend environment with Docker.

```bash
docker compose up
```

To stop the containers:

```bash
docker compose down
```

## 📡 API Overview

| Method | Endpoint            | Auth | Role  | Description                      |
| ------ | ------------------- | ---- | ----- | -------------------------------- |
| `GET`  | `/`                 | No   | —     | Check server status              |
| `POST` | `/api/auth/signup`  | No   | —     | Register a user                  |
| `POST` | `/api/auth/login`   | No   | —     | Login user                       |
| `GET`  | `/api/auth/profile` | Yes  | Any   | Get authenticated user's profile |
| `POST` | `/api/categories`   | Yes  | Admin | Create a category                |

## 🧪 Development

Run the application in development mode:

```bash
npm run dev
```

The project uses **Nodemon** to automatically restart the server whenever files change.

## 🔮 Future Improvements

Planned functionality can include:

* Blog post CRUD operations
* Refresh token authentication
* Email verification
* Password reset
* Image/file uploads
* Pagination and filtering
* Search functionality
* Public blog post endpoints
* API documentation with Swagger/OpenAPI
* Automated testing
* Production deployment

## 👨‍💻 Author

**Hasan Fattamd**

GitHub: https://github.com/hasanfattamd

---

Built with Node.js, Express, MongoDB and a focus on clean backend architecture.
