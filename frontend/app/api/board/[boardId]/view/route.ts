import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, CustomException, handleUnAuthorization } from "../../..";

const API_URL = "/board/{boardId}/view";

type Params = { params: { boardId: string } };

export const POST = async (req: NextRequest, { params }: Params) => {
  const { boardId } = params;

  try {
    const { headers } = await API_INSTANCE.POST(
      API_URL.replace("{boardId}", boardId),
      req.headers,
    );

    return new Response(null, { status: 204, headers });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
