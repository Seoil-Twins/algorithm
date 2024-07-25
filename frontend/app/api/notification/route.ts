import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, getPagination, handleUnAuthorization } from "..";

const API_URL = "/notification";

export const GET = async (req: NextRequest) => {
  const searchParams = getPagination(req.nextUrl.search);

  try {
    const { data, headers } = await API_INSTANCE.GET(
      `${API_URL}?${searchParams}`,
      req.headers,
    );

    return NextResponse.json(data, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
