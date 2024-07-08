import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { validationEmail, validationPassword } from "@/utils/validation";

import { BACKEND_API_URL, CustomException, createNextApiError } from "../..";

const url = BACKEND_API_URL + "/user/login";

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
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body["email"],
        userPw: body["password"],
      }),
    });

    if (response.ok) {
      const cookie = response.headers.get("set-cookie");
      if (!cookie) {
        const response: CustomException = createNextApiError(null);
        return NextResponse.json(response, { status: response.status });
      }

      revalidatePath("/", "layout");
      return new Response(null, {
        status: 204,
        headers: {
          "Set-Cookie": cookie,
        },
      });
    } else {
      const error = (await response.json()) as CustomException;
      return NextResponse.json(error, { status: error.status });
    }
  } catch (error: any) {
    const response: CustomException = createNextApiError(error.message);
    return NextResponse.json(response, { status: response.status });
  }
};
