'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function setAuthCookies(token: string, role: string) {
  document.cookie = `token=${token}; path=/; max-age=86400; samesite=strict`;
  document.cookie = `userRole=${role}; path=/; max-age=86400; samesite=strict`;
}

function removeAuthCookies() {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      const user = JSON.parse(storedUser);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      setAuthCookies(token, user.role);
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'John Doe',
        role: credentials.role,
      };

      const mockToken = btoa(
        JSON.stringify({
          userId: mockUser.id,
          role: mockUser.role,
          timestamp: Date.now(),
        })
      );

      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);

      setAuthCookies(mockToken, mockUser.role);

      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    removeAuthCookies();

    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });

    window.location.href = '/login';
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
