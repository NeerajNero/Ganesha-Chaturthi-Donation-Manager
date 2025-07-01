# 🕉️ Ganesh Chaturthi Donation Manager

A full-stack web app to manage festival donations and expenses with full transparency and real-time stats. Built with **Next.js 14 App Router**, **Prisma**, **PostgreSQL**, **shadcn/ui**, and **Cloudinary**.

This app was created to streamline donation tracking for our 30-day Ganesh Chaturthi event, ensuring **zero data loss**, **complete transparency**, and **real-time updates**. From design to deployment, every decision focused on simplicity, usability, and learning modern full-stack patterns.

---

## ✨ Features

- 🔐 Authentication using Google OAuth & credentials (Auth.js)
- 💰 Add and track donations with donor name, mode, and optional receipt image
- 📉 Record expenses categorized as major, minor, or internal
- 🧾 Upload & preview donation and expense receipts via Cloudinary
- 📊 Dashboard showing total donations, total expenses, and current balance
- 🌐 Public and admin dashboard views with access control
- 📢 Telegram bot integration to send alerts for UPI donations
- 🪔 Festival-themed UI with Tailwind CSS and shadcn/ui
- 🔎 Pagination-ready APIs with `limit` support
- ⚙️ Image optimization using Next.js `<Image />`

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** PostgreSQL (Neon for production), SQLite (local)
- **Auth:** Auth.js (NextAuth)
- **File Uploads:** Cloudinary
- **Messaging:** Telegram Bot API
- **Deployment:** Vercel

---

## 🧠 What I Learned

This project was a deep dive into real-world full-stack application building. Key learnings:

- 🔑 **Auth.js & Session Handling:** Learned how to integrate Google OAuth and handle sessions across server/client boundaries.
- 📦 **Database Modeling with Prisma:** Understood how to build flexible schemas and use relational mapping.
- 🔁 **Switching DB Providers:** Faced and solved migration issues while switching from SQLite to PostgreSQL for deployment.
- 📤 **Cloudinary Uploads:** Integrated secure server-side file upload streams using buffers and helper functions.
- 💬 **Telegram Integration:** Explored Bot APIs, sending conditional messages, and understanding chat IDs and tokens.
- 🧩 **API Route Design:** Built robust REST endpoints for donations, expenses, and statistics with error handling.
- 🎨 **UI Polishing:** Improved visual design and accessibility using `shadcn/ui` and festival-themed Tailwind gradients.
- 🐛 **Debugging Build Issues:** Resolved build errors related to ESLint rules, missing `image domains`, and type safety (`any` usage in Zod schemas).

---

## 🐞 Notable Debugging Challenges

- **Prisma Migration Error:** Resolved `P3019` error while changing from SQLite to PostgreSQL.
- **Cloudinary Stream Handling:** Learned to buffer file uploads and use `upload_stream` API properly.
- **Auth Session Misuse:** Fixed issues where `auth()` on the server didn't always return the right user — led to better session validation.
- **Next.js Image Optimization:** Handled `Invalid src prop` error by updating `next.config.js`.
- **Zod + React Hook Form Type Issues:** Replaced `any` types with precise Zod definitions to pass TypeScript and ESLint checks.

---

## 📁 File Structure (Simplified)

src/
├── app/
│ ├── api/ # API routes (donations, expenses, stats)
│ ├── addDonation/ # Add donation page
│ ├── dashboard/ # Public/Admin dashboard
├── components/
│ ├── addDonationForm.tsx
│ ├── donationList.tsx
│ ├── expenseList.tsx
│ └── FestivalNavbar.tsx
├── lib/
│ ├── auth.ts # Auth.js server helpers
│ ├── db.ts # Prisma Client
│ └── cloudinary.ts # Cloudinary config
├── prisma/
│ ├── schema.prisma
│ └── migration/

yaml
Copy
Edit

---

## ⚙️ Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/ganesh-donation-manager.git
cd ganesh-donation-manager
Install dependencies

bash
Copy
Edit
npm install
Set up .env file

env
Copy
Edit
DATABASE_URL="postgresql://..."
AUTH_SECRET="your-secret"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
TELEGRAM_BOT_TOKEN="..."
TELEGRAM_CHAT_ID="..."
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
Run database migrations

bash
Copy
Edit
npx prisma migrate dev
Run the development server

bash
Copy
Edit
npm run dev
🚀 Deployment
Frontend & API: Vercel

Database: Neon.tech (PostgreSQL serverless)

Image Storage: Cloudinary

Telegram Bot: Use BotFather to create & configure

📸 Screenshots
Add screenshots of the homepage, dashboard, add donation page, etc.

🙏 Acknowledgements
shadcn/ui

Auth.js

Prisma ORM

Telegram Bot API

Cloudinary Docs

📚 Future Improvements
🔒 Admin-only access for managing data

📈 Export donations/expenses to CSV

🧠 Sentiment tracking for public comments

📱 Mobile app using React Native (maybe)

💡 Why This Project?
I built this to solve a real-world problem during a festival and used the opportunity to learn modern full-stack tools, build a usable product, and improve my ability to debug, deploy, and polish real features end-to-end.

markdown
Copy
Edit
