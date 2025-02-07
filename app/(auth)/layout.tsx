'use client';

import { useAuth } from '@/hooks/useAuth';
import { usePathname, redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register'];

  useEffect(() => {
    // If not a public route and not authenticated, redirect to login
    if (!isLoading && 
        !publicRoutes.includes(pathname) && 
        !isAuthenticated) {
      redirect('/login');
    }
  }, [isAuthenticated, isLoading, pathname]);

  // Show nothing during loading to prevent flash of content
  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}