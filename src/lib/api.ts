import axios, { type AxiosRequestConfig } from 'axios';

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
  phone: string;
  role?: string;
}

export interface Child {
  _id: string;
  firstName: string;
  lastName?: string;
  dateOfBirth: string;
  gender: 'Boy' | 'Girl';
  ageInMonths: number;
  parent: string;
}

export interface Assessment {
  _id: string;
  title: string;
  description: string;
  ageGroup: string;
  minAgeMonths: number;
  maxAgeMonths: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  _id: string;
  text: string;
  category: string;
}

export interface AssessmentResult {
  _id: string;
  childId: string;
  assessmentId: string;
  answers: { isPositive: boolean }[];
  redPercent: number;
  needsConsultation: boolean;
  createdAt: string;
}

export interface Booking {
  _id: string;
  childId: string;
  resultId: string;
  orderId: string;
  paymentId?: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  createdAt: string;
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

export interface OTPLoginData {
  phone: string;
  otp: string;
}

export interface OTPRequestData {
  phone: string;
}

// Auth APIs
export const authAPI = {
  login: (data: LoginData) => api.post<LoginResponse>('/auth/login', data),
  register: (data: RegisterData) => api.post<LoginResponse>('/auth/register', data),
  registerAdmin: (data: RegisterData) => api.post<LoginResponse>('/auth/register/admin', data),
  loginOTP: (data: OTPLoginData) => api.post<LoginResponse>('/auth/login/otp', data),
  requestOTP: (data: OTPRequestData) => api.post<{ message: string }>('/auth/request-otp', data),
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


// // Parent APIs
// export const parentAPI = {
//   // Children management
//   addChild: (data: { firstName: string; lastName?: string; dateOfBirth: string; gender: 'Boy' | 'Girl' }, config?: AxiosRequestConfig) => 
//     api.post<{ message: string; child: Child }>('/parent/children', data),

//   getChildren: () => 
//     api.get<{ children: Child[] }>('/parent/children'), // Now auto-filters by parentId
//   // getChildren: () => api.get<{ children: Child[] }>('/parent/children'),
//   getChild: (id: string) => api.get<{ child: Child }>(`/parent/children/${id}`),
//   updateChild: (id: string, data: Partial<Child>) => api.put<{ message: string; child: Child }>(`/parent/children/${id}`, data),
//   deleteChild: (id: string) => api.delete<{ message: string }>(`/parent/children/${id}`),

//   // Assessments
//   getAssessmentsByAge: (ageInMonths: number) => api.get<{ assessments: Assessment[] }>(`/parent/assessments?age=${ageInMonths}`),
//   submitAssessment: (data: { childId: string; assessmentId: string; answers: { isPositive: boolean }[] }) =>
//     api.post<{ message: string; result: AssessmentResult }>('/parent/assessments/submit', data),

//   // Results
//   getChildResults: (childId: string) => api.get<{ results: AssessmentResult[] }>(`/parent/results/child/${childId}`),
//   getResult: (id: string) => api.get<{ result: AssessmentResult }>(`/parent/results/${id}`),

//   // Booking & Payment
//   createOrder: (data: { childId: string; resultId: string }) =>
//     api.post<{ orderId: string; amount: number; key: string }>('/parent/booking/create-order', data),
//   verifyPayment: (data: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
//     api.post<{ message: string; booking: Booking }>('/parent/booking/verify', data),
//   getBookings: () => api.get<{ bookings: Booking[] }>('/parent/bookings'),
// };


export const parentAPI = {
  // ── Children management ───────────────────────────────────────
  addChild: (
    data: { firstName: string; lastName?: string; dateOfBirth: string; gender: 'Boy' | 'Girl' },
    config?: AxiosRequestConfig
  ) => api.post<{ message: string; child: Child }>('/parent/children', data, config),

  getChildren: (config?: AxiosRequestConfig) =>
    api.get<{ children: Child[] }>('/parent/children', config),

  getChild: (id: string, config?: AxiosRequestConfig) =>
    api.get<{ child: Child }>(`/parent/children/${id}`, config),

  updateChild: (id: string, data: Partial<Child>, config?: AxiosRequestConfig) =>
    api.put<{ message: string; child: Child }>(`/parent/children/${id}`, data, config),

  deleteChild: (id: string, config?: AxiosRequestConfig) =>
    api.delete<{ message: string }>(`/parent/children/${id}`, config),

  // ── Assessments ───────────────────────────────────────────────
  getAssessmentsByAge: (ageInMonths: number, config?: AxiosRequestConfig) =>
    api.get<{ assessments: Assessment[] }>(`/parent/assessments?age=${ageInMonths}`, config),

  submitAssessment: (
    data: { childId: string; assessmentId: string; answers: { isPositive: boolean }[] },
    config?: AxiosRequestConfig
  ) => api.post<{ message: string; result: AssessmentResult }>('/parent/assessments/submit', data, config),

  // ── Results ───────────────────────────────────────────────────
  getChildResults: (childId: string, config?: AxiosRequestConfig) =>
    api.get<{ results: AssessmentResult[] }>(`/parent/results/child/${childId}`, config),

  getResult: (id: string, config?: AxiosRequestConfig) =>
    api.get<{ result: AssessmentResult }>(`/parent/results/${id}`, config),

  // ── Booking & Payment ─────────────────────────────────────────
  createOrder: (data: { childId: string; resultId: string }, config?: AxiosRequestConfig) =>
    api.post<{ orderId: string; amount: number; key: string }>('/parent/booking/create-order', data, config),

  verifyPayment: (
    data: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string },
    config?: AxiosRequestConfig
  ) => api.post<{ message: string; booking: Booking }>('/parent/booking/verify', data, config),

  getBookings: (config?: AxiosRequestConfig) =>
    api.get<{ bookings: Booking[] }>('/parent/bookings', config),
};

export default api;
