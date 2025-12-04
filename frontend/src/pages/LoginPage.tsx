import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

export const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user' as 'user' | 'admin',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.login(formData.email, formData.password, formData.role);

      if (response.success && response.token && response.user) {
        login(response.token, response.user);
        navigate('/');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/login-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Pink gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/70 via-pink-600/50 to-black/70"></div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-pink-200">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2" style={{ fontFamily: "'Poppins', 'Montserrat', sans-serif", letterSpacing: '0.05em' }}>
              NetNuggets
            </h1>
            <p className="text-gray-600 text-lg">Welcome Back!</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Login As</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'user' })}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all border-2 ${
                  formData.role === 'user'
                    ? 'bg-pink-600 text-white border-pink-600 shadow-lg shadow-pink-200'
                    : 'bg-white text-gray-700 border-pink-200 hover:border-pink-400'
                }`}
              >
                👤 User
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'admin' })}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all border-2 ${
                  formData.role === 'admin'
                    ? 'bg-black text-white border-black shadow-lg shadow-gray-400'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                }`}
              >
                👑 Admin
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-600 focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-600 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-200"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Section */}
          <div className="mt-6 space-y-3">
            <div className="text-center">
              <p className="text-gray-600 mb-3">
                Don't have an account?
              </p>
              <Link 
                to="/register" 
                className="inline-block w-full py-3 px-4 bg-white border-2 border-pink-600 text-pink-600 font-bold rounded-lg hover:bg-pink-50 transition-all text-center"
              >
                Create New Account
              </Link>
            </div>
            <div className="text-center">
              <Link to="/register" className="text-pink-600 hover:text-pink-700 font-semibold text-sm underline">
                Or click here to register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
