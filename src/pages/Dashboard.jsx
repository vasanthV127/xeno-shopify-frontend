import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardService, shopifyService } from '../services/api';
import StatsCard from '../components/StatsCard';
import RevenueChart from '../components/RevenueChart';
import TopCustomersTable from '../components/TopCustomersTable';
import DateRangeFilter from '../components/DateRangeFilter';
import { 
  Users, ShoppingCart, Package, DollarSign, 
  TrendingUp, LogOut, RefreshCw 
} from 'lucide-react';
import { format, subDays } from 'date-fns';

const Dashboard = () => {
  const { user, logout } = useAuth();
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.storeName || 'Shopify Insights'}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSync}
                disabled={syncing}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing...' : 'Sync Data'}
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            value={`$${(stats?.totalRevenue || 0).toFixed(2)}`}
            icon={DollarSign}
            color="yellow"
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
              <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
            </div>
            <RevenueChart data={orderStats} />
          </div>

          {/* Top Customers */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Customers</h2>
            <TopCustomersTable customers={topCustomers} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
