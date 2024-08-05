import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, handleUnAuthorization } from "../..";

const API_URL = "/user/notification";

export const GET = async (req: NextRequest) => {
  try {
    const { data, headers } = await API_INSTANCE.GET(API_URL, req.headers);

    return NextResponse.json(data, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { headers } = await API_INSTANCE.PUT(API_URL, req.headers, body);
    return new Response(null, { status: 204, headers });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
