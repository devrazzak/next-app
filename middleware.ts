import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const i18nMiddleware = createMiddleware({
  locales: ['en', 'es', 'bn'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

const PUBLIC_PATHS = ['/_next', '/api', '/assets', '/favicon.ico'];

const AUTH_PATHS = {
  admin: '/auth/admin-login',
  partner: '/auth/partner-login',
  user: '/auth/login',
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for public paths
  if (
    PUBLIC_PATHS.some((path) => pathname.startsWith(path)) ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check current route type
  const isAdminRoute = pathname.includes('/admin');
  const isPartnerRoute = pathname.includes('/partner');
  const isUserRoute = pathname.includes('/user');
  const currentAuthPath = Object.values(AUTH_PATHS).find((path) =>
    pathname.endsWith(path)
  );

  // Get authentication status
  const token = request.cookies.get('token')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  // Allow access to auth pages when not authenticated
  if (!token && currentAuthPath) {
    return i18nMiddleware(request);
  }

  // Redirect unauthenticated users to appropriate login
  if (!token) {
    if (isAdminRoute)
      return NextResponse.redirect(new URL(AUTH_PATHS.admin, request.url));
    if (isPartnerRoute)
      return NextResponse.redirect(new URL(AUTH_PATHS.partner, request.url));
    if (isUserRoute)
      return NextResponse.redirect(new URL(AUTH_PATHS.user, request.url));
    return i18nMiddleware(request);
  }

  // Redirect authenticated users based on role
  if (token && userRole) {
    const normalizedRole = userRole.toLowerCase();

    if (currentAuthPath) {
      return NextResponse.redirect(new URL(`/${normalizedRole}`, request.url));
    }

    if (isAdminRoute && normalizedRole !== 'admin') {
      return NextResponse.redirect(new URL(`/${normalizedRole}`, request.url));
    }
    if (isPartnerRoute && normalizedRole !== 'partner') {
      return NextResponse.redirect(new URL(`/${normalizedRole}`, request.url));
    }
    if (isUserRoute && normalizedRole !== 'user') {
      return NextResponse.redirect(new URL(`/${normalizedRole}`, request.url));
    }
  }

  return i18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|api|assets).*)', '/'],
};
