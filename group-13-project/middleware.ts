import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

export default NextAuth(authConfig).auth((req) => {
  const isLoggedIn = !!req.auth;
  const protectedRoutes = ['/cart', '/product', '/profile'];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!isLoggedIn) {
      console.log('Middleware: Usuario no autenticado, redirigiendo a /login');
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/cart', '/product/:path*', '/profile'],
};