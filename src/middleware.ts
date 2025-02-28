import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = "/dashboard";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authCookie = request.cookies.get("auth");
    const isProtectedRoute = pathname.startsWith(protectedRoutes);

    if (isProtectedRoute && !authCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const res = NextResponse.next();

    return res;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
