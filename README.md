# 📄 ParseIQ

**ParseIQ** is a secure and fast PDF credit card statement parser.  
Upload your statements and automatically extract key data points like transaction info, card variant, billing cycle, payment due date, and total balance — all in seconds.

![ParseIQ Banner](https://sure-card-parser.vercel.app/favicon.ico)

---

## 🌟 Features

- 🔐 Secure PDF uploads (processed on backend, never stored)  
- 🧾 Parse credit card statements from multiple banks:
  - Kotak Mahindra Bank  
  - Flipkart Axis Bank  
  - HDFC Bank  
- 📊 Extract key data points automatically:
  - Transaction information  
  - Card variant & last 4 digits  
  - Billing cycle  
  - Payment due date  
  - Total balance  
- 💻 Dark-themed, responsive UI  
- ⚡ Fast parsing with a single PDF upload  
- 🌐 Works on mobile and desktop  

---

## 🚀 Live Demo  

👉 [Visit ParseIQ](https://sure-card-parser.vercel.app/)

---

## 🧰 Tech Stack

### Frontend
- React + TypeScript  
- Tailwind CSS  
- React Router  
- Framer Motion  

### Backend
- Node.js + Express  
- Python (PDF parsing helper)  
- Multer (file uploads)  

### Tools & Dev Environment
- VS Code  
- Vite  
- Postman / Thunder Client  
- ESLint + Prettier  
- Git + GitHub  

---

## 📸 Screenshots

| Upload Page | File Selected | Parsed Result |
|------------|---------------|---------------|
| ![Upload](https://via.placeholder.com/600x300?text=Upload+Page) | ![File Selected](https://via.placeholder.com/600x300?text=File+Selected) | ![Result](https://via.placeholder.com/600x400?text=Parsed+Result) |

> Replace placeholder images with actual screenshots from your app.

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js v18+  
- Python 3.x (for PDF parsing scripts)  

---

### Setup (Backend + Frontend)

```bash
# Backend
cd server
npm install
npm start

# Frontend
cd ../client
npm install
npm start
