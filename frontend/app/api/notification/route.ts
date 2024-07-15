import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, handleUnAuthorization } from "..";

const API_URL = "/notification";

export const GET = async (req: NextRequest) => {
  const urlSearchParams = new URLSearchParams(req.nextUrl.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const page = params.page ? params.page : 1;
  const count = params.count ? params.count : 10;
  const pageOptions = {
    page: String(page),
    count: String(count),
  };

  const searchParams = new URLSearchParams(pageOptions).toString();

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
