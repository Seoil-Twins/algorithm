import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { SessionData, sessionOptions } from "./app/api/sessionConfig";
import { AUTH_PATHS, NO_AUTH_PATHS } from "./constants";

const routes = ["/algorithm/detail/*"];

export default async function middleware(req: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const pathname = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  const hasSessionButUnAuthPath =
    NO_AUTH_PATHS.some((noAuthPath) => {
      const regex = new RegExp(noAuthPath);
      return regex.test(pathname);
    }) && session.sessionId;
  const noSessionButAuthPath =
    AUTH_PATHS.some((authPath) => {
      const regex = new RegExp(authPath);
      return regex.test(pathname);
    }) && !session.sessionId;

  if (pathname === "/algorithm/detail/369/new") {
    console.log(AUTH_PATHS, session.sessionId);
  }

  // 잘못된 권한으로 접근할 시 홈으로 리다이렉션
  if (hasSessionButUnAuthPath || noSessionButAuthPath) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (pathname === "/activity") {
    url.pathname = "/activity/question";
    return NextResponse.redirect(url);
  }

  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp(/^\/algorithm\/detail(?:\/[^\/]+)?\/?$/);

  if (
    regex.test(pathname) &&
    !pathname.includes("css") &&
    !pathname.includes("js")
  ) {
    const splitedPathname = pathname.split("/");
    const algorithmId = splitedPathname[splitedPathname.length - 1];

    if (isNaN(Number(algorithmId))) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", ...NO_AUTH_PATHS, ...AUTH_PATHS, ...routes],
};
