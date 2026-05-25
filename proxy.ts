import { NextResponse, NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard']; // '/checkout',

// this for who are logged in already
const authPages = ['/sign-in', '/signup', '/reset-password'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthPagesProtected = authPages.some((page) =>
    pathname.startsWith(page),
  );

  const cookie = request.cookies;
  const token = cookie.get('refreshToken')?.value;

  // if (token && isAuthPagesProtected) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  if (isProtected && !token) {
    const loginUrl = new URL('/sign-in', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/signup'], // '/checkout/:path*',
};
