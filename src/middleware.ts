// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
// import { verify } from 'jsonwebtoken';
import {verifyToken} from '@/utils/verifyToken'

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get('adminToken')?.value 
  || req.cookies.get('managerToken')?.value 
  || req.cookies.get('agentToken')?.value;

  // Token from cookies: token

  // MIDDLEWAREEE

  const url = req.nextUrl;
  // Request URL: url.pathname

  // No token: redirect based on path
  if (!token) {
    // No token found, redirecting...
    if (url.pathname.startsWith('/superadmin') || url.pathname.startsWith('/admindashboard')) {
      return NextResponse.redirect(new URL('/adminlogin', req.url));
    } else if (
      url.pathname.startsWith('/nationalmanagerdashboard') ||
      url.pathname.startsWith('/statemanagerdashboard') ||
      url.pathname.startsWith('/districtmanagerdashboard')
    ) {
      return NextResponse.redirect(new URL('/managerlogin', req.url));
    } else if (url.pathname.startsWith('/agentpage')) {
      return NextResponse.redirect(new URL('/agentlogin', req.url));
    } else {
      return NextResponse.redirect(new URL('/', req.url)); // fallback
    }
  }

  try {
    // Verifying token...
    verifyToken(token);
    // Token is valid according to middleware
    return NextResponse.next();
  } 
  
  catch (err) {
    // Token verification failed:
    // Invalid token: redirect based on path
    if (url.pathname.startsWith('/superadmin') || url.pathname.startsWith('/admindashboard')) {
      return NextResponse.redirect(new URL('/adminlogin', req.url));
    } else if (
      url.pathname.startsWith('/nationalmanagerdashboard') ||
      url.pathname.startsWith('/statemanagerdashboard') ||
      url.pathname.startsWith('/districtmanagerdashboard')
    ) {
      return NextResponse.redirect(new URL('/managerlogin', req.url));
    } else if (url.pathname.startsWith('/agentpage')) {
      return NextResponse.redirect(new URL('/agentlogin', req.url));
    } else {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}

export const config = {
  matcher: [
    '/admindashboard/:path*',
    '/superadmin/:path*',
    '/nationalmanagerdashboard/:path*',
    '/statemanagerdashboard/:path*',
    '/districtmanagerdashboard/:path*',
    '/agentpage/:path*',
    // add others
  ]
};
