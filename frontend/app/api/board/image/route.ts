import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, handleUnAuthorization } from "../..";

const API_URL = "/board/image";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const { data, headers } = await API_INSTANCE.POST_FORMDATA(
      API_URL,
      req.headers,
      formData,
      true,
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
