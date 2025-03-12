import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getUser } from "@/lib/actions/users";

const adminRoutes = ["/dashboard/users"]; // เพิ่มเส้นทางที่ต้องการให้เฉพาะแอดมินเข้าถึงได้
const authRedirectRoutes = ["/login", "/register"]; // เพิ่มเส้นทางที่ต้องการให้ redirect เมื่อ login แล้ว
const publicRoutes = ["/login", "/register", "/forgetpassword"]; // เส้นทางที่เข้าถึงได้โดยไม่ต้อง login
const restrictedRoles = ["3", "4"]; // INSTRUCTOR และ STAFF
const restrictedAllowedPaths = ["/", "/profile"]; // เพิ่มเส้นทางที่ INSTRUCTOR และ STAFF เข้าถึงได้

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authCookie = request.cookies.get("auth");

    try {
        // ถ้ามี auth cookie ให้ดึงข้อมูล user จาก API
        let userRole = null;
        if (authCookie) {
            const user = await getUser();
            userRole = user?.role?.toString() || null;
        }

        const isAdminRoute = adminRoutes.some((route) =>
            pathname.startsWith(route),
        );
        const isAuthRedirectRoute = authRedirectRoutes.includes(pathname);
        const isPublicRoute = publicRoutes.some((route) => pathname === route);
        const isRestrictedRole = restrictedRoles.includes(userRole || "");

        // ถ้าเป็น INSTRUCTOR หรือ STAFF ให้เข้าถึงได้เฉพาะหน้าที่กำหนด
        if (isRestrictedRole && !restrictedAllowedPaths.includes(pathname)) {
            return NextResponse.redirect(new URL("/", request.url));
        }

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
    } catch (error) {
        // ถ้าเกิดข้อผิดพลาดในการดึงข้อมูล user ให้แสดงหน้า Error
        console.error("Error in middleware:", error);
        return NextResponse.rewrite(new URL("/not-found", request.url));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
