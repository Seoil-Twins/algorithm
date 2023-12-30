import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "../sessionConfig";

const enviroment = process.env.ENVIROMENT;
const API_URL =
  enviroment === "product"
    ? process.env.API_URL_PRODUCT
    : process.env.API_URL_DEVELOPMENT;

export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (session.sessionId) {
    return NextResponse.json(session);
  } else {
    return NextResponse.json(undefined);
  }
}

export async function POST(req: NextRequest) {
  const API_URL = "https://jsonplaceholder.typicode.com/users";

  try {
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions,
    );
    const response = await fetch(API_URL);
    const result = await response.json();

    if (result[0].id) {
      session.sessionId = result[0].id;
      await session.save();

      return NextResponse.json(session);
    } else {
      return NextResponse.json(
        {
          msg: "Not found",
        },
        { status: 404 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        msg: JSON.stringify(error),
      },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.destroy();

  return NextResponse.json(undefined);
}
