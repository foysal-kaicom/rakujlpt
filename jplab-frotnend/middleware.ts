import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const expiresAt = req.cookies.get("expires_at")?.value;

  const isTokenExpired = expiresAt && Date.now() >= Number(expiresAt);

  if (!token || isTokenExpired) {
    const url = req.nextUrl.clone();

    url.pathname = "/sign_in";
    url.searchParams.set(
      "callbackUrl",
      req.nextUrl.pathname + req.nextUrl.search
    );

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Only apply middleware to protected paths
export const config = {
  matcher: [
    "/dashboard",
    "/profile",
    "/exam_history/(.*)",
    "/exam_result",
    "/mock_test_result",
    "/support",
    "/update_password",

    "/checkout/(.*)",
    "/payment-success/(.*)",
    "/payment-failed/(.*)",
    "/payment-cancle/(.*)",
    "/otp_verify",
    "/mock_test/start/(.*)"
  ],
};
