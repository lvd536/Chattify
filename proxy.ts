import { NextRequest } from "next/server";

const publicPaths = ["/", "/auth", "/login", "/register", "/forgot-password"];

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("token")?.value;

    if (
        publicPaths.some(
            (path) => pathname === path || pathname.startsWith(path + "/")
        ) &&
        token
    ) {
        const url = req.nextUrl.clone();
        url.pathname = "/home";
        return Response.redirect(url);
    }

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
