import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, getPagination, handleUnAuthorization } from "../../..";

const API_URL = "/user/{userId}/comment";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  const { userId } = params;
  const searchParams = getPagination(req.nextUrl.search, 1, 5);

  try {
    const { data, headers } = await API_INSTANCE.GET(
      `${API_URL.replace("{userId}", userId)}?${searchParams}`,
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
