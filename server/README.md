# Sky Builder - Backend API

This is the server-side backend for **Sky Builder**, an AI-powered MERN stack resume generation platform. It handles secure user authentication, database management, and securely proxies AI requests to generate intelligent resume summaries.

## 🚀 Tech Stack

* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs (for password hashing)
* **AI Integration:** Groq API (LLaMA model for ultra-fast text generation)

## ✨ Key Features

* **Secure Authentication:** Complete signup and login flows with hashed passwords and JWT-protected routes.
* **Database Management:** MongoDB schemas for storing user profiles and saving multiple resumes per user.
* **AI Proxy Server:** Securely handles requests to the Groq API from the backend, ensuring API keys are never exposed to the client browser.
* **RESTful Architecture:** Clean, modular routing for authentication, AI generation, and resume saving/loading.

## 🛠️ Local Setup Instructions

Follow these steps to run the backend server on your local machine:

**1. Install dependencies**
Make sure you are in the `server` directory, then run:
```bash
npm install