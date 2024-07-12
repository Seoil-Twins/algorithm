import { NextResponse } from "next/server";
import { API_INSTANCE, handleUnAuthorization } from "..";
import { User } from "../model/user";

const API_URL = "/user";

export const GET = async (req: Request) => {
  try {
    const response = await API_INSTANCE.GET(API_URL, req.headers);
    const user: User = response.data;

    return NextResponse.json(user, {
      status: 200,
      headers: response.headers,
    });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await API_INSTANCE.POST(API_URL, req.headers, body);
    return new Response(response.data, { status: 204 });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
