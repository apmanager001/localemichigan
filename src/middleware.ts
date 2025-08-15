import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Handle 404 errors with proper status codes
  if (request.nextUrl.pathname === "/404") {
    return NextResponse.rewrite(new URL("/not-found", request.url), {
      status: 404,
    });
  }

  // Handle other non-existent routes
  if (
    !request.nextUrl.pathname.startsWith("/api") &&
    !request.nextUrl.pathname.startsWith("/_next") &&
    !request.nextUrl.pathname.startsWith("/static")
  ) {
    // Check if the path exists in your known routes
    const knownRoutes = [
      "/",
      "/cities",
      "/lakes",
      "/parks",
      "/lighthouses",
      "/museum",
      "/about",
      "/news",
    ];

    const pathExists = knownRoutes.some(
      (route) =>
        request.nextUrl.pathname === route ||
        request.nextUrl.pathname.startsWith(route + "/")
    );

    if (!pathExists) {
      return NextResponse.rewrite(new URL("/not-found", request.url), {
        status: 404,
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
