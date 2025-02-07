'use client';

import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      switch (user.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'partner':
          router.push('/partner');
          break;
        case 'user':
          router.push('/user');
          break;
        default:
          router.push('/user');
      }
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Welcome back</h2>
        <p className="text-gray-600 mt-2">Please sign in to your account</p>
      </div>
      <LoginForm />
    </div>
  );
}