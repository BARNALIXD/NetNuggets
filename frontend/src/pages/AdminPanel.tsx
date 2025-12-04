import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Plus, Trash2, Star } from 'lucide-react';
import { adminAPI, websiteAPI } from '../services/api';
import { Submission, Website } from '../types/index';

export const AdminPanel: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'submissions' | 'websites'>('submissions');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [submissionsData, websitesData] = await Promise.all([
        adminAPI.getSubmissions(),
        websiteAPI.getAll(),
      ]);
      setSubmissions(submissionsData);
      setWebsites(websitesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await adminAPI.approveSubmission(id);
      alert('Submission approved successfully!');
      loadData();
    } catch (error: any) {
      alert(error.message || 'Failed to approve submission');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await adminAPI.rejectSubmission(id);
      alert('Submission rejected');
      loadData();
    } catch (error: any) {
      alert(error.message || 'Failed to reject submission');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this website?')) return;

    try {
      await websiteAPI.delete(id);
      alert('Website deleted successfully');
      loadData();
    } catch (error: any) {
      alert(error.message || 'Failed to delete website');
    }
  };

  const handleToggleFeatured = async (website: Website) => {
    try {
      await websiteAPI.update(website._id, { featured: !website.featured });
      alert(`Website ${!website.featured ? 'featured' : 'unfeatured'} successfully`);
      loadData();
    } catch (error: any) {
      alert(error.message || 'Failed to update website');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-rose-200 flex items-center justify-center">
        <div className="text-2xl font-bold text-pink-600">Loading...</div>
      </div>
    );
  }

  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-rose-200">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-50 to-rose-50 shadow-md border-b-2 border-pink-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-gray-800 mt-1">Manage submissions and websites</p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-pink-200">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Websites</h3>
            <p className="text-3xl font-bold text-gray-800">{websites.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-yellow-200">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Pending Submissions</h3>
            <p className="text-3xl font-bold text-yellow-600">{pendingSubmissions.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Featured Sites</h3>
            <p className="text-3xl font-bold text-green-600">
              {websites.filter((w) => w.featured).length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md border-2 border-pink-200 overflow-hidden">
          <div className="flex border-b-2 border-pink-200">
            <button
              onClick={() => setActiveTab('submissions')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'submissions'
                  ? 'bg-pink-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-pink-50'
              }`}
            >
              Pending Submissions ({pendingSubmissions.length})
            </button>
            <button
              onClick={() => setActiveTab('websites')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'websites'
                  ? 'bg-pink-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-pink-50'
              }`}
            >
              Manage Websites ({websites.length})
            </button>
          </div>

          <div className="p-6">
            {/* Pending Submissions Tab */}
            {activeTab === 'submissions' && (
              <div>
                {pendingSubmissions.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">No pending submissions</p>
                ) : (
                  <div className="space-y-4">
                    {pendingSubmissions.map((submission) => (
                      <div
                        key={submission._id}
                        className="bg-pink-50 rounded-lg p-4 border-2 border-pink-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                              {submission.name}
                            </h3>
                            <p className="text-gray-600 mb-2">{submission.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>URL: <a href={submission.url} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">{submission.url}</a></span>
                              <span className="px-2 py-1 bg-pink-200 text-pink-800 rounded-full text-xs">
                                {submission.category}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => handleApprove(submission._id)}
                              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle size={18} /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(submission._id)}
                              className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              <XCircle size={18} /> Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Manage Websites Tab */}
            {activeTab === 'websites' && (
              <div>
                <div className="mb-4">
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    <Plus size={18} /> Add New Website
                  </button>
                </div>

                {showAddForm && <WebsiteForm onSuccess={() => { setShowAddForm(false); loadData(); }} onCancel={() => setShowAddForm(false)} />}

                <div className="space-y-4 mt-6">
                  {websites.map((website) => (
                    <div
                      key={website._id}
                      className="bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-pink-300 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-3xl">{website.thumbnail}</span>
                            <h3 className="text-xl font-bold text-gray-800">{website.name}</h3>
                            {website.featured && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{website.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs">
                              {website.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star size={14} fill="#fbbf24" className="text-yellow-400" />
                              {website.averageRating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleToggleFeatured(website)}
                            className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                              website.featured
                                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {website.featured ? 'Unfeature' : 'Feature'}
                          </button>
                          <button
                            onClick={() => handleDelete(website._id)}
                            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Add Website Form Component
const WebsiteForm: React.FC<{ onSuccess: () => void; onCancel: () => void }> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    category: 'Productivity',
    thumbnail: '🌐',
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Productivity', 'Design', 'Developer Tools', 'Entertainment', 'Learning', 'Inspiration', 'AI Tools'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.url || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      await websiteAPI.create({ ...formData, approved: true });
      alert('Website added successfully!');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to add website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-pink-50 rounded-lg p-6 border-2 border-pink-300 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Website</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Website Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-600 focus:outline-none"
              placeholder="Awesome Site"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">URL *</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-600 focus:outline-none"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-600 focus:outline-none"
            rows={3}
            placeholder="Describe the website..."
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-600 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail (Emoji)</label>
            <input
              type="text"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-600 focus:outline-none text-3xl text-center"
              maxLength={2}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Featured</label>
            <div className="flex items-center h-[42px]">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
              />
              <span className="ml-2 text-gray-700">Mark as featured</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Website'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
