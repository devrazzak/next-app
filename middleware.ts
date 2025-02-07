import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Create the i18n middleware
const i18nMiddleware = createMiddleware({
  locales: ['en', 'es', 'bn'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

// Middleware to handle both i18n and auth
export async function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Check if it's a protected route
  const isProtectedRoute =
    pathname.includes('/admin') ||
    pathname.includes('/user') ||
    pathname.includes('/partner');
  const isAuthPage = pathname.includes('/auth');

  // Get the user token from cookies or localStorage
  const token = request.cookies.get('token')?.value;

  // If it's a protected route and user is not authenticated
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access login page
  if (isAuthPage && token) {
    const dashboardUrl = new URL('/admin', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Handle i18n routing
  return i18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/'],
};
