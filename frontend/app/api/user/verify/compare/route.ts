import {
  API_INSTANCE,
  CustomException,
  createNextApiError,
  handleUnAuthorization,
} from "@/app/api";
import { validationEmail } from "@/utils/validation";
import { NextResponse } from "next/server";

const API_URL = "/user/verify/compare";

export const POST = async (req: Request) => {
  const body = await req.json();
  const verifiedEmail = validationEmail(body["email"]);
  const verifyCode = body["verifyCode"] as string;

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
  if (verifyCode.length !== 6) {
    return NextResponse.json(
      new CustomException(
        400,
        400,
        "BAD_REQUEST",
        "인증 번호는 반드시 6자리로만 이루어져야 합니다.",
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
      verifyCode: verifyCode,
    });

    return new Response(null, { status: 204 });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
