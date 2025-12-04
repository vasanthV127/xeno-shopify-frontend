# Xeno Shopify Insights - Frontend

Multi-tenant Shopify Data Ingestion & Insights Service - React Frontend

## 🚀 Tech Stack

- **React 18.2.0**
- **Vite 5.0.8** (Build tool)
- **React Router DOM 6.20.0**
- **Axios 1.6.2** (HTTP client)
- **Chart.js 4.4.1** (Data visualization)
- **Tailwind CSS 3.3.6** (Styling)
- **Lucide React** (Icons)

## 📋 Features

✅ Modern, responsive UI with Tailwind CSS  
✅ JWT-based authentication flow  
✅ Protected routes with auth guards  
✅ Interactive analytics dashboard  
✅ Revenue trend charts (Chart.js)  
✅ Top customers insights  
✅ Date range filtering  
✅ Real-time data synchronization  
✅ Loading states and error handling  

## 🗂️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── DateRangeFilter.jsx           # Date range selector
│   │   ├── PrivateRoute.jsx              # Auth guard for routes
│   │   ├── RevenueChart.jsx              # Chart.js line chart
│   │   ├── StatsCard.jsx                 # Metric display card
│   │   └── TopCustomersTable.jsx         # Top customers table
│   ├── context/
│   │   └── AuthContext.jsx               # Global auth state
│   ├── pages/
│   │   ├── Dashboard.jsx                 # Main dashboard page
│   │   ├── Login.jsx                     # Login page
│   │   └── Signup.jsx                    # Registration page
│   ├── services/
│   │   └── api.js                        # Axios config + API methods
│   ├── App.jsx                           # Root component with routes
│   ├── index.css                         # Global styles + Tailwind
│   └── main.jsx                          # React entry point
├── index.html                            # HTML template
├── package.json                          # Dependencies
├── tailwind.config.js                    # Tailwind configuration
├── vite.config.js                        # Vite build config
├── Dockerfile                            # Docker build
├── nginx.conf                            # Nginx config for production
└── README.md                             # This file
```

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/xeno-shopify-frontend.git
cd xeno-shopify-frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
echo "VITE_API_URL=http://localhost:8080/api" > .env
```

4. **Start development server:**
```bash
npm run dev
```

5. **Open browser:**
```
http://localhost:3000
```

## 🐳 Docker Setup

### Build and Run
```bash
# Build image
docker build -t xeno-frontend .

# Run container
docker run -p 3000:80 xeno-frontend
```

### Production Build
```bash
npm run build
# Output: dist/ folder ready for deployment
```

## 📦 Available Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎨 Component Overview

### Pages

**Login.jsx**
- Email/password authentication
- Form validation
- Error handling
- Redirect to dashboard on success

**Signup.jsx**
- New tenant registration
- Shopify credentials input
- Email validation
- Password strength requirements

**Dashboard.jsx**
- Stats cards grid (customers, orders, products, revenue)
- Revenue trend chart (last 30 days)
- Top 5 customers table
- Manual sync button
- Date range filter
- Logout functionality

### Components

**StatsCard.jsx**
- Reusable metric display
- Props: `title`, `value`, `icon`, `color`
- Color variants: blue, green, purple, yellow, indigo, pink, teal

**RevenueChart.jsx**
- Chart.js line chart
- Dual Y-axis (revenue + order count)
- Filled area under line
- Responsive design
- Date formatting (MMM dd)

**TopCustomersTable.jsx**
- Displays top 5 customers by spend
- Columns: Name, Email, Orders, Total Spent
- Empty state message
- Currency formatting

**DateRangeFilter.jsx**
- Start and end date inputs
- Updates parent state on change
- Default: Last 30 days

**PrivateRoute.jsx**
- Auth guard for protected routes
- Redirects to login if not authenticated
- Shows loading spinner during auth check

### Context

**AuthContext.jsx**
- Global authentication state
- Methods: `login`, `signup`, `logout`
- Persists JWT to localStorage
- Provides user data to all components

### Services

**api.js**
- Axios instance with base URL
- Request interceptor adds JWT Bearer token
- Response interceptor handles 401 errors
- API methods:
  - `authService.signup(data)`
  - `authService.login(credentials)`
  - `dashboardService.getStats()`
  - `dashboardService.getTopCustomers(limit)`
  - `dashboardService.getOrdersByDate(startDate, endDate)`
  - `shopifyService.syncData()`

## 🔐 Environment Variables

**Development (.env):**
```env
VITE_API_URL=http://localhost:8080/api
```

**Production (.env.production):**
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

**Important:** Environment variables must be prefixed with `VITE_` to be accessible in Vite.

## 🎨 Styling

### Tailwind CSS Configuration

