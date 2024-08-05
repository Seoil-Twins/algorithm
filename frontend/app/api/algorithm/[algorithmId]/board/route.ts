import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, CustomException, handleUnAuthorization } from "../../..";

const API_URL = "/algorithm/{algorithmId}/board";

type Params = { params: { algorithmId: string } };

export const POST = async (req: NextRequest, { params }: Params) => {
  const body = await req.json();
  const { algorithmId } = params;

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
    const { headers } = await API_INSTANCE.POST(
      `${API_URL.replace("{algorithmId}", algorithmId)}`,
      req.headers,
      body,
    );
    return new Response(null, { status: 204, headers });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
