import { NextResponse } from "next/server";
import { API_INSTANCE, handleUnAuthorization } from "../..";
import { SnsInfo } from "../../model/user";

const API_URL = "/user/link";

export const GET = async (req: Request) => {
  try {
    const response = await API_INSTANCE.GET(API_URL, req.headers);
    const snsInfo: SnsInfo = response.data;

    return NextResponse.json(snsInfo, {
      status: 200,
      headers: response.headers,
    });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
