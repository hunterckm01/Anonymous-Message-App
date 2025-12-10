import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from 'next-auth/middleware'
import { getToken } from "next-auth/jwt";

export function middleware(request: NextRequest){
    return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
    matcher: [
        'sign-in',
        'sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ]
} 