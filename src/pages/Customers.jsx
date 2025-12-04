import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, Search, Filter, TrendingUp, DollarSign, ShoppingBag, LayoutDashboard, LogOut, RefreshCw } from 'lucide-react';
import api from '../services/api';

const Customers = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [segments, setSegments] = useState({ highValue: 0, mediumValue: 0, lowValue: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchSegmentStats();
    fetchCustomers();
  }, [selectedSegment, searchTerm, currentPage]);

  const fetchSegmentStats = async () => {
    try {
      const response = await api.get('/customers/segments');
      setSegments(response.data);
    } catch (error) {
      console.error('Error fetching segment stats:', error);
    }
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        size: 20,
        sortBy: 'totalSpent',
        sortDir: 'desc'
      };

      if (selectedSegment !== 'all') {
        params.segment = selectedSegment;
      }

      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      const response = await api.get('/customers', { params });
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSegmentChange = (segment) => {
    setSelectedSegment(segment);
    setCurrentPage(0);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const getSegmentBadge = (totalSpent) => {
    if (totalSpent >= 5000) {
      return <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-full text-xs font-bold border border-yellow-500/30">💎 High Value</span>;
    } else if (totalSpent >= 1000) {
      return <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">⭐ Medium Value</span>;
    } else {
      return <span className="px-3 py-1 bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-400 rounded-full text-xs font-bold border border-gray-500/30">🌱 Growing</span>;
    }
  };

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
                  className="px-4 py-2 rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Customers
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
                Customer Insights
              </h1>
              <p className="text-gray-400 mt-2">Analyze and segment your customer base</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Segment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => handleSegmentChange('all')}
            className={`stat-card ${selectedSegment === 'all' ? 'ring-2 ring-primary' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase">Total Customers</p>
                <p className="text-3xl font-bold text-white mt-2">{segments.total}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center backdrop-blur-sm">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </button>

          <button
            onClick={() => handleSegmentChange('high')}
            className={`stat-card ${selectedSegment === 'high' ? 'ring-2 ring-yellow-500' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase">High Value</p>
                <p className="text-3xl font-bold text-yellow-400 mt-2">{segments.highValue}</p>
                <p className="text-xs text-gray-500 mt-1">{'> $5,000'}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/40 flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </button>

          <button
            onClick={() => handleSegmentChange('medium')}
            className={`stat-card ${selectedSegment === 'medium' ? 'ring-2 ring-blue-500' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase">Medium Value</p>
                <p className="text-3xl font-bold text-blue-400 mt-2">{segments.mediumValue}</p>
                <p className="text-xs text-gray-500 mt-1">$1,000 - $5,000</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/40 flex items-center justify-center backdrop-blur-sm">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </button>

          <button
            onClick={() => handleSegmentChange('low')}
            className={`stat-card ${selectedSegment === 'low' ? 'ring-2 ring-gray-500' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-400 uppercase">Growing</p>
                <p className="text-3xl font-bold text-gray-300 mt-2">{segments.lowValue}</p>
                <p className="text-xs text-gray-500 mt-1">{'< $1,000'}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-500/20 to-gray-600/40 flex items-center justify-center backdrop-blur-sm">
                <ShoppingBag className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by name or email..."
                className="input-dark w-full pl-10"
              />
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Filter className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {selectedSegment === 'all' ? 'All Segments' : 
                 selectedSegment === 'high' ? 'High Value' : 
                 selectedSegment === 'medium' ? 'Medium Value' : 'Growing'}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Table */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-100">
              Customer List ({totalItems} results)
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No customers found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg">
                <table className="table-dark">
                  <thead>
                    <tr>
                      <th className="rounded-tl-lg">Customer</th>
                      <th>Segment</th>
                      <th>Orders</th>
                      <th className="rounded-tr-lg">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, index) => (
                      <tr key={customer.id} className="group">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-purple-600/30 flex items-center justify-center text-primary font-bold text-sm">
                              {customer.name ? customer.name.charAt(0).toUpperCase() : '?'}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-100 group-hover:text-primary transition-colors">
                                {customer.name || 'Unknown'}
                              </div>
                              <div className="text-xs text-gray-500">{customer.email || 'No email'}</div>
                            </div>
                          </div>
                        </td>
                        <td>{getSegmentBadge(customer.totalSpent)}</td>
                        <td>
                          <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                            {customer.ordersCount} orders
                          </span>
                        </td>
                        <td>
                          <span className="text-sm font-bold text-green-400">
                            ${customer.totalSpent.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-300 hover:bg-primary/20 hover:border-primary transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <div className="text-gray-400 text-sm">
                    Page {currentPage + 1} of {totalPages}
                  </div>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage >= totalPages - 1}
                    className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg text-gray-300 hover:bg-primary/20 hover:border-primary transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
