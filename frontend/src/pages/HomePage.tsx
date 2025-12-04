import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Star, Sparkles, TrendingUp, ExternalLink } from 'lucide-react';
import { Header } from '../components/Header';
import { WebsiteCard } from '../components/WebsiteCard';
import { SubmitForm } from '../components/SubmitForm';
import { websiteAPI, userAPI } from '../services/api';
import { Website } from '../types/index';
import { useAuth } from '../context/AuthContext';

const categories = ['All', 'Productivity', 'Design', 'Developer Tools', 'Entertainment', 'Learning', 'Inspiration', 'AI Tools'];

export const HomePage: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'bookmarked'>('featured');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadWebsites();
  }, []);

  const loadWebsites = async () => {
    try {
      const data = await websiteAPI.getAll();
      setWebsites(data);
    } catch (error) {
      console.error('Failed to load websites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmark = async (websiteId: string) => {
    try {
      await userAPI.toggleBookmark(websiteId);
      // Refresh user data or update local state
      loadWebsites();
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  const handleRate = async (websiteId: string, rating: number) => {
    try {
      await websiteAPI.rate(websiteId, rating);
      loadWebsites();
    } catch (error) {
      console.error('Failed to rate website:', error);
    }
  };

  const isBookmarked = (websiteId: string) => {
    return user?.bookmarks?.includes(websiteId) || false;
  };

  const getUserRating = (websiteId: string) => {
    return user?.ratings?.[websiteId] || 0;
  };

  const filteredWebsites = useMemo(() => {
    let filtered = websites.filter((site) => {
      const matchesSearch =
        site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        site.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || site.category === selectedCategory;
      return matchesSearch && matchesCategory && site.approved;
    });

    if (sortBy === 'featured') {
      filtered = filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'rating') {
      filtered = filtered.sort((a, b) => b.averageRating - a.averageRating);
    } else if (sortBy === 'bookmarked') {
      filtered = filtered.sort(
        (a, b) => (isBookmarked(b._id) ? 1 : 0) - (isBookmarked(a._id) ? 1 : 0)
      );
    }

    return filtered;
  }, [websites, searchTerm, selectedCategory, sortBy, user]);

  const featuredSites = websites
    .filter((site) => site.featured && site.approved)
    .slice(0, 3);

  const trendingSites = [...websites]
    .filter((site) => site.approved)
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-rose-200 flex items-center justify-center">
        <div className="text-2xl font-bold text-pink-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-rose-200">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSubmitClick={() => setShowSubmitForm(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured & Trending */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-pink-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-yellow-500" /> Featured Sites
            </h2>
            <div className="space-y-3">
              {featuredSites.map((site) => (
                <a
                  key={site._id}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-50 transition-colors"
                >
                  <span className="text-2xl">{site.thumbnail}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{site.name}</div>
                    <div className="text-sm text-gray-600">{site.category}</div>
                  </div>
                  <ExternalLink size={16} className="text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-pink-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="text-green-500" /> Top Rated
            </h2>
            <div className="space-y-3">
              {trendingSites.map((site) => (
                <a
                  key={site._id}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-50 transition-colors"
                >
                  <span className="text-2xl">{site.thumbnail}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{site.name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Star size={14} fill="#fbbf24" className="text-yellow-400" />
                      {site.averageRating.toFixed(1)}
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-gray-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-md mb-8 border-2 border-pink-200">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-gray-600" />
            <h3 className="font-bold text-gray-800">Filter & Sort</h3>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-pink-100 text-gray-800 hover:bg-pink-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSortBy('featured')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                sortBy === 'featured'
                  ? 'bg-black text-white'
                  : 'bg-pink-100 text-gray-800 hover:bg-pink-200'
              }`}
            >
              Featured First
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                sortBy === 'rating'
                  ? 'bg-black text-white'
                  : 'bg-pink-100 text-gray-800 hover:bg-pink-200'
              }`}
            >
              Highest Rated
            </button>
            <button
              onClick={() => setSortBy('bookmarked')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                sortBy === 'bookmarked'
                  ? 'bg-black text-white'
                  : 'bg-pink-100 text-gray-800 hover:bg-pink-200'
              }`}
            >
              My Bookmarks
            </button>
          </div>
        </div>

        {/* Website Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebsites.map((site) => (
            <WebsiteCard
              key={site._id}
              website={site}
              onBookmark={handleBookmark}
              onRate={handleRate}
              isBookmarked={isBookmarked(site._id)}
              userRating={getUserRating(site._id)}
            />
          ))}
        </div>

        {filteredWebsites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No websites found matching your criteria.</p>
          </div>
        )}
      </main>

      {showSubmitForm && (
        <SubmitForm onClose={() => setShowSubmitForm(false)} onSuccess={loadWebsites} />
      )}
    </div>
  );
};
