import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, handleUnAuthorization } from "..";

const API_URL = "/user";

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

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { headers } = await API_INSTANCE.POST(API_URL, req.headers, body);
    return new Response(null, { status: 204, headers });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};

export const PATCH = async (req: Request) => {
  try {
    const body = await req.json();
    const { headers } = await API_INSTANCE.PATCH(API_URL, req.headers, body);
    return new Response(null, { status: 204, headers });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { headers } = await API_INSTANCE.DELETE(API_URL, req.headers);
    return NextResponse.json(null, { status: 204, headers });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
