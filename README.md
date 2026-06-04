# SwiftCart - Full Stack E-Commerce Store

SwiftCart is a modern full-stack e-commerce store built with **TypeScript on both frontend and backend**.  
It includes authentication, product browsing, cart management, checkout, orders, admin dashboard, product management, and order management.

The project is built as an interview-ready portfolio project with a clean professional folder structure and a responsive modern UI.

---

## Live Project Status

Current development status:

- Backend API completed
- Frontend customer store completed
- Cart and checkout completed
- Customer order pages completed
- Admin dashboard completed
- Admin product management completed
- Admin order management completed
- Deployment preparation pending

---

## Tech Stack

### Frontend

- React.js
- TypeScript
- React Router
- Axios
- Context API
- Tailwind CSS
- lucide-react
- Vite

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- cors

---

## Main Features

### Customer Features

- Modern responsive landing page
- Product listing page
- Product search
- Product category filter
- Product brand filter
- Product price filter
- Product details page
- Add to cart
- Update cart quantity
- Remove cart items
- Cart persistence with localStorage
- Checkout with shipping address
- Cash on Delivery payment flow
- Create order
- View my orders
- View order details
- Register and login

### Admin Features

- Admin dashboard
- Total products count
- Total users count
- Total orders count
- Total sales
- Recent orders
- Manage products
- Create product
- Edit product
- Delete product
- Manage all orders
- Update order status
- Mark order as paid

### Authentication Features

- Register user
- Login user
- JWT token generation
- Password hashing
- Protected routes
- Admin-only routes
- User/admin role system

---

## Project Structure

```txt
swiftcart/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts
│   │   │   └── env.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── admin.controller.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── order.controller.ts
│   │   │   └── product.controller.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── notFound.middleware.ts
│   │   │
│   │   ├── models/
│   │   │   ├── order.model.ts
│   │   │   ├── product.model.ts
│   │   │   └── user.model.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── admin.routes.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── order.routes.ts
│   │   │   └── product.routes.ts
│   │   │
│   │   ├── seed/
│   │   │   └── products.seed.ts
│   │   │
│   │   ├── services/
│   │   │   └── token.service.ts
│   │   │
│   │   ├── types/
│   │   │   └── express.d.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── apiError.ts
│   │   │   └── asyncHandler.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── assets/
    │   │
    │   ├── components/
    │   │   ├── admin/
    │   │   ├── cart/
    │   │   ├── common/
    │   │   ├── layout/
    │   │   └── product/
    │   │
    │   ├── context/
    │   │   ├── AuthContext.tsx
    │   │   └── CartContext.tsx
    │   │
    │   ├── hooks/
    │   │   ├── useAuth.ts
    │   │   └── useCart.ts
    │   │
    │   ├── layouts/
    │   │   ├── AdminLayout.tsx
    │   │   └── PublicLayout.tsx
    │   │
    │   ├── pages/
    │   │   ├── admin/
    │   │   │   ├── AdminCreateProduct.tsx
    │   │   │   ├── AdminDashboard.tsx
    │   │   │   ├── AdminEditProduct.tsx
    │   │   │   ├── AdminOrders.tsx
    │   │   │   └── AdminProducts.tsx
    │   │   │
    │   │   ├── auth/
    │   │   │   ├── Login.tsx
    │   │   │   └── Register.tsx
    │   │   │
    │   │   ├── cart/
    │   │   │   ├── Cart.tsx
    │   │   │   └── Checkout.tsx
    │   │   │
    │   │   ├── orders/
    │   │   │   ├── MyOrders.tsx
    │   │   │   └── OrderDetails.tsx
    │   │   │
    │   │   └── public/
    │   │       ├── Home.tsx
    │   │       ├── ProductDetails.tsx
    │   │       └── Products.tsx
    │   │
    │   ├── routes/
    │   │   ├── AdminRoute.tsx
    │   │   ├── AppRoutes.tsx
    │   │   └── ProtectedRoute.tsx
    │   │
    │   ├── services/
    │   │   ├── admin.service.ts
    │   │   ├── api.ts
    │   │   ├── auth.service.ts
    │   │   ├── order.service.ts
    │   │   └── product.service.ts
    │   │
    │   ├── types/
    │   │   ├── admin.types.ts
    │   │   ├── auth.types.ts
    │   │   ├── cart.types.ts
    │   │   ├── order.types.ts
    │   │   └── product.types.ts
    │   │
    │   ├── utils/
    │   │   ├── constants.ts
    │   │   └── formatCurrency.ts
    │   │
    │   ├── App.tsx
    │   ├── index.css
    │   └── main.tsx
    │
    ├── .gitignore
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

---

## Backend Setup

### 1. Go to backend folder

```bash
cd swiftcart/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

