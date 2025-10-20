import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import nookies from 'nookies';

interface User {
  id: string;
  first_name: string;
  email: string;
  is_email_verified: number;
  is_phone_verified: number;
  phone_number:string
  photo:string
  // Add more fields as needed
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updatedFields: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      login: (user, token) => {
        nookies.set(null, 'token', token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: '/',
        });

        set({
          isAuthenticated: true,
          user,
          token,
        });
        console.log("Logging in user:", user);
      },

      logout: () => {
        nookies.destroy(null, 'token');
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },

      updateUser: (updatedFields) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedFields } : null,
        })),
    }),
    {
      name: 'auth-storage', // for localStorage fallback
      skipHydration: false,
    }
  )
);
