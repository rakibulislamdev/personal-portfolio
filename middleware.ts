import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract client IP address from headers
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  // Extract Country and City headers (supported on Vercel/Cloudflare deployments)
  const country = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry") || "Unknown Country";
  const city = request.headers.get("x-vercel-ip-city") || "Unknown City";

  const response = NextResponse.next();

  // Attach visitor tracking info to request headers for server-side consumption
  response.headers.set("x-visitor-ip", ip);
  response.headers.set("x-visitor-country", country);
  response.headers.set("x-visitor-city", city);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files, _next, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