Create a `.env` file inside the `backend` folder:

```env
PORT=5005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=swiftcart_super_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

> We use `PORT=5005` because port `5000` is busy on the development machine.

### 4. Start backend in development

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5005
```

### 5. Build backend

```bash
npm run build
```

### 6. Start backend production build

```bash
npm start
```

### 7. Seed sample products

```bash
npm run seed:products
```

---

## Frontend Setup

### 1. Go to frontend folder

```bash
cd swiftcart/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create frontend environment file

Create `.env` inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5005/api
```

### 4. Start frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

### 5. Build frontend

```bash
npm run build
```

### 6. Preview production build

```bash
npm run preview
```

---

## Backend Scripts

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "seed:products": "ts-node-dev --transpile-only src/seed/products.seed.ts"
}
```

---

## Frontend Scripts

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview"
}
```

---

## API Routes

### Auth Routes

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get logged-in user | Yes |

### Product Routes

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| GET | `/api/products` | Get products | No |
| GET | `/api/products/:id` | Get product details | No |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

### Order Routes

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| POST | `/api/orders` | Create order | User |
| GET | `/api/orders/my-orders` | Get logged-in user's orders | User |
| GET | `/api/orders/:id` | Get order details | User/Admin |
| GET | `/api/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |
| PUT | `/api/orders/:id/pay` | Mark order as paid | Admin |

### Admin Routes

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| GET | `/api/admin/stats` | Get admin dashboard stats | Admin |

---

## Product Query Filters

The products endpoint supports query filters:

```txt
GET /api/products?search=iphone
GET /api/products?category=Electronics
GET /api/products?brand=Apple
GET /api/products?minPrice=100&maxPrice=500
GET /api/products?search=phone&category=Electronics
```

---

## Example Local URLs

```txt
Backend Root: http://localhost:5005
Backend API:  http://localhost:5005/api
Frontend:     http://localhost:5173
```

---

## Test User Flow

```txt
1. Register a user
2. Login
3. Browse products
4. Open product details
5. Add product to cart
6. Update quantity in cart
7. Checkout
8. Place order
9. View order details
10. View my orders
```

---

## Test Admin Flow

```txt
1. Change a user's role to "admin" in MongoDB
2. Logout
3. Login again
4. Open /admin
5. View dashboard stats
6. Manage products
7. Create product
8. Edit product
9. Delete product
10. Manage orders
11. Update order status
12. Mark order as paid
```

---

## Deployment Notes

### Backend on Render

Recommended Render settings:

```txt
Environment: Node
Build Command: npm install && npm run build
Start Command: npm start
```

Environment variables:

```env
NODE_ENV=production
PORT=5005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend on Vercel

Recommended Vercel settings:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Environment variable:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

For React Router on Vercel, add `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

---

## Git Ignore Notes

Do not push:

```txt
node_modules/
dist/
.env
.env.local
```

---

## Interview Highlights

SwiftCart demonstrates:

- Full-stack TypeScript development
- Clean frontend architecture
- Clean backend architecture
- REST API design
- MongoDB data modeling
- Mongoose relationships
- JWT authentication
- Role-based authorization
- Protected routes
- Admin-only APIs
- Product CRUD
- Cart state management
- localStorage persistence
- Checkout flow
- Order management
- Responsive UI
- Modern e-commerce design
- Deployment-ready structure

---

## Future Improvements

- Stripe payment integration
- Cloudinary image upload
- Product reviews
- Wishlist
- Coupons
- Email order confirmation
- User profile page
- Admin user management
- Pagination
- Sorting
- Dark mode
- Inventory alerts
- Sales charts

---

## Author

Muhammad Talha

GitHub: `@codewithtalha`
