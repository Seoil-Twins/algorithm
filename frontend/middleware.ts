import { getIronSession } from "iron-session";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { SessionData, sessionOptions } from "./app/api/sessionConfig";

export default async function middleware(req: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const path = req.nextUrl.pathname;

  if ((path === "/login" || path === "/signup") && session.sessionId) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};
