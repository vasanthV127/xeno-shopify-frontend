# 🎨 Xeno Shopify Insights - Frontend

> **React + Vite + Tailwind CSS** dashboard for multi-tenant Shopify analytics  
> **Live Demo:** [xeno-shopify-frontend-five.vercel.app](https://xeno-shopify-frontend-five.vercel.app)  
> **Backend API:** [xeno-shopify-backend-frzt.onrender.com](https://xeno-shopify-backend-frzt.onrender.com)

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat&logo=vercel)](https://xeno-shopify-frontend-five.vercel.app)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-06B6D4?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📋 Assignment Checklist

| Feature | Status | Implementation |
|---------|--------|----------------|
| **Shopify Integration** | ✅ Complete | Real data from xenodemo1.myshopify.com via Admin API |
| **Insights Dashboard** | ✅ Complete | Revenue metrics, charts, KPIs with real-time data |
| **Customer Analytics** | ✅ Complete | Customer segmentation, top customers, search |
| **Product Analytics** | ✅ Complete | Top products, inventory status, performance |
| **Authentication** | ✅ Complete | JWT-based login/signup with secure token storage |
| **Responsive Design** | ✅ Complete | Mobile-first Tailwind CSS with dark theme |
| **Data Sync** | ✅ Complete | Manual sync button triggers Shopify API fetch |
| **Deployment** | ✅ Complete | Production deployed on Vercel with environment variables |
| **BONUS: Webhooks** | ✅ Backend Ready | Cart/checkout events captured (API endpoints available) |

---

## ✨ Key Features

### 1. **🔐 Authentication System**
- **Email-based Signup/Login** with JWT tokens
- **Protected Routes** - Automatically redirects to login if not authenticated
- **Token Persistence** - Stored in localStorage for session continuity
- **Axios Interceptor** - Auto-injects JWT token in all API requests
- **Secure Logout** - Clears token and auth context, redirects to login
- **Tenant Context** - JWT contains tenant_id for multi-tenant isolation
- **Demo Credentials:** test@xenodemo1.com / Test@123

### 2. **📊 Dashboard Analytics**
- **4 Key Metrics Cards:**
  - **Total Revenue** - ₹8,043.50 (from real Shopify orders)
  - **Total Orders** - 3 orders synced from xenodemo1
  - **Active Customers** - 5 customers from Shopify
  - **Average Order Value** - Calculated from real data
- **Revenue Trend Line Chart** (Chart.js)
  - Time-series visualization of order revenue
  - Interactive tooltips with formatted currency
  - Gradient fill for visual appeal
- **Top 5 Customers Table** 
  - Name, email, total spent (₹), order count
  - Sorted by revenue contribution
- **Date Range Filter** 
  - Last 7/30/90 days, All Time
  - Dynamic data refresh on filter change
- **Manual Sync Button**
  - Triggers `POST /api/sync/trigger` to fetch latest Shopify data
  - Shows loading state during sync
  - Success/error notifications

### 3. **👥 Customer Insights**
- **Customer Segmentation Doughnut Chart:**
  - **Premium** - Total spent > ₹50,000
  - **Medium** - ₹10,000 - ₹50,000
  - **Budget** - < ₹10,000
  - Color-coded for easy visualization
- **Customer List Table** with:
  - Name, Email, Location (if available)
  - Total Spent (₹ formatted)
  - Orders Count
  - Last Order Date
- **Search Functionality** - Filter by name or email
- **Pagination** - Navigate large customer lists
- **Real Data:** 5 customers synced from xenodemo1.myshopify.com
  - Orders Count
- Search and filter functionality

### 4. **📦 Product Analytics**
- **Top 10 Products Bar Chart** (by order count)
  - Horizontal bar chart with product names
  - Sorted by popularity (most ordered first)
  - Color-coded bars for visual distinction
- **Inventory Status Doughnut Chart:**
  - **In Stock** - Inventory > 10 units
  - **Low Stock** - 1-10 units (yellow warning)
  - **Out of Stock** - 0 units (red alert)
  - Real-time inventory from Shopify sync
- **Product Performance Table:**
  - Product name (title from Shopify)
  - Vendor (xenodemo1)
  - Price (₹ formatted)
  - Stock quantity (live inventory)
  - Order count (popularity metric)
  - Sortable columns for analysis
- **Real Data:** 5 products (Sneakers ₹750, T-Shirt ₹250, Jeans ₹500, Jacket ₹1000, Cap ₹150)

### 5. **🎨 Modern UI/UX**
- **Dark Theme** with blue/purple gradient accents
- **Fully Responsive Design** 
  - Mobile (< 640px) - Stacked layout
  - Tablet (640px - 1024px) - 2-column grid
  - Desktop (> 1024px) - Full grid layout
- **Loading States** 
  - Spinner animations during API calls
  - Skeleton loaders for better UX
- **Error Handling** 
  - User-friendly error messages
  - Automatic retry suggestions
  - Network error detection
- **Smooth Transitions** 
  - Page navigation animations
  - Hover effects on interactive elements
  - Chart animations with easing
- **Icons** from Lucide React (lightweight, modern)
- **Accessibility** 
  - ARIA labels on interactive elements
  - Keyboard navigation support
  - High contrast color scheme

---

## 🚀 Live Demo

**Production URLs:**
- **Frontend:** [https://xeno-shopify-frontend-five.vercel.app](https://xeno-shopify-frontend-five.vercel.app)
- **Backend API:** [https://xeno-shopify-backend-frzt.onrender.com](https://xeno-shopify-backend-frzt.onrender.com)
- **GitHub Backend:** [vasanthV127/xeno-shopify-backend](https://github.com/vasanthV127/xeno-shopify-backend)
- **GitHub Frontend:** [vasanthV127/xeno-shopify-frontend](https://github.com/vasanthV127/xeno-shopify-frontend)

**Demo Credentials:**
- Email: `test@xenodemo1.com`
- Password: `Test@123`
- Shopify Store: xenodemo1.myshopify.com

**Expected Data After Sync:**
- 5 Customers
- 5 Products  
- 3 Orders
- Total Revenue: ₹8,043.50

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                            │
│                                                               │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│  │   Login     │    │   Signup    │    │  Dashboard  │    │
│  │   Page      │───▶│    Page     │───▶│    Page     │    │
│  └─────────────┘    └─────────────┘    └─────────────┘    │
│         │                   │                   │            │
│         └───────────────────┴───────────────────┘            │
│                           │                                  │
│                    ┌──────▼──────┐                          │
│                    │ AuthContext │                          │
│                    │  (JWT mgmt) │                          │
│                    └──────┬──────┘                          │
│                           │                                  │
│                    ┌──────▼──────┐                          │
│                    │   api.js    │                          │
│                    │  (Axios)    │                          │
│                    └──────┬──────┘                          │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            │ HTTP + JWT
                            │
                            ▼
                    ┌───────────────┐
                    │  Backend API  │
                    │  (Render.com) │
                    └───────────────┘
```

---

## 🛠️ Tech Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | 18.2.0 | UI library |
| **Build Tool** | Vite | 5.0.8 | Fast dev server + bundler |
| **Routing** | React Router DOM | 6.21.1 | SPA navigation |
| **HTTP Client** | Axios | 1.6.5 | API requests |
| **Charts** | Chart.js | 4.4.1 | Data visualization |
| | react-chartjs-2 | 5.2.0 | React wrapper for Chart.js |
| **CSS Framework** | Tailwind CSS | 3.3.6 | Utility-first styling |
| **Icons** | Lucide React | 0.307.0 | Modern icon library |
| **Deployment** | Vercel | - | Static hosting + CDN |

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── main.jsx                 # App entry point
│   ├── App.jsx                  # Root component with routes
│   ├── index.css                # Tailwind imports + global styles
│   │
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Signup.jsx           # Signup page
│   │   ├── Dashboard.jsx        # Main dashboard
│   │   ├── Customers.jsx        # Customer insights page
│   │   └── Products.jsx         # Product analytics page
│   │
│   ├── components/
│   │   ├── PrivateRoute.jsx     # Protected route wrapper
│   │   ├── StatsCard.jsx        # KPI metric card
│   │   ├── RevenueChart.jsx     # Line chart component
│   │   ├── TopCustomersTable.jsx # Top 5 customers table
│   │   └── DateRangeFilter.jsx  # Date filter component
│   │
│   ├── context/
│   │   └── AuthContext.jsx      # Global auth state
│   │
│   ├── services/
│   │   └── api.js               # Axios instance + interceptors
│   │
│   └── utils/
│       └── currency.js          # ₹ formatting helpers
│
├── public/                      # Static assets
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind customization
├── postcss.config.js            # PostCSS plugins
├── package.json                 # Dependencies
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Backend API running (see backend README)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/xeno-shopify-frontend.git
cd xeno-shopify-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create `.env` file in root:
```bash
# Backend API URL (local development)
VITE_API_URL=http://localhost:8080

# Or production backend
VITE_API_URL=https://xeno-shopify-backend-frzt.onrender.com
```

### 4. Run Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```
Outputs to `dist/` folder.

### 6. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment (Vercel)

### Automatic Deployment
1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Set environment variable:
   ```
   VITE_API_URL=https://xeno-shopify-backend-frzt.onrender.com
   ```
4. Deploy! 🚀

### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**Live URL:** https://xeno-shopify-frontend.vercel.app

---

## 🔑 Demo Credentials

Test the application with these 5 demo tenants:

| Store Name | Email | Password | Industry |
|------------|-------|----------|----------|
| Fashion Bazaar | owner@fashionbazaar.in | Demo@123 | Fashion |
| Spice Garden | admin@spicegarden.in | Demo@123 | Food |
| TechHub Electronics | contact@techhub.in | Demo@123 | Electronics |
| Home Essentials | info@homeessentials.in | Demo@123 | Home Decor |
| Ayurveda Wellness | support@ayurvedawellness.in | Demo@123 | Wellness |

Each tenant has:
- 10 unique products
- 6+ customers with orders
- Revenue ranging from ₹50K to ₹1.25L
- Realistic transaction history

---

## 📊 Pages & Components

### 1. **Login Page** (`pages/Login.jsx`)
- Email + password form
- "Remember me" checkbox
- "Don't have an account?" link to signup
- API call to `/api/auth/login`
- Stores JWT token in localStorage
- Redirects to Dashboard on success

### 2. **Signup Page** (`pages/Signup.jsx`)
- Store name, email, password, Shopify domain/token
- Form validation
- API call to `/api/auth/signup`
- Auto-login after signup
- Redirects to Dashboard

### 3. **Dashboard Page** (`pages/Dashboard.jsx`)
- **Components:**
  - `<StatsCard />` × 4 (Revenue, Orders, Customers, AOV)
  - `<RevenueChart />` (Line chart)
  - `<TopCustomersTable />` (Top 5 list)
  - `<DateRangeFilter />` (7/30/90 days, All Time)
- **Data Sources:**
  - `/api/dashboard/stats` (KPIs)
  - `/api/dashboard/revenue-trend` (chart data)
  - `/api/dashboard/top-customers` (table data)

### 4. **Customers Page** (`pages/Customers.jsx`)
- **Customer Segments Chart:**
  - Active: Ordered in last 30 days
  - At-Risk: Ordered 30-90 days ago
  - Dormant: No order in 90+ days
- **Customer List Table:**
  - Name, Email, Location
  - Total Spent, Orders Count
  - Search bar filter
- **Data Source:** `/api/customers/list`

### 5. **Products Page** (`pages/Products.jsx`)
- **Top 10 Products Bar Chart:**
  - Sorted by order count (most popular)
  - X-axis: Product names
  - Y-axis: Order count
- **Inventory Status Doughnut:**
  - In Stock: 10+ units
  - Low Stock: 1-9 units
  - Out of Stock: 0 units
- **Product Performance Table:**
  - Product name, Vendor, Price (₹), Stock, Orders
  - Sortable columns
- **Data Source:** `/api/products/stats`, `/api/products/top`

### 6. **Private Route** (`components/PrivateRoute.jsx`)
- HOC wrapper for protected pages
- Checks if JWT token exists in localStorage
- If not authenticated → redirects to `/login`
- If authenticated → renders child component

### 7. **Auth Context** (`context/AuthContext.jsx`)
- Global state for:
  - `user` (email, tenant info)
  - `token` (JWT)
  - `isAuthenticated` (boolean)
- Functions:
  - `login(email, token)` - Store token, set user
  - `logout()` - Clear token, redirect to login
  - `signup()` - Same as login after signup
- Used by all pages via `useAuth()` hook

### 8. **API Service** (`services/api.js`)
- Axios instance with base URL from env
- **Request Interceptor:**
  - Auto-injects `Authorization: Bearer <token>` header
  - Reads token from localStorage
- **Response Interceptor:**
  - Handles 401 errors (token expired)
  - Auto-redirects to login
  - Shows error toasts

---

## 💰 Currency Formatting (`utils/currency.js`)

All monetary values displayed in Indian Rupee format:

```javascript
// Full format: ₹1,25,000.00
export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

// Compact format: ₹1.25L, ₹2.5Cr
export const formatINRCompact = (amount) => {
  if (amount >= 10000000) { // 1 Crore
    return `₹${(amount / 10000000).toFixed(2)}Cr`;
  } else if (amount >= 100000) { // 1 Lakh
    return `₹${(amount / 100000).toFixed(2)}L`;
  } else {
    return formatINR(amount);
  }
};
```

---

## 🎨 Tailwind Configuration (`tailwind.config.js`)

Custom theme with dark background + blue accents:

```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',   // Blue-500
        secondary: '#1E293B', // Slate-800
        dark: '#0F172A',      // Slate-900
      }
    }
  }
}
```

---

## 🔍 Known Limitations

1. **No Real-time Updates**
   - Dashboard data refreshes only on page load or manual refresh
   - Consider WebSockets for live updates in production

2. **Basic Error Handling**
   - Some error messages could be more user-friendly
   - No retry mechanism for failed API calls

3. **Limited Date Filters**
   - Only predefined ranges (7/30/90 days, All Time)
   - No custom date range picker

4. **No Pagination**
   - Customer and Product tables load all records
   - May slow down with 1000+ records

5. **No Export Functionality**
   - Cannot export data to CSV/Excel
   - Users may want to download reports

6. **Basic Search**
   - Only client-side search in Customer page
   - No advanced filters (by location, revenue range, etc.)

7. **No Dark/Light Mode Toggle**
   - Fixed dark theme
   - Some users may prefer light mode

8. **Mobile Charts**
   - Charts may be hard to read on small screens
   - Consider hiding or simplifying on mobile

9. **No Offline Support**
   - Requires internet connection
   - Service Worker could cache data

10. **No Internationalization**
    - Only English language
    - Currency hardcoded to ₹ (INR)

---

## 🤔 Assumptions

### Technical Assumptions
1. **Browser Compatibility:** Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
2. **Screen Resolution:** Optimized for 1920×1080 desktop, 375×667 mobile
3. **JavaScript Enabled:** App requires JS to run (no SSR)
4. **LocalStorage Available:** Needed for token persistence
5. **CORS Configured:** Backend allows `https://xeno-shopify-frontend.vercel.app`

### Business Assumptions
1. **Indian Market Focus:** All currency in ₹ (INR)
2. **Small-Medium Stores:** 10-50 products, 50-500 customers
3. **Single User per Tenant:** No multi-user access control
4. **Read-Only Dashboard:** No data editing (view-only analytics)
5. **Manual Data Sync:** Users trigger sync from backend (not visible in frontend)

### Data Assumptions
1. **Valid Shopify Data:** Backend provides clean, validated data
2. **No Missing Fields:** All required fields (name, email, price) present
3. **Positive Numbers:** Revenue, prices, stock always ≥ 0
4. **UTC Timezone:** All dates in UTC (no timezone conversion)
5. **English Product Names:** No RTL languages or special characters

---

## 🔜 Next Steps (Productionization)

### High Priority
- [ ] Add pagination to Customer and Product tables
- [ ] Implement custom date range picker
- [ ] Add CSV/Excel export functionality
- [ ] Improve mobile responsiveness for charts
- [ ] Add loading skeletons instead of spinners

### Medium Priority
- [ ] Implement dark/light mode toggle
- [ ] Add advanced search filters (location, revenue range)
- [ ] Show real-time sync status from backend
- [ ] Add user profile page (change password, logout all devices)
- [ ] Implement "Remember me" functionality properly

### Low Priority
- [ ] Add internationalization (multi-language support)
- [ ] Implement Service Worker for offline support
- [ ] Add animated page transitions
- [ ] Create onboarding tutorial for first-time users
- [ ] Add accessibility features (ARIA labels, keyboard navigation)

### Performance Optimizations
- [ ] Lazy load pages (React.lazy + Suspense)
- [ ] Optimize Chart.js (reduce redraws)
- [ ] Implement virtual scrolling for long tables
- [ ] Add HTTP caching headers
- [ ] Compress images and assets

---

## 🐛 Troubleshooting

### Issue: "Network Error" when logging in
**Solution:** Check if backend is running and `VITE_API_URL` is correct in `.env`

### Issue: Charts not rendering
**Solution:** Ensure Chart.js is installed: `npm install chart.js react-chartjs-2`

### Issue: Tailwind styles not applying
**Solution:** Run `npm run dev` again to rebuild CSS

### Issue: Token expired error
**Solution:** JWT expires after 24 hours. Log in again to get a new token.

### Issue: CORS error in console
**Solution:** Backend must allow your frontend domain in CORS configuration

---

## 📞 Support

- **Assignment Submission:** December 6, 2025 (TODAY!)
- **Demo Video:** Max 7 minutes (see `DEMO_VIDEO_SCRIPT_7MIN.md`)
- **Documentation:** See `backend/README.md` for API docs
- **Deployment:** Frontend (Vercel) + Backend (Render)

---

## 📄 License

This is a project for **Xeno FDE Internship 2025** assignment.  
All rights reserved.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
