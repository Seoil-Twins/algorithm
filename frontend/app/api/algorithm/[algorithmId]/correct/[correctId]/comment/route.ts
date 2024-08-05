import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, handleUnAuthorization } from "../../../../..";

const API_URL = "/algorithm/{algorithmId}/correct/{correctId}/comment";

type Params = { params: { algorithmId: string; correctId: string } };

export const GET = async (req: NextRequest, { params }: Params) => {
  const { algorithmId, correctId } = params;

  try {
    const url = API_URL.replace("{algorithmId}", algorithmId).replace(
      "{correctId}",
      correctId,
    );

    const { data, headers } = await API_INSTANCE.GET(
      `${url}?${req.nextUrl.searchParams.toString()}`,
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

export const POST = async (req: NextRequest, { params }: Params) => {
  const { algorithmId, correctId } = params;

  try {
    const url = API_URL.replace("{algorithmId}", algorithmId).replace(
      "{correctId}",
      correctId,
    );
    const body = await req.json();

    const { headers } = await API_INSTANCE.POST(url, req.headers, body);

    return new Response(null, {
      status: 204,
      headers,
    });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
