export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'seeker' | 'employer';
  token?: string;
  companyName?: string;
}

export interface Job {
  _id: string;
  title: string;
  companyName: string;
  description: string;
  location: string;
  salary?: {
    min: number;
    max: number;
    currency?: string;
  };
  jobType: 'full-time' | 'part-time' | 'internship' | 'remote';
  experienceLevel?: 'entry' | 'mid' | 'senior';
  requirements?: string[];
  skills?: string[];
  deadline?: string;
  postedBy: string;
  isActive: boolean;
  createdAt: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    email: string;
    role: 'seeker' | 'employer';
    token: string;
  };
}