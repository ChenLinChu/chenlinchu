import type { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export function middleware(request: NextRequest): NextResponse {
    const response = handleI18nRouting(request);

    const { pathname } = request.nextUrl;

    response.headers.set('x-current-path', pathname);

    return response;
}

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
