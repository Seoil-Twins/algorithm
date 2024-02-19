import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_PATHS, NO_AUTH_PATHS } from "./constants";

const routes = ["/((?!api|static|.*\\..*|_next).*)"];

export default async function middrleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/svgs") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const sessionKey = process.env.NEXT_PUBLIC_SESSION_KEY as string;
  const sessionId = cookies().get(sessionKey)?.value;

  const hasSessionButUnAuthPath =
    NO_AUTH_PATHS.some((noAuthPath) => {
      const regex = new RegExp(noAuthPath);
      return regex.test(pathname);
    }) && sessionId;
  const noSessionButAuthPath =
    AUTH_PATHS.some((authPath) => {
      const regex = new RegExp(authPath);
      return regex.test(pathname);
    }) && !sessionId;

  if (pathname === "/forum") {
    url.pathname = "/forum/all";
    return NextResponse.redirect(url);
  }

  // 잘못된 권한으로 접근할 시 홈으로 리다이렉션
  if (hasSessionButUnAuthPath) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (noSessionButAuthPath) {
    url.search = `error=unauthorized&redirectUrl=${pathname}`;
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (pathname === "/activity") {
    url.pathname = "/activity/question";
    return NextResponse.redirect(url);
  }

  const regex = new RegExp(/\/algorithm\/.+$/);

  if (regex.test(pathname)) {
    const splitedPathname = pathname.split("/");
    const algorithmId = splitedPathname[2];

    if (isNaN(Number(algorithmId))) {
      return NextResponse.error();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...NO_AUTH_PATHS, ...AUTH_PATHS, ...routes],
};
