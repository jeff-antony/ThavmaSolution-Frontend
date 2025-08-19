const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ||
  ((import.meta as any).env?.PROD ? 'https://thavma-solution-backend.vercel.app' : 'http://localhost:3001');

const LOGIN_PATH = (import.meta as any).env?.VITE_LOGIN_PATH || '/login';

export interface Project {
  _id: string;
  id?: number; // For backward compatibility
  title: string;
  description: string;
  images: string[];
  image?: string; // For backward compatibility
  category: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ContactMessage {
  _id: string;
  id?: number; // For backward compatibility
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'unread' | 'read' | 'responded';
  createdAt: string;
  response?: string;
  respondedAt?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}

class ApiService {
  private token: string | null = localStorage.getItem('adminToken');

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('adminToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('adminToken');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: this.getHeaders(),
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Authentication
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>(LOGIN_PATH, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.setToken(response.token);
    return response;
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/projects');
  }

  async createProject(projectData: FormData): Promise<Project> {
    const url = `${API_BASE_URL}/projects`;
    const config: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: projectData,
    };

    const response = await fetch(url, config);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async updateProject(id: string | number, projectData: FormData): Promise<Project> {
    const url = `${API_BASE_URL}/projects/${id}`;
    const config: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: projectData,
    };

    const response = await fetch(url, config);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async deleteProject(id: string | number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact Messages
  async submitContact(message: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): Promise<{ message: string }> {
    return this.request<{ message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return this.request<ContactMessage[]>('/contact');
  }

  async updateMessageStatus(id: string | number, status: ContactMessage['status']): Promise<ContactMessage> {
    return this.request<ContactMessage>(`/contact/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async respondToMessage(id: string | number, response: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/contact/${id}/respond`, {
      method: 'POST',
      body: JSON.stringify({ response }),
    });
  }
}

export const apiService = new ApiService(); 