export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  bookmarks: string[];
  ratings: { [websiteId: string]: number };
  createdAt: string;
}

export interface Website {
  _id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  thumbnail: string;
  featured: boolean;
  approved: boolean;
  submittedBy?: string;
  ratings: number[];
  averageRating: number;
  createdAt: string;
}

export interface Submission {
  _id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  submittedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}
