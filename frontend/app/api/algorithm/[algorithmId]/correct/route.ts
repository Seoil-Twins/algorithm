import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, handleUnAuthorization } from "../../..";

const API_URL = "/algorithm/{algorithmId}/correct";

type Params = { params: { algorithmId: string } };

export const GET = async (req: NextRequest, { params }: Params) => {
  const { algorithmId } = params;

  try {
    const { data, headers } = await API_INSTANCE.GET(
      `${API_URL.replace(
        "{algorithmId}",
        algorithmId,
      )}?${req.nextUrl.searchParams.toString()}`,
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
