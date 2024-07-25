import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, handleUnAuthorization } from "../..";

const API_URL = "/comment/{commentId}";

type Params = { params: { commentId: string } };

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const { commentId } = params;

  try {
    const body = await req.json();

    const { headers } = await API_INSTANCE.PATCH(
      API_URL.replace("{commentId}", commentId),
      req.headers,
      body,
    );

    return Response.json(null, {
      status: 204,
      headers,
    });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  const { commentId } = params;

  try {
    const { headers } = await API_INSTANCE.DELETE(
      API_URL.replace("{commentId}", commentId),
      req.headers,
    );

    return Response.json(null, {
      status: 204,
      headers,
    });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
