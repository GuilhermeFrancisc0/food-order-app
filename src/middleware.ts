import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const role = request.nextauth.token?.role;
    const pathname = request.nextUrl.pathname;

    if (!role || !pathname.startsWith(`/${role}`)) {
      return NextResponse.rewrite(new URL('/access-denied', request.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: ['/admin/:path*', '/client/:path*']
}