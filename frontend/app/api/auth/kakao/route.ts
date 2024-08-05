import { NextRequest, NextResponse } from "next/server";

import { API_INSTANCE, handleUnAuthorization } from "../..";

import { SnsKind } from "@/types/constants";

const API_URL = "/user/link";

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
    linkKind: SnsKind.KAKAO,
    // Kakao email 정책 변경으로 인해 비즈니스 앱 등록해야 가져올 수 있습니다.
    // domain: userData.response.email,
    domain: null,
  };

  try {
    req.headers.set("Content-Type", "application/json");
    await API_INSTANCE.POST(API_URL, req.headers, linkingData);
    return NextResponse.redirect(cloneUrl);
  } catch (error: any) {
    const headers: Headers = handleUnAuthorization(error, req.headers);
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=${error.errorCode}&message=${error.message}`,
      { headers },
    );
  }
};
