import { NextRequest, NextFetchEvent } from "next/server";

const publicPaths = ["/", "/auth"];

export function middleware(req: NextRequest, _event: NextFetchEvent) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("auth-token")?.value;

    if (
        publicPaths.some(
            (path) => pathname === path || pathname.startsWith(path + "/")
        )
    ) {
        return;
    }

    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return Response.redirect(url);
    }

    return;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
