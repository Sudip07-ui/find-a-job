import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/", "/auth/sign-in", "/auth/sign-up", "/auth/onboarding",
  "/jobs", "/jobs/(.*)", "/companies", "/companies/(.*)",
  "/about", "/pricing", "/blog", "/blog/(.*)",
  "/api/webhooks/(.*)", "/api/public/(.*)",
  "/_next/(.*)", "/favicon.ico", "/images/(.*)", "/fonts/(.*)",
]);

const isApiRoute = createRouteMatcher(["/api/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const { pathname } = req.nextUrl;

  if (isPublicRoute(req)) return NextResponse.next();
  if (!userId) {
    const signInUrl = new URL("/auth/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  if (pathname.startsWith("/dashboard/employer")) {
    const role = sessionClaims?.metadata?.role as string;
    if (role && role !== "EMPLOYER" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/seeker", req.url));
    }
  }

  if (pathname.startsWith("/dashboard/seeker")) {
    const role = sessionClaims?.metadata?.role as string;
    if (role && role !== "SEEKER" && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/employer", req.url));
    }
  }

  if (isApiRoute(req) && !userId) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)"],
};