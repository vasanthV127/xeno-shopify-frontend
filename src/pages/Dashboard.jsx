import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardService, shopifyService } from '../services/api';
import StatsCard from '../components/StatsCard';
import RevenueChart from '../components/RevenueChart';
import TopCustomersTable from '../components/TopCustomersTable';
import DateRangeFilter from '../components/DateRangeFilter';
import { 
  Users, ShoppingCart, Package, DollarSign, 
  TrendingUp, LogOut, RefreshCw, LayoutDashboard
} from 'lucide-react';
import { format, subDays } from 'date-fns';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [topCustomers, setTopCustomers] = useState([]);
  const [orderStats, setOrderStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, customersRes, ordersRes] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getTopCustomers(5),
        dashboardService.getOrdersByDate(dateRange.startDate, dateRange.endDate)
      ]);

      setStats(statsRes.data);
      setTopCustomers(customersRes.data);
      setOrderStats(ordersRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    try {
      setSyncing(true);
      await shopifyService.syncData();
      await fetchDashboardData();
      alert('Data synced successfully!');
    } catch (error) {
      alert('Failed to sync data: ' + (error.response?.data?.message || error.message));
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-primary"></div>
          <p className="text-gray-400 animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="glass-card border-b border-dark-border sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
                  {user?.storeName || 'Xeno Insights'}
                </h1>
                <p className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Welcome back, {user?.email}
                </p>
              </div>
              <nav className="hidden md:flex items-center gap-2 ml-8">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/customers')}
                  className="px-4 py-2 rounded-lg text-gray-400 hover:bg-dark-card hover:text-primary transition flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Customers
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="px-4 py-2 rounded-lg text-gray-400 hover:bg-dark-card hover:text-primary transition flex items-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  Products
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3 animate-slide-up">
              <button
                onClick={handleSync}
                disabled={syncing}
                className="btn-gradient flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing...' : 'Sync Data'}
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2.5 border border-dark-border rounded-lg hover:bg-dark-hover hover:border-gray-600 transition-all duration-200 text-gray-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <StatsCard
            title="Total Customers"
            value={stats?.totalCustomers || 0}
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Total Orders"
            value={stats?.totalOrders || 0}
            icon={ShoppingCart}
            color="green"
          />
          <StatsCard
            title="Total Products"
            value={stats?.totalProducts || 0}
            icon={Package}
            color="purple"
          />
          <StatsCard
            title="Total Revenue"
            value={`$${(stats?.totalRevenue || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
            icon={DollarSign}
            color="yellow"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          <StatsCard
            title="Average Order Value"
            value={`$${(stats?.averageOrderValue || 0).toFixed(2)}`}
            icon={TrendingUp}
            color="indigo"
          />
          <StatsCard
            title="Orders Today"
            value={stats?.ordersToday || 0}
            icon={ShoppingCart}
            color="pink"
          />
          <StatsCard
            title="Revenue Today"
            value={`$${(stats?.revenueToday || 0).toFixed(2)}`}
            icon={DollarSign}
            color="teal"
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="chart-container">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-100 mb-2">Revenue Overview</h2>
              <p className="text-sm text-gray-400 mb-4">Track your revenue and order trends</p>
              <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
            </div>
            <RevenueChart data={orderStats} />
          </div>

          {/* Top Customers */}
          <div className="chart-container">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-100 mb-2">Top 5 Customers</h2>
              <p className="text-sm text-gray-400">Highest spending customers</p>
            </div>
            <TopCustomersTable customers={topCustomers} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
