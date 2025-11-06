import axios from 'axios';

const BASE_URL = 'http://localhost:7000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  assignedTo?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  dashboard: string;
  user: User;
}

export interface DashboardResponse {
  message: string;
  user: User;
  timestamp: string;
}

export interface HierarchyResponse {
  hierarchy: User[];
}

// Auth APIs
export const authAPI = {
  login: (data: LoginData) => api.post<LoginResponse>('/auth/login', data),
  register: (data: RegisterData) => api.post<LoginResponse>('/auth/register', data),
  registerAdmin: (data: RegisterData) => api.post<LoginResponse>('/auth/register/admin', data),
};

// User APIs
export const userAPI = {
  getDashboard: () => api.get<DashboardResponse>('/users/dashboard'),
  getHierarchy: () => api.get<HierarchyResponse>('/users/hierarchy'),
  createSubAdmin: (data: CreateUserData) => api.post<{ message: string; user: User }>('/users/create/subadmin', data),
  createCDCAdmin: (data: CreateUserData) => api.post<{ message: string; user: User }>('/users/create/cdcadmin', data),
  createDoctor: (data: CreateUserData) => api.post<{ message: string; user: User }>('/users/create/doctor', data),
  createPsychiatrist: (data: CreateUserData) => api.post<{ message: string; user: User }>('/users/create/psychiatrist', data),
  createHelpDesk: (data: CreateUserData) => api.post<{ message: string; user: User }>('/users/create/helpdesk', data),
  createMarketing: (data: CreateUserData) => api.post<{ message: string; user: User }>('/users/create/marketing', data),
};

export default api;
