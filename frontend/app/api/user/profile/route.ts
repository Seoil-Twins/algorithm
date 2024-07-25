import { NextRequest, NextResponse } from "next/server";
import { API_INSTANCE, handleUnAuthorization } from "../..";

const API_URL = "/user/profile";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};

export const PATCH = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const { headers } = await API_INSTANCE.PATCH_FORMDATA(
      API_URL,
      req.headers,
      formData,
    );

    return new Response(null, {
      status: 204,
      headers,
    });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
