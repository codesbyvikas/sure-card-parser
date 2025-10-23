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

## 📁 Folder Structure

```bash
ParseIQ/
├── client/              # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   └── .env
├── server/              # Express + Python backend
│   ├── routes/
│   ├── scripts/
│   ├── .env
│   └── server.js
└── README.md
```

---

## 📸 Screenshots

| Upload Page | File Selected | Parsed Result |
|--------------|---------------|---------------|
| ![Upload](https://github.com/codesbyvikas/sure-card-parser/blob/main/client/src/assets/screenshots/1.png?raw=true) | ![File Selected](https://github.com/codesbyvikas/sure-card-parser/blob/main/client/src/assets/screenshots/2.png?raw=true) | ![Result](https://github.com/codesbyvikas/sure-card-parser/blob/main/client/src/assets/screenshots/3.png?raw=true) |

---

## 🧑‍💻 Getting Started

### Prerequisites
- Node.js v18+  
- Python 3.x (for PDF parsing)

---

### 🖥️ Backend Setup

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create a .env file in server directory
# Example:
# PORT=5000
# PYTHON_PATH=python
# FRONTEND_URL=http://localhost:5173

# Start backend server
npm start
```

---

### 💻 Frontend Setup

```bash
# Navigate to client folder
cd ../client

# Install dependencies
npm install

# Create a .env file in client directory
# Example:
# VITE_BACKEND_URL=http://localhost:5000

# Start frontend dev server
npm run dev
```

---

## 🧠 Notes

- PDFs are processed **securely and temporarily** (not stored).  
- Python helper uses **pdfplumber** for parsing logic.  
- Backend communicates with Python script via **child_process.spawn**.  
- UI uses **Tailwind + Framer Motion** for animation and dark theme.

---

## 👨‍💻 Author

**Vikas Kewat**  
[GitHub](https://github.com/codesbyvikas) • [LinkedIn](https://www.linkedin.com/in/vikaskewat) 

---

## 🪪 License

MIT License © 2025 [Vikas Kewat](https://github.com/codesbyvikas)
