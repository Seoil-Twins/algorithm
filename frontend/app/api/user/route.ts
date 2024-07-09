import { NextResponse } from "next/server";
import { BACKEND_API_URL, CustomException, createNextApiError } from "..";

const url = BACKEND_API_URL + "/user";

export const GET = async (req: Request) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: req.headers,
    });

    if (response.ok) {
      const cookie = response.headers.get("set-cookie");
      let headers = {};
      if (cookie) {
        headers = {
          "Set-Cookie": cookie,
        };
      }

      const user = await response.json();

      return NextResponse.json(user, {
        status: 200,
        headers,
      });
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

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body["email"],
        userPw: body["userPw"],
        nickname: body["nickname"],
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
