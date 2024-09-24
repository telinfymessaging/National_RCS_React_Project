import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticated = request.cookies.get("accesstoken")?.value;
  const privatePathRegex = /^\/(campaign|dashboard|reports|settings|download|inbox|template)?$/; // Add all private paths here
  const publicPathRegex = /^\/(login|register)$/; //
  if (publicPathRegex.test(path) && isAuthenticated) {
    return NextResponse.redirect(new URL("/campaign", request.url));
  }
  if (privatePathRegex.test(path) && isAuthenticated) {
    return NextResponse.next();
  }
  if (
    privatePathRegex.test(path) &&
    (!isAuthenticated || isAuthenticated === undefined)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}