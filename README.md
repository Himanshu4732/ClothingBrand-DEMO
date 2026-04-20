# VOIDHAUS™ — Premium E-Commerce Platform

A high-fidelity, full-stack e-commerce platform built for the **VOIDHAUS** clothing brand. Features a glassmorphic dark UI, animated admin dashboard, interactive Easter Egg, and a complete checkout flow.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| State | Redux Toolkit |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT (Access + Refresh Tokens) |
| Payments | Stripe |

---

## Project Structure

```
ClothingBrand_DEMO/
├── client/          # React frontend (Vite)
│   ├── public/
│   │   └── images/  # Editorial & product images
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── store/   # Redux slices
│       └── services/
└── server/          # Node.js + Express backend
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── utils/
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)
- [Stripe](https://stripe.com) account (for payment keys)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Himanshu4732/ClothingBrand-DEMO.git
cd ClothingBrand-DEMO
```

---

### 2. Set up the Server

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```bash
cp .env.example .env
```

Then open `server/.env` and fill in your values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/voidhaus?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

Start the server:

```bash
npm run dev
```

Server runs on **http://localhost:5000**

---

### 3. Set up the Client

```bash
cd ../client
npm install
```

Create a `.env` file inside `client/`:

```bash
cp .env.example .env
```

Fill in `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

Start the client:

```bash
npm run dev
```

Client runs on **http://localhost:5173**

---

## Key Features

- 🌑 **Dark Glassmorphic UI** — Floating pill navbar, `backdrop-blur` cards, ambient glows
- ✨ **Easter Egg** — Click the sparkles icon in the navbar for a smooth ambient particle effect
- 🛍️ **Shop Page** — Paginated product grid with pill-shaped category filters
- 🛒 **Checkout Flow** — 3-step animated checkout (Shipping → Delivery → Payment)
- 📊 **Admin Dashboard** — Complex analytics with AreaChart, RadarChart, BarChart, and a live activity feed
- 🧲 **Magnetic Buttons** — Premium hover cursor-pull effect on CTA buttons
- 🌱 **Brand Sections** — Editorial Brand Origin and Sustainable Engineering sections on the homepage

---

## Admin Access

Navigate to `/admin` after logging in with an admin account to access the **Core Command** dashboard.

---

## Environment Variables Reference

### `server/.env`

| Key | Description |
|---|---|
| `PORT` | Port the server listens on |
| `NODE_ENV` | `development` or `production` |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `STRIPE_SECRET_KEY` | Stripe secret key (from dashboard) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |

### `client/.env`

| Key | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (safe for frontend) |

---

## License

MIT — Feel free to use, fork, and build on top of this project.
