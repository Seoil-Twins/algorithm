import {
  BACKEND_API_URL,
  CustomException,
  createNextApiError,
} from "@/app/api";
import { validationEmail } from "@/utils/validation";
import { NextResponse } from "next/server";

const url = BACKEND_API_URL + "/user/verify/compare";

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
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body["email"],
        verifyCode: verifyCode,
      }),
    });

    if (response.ok) {
      return new Response(null, { status: 204 });
    } else {
      const error = (await response.json()) as CustomException;
      if (!error.message) {
        error.message = "알 수 없는 오류가 발생하였습니다.";
      }

      return NextResponse.json(error, { status: error.status });
    }
  } catch (error: any) {
    const response: CustomException = createNextApiError(error.message);
    return NextResponse.json(response, { status: response.status });
  }
};
