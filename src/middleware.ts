import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/verifyToken';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // 🚫 Do NOT protect login pages
  if (
    pathname.startsWith('/agentlogin') ||
    pathname.startsWith('/adminlogin') ||
    pathname.startsWith('/managerlogin')
  ) {
    return NextResponse.next();
  }

  // Read cookies per role
  const adminToken = req.cookies.get('adminToken')?.value || null;
  const managerToken = req.cookies.get('managerToken')?.value || null;
  const agentToken = req.cookies.get('agentToken')?.value || null;

  const token = adminToken || managerToken || agentToken;

  console.log("Token received in middleware:", token);
  console.log("Requested path:", pathname);

  // If NO TOKEN → redirect by route type
  if (!token) {
    if (pathname.startsWith('/superadmin') || pathname.startsWith('/admindashboard')) {
      return NextResponse.redirect(new URL('/adminlogin', req.url));
    }

    if (
      pathname.startsWith('/nationalmanagerdashboard') ||
      pathname.startsWith('/statemanagerdashboard') ||
      pathname.startsWith('/districtmanagerdashboard')
    ) {
      return NextResponse.redirect(new URL('/managerlogin', req.url));
    }

    if (pathname.startsWith('/agentpage') || pathname.startsWith('/videolectures')) {
      return NextResponse.redirect(new URL('/agentlogin', req.url));
    }

    return NextResponse.redirect(new URL('/', req.url)); // fallback
  }

  // VERIFY TOKEN
  const decoded = await verifyToken(token);

  console.log("Decoded token:", decoded);

  if (!decoded || typeof decoded === 'string' || !decoded.role) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const role = decoded.role as string;
  const status = decoded.accountStatus as string;

  console.log(`Role: ${role}, Status: ${status}`);

  // ACCOUNT STATUS CHECK
  if (status !== "active") {
    console.log(`Blocked due to inactive: ${role}`);

    if (role === "agent")
      return NextResponse.redirect(new URL('/agentlogin', req.url));

    if (['national', 'state', 'district'].includes(role))
      return NextResponse.redirect(new URL('/managerlogin', req.url));

    return NextResponse.redirect(new URL('/adminlogin', req.url));
  }


  // Read training test cookie
  const testPassed = req.cookies.get("agentTestPassed")?.value === "true";

  console.log("Agent Test Passed (cookie):", testPassed);

  if (role === "agent") {
    // Agent has NOT passed the test → force training page
    if (!testPassed) {
      if (!pathname.startsWith("/videolectures")) {
        return NextResponse.redirect(new URL("/videolectures", req.url));
      }
      return NextResponse.next();
    }

    // Agent already passed test → prevent training page access
    if (testPassed && pathname.startsWith("/videolectures")) {
      return NextResponse.redirect(new URL("/agentpage", req.url));
    }

    // Agent allowed access
    if (pathname.startsWith("/agentpage")) {
      return NextResponse.next();
    }
  }

  if (role === "superadmin" && pathname.startsWith('/superadmin'))
    return NextResponse.next();

  if (role === "admin" && pathname.startsWith('/admindashboard'))
    return NextResponse.next();

  if (role === "national" && pathname.startsWith('/nationalmanagerdashboard'))
    return NextResponse.next();

  if (role === "state" && pathname.startsWith('/statemanagerdashboard'))
    return NextResponse.next();

  if (role === "district" && pathname.startsWith('/districtmanagerdashboard'))
    return NextResponse.next();

  console.log("Unauthorized access:", role);

  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher: [
    '/superadmin/:path*',
    '/admindashboard/:path*',
    '/nationalmanagerdashboard/:path*',
    '/statemanagerdashboard/:path*',
    '/districtmanagerdashboard/:path*',
    '/agentpage',
    '/agentpage/:path*',
    '/videolectures',
    '/videolectures/:path*',
  ],
};
