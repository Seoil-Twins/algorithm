import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { validationEmail, validationPassword } from "@/utils/validation";

import {
  API_INSTANCE,
  CustomException,
  createNextApiError,
  handleUnAuthorization,
} from "../..";

const API_URL = "/user/login";

export const POST = async (req: Request) => {
  const body = await req.json();
  const isValidatedEmail = validationEmail(body["email"]);
  const isValidatedPassword = validationPassword(body["password"]);

  if (isValidatedEmail.isError) {
    return NextResponse.json(
      new CustomException(
        400,
        400,
        "BAD_REQUEST",
        isValidatedEmail.errMsg,
        "BAD_REQUEST_PASSWORD",
        new Date(Date.now()).toString(),
      ),
      {
        status: 400,
      },
    );
  }
  if (isValidatedPassword.isError) {
    return NextResponse.json(
      new CustomException(
        400,
        400,
        "BAD_REQUEST",
        isValidatedPassword.errMsg,
        "BAD_REQUEST_PASSWORD",
        new Date(Date.now()).toString(),
      ),
      {
        status: 400,
      },
    );
  }

  try {
    const { headers } = await API_INSTANCE.POST(API_URL, req.headers, {
      email: body["email"],
      userPw: body["password"],
    });

    const cookie = headers.get("set-cookie");
    if (!cookie) {
      const response: CustomException = createNextApiError(null);
      return NextResponse.json(response, { status: response.status });
    }

    revalidatePath("/", "layout");
    return new Response(null, {
      status: 204,
      headers,
    });
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.json(error, { status: error.status, headers });
  }
};
