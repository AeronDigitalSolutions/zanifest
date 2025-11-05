// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
// import { verify } from 'jsonwebtoken';
import {verifyToken} from '@/utils/verifyToken'

const JWT_SECRET = process.env.JWT_SECRET!;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('adminToken')?.value 
  || req.cookies.get('managerToken')?.value 
  || req.cookies.get('agentToken')?.value;

  console.log("token recieved in middleware:", token);
  // console.log("All cookies:", req.cookies.getAll());

  // console.log("Token from cookies:", token);

  // console.log("MIDDLEWAREEE");

  const url = req.nextUrl;
  console.log("Request URL:", url.pathname);

  // No token: redirect based on path
  if (token=== undefined || token === null || token === '') {
    console.log("No token found, redirecting...");
    if (url.pathname.startsWith('/superadmin') || url.pathname.startsWith('/admindashboard')) {
      return NextResponse.redirect(new URL('/adminlogin', req.url));
    } 
    
    else if (
      url.pathname.startsWith('/nationalmanagerdashboard') ||
      url.pathname.startsWith('/statemanagerdashboard') ||
      url.pathname.startsWith('/districtmanagerdashboard')
    ) 
    {
      return NextResponse.redirect(new URL('/managerlogin', req.url));
    } 
    else if (url.pathname.startsWith('/agentpage')) {
      return NextResponse.redirect(new URL('/agentlogin', req.url));
    } 
    else {
      return NextResponse.redirect(new URL('/', req.url)); // fallback
    }
  }

  try {
    console.log("Raw token from cookies:", token);

  const decoded = await verifyToken(token ?? "") as { role?: string; accountStatus?:string; } | null;
  console.log("Decoded token:", decoded);

  if (!decoded || !decoded.role) {
    console.log("Invalid token or role not found");
    return NextResponse.redirect(new URL('/', req.url));
  }

  const role = decoded.role;
  console.log("Decoded role:", role);
  const pathname = req.nextUrl.pathname;
  console.log("Requested path:", pathname);

  console.log("Decoded role:", role, "Requested path:", pathname);

    // ✅ Add status check for managers only
    if (['national', 'state', 'district'].includes(role)) {
      if (decoded.accountStatus !== 'active') {
        console.log(`Manager with role=${role} blocked due to inactive status`);
        return NextResponse.redirect(new URL('/managerlogin', req.url));
      }
    }

     if (decoded.role === "agent") {
      if (decoded.accountStatus !== "active") {
        console.log(`agent with role=${role} blocked due to inactive status`);
        return NextResponse.redirect(new URL('/agentlogin', req.url));
      }
    }

    if (decoded.role === "admin") {
      if (decoded.accountStatus !== "active") {
        console.log(`agent with role=${role} blocked due to inactive status`);
        return NextResponse.redirect(new URL('/adminlogin', req.url));
      }
    }

  // Role-based access logic
  if (role === "superadmin" && pathname.startsWith("/superadmin")) {
    return NextResponse.next();
  } else if (role === "admin" && pathname.startsWith("/admindashboard")) {
    return NextResponse.next();
  }  else if (role === "state" && pathname.startsWith("/statemanagerdashboard")) {
  return NextResponse.next();
  } else if (role === "district" && pathname.startsWith("/districtmanagerdashboard")) {
    return NextResponse.next();
  } else if (role === "national" && pathname.startsWith("/nationalmanagerdashboard")) {
    return NextResponse.next();
  } else if (role === "agent" && pathname.startsWith("/agentpage")) {
    return NextResponse.next();
  } else {
    console.log("Unauthorized access attempt by:", role);
    return NextResponse.redirect(new URL('/', req.url));
  }
} 
// catch (error) {
//   console.error("Token verification failed:", error);
//     return NextResponse.redirect(new URL('/', req.url));
// }


  // try {
  //   console.log("Verifying token...");
  //   verifyToken(token);
  //   console.log("Token is valid according to middleware");

  //   return NextResponse.next();
  // } 
  
  catch (err) {
    console.log("Token verification failed:");
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
     '/admindashboard',
    '/superadmin',
    '/nationalmanagerdashboard',
    '/statemanagerdashboard',
    '/districtmanagerdashboard',
    '/agentpage',
    // add others
  ]
};