Custom theme in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        // ... full spectrum
      }
    }
  }
}
```

### Global Styles

`index.css` includes:
- Tailwind directives
- Custom scrollbar styles
- Button hover effects
- Responsive breakpoints

## 📊 Dashboard Features

### Metrics Displayed
1. **Total Customers** - Count of unique customers
2. **Total Orders** - All orders placed
3. **Total Products** - Product catalog size
4. **Total Revenue** - Cumulative sales in dollars
5. **Average Order Value (AOV)** - Revenue ÷ Orders
6. **Orders Today** - Orders placed today
7. **Revenue Today** - Today's sales

### Chart Visualization
- **Type:** Line chart with filled area
- **Data:** Daily revenue and order count
- **Time Range:** Last 30 days (default)
- **Interactivity:** Hover tooltips with formatted values
- **Axes:** Currency ($) on left, count on right

### Top Customers Table
- **Sorting:** By lifetime spend (descending)
- **Limit:** Top 5 customers
- **Data:** Name, Email, Order count, Total spent
- **Formatting:** Currency with 2 decimal places

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Signup with valid credentials
- [ ] Login with registered user
- [ ] Logout clears session
- [ ] Protected routes redirect to login
- [ ] Invalid credentials show error

**Dashboard:**
- [ ] Stats cards display correct data
- [ ] Chart renders without errors
- [ ] Top customers table shows data
- [ ] Sync button triggers API call
- [ ] Date filter updates chart
- [ ] Loading states appear during API calls
- [ ] Error messages display on API failure

**Responsive Design:**
- [ ] Desktop (1920px+)
- [ ] Laptop (1366px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Set Environment Variables:**
```bash
vercel env add VITE_API_URL
# Enter: https://your-backend.com/api
```

4. **Production Deploy:**
```bash
vercel --prod
```

**Or use Vercel Dashboard:**
- Connect GitHub repository
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Add environment variable: `VITE_API_URL`

### Deploy to Netlify

1. **Install Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Deploy:**
```bash
netlify deploy --prod
```

3. **Configure:**
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: Add `VITE_API_URL` in Netlify dashboard

### Deploy to Render (Static Site)

1. **Connect repository in Render dashboard**
2. **Build Command:** `npm install && npm run build`
3. **Publish Directory:** `dist`
4. **Environment Variables:** Add `VITE_API_URL`

## 🐛 Troubleshooting

**Issue:** "API request failed"
```bash
# Check VITE_API_URL in .env
# Verify backend is running: curl http://localhost:8080/api/health
# Check browser console for CORS errors
```

**Issue:** "Token expired"
```bash
# JWT tokens expire after 24 hours
# Log out and log back in to get new token
```

**Issue:** Charts not rendering
```bash
# Verify Chart.js is installed: npm list chart.js
# Check browser console for errors
# Ensure data format matches expected structure
```

**Issue:** Tailwind styles not applied
```bash
# Verify tailwind.config.js exists
# Check index.css has @tailwind directives
# Clear cache: rm -rf node_modules/.vite
```

## 📦 Key Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2",
  "chart.js": "^4.4.1",
  "react-chartjs-2": "^5.2.0",
  "lucide-react": "^0.294.0",
  "date-fns": "^2.30.0"
}
```

## 🔄 API Integration

All API calls go through `src/services/api.js`:

```javascript
// Example: Get dashboard stats
const stats = await dashboardService.getStats();
// Returns: { totalCustomers, totalOrders, totalRevenue, ... }

// Example: Sync Shopify data
await shopifyService.syncData();
// Triggers backend sync and returns success message
```

JWT token is automatically added to all requests via Axios interceptor.

## 🎯 User Flow

1. **First Visit** → Redirected to `/login`
2. **New User** → Click "Sign Up" → Enter Shopify credentials → Auto-login → Dashboard
3. **Returning User** → Login → Dashboard
4. **Dashboard** → View metrics → Click "Sync" → Data updates → Explore charts/tables
5. **Logout** → Clears session → Redirected to login

## 📝 Code Style

**React Best Practices:**
- Functional components with hooks
- Context API for global state
- Custom hooks for reusable logic
- PropTypes for type checking (optional)
- Descriptive component names

**File Naming:**
- PascalCase for components: `Dashboard.jsx`
- camelCase for utilities: `api.js`
- kebab-case for CSS: `index.css`

## 📄 License

Created for Xeno FDE Internship Assignment - December 2025

## 👥 Author

Vasanth Kumar  
VIT-AP University

## 🔗 Related Repositories

- **Backend:** [xeno-shopify-backend](https://github.com/YOUR_USERNAME/xeno-shopify-backend)
- **Full Documentation:** See main project README for complete architecture and setup

---

**Built with ⚛️ using React + Vite**
