import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'seeker' | 'employer', companyName?: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', { email, password });
          
          if (response.data.success) {
            const { token, ...userData } = response.data.data;
            set({ 
              user: { ...userData, token }, 
              token 
            });
            
            // Set default Authorization header for future requests
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            throw new Error('Login failed');
          }
        } catch (error: any) {
          const message = error.response?.data?.message || 'Login failed. Please try again.';
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (name: string, email: string, password: string, role: 'seeker' | 'employer', companyName?: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/register', {
            name,
            email,
            password,
            role,
            companyName: role === 'employer' ? companyName : undefined
          });

          if (response.data.success) {
            const { token, ...userData } = response.data.data;
            set({ 
              user: { ...userData, token }, 
              token 
            });
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            throw new Error('Registration failed');
          }
        } catch (error: any) {
          const message = error.response?.data?.message || 'Registration failed';
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null });
        delete api.defaults.headers.common['Authorization'];
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);