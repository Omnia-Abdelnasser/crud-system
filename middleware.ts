import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware triggered on:", req.nextUrl.pathname);
  const token = req.cookies.get("token")?.value;

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    console.log(" No token, redirecting...");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
