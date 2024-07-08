import { NextResponse } from "next/server";
import { BACKEND_API_URL, CustomException, createNextApiError } from "../..";
import { cookies } from "next/headers";

const url = BACKEND_API_URL + "/user/logout";

export const POST = async (req: Request, _res: Response) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: req.headers,
    });

    console.log(response);

    if (response.ok) {
      cookies().delete(
        (process.env.NEXT_PUBLIC_SESSION_KEY as string) || "JSESSIONID",
      );

      return new Response(null, {
        status: 204,
      });
    }
  } catch (error: any) {
    const response: CustomException = createNextApiError(error.message);
    return NextResponse.json(response, { status: response.status });
  }
};
