import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware function that intercepts and processes incoming requests in a Next.js application.
 * - If the request URL path is "/pages", the request is redirected to the home page ("/").
 * - Otherwise, the request is allowed to proceed as normal.
 */

export const middleware = (request: NextRequest): NextResponse => {
  if (request.nextUrl.pathname === "/pages") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
};
