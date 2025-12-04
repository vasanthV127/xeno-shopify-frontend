import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    storeName: '',
    shopifyDomain: '',
    shopifyAccessToken: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-primary/10 animate-pulse-slow"></div>
      
      <div className="max-w-2xl w-full glass-card p-8 relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-primary rounded-full mb-4 shadow-lg shadow-purple-500/50">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-primary to-purple-400 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-gray-400 mt-2">Connect your Shopify store to get started</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm backdrop-blur-sm animate-slide-up">
            <span className="font-semibold">⚠️ Error:</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                📧 Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-dark w-full"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                🔒 Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-dark w-full"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
              🏪 Store Name
            </label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className="input-dark w-full"
              placeholder="My Awesome Store"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
              🌐 Shopify Domain
            </label>
            <input
              type="text"
              name="shopifyDomain"
              value={formData.shopifyDomain}
              onChange={handleChange}
              className="input-dark w-full"
              placeholder="your-store.myshopify.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
              🔑 Shopify Access Token
            </label>
            <input
              type="text"
              name="shopifyAccessToken"
              value={formData.shopifyAccessToken}
              onChange={handleChange}
              className="input-dark w-full"
              placeholder="shpat_..."
              required
            />
            <p className="text-xs text-gray-500 mt-2 flex items-start gap-2">
              <span>💡</span>
              <span>Get your access token from Shopify Admin → Apps → Develop apps</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-gradient w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:text-purple-400 transition-colors">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
