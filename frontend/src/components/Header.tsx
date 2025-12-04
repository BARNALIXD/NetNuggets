import { LogOut, Plus, Search, Shield, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSubmitClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, onSubmitClick }) => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="bg-gradient-to-r from-pink-50 to-rose-50 shadow-md border-b-2 border-pink-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Section */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent" style={{ fontFamily: "'Poppins', 'Montserrat', sans-serif", letterSpacing: '0.05em' }}>
                NetNuggets
              </h1>
              <p className="text-gray-800 mt-1">Discover golden nuggets from across the web</p>
            </div>
          </Link>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {user && (
              <>
                <div className="flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-lg border-2 border-pink-300">
                  <User size={18} className="text-pink-600" />
                  <span className="font-semibold text-gray-800">{user.name}</span>
                  {isAdmin && (
                    <span className="ml-2 px-2 py-0.5 bg-black text-white text-xs font-bold rounded-full">
                      ADMIN
                    </span>
                  )}
                </div>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Shield size={18} /> Admin Panel
                  </Link>
                )}

                {onSubmitClick && (
                  <button
                    onClick={onSubmitClick}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    <Plus size={18} /> Submit Site
                  </button>
                )}

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for web nuggets..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-pink-300 rounded-lg focus:border-pink-600 focus:outline-none bg-white transition-colors"
          />
        </div>
      </div>
    </header>
  );
};
