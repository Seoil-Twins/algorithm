import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, CustomException, handleUnAuthorization } from "..";

const API_URL = "/board";

export const GET = async (req: NextRequest) => {
  try {
    const { data, headers } = await API_INSTANCE.GET(
      `${API_URL}?${req.nextUrl.searchParams.toString()}`,
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

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    if (body["content"].trim() === "" || body["content"].trim().length < 10) {
      throw new CustomException(
        400,
        400,
        "BAD_REQUEST",
        "내용을 10자 이상 입력해주세요.",
        "BAD_REQUEST",
        new Date(Date.now()).toString(),
      );
    }
    if (body["title"].trim() === "" || body["title"].trim().length < 2) {
      throw new CustomException(
        400,
        400,
        "BAD_REQUEST",
        "제목을 2자 이상 입력해주세요.",
        "BAD_REQUEST",
        new Date(Date.now()).toString(),
      );
    }
  } catch (error: any) {
    return NextResponse.json(error, { status: error.status });
  }

  try {
    const { headers } = await API_INSTANCE.POST(API_URL, req.headers, body);
    return new Response(null, { status: 204, headers });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
