import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /* ===============================
     🔹 NEW (SAFE): SKIP API ROUTES
     (Training progress, login, me API etc.)
  =============================== */
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  /* ===============================
     1️⃣ PUBLIC ROUTES (UNCHANGED)
  =============================== */
  if (
    pathname.startsWith("/agentlogin") ||
    pathname.startsWith("/adminlogin") ||
    pathname.startsWith("/managerlogin")
  ) {
    return NextResponse.next();
  }

  /* ===============================
     2️⃣ READ TOKEN (UNCHANGED)
  =============================== */
  const token =
    req.cookies.get("adminToken")?.value ||
    req.cookies.get("managerToken")?.value ||
    req.cookies.get("agentToken")?.value;

  if (!token) {
    if (
      pathname.startsWith("/agentpage") ||
      pathname.startsWith("/videolectures")
    ) {
      return NextResponse.redirect(new URL("/agentlogin", req.url));
    }

    if (pathname.startsWith("/admindashboard")) {
      return NextResponse.redirect(new URL("/adminlogin", req.url));
    }

    if (
      pathname.startsWith("/nationalmanagerdashboard") ||
      pathname.startsWith("/statemanagerdashboard") ||
      pathname.startsWith("/districtmanagerdashboard")
    ) {
      return NextResponse.redirect(new URL("/managerlogin", req.url));
    }

    return NextResponse.redirect(new URL("/", req.url));
  }

  /* ===============================
     3️⃣ VERIFY TOKEN (UNCHANGED)
  =============================== */
  const decoded: any = await verifyToken(token);

  if (!decoded || !decoded.role) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = decoded.role;
  const status = decoded.accountStatus;
  const trainingCompleted = decoded.trainingCompleted === true;

  /* ===============================
     4️⃣ ACCOUNT STATUS CHECK (UNCHANGED)
  =============================== */
  if (status !== "active") {
    if (role === "agent") {
      return NextResponse.redirect(new URL("/agentlogin", req.url));
    }

    if (["national", "state", "district"].includes(role)) {
      return NextResponse.redirect(new URL("/managerlogin", req.url));
    }

    return NextResponse.redirect(new URL("/adminlogin", req.url));
  }

  /* ===============================
     🔹 NEW (SAFE): AGENT LOGIN PAGE GUARD
     - Prevent blank page after login
  =============================== */
  if (role === "agent" && pathname.startsWith("/agentlogin")) {
    if (trainingCompleted) {
      return NextResponse.redirect(new URL("/agentpage", req.url));
    } else {
      return NextResponse.redirect(new URL("/videolectures", req.url));
    }
  }

  /* ===============================
     5️⃣ AGENT TRAINING LOGIC (UNCHANGED)
  =============================== */
  if (role === "agent") {
    // ✅ TRAINING COMPLETED → ONLY AGENT PAGE
    if (trainingCompleted) {
      if (pathname.startsWith("/videolectures")) {
        return NextResponse.redirect(new URL("/agentpage", req.url));
      }
      return NextResponse.next();
    }

    // ❌ TRAINING NOT COMPLETED → ONLY VIDEOLECTURES
    if (!trainingCompleted) {
      if (!pathname.startsWith("/videolectures")) {
        return NextResponse.redirect(new URL("/videolectures", req.url));
      }
      return NextResponse.next();
    }
  }

  /* ===============================
     6️⃣ OTHER ROLES (UNCHANGED)
  =============================== */
  if (role === "superadmin" && pathname.startsWith("/superadmin"))
    return NextResponse.next();

  if (role === "admin" && pathname.startsWith("/admindashboard"))
    return NextResponse.next();

  if (role === "national" && pathname.startsWith("/nationalmanagerdashboard"))
    return NextResponse.next();

  if (role === "state" && pathname.startsWith("/statemanagerdashboard"))
    return NextResponse.next();

  if (role === "district" && pathname.startsWith("/districtmanagerdashboard"))
    return NextResponse.next();

  return NextResponse.redirect(new URL("/", req.url));
}

/* ===============================
   7️⃣ MATCHER (UNCHANGED)
=============================== */
export const config = {
  matcher: [
    "/superadmin/:path*",

    "/admindashboard/:path*",

    "/nationalmanagerdashboard/:path*",
    "/statemanagerdashboard/:path*",
    "/districtmanagerdashboard/:path*",

    "/agentpage",
    "/agentpage/:path*",

    "/videolectures",
    "/videolectures/:path*",
  ],
};
