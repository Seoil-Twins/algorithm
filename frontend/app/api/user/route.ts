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
      const user = await response.json();
      return NextResponse.json(user, { status: 200 });
    } else {
      const error = (await response.json()) as CustomException;
      return NextResponse.json(error, { status: error.status });
    }
  } catch (error: any) {
    const response: CustomException = createNextApiError(error.message);
    return NextResponse.json(response, { status: response.status });
  }
};
