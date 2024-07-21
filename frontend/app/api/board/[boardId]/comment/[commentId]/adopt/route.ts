import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, handleUnAuthorization } from "../../../../..";

const API_URL = "/board/{boardId}/comment/{commentId}/adopt";

type Params = { params: { boardId: string; commentId: string } };

export const POST = async (req: NextRequest, { params }: Params) => {
  const { boardId, commentId } = params;

  try {
    const apiUrl = API_URL.replace("{boardId}", boardId).replace(
      "{commentId}",
      commentId,
    );

    const { headers } = await API_INSTANCE.POST(apiUrl, req.headers);

    return NextResponse.json(null, {
      status: 204,
      headers,
    });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return Response.json(error, { status: error.status, headers });
  }
};
