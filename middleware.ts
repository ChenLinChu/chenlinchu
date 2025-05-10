import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware';

import type { NextRequest } from 'next/server'

import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const response = NextResponse.next();
    response.headers.set('x-current-path', pathname);

    return response;
}