# ✅ Todo List App

A modern, simple, and responsive Todo List application built with Next.js 15, TypeScript, and MongoDB. Tasks can be organized into four different categories: Work, Education, Personal, and Study.

## 📋 Introduction

This is a **Todo List application** built with the latest Next.js 15 features. Users can create, read, update, and delete tasks without needing to register or log in. All tasks are stored persistently in MongoDB.

### Purpose
- Practice **Next.js 15 App Router** and modern React patterns
- Implement **Server Actions** for CRUD operations
- Use **TypeScript** for type safety
- Build a beautiful UI with **Shadcn/ui** and **TailwindCSS**

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS + Shadcn/ui |
| Database | MongoDB + Mongoose ODM |
| Validation | Zod |
| Form Management | React Hook Form |
| Backend Logic | Server Actions + API Routes |

## ✨ Features

- ✅ Add new tasks with title and description
- 📂 Categorize tasks into 4 groups:
  - 💼 Work
  - 📚 Education
  - 👤 Personal
  - 📖 Study
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- 📱 Fully responsive design (mobile & desktop)
- 💾 Persistent storage with MongoDB

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/todo-list-nextjs.git
cd todo-list-nextjs
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

**Edit .env.local and add your MongoDB connection string:**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open in browser**
```bash
http://localhost:3000
```

**Build for production**
```bash
npm run build
npm start
```

## 📸 Screenshots

Main Page 

![Main Page](public/todo-list-app.png)

## 📞 Contact

- **GitHub:** [amir-hosein-003](https://github.com/amir-hosein-003)