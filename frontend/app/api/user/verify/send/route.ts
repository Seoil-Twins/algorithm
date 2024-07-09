import {
  API_INSTANCE,
  CustomException,
  createNextApiError,
  handleUnAuthorization,
} from "@/app/api";
import { validationEmail } from "@/utils/validation";
import { NextResponse } from "next/server";

const API_URL = "/user/verify/send";

export const POST = async (req: Request) => {
  const body = await req.json();
  const verifiedEmail = validationEmail(body["email"]);

  if (verifiedEmail.isError) {
    return NextResponse.json(
      new CustomException(
        400,
        400,
        "BAD_REQUEST",
        verifiedEmail.errMsg,
        "BAD_REQUEST_PASSWORD",
        new Date(Date.now()).toString(),
      ),
      {
        status: 400,
      },
    );
  }

  try {
    await API_INSTANCE.POST(API_URL, req.headers, {
      email: body["email"],
    });

    return new Response(null, { status: 204 });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
