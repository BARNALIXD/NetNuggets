import React, { useState } from 'react';
import { X } from 'lucide-react';
import { userAPI } from '../services/api';

interface SubmitFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const categories = ['Productivity', 'Design', 'Developer Tools', 'Entertainment', 'Learning', 'Inspiration', 'AI Tools'];

export const SubmitForm: React.FC<SubmitFormProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    category: 'Productivity',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!formData.name || !formData.url || !formData.description) {
      setError('Please fill in all fields');
      return;
    }

    // Basic URL validation
    try {
      new URL(formData.url);
    } catch {
      setError('Please enter a valid URL (including http:// or https://)');
      return;
    }

    setLoading(true);

    try {
      await userAPI.submitWebsite(formData);
      alert('Website submitted successfully! It will be reviewed by our team.');
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to submit website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Submit a Web Nugget</h2>
        <p className="text-gray-600 mb-6">Share a cool website with the community</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-2 border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Website Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-600 focus:outline-none"
              placeholder="Awesome Site"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-600 focus:outline-none"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-600 focus:outline-none"
              rows={3}
              placeholder="What makes this site a golden nugget?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-600 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit for Review'}
          </button>
        </div>
      </div>
    </div>
  );
};
