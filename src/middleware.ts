import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// const protectedRoutes = "/dashboard";

// export async function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl;
//     const authCookie = request.cookies.get("auth");
//     const isProtectedRoute = pathname.startsWith(protectedRoutes);

//     if (isProtectedRoute && !authCookie) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

const protectedRoutes = "/dashboard";
const adminRoutes = ["/dashboard/users"]; // เพิ่มเส้นทางที่ต้องการให้เฉพาะแอดมินเข้าถึงได้

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authCookie = request.cookies.get("auth");
    const userRole = request.cookies.get("role")?.value;

    const isProtectedRoute = pathname.startsWith(protectedRoutes);
    const isAdminRoute = adminRoutes.some((route) =>
        pathname.startsWith(route),
    );

    // ถ้าไม่มี auth cookie ให้ไปหน้า login
    if (isProtectedRoute && !authCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname === "/login" && authCookie) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // ถ้าไม่ใช่แอดมิน (role !== "1") และพยายามเข้าถึงหน้าแอดมิน
    if (isAdminRoute && userRole !== "1") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
