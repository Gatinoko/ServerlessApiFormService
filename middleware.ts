import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
	matcher: '/user/:path*',
};

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/user')) {
		if (!request.cookies.get('token'))
			return NextResponse.redirect(new URL('/login', request.url));
	} else {
		return;
	}
}
