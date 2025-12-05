import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/currency';
import { 
  Package, 
  LayoutDashboard, 
  Users, 
  LogOut, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  DollarSign
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Products = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    lowStockItems: 0,
    totalInventoryValue: '0.00'
  });
  const [topProducts, setTopProducts] = useState([]);
  const [inventory, setInventory] = useState({
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductAnalytics();
  }, []);

  const fetchProductAnalytics = async () => {
    setLoading(true);
    try {
      const [statsRes, topProductsRes, inventoryRes] = await Promise.all([
        api.get('/products/stats'),
        api.get('/products/top?limit=10'),
        api.get('/products/inventory')
      ]);

      setStats(statsRes.data);
      setTopProducts(topProductsRes.data);
      setInventory(inventoryRes.data);
    } catch (error) {
      console.error('Error fetching product analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const topProductsChartData = {
    labels: topProducts.map(p => p.title.length > 25 ? p.title.substring(0, 25) + '...' : p.title),
    datasets: [
      {
        label: 'Orders Count',
        data: topProducts.map(p => p.orderCount),
        backgroundColor: 'rgba(139, 92, 246, 0.8)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1,
      }
    ]
  };

  const inventoryChartData = {
    labels: ['In Stock', 'Low Stock', 'Out of Stock'],
    datasets: [
      {
        data: [inventory.inStock, inventory.lowStock, inventory.outOfStock],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#9CA3AF',
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#F3F4F6',
        bodyColor: '#D1D5DB',
        borderColor: 'rgba(139, 92, 246, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            family: "'Inter', sans-serif",
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          maxRotation: 45,
          minRotation: 45,
          font: {
            family: "'Inter', sans-serif",
            size: 10
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#9CA3AF',
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#F3F4F6',
        bodyColor: '#D1D5DB',
        borderColor: 'rgba(139, 92, 246, 0.3)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-400">Loading product analytics...</p>
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
                  className="px-4 py-2 rounded-lg text-gray-400 hover:bg-dark-card hover:text-primary transition flex items-center gap-2"
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
                  className="px-4 py-2 rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition flex items-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  Products
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Page Title */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
                Product Analytics
              </h1>
              <p className="text-gray-400 mt-2">Track inventory and product performance</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase">Total Products</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase">Active Products</p>
                <p className="text-3xl font-bold text-green-400 mt-2">{stats.activeProducts}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/40 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase">Low Stock Items</p>
                <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.lowStockItems}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/40 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase">Inventory Value</p>
                <p className="text-3xl font-bold text-primary-light mt-2">{formatINR(parseFloat(stats.totalInventoryValue || 0))}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-light/20 to-primary/40 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary-light" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Products Bar Chart */}
          <div className="lg:col-span-2 glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Top Products by Orders
            </h2>
            <div className="h-80">
              {topProducts.length > 0 ? (
                <Bar data={topProductsChartData} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No product data available
                </div>
              )}
            </div>
          </div>

          {/* Inventory Status Doughnut */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Inventory Status
            </h2>
            <div className="h-80">
              <Doughnut data={inventoryChartData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-4">Product Performance Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Product</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Vendor</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Type</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-semibold">Price</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-semibold">Stock</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-semibold">Orders</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.length > 0 ? (
                  topProducts.map((product, index) => (
                    <tr key={product.id} className="border-b border-dark-border hover:bg-dark-card/50 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            #{index + 1}
                          </div>
                          <span className="text-white font-medium">{product.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{product.vendor || 'N/A'}</td>
                      <td className="py-3 px-4 text-gray-300">{product.productType || 'N/A'}</td>
                      <td className="py-3 px-4 text-right text-green-400 font-semibold">
                        {formatINR(parseFloat(product.price || 0))}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {product.inventoryQuantity !== null && product.inventoryQuantity !== undefined ? (
                          <span className={`font-semibold ${
                            product.inventoryQuantity === 0 ? 'text-red-400' :
                            product.inventoryQuantity < 10 ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {product.inventoryQuantity}
                          </span>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold">
                          {product.orderCount}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-400">
                      No product data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
