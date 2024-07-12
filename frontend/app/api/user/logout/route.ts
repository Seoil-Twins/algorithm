import { NextResponse } from "next/server";
import {
  API_INSTANCE,
  CustomException,
  createNextApiError,
  handleUnAuthorization,
} from "../..";
import { cookies } from "next/headers";

const API_URL = "/user/logout";

export const POST = async (req: Request, _res: Response) => {
  try {
    cookies().delete(
      (process.env.NEXT_PUBLIC_SESSION_KEY as string) || "JSESSIONID",
    );

    await API_INSTANCE.POST(API_URL, req.headers);

    return new Response(null, {
      status: 204,
    });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
