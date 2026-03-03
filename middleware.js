import { NextResponse } from "next/server";

const locales = ["tr", "en"];
const defaultLocale = "tr";

function getLocale(request) {
    const acceptLanguage = request.headers.get("accept-language") || "";
    const preferred = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();
    if (locales.includes(preferred)) return preferred;
    return defaultLocale;
}

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Check if pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Skip Next.js internals and static files
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".") // static files
    ) {
        return;
    }

    // Redirect to locale path
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
