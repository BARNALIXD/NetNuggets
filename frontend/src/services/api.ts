import type { Submission, User, Website } from '../types/index';

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

// Fetch function for unauthenticated requests (login, register)
const fetchAPI = async (url: string, options: RequestInit = {}) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error: any) {
    if (error.message) {
      throw error;
    }
    throw new Error('Network error: Could not connect to the server. Make sure the backend is running.');
  }
};

// Fetch function for authenticated requests
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error: any) {
    if (error.message) {
      throw error;
    }
    throw new Error('Network error: Could not connect to the server. Make sure the backend is running.');
  }
};

// Auth APIs
export const authAPI = {
  register: async (name: string, email: string, password: string, role: 'user' | 'admin', adminCode?: string): Promise<AuthResponse> => {
    return fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role, adminCode }),
    });
  },

  login: async (email: string, password: string, role: 'user' | 'admin'): Promise<AuthResponse> => {
    return fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<User> => {
    return fetchWithAuth('/auth/me');
  },
};

// Website APIs
export const websiteAPI = {
  getAll: async (): Promise<Website[]> => {
    return fetchWithAuth('/websites');
  },

  getById: async (id: string): Promise<Website> => {
    return fetchWithAuth(`/websites/${id}`);
  },

  create: async (website: Partial<Website>): Promise<Website> => {
    return fetchWithAuth('/websites', {
      method: 'POST',
      body: JSON.stringify(website),
    });
  },

  update: async (id: string, website: Partial<Website>): Promise<Website> => {
    return fetchWithAuth(`/websites/${id}`, {
      method: 'PUT',
      body: JSON.stringify(website),
    });
  },

  delete: async (id: string): Promise<void> => {
    return fetchWithAuth(`/websites/${id}`, {
      method: 'DELETE',
    });
  },

  rate: async (id: string, rating: number): Promise<Website> => {
    return fetchWithAuth(`/websites/${id}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating }),
    });
  },
};

// User APIs
export const userAPI = {
  toggleBookmark: async (websiteId: string): Promise<User> => {
    return fetchWithAuth('/user/bookmark', {
      method: 'POST',
      body: JSON.stringify({ websiteId }),
    });
  },

  getBookmarks: async (): Promise<Website[]> => {
    return fetchWithAuth('/user/bookmarks');
  },

  submitWebsite: async (submission: Partial<Submission>): Promise<Submission> => {
    return fetchWithAuth('/user/submit', {
      method: 'POST',
      body: JSON.stringify(submission),
    });
  },
};

// Admin APIs
export const adminAPI = {
  getSubmissions: async (): Promise<Submission[]> => {
    return fetchWithAuth('/admin/submissions');
  },

  approveSubmission: async (id: string): Promise<Website> => {
    return fetchWithAuth(`/admin/submissions/${id}/approve`, {
      method: 'POST',
    });
  },

  rejectSubmission: async (id: string): Promise<void> => {
    return fetchWithAuth(`/admin/submissions/${id}/reject`, {
      method: 'POST',
    });
  },

  getAllUsers: async (): Promise<User[]> => {
    return fetchWithAuth('/admin/users');
  },

  deleteUser: async (id: string): Promise<void> => {
    return fetchWithAuth(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  },
};
