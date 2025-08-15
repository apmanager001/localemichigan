import { NextResponse } from "next/server";

export async function GET() {
  // This route will always return a 404 for testing purposes
  return new NextResponse(
    JSON.stringify({
      error: "Not Found",
      message: "This is a test 404 response",
      status: 404,
    }),
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}
