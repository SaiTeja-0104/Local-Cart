# Local Cart 🛒

**Bringing your neighborhood online. | Buy Fresh, Authentic and Local - All in one place**

**Local Cart** is a full-stack marketplace project with separate Client (user storefront), Admin (vendor/admin dashboard), and Server (REST API) apps. It supports vendor registration, product listing, shopping cart, Stripe payments, Cloudinary media uploads, and per-vendor order management.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Requirements](#requirements)
- [Setup & Run (Local)](#setup--run-local)
  - [Server](#server)
  - [Client](#client)
  - [Admin](#admin)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Adding Screenshots](#adding-screenshots)
- [License](#license)

---


## Project Structure 🔧

Top-level folders:

- `Client/` — React + Vite storefront (end-user app)
- `Admin/` — React + Vite admin/vendor dashboard
- `Server/` — Node.js + Express REST API

Inside `Server/` you will find routes, models, middleware, and cloudinary config.

---

## Tech Stack 🧰

- Frontend: React (Vite), Tailwind CSS, React Router
- Backend: Node.js, Express
- Database: MongoDB (via Mongoose)
- Auth: JWT + bcrypt
- Payments: Stripe Checkout
- Media: Cloudinary (multer + multer-storage-cloudinary)

---

## Features ✨

- User signup / login / profile management
- Vendor signup & vendor dashboard
- Product listing and details
- Shopping cart persisted in DB
- Order creation with per-vendor status tracking
- Stripe checkout and server-side session validation
- Image uploads to Cloudinary

---

## Requirements ⚙️

- Node.js (>= 16 recommended)
- npm or yarn
- MongoDB (Atlas or local)
- Cloudinary account
- Stripe account for payments

---

## Setup & Run (Local) 🚀

General steps (run one terminal per app):

1. Clone repository
2. Install dependencies and provide environment variables

### Server

```bash
cd Server
npm install
# create .env (see sample below)
node server.js
# or for development use nodemon (optional)
# npx nodemon server.js
```

Server default port: `3000` (or set `PORT` in `.env`). API root: `http://localhost:3000`.

### Client (User storefront)

```bash
cd Client
npm install
# create .env (see sample below)
npm run dev
# or build for production
npm run build
```

Vite dev server runs on the port printed by `npm run dev` (usually `5173`).

### Admin (Vendor / Admin dashboard)

```bash
cd Admin
npm install
# create .env (see sample below)
npm run dev
```

---

## Environment Variables (.env examples) 🔐

Server `Server/.env` (create this file):

```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/localcart
SECRET_KEY=some_long_random_secret
PORT=3000
STRIPE_SECRET_KEY=sk_test_...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Client `.env` (create `Client/.env`):

```
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_CLOUD_UPLOAD=https://api.cloudinary.com/v1_1/<cloud_name>/image/upload
# you may optionally set a backend URL env var if you refactor Context to use it
# VITE_BACKEND_URL=http://localhost:3000
```

Admin `.env` can mirror `Client/.env` if the admin app uploads files or uses Stripe.

> Important: Never commit secrets to source control. Use `.env.local` or CI/CD secrets for deployments.

---

## API Overview 🧭

Key endpoints (mounted in `Server/server.js`):

- `POST /user/signup` — create account (returns JWT)
- `POST /user/login` — login (returns JWT)
- `GET /user/profile` — protected
- `GET /product/` — list products
- `GET /product/:id` — product details
- `DELETE /product/:id` — vendor-only delete
- `POST /cart/add` — add to cart (protected)
- `GET /cart/` — get user cart (protected)
- `PUT /cart/update` — update item quantity (protected)
- `DELETE /cart/remove/:productId` — remove item (protected)
- `POST /order/create` — create order (protected)
- `GET /order/my` — user order history
- `GET /order/vendor` — vendor-specific order list
- `PUT /order/status/:orderId` — vendor updates status
- `POST /payment/create-checkout-session` — create Stripe session
- `GET /payment/check-session` — verify Stripe session status

(See `Server/routes/` for precise behavior and accepted payloads.)

---

## Screenshots Gallery 📸

All screenshots live in `docs/screenshots/`. Below are the current images from that folder (click to view in the repo or on GitHub):

- **Home**

  ![Home](/docs/screenshots/Home.png)
  *Home / storefront overview*

- **All Products**

  ![All Products](/docs/screenshots/All_Products.png)
  *List of all products and categories*

- **Product**

  ![Product](/docs/screenshots/Product.png)
  *Product detail page with add-to-cart*

- **Cart**

  ![Cart](/docs/screenshots/Cart.png)
  *Shopping cart and checkout flow initiation*

- **Payment**

  ![Payment](/docs/screenshots/Payment.png)
  *Stripe checkout / payment confirmation*

- **Orders**

  ![Orders](/docs/screenshots/Orders.png)
  *User order history / order details*

- **Store**

  ![Store](/docs/screenshots/Store.png)
  *Vendor store listing*

- **Vendor - Dashboard**

  ![Vendor](/docs/screenshots/Vendor.png)
  *Vendor portal landing page*

- **Vendor - Add Items**

  ![Vendor Add Items](/docs/screenshots/Vendor_addItems.png)
  *Form to add new products*

- **Vendor - Items**

  ![Vendor Items](/docs/screenshots/Vendor_Items.png)
  *Vendor product management view*

- **Vendor - Orders**

  ![Vendor Orders](/docs/screenshots/Vendor_ordes.png)
  *Vendor-specific order list and status updates*

- **About**

  ![About](/docs/screenshots/About.png)
  *About page*

- **Contact**

  ![Contact](/docs/screenshots/Contact.png)
  *Contact / support page*

---

## License 📄

This project does not include a license file. Consider adding an `LICENSE` (e.g., MIT) if you plan to make it open-source.

---

