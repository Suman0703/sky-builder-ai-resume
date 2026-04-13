# Sky Builder - Frontend

This is the client-side application for **Sky Builder**, an AI-powered resume generation platform. Built with a modern tech stack, it provides users with a seamless, real-time experience to create professional, ATS-friendly resumes effortlessly.

## 🚀 Tech Stack

* **Framework:** React.js powered by Vite (for lightning-fast compilation)
* **Styling:** Tailwind CSS (custom blue, white, and black theme)
* **Routing:** React Router v6
* **State Management:** React Context API (Auth & Theme)

## ✨ Key Features

* **11-Step Guided Builder:** A smooth UI taking users through Personal Info, Career Objective, Education, Experience, Skills, Projects, Achievements, Certifications, Languages, Hobbies, and Summary.
* **Real-Time Live Preview:** See exactly how the resume looks as you type.
* **AI-Powered Summary:** Integrates with Groq's LLaMA model (via backend) to generate instant, professional summary suggestions based on user input.
* **Smart Theming:** Light mode by default with a seamless Dark Mode toggle.
* **One-Click Export:** Download the finished resume directly as a beautifully formatted PDF.
* **Secure Access:** Protected routes requiring JWT authentication to build and save resumes.

## 🛠️ Local Setup Instructions

Follow these steps to run the frontend on your local machine:

**1. Install dependencies**
Make sure you are in the `client` directory, then run:
```bash
npm install