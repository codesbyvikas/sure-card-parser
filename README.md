# 📄 ParseIQ

**ParseIQ** is a secure and fast PDF credit card statement parser.  
Upload your statements and automatically extract key data points like transaction info, card variant, billing cycle, payment due date, and total balance — all in seconds.

---

## 🌟 Features

- 🔐 **Secure PDF uploads** (processed on backend, never stored)  
- 🧾 **Supports multiple banks:**
  - Kotak Mahindra Bank  
  - Flipkart Axis Bank  
  - HDFC Bank  
- 📊 **Extracts key data points automatically:**
  - Transaction details  
  - Card variant & last 4 digits  
  - Billing cycle  
  - Payment due date  
  - Total balance  
- 💻 **Dark-themed, responsive UI**  
- ⚡ **Single PDF upload for instant results**  
- 🌐 **Works seamlessly on mobile and desktop**

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
- Multer (for secure file uploads)

### Tools & Dev Environment
- VS Code  
- Vite  
- Postman / Thunder Client  
- ESLint + Prettier  
- Git + GitHub  

---

## 📸 Screenshots

| Upload Page | File Selected | Parsed Result |
|--------------|---------------|---------------|
| ![Upload](https://github.com/codesbyvikas/sure-card-parser/blob/main/client/src/assets/screenshots/1.png?raw=true) | ![File Selected](https://github.com/codesbyvikas/sure-card-parser/blob/main/client/src/assets/screenshots/2.png?raw=true) | ![Result](https://github.com/codesbyvikas/sure-card-parser/blob/main/client/src/assets/screenshots/3.png?raw=true) |

> Ensure these images exist in your repo under `client/src/assets/screenshots/`.

---

## 🧑‍💻 Getting Started

### Prerequisites
- Node.js v18+  
- Python 3.x (for PDF parsing)  

---

### ⚙️ Backend Setup

```bash
# Navigate to backend
cd server

# Install dependencies
npm install

# Create .env file
touch .env
