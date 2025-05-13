// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const isLoggedIn = request.cookies.get("auth")?.value;

    // Redireciona da raiz "/" para /dashboard ou /login
    if (request.nextUrl.pathname === "/") {
        const redirectUrl = isLoggedIn ? "/dashboard" : "/login";
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    return NextResponse.next();
}
