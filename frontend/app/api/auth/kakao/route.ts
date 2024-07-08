import { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { axiosInstance } from "@/api";

import { User } from "@/types2/user";

export const GET = async (req: NextRequest) => {
  const { nextUrl } = req;
  const cloneUrl = nextUrl.clone();
  cloneUrl.pathname = "/account";
  cloneUrl.search = "";

  const urlSearchParams = new URLSearchParams(nextUrl.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const code = params.code;
  const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const clientSecret = process.env.KAKAO_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_CODE_REDIRECT_URI;

  if (!code || !clientId || !clientSecret || !redirectUri)
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=500&message=internal_server_error`,
    );

  const tokenBaseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    code,
  };

  const response = await fetch(`${tokenBaseUrl}`, {
    method: "POST",
    body: new URLSearchParams(config),
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
  const data = await response.json();
  const accessToken = data.access_token;
  if (!accessToken)
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=404&message=not_found_token`,
    );

  const userUrl = "https://kapi.kakao.com/v2/user/me";
  const userData = await (
    await fetch(userUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).json();
  if (!userData)
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=404&message=not_found_user`,
    );

  const linkingData = {
    linkKind: "1004",
    id: userData.id,
    // Kakao email 정책 변경으로 인해 비즈니스 앱 등록해야 가져올 수 있습니다.
    // domain: userData.response.email,
    domain: "seungyong00@kakao.com",
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
