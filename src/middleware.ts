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

const adminRoutes = ["/dashboard/users"]; // เพิ่มเส้นทางที่ต้องการให้เฉพาะแอดมินเข้าถึงได้
const authRedirectRoutes = ["/", "/login", "/register"]; // เพิ่มเส้นทางที่ต้องการให้ redirect เมื่อ login แล้ว
const publicRoutes = ["/login", "/register"]; // เส้นทางที่เข้าถึงได้โดยไม่ต้อง login

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authCookie = request.cookies.get("auth");
    const userRole = request.cookies.get("role")?.value;

    const isAdminRoute = adminRoutes.some((route) =>
        pathname.startsWith(route),
    );
    const isAuthRedirectRoute = authRedirectRoutes.includes(pathname);
    const isPublicRoute = publicRoutes.some((route) => pathname === route);

    // ถ้า login แล้วและพยายามเข้าถึงหน้า login, register หรือหน้าแรก ให้ redirect ไปที่ /home
    if (isAuthRedirectRoute && authCookie) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    // ถ้าไม่มี auth cookie และไม่ใช่ public routes ให้ไปหน้า login
    if (!authCookie && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
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
