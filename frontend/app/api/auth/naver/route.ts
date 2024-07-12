import { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { axiosInstance } from "@/api/index2";

import { User } from "@/types2/user";

export const GET = async (req: NextRequest) => {
  const { nextUrl } = req;
  const cloneUrl = nextUrl.clone();
  cloneUrl.pathname = "/account";
  cloneUrl.search = "";

  const urlSearchParams = new URLSearchParams(nextUrl.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const code = params.code;
  const state = params.state;
  const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_NAVER_CODE_REDIRECT_URI;

  if (!code || !state || !clientId || !clientSecret || !redirectUri)
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=500&message=internal_server_error`,
    );

  const tokenBaseUrl = "https://nid.naver.com/oauth2.0/token";
  const config = {
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    code,
    state,
  };
  const tokenParams = new URLSearchParams(config);

  const response = await fetch(`${tokenBaseUrl}?${tokenParams}`, {
    method: "GET",
  });
  const data = await response.json();
  const accessToken = data.access_token;
  if (!accessToken)
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=404&message=not_found_token`,
    );

  const userUrl = "https://openapi.naver.com/v1/nid/me";
  const userData = await (
    await fetch(userUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).json();
  if (!userData)
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=404&message=not_found_user`,
    );

  // https://developers.naver.com/docs/login/devguide/devguide.md#3-4-5-%EC%A0%91%EA%B7%BC-%ED%86%A0%ED%81%B0%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%ED%94%84%EB%A1%9C%ED%95%84-api-%ED%98%B8%EC%B6%9C%ED%95%98%EA%B8%B0
  const linkingData = {
    linkKind: "1003",
    id: userData.response.id,
    domain: userData.response.email,
  };

  // linking API 호출
  try {
    const user: AxiosResponse<User> = await axiosInstance.get("/user/me");
    await axiosInstance.post(`/user/link/${user.data.userId}`, linkingData);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.redirect(
        `${cloneUrl}?errorCode=${error.response?.data.errorCode}&message=${error.response?.data.message}`,
      );
    }
  }

  return NextResponse.redirect(cloneUrl);
};
