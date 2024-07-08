import { NextRequest, NextResponse } from "next/server";
import { BACKEND_API_URL, CustomException, createNextApiError } from "..";

const url = BACKEND_API_URL + "/notification";

export const GET = async (req: NextRequest) => {
  const urlSearchParams = new URLSearchParams(req.nextUrl.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const page = params.page ? params.page : 1;
  const count = params.count ? params.count : 10;
  const pageOptions = {
    page: String(page),
    count: String(count),
  };

  const searchParams = new URLSearchParams(pageOptions).toString();

  try {
    const response = await fetch(`${url}?${searchParams}`, {
      method: "GET",
      headers: req.headers,
    });

    if (response.ok) {
      const notifications = await response.json();
      return NextResponse.json(notifications, { status: 200 });
    } else {
      const error = (await response.json()) as CustomException;
      return NextResponse.json(error, { status: error.status });
    }
  } catch (error: any) {
    const response: CustomException = createNextApiError(error.message);
    return NextResponse.json(response, { status: response.status });
  }
};
