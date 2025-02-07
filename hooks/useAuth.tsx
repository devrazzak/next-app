'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState, LoginCredentials } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function setAuthCookie(token: string) {
  // Set the token as an HTTP-only cookie
  document.cookie = `token=${token}; path=/; max-age=86400; samesite=strict`;
}

function removeAuthCookie() {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
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
    // Check local storage for existing session
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false,
      });
      setAuthCookie(token);
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      // Simulate API call - replace with actual API call
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'John Doe',
        role: credentials.role || 'user',
      };
      
      // Generate a mock token (in real app, this would come from your API)
      const mockToken = btoa(JSON.stringify({ userId: mockUser.id, timestamp: Date.now() }));

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      
      // Set the auth cookie
      setAuthCookie(mockToken);

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
    removeAuthCookie();
    
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    
    window.location.href = '/login';
  };

  // Prevent hydration issues
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