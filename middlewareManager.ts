// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('managerToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const role = decoded.category;

    const pathname = req.nextUrl.pathname;

    if (
      (pathname.startsWith('/nationalmanagerdashboard') && role !== 'national') ||
      (pathname.startsWith('/statemanagerdashboard') && role !== 'state') ||
      (pathname.startsWith('/districtmanagerdashboard') && role !== 'district')
    ) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }
}

export const config = {
  matcher: [
    '/nationalmanagerdashboard/:path*',
    '/statemanagerdashboard/:path*',
    '/districtmanagerdashboard/:path*',
  ],
};
