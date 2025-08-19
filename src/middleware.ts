import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only handle the specific 404 case, let everything else pass through
  if (request.nextUrl.pathname === "/404") {
    return NextResponse.rewrite(new URL("/not-found", request.url), {
      status: 404,
    });
  }

  // Let all other requests pass through normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only match the specific 404 path
    "/404",
  ],
};
