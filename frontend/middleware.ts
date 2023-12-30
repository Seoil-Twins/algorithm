import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "@/app/api/sessionConfig";

export default async function middleware(req: NextRequest) {}

export const config = {
  matcher: ["/", "/api/auth", "/algorithm"],
};
