import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.redirect(cloneUrl);

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
  if (!accessToken) return NextResponse.redirect(cloneUrl);

  const userUrl = "https://kapi.kakao.com/v2/user/me";
  const userData = await (
    await fetch(userUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).json();
  if (!userData) return NextResponse.redirect(cloneUrl);

  const linkingData = {
    snsId: "1004",
    id: userData.id,
    // Kakao email 정책 변경으로 인해 비즈니스 앱 등록해야 가져올 수 있습니다.
    // domain: userData.response.email,
  };

  // linking API 호출
  console.log(linkingData);

  return NextResponse.redirect(cloneUrl);
};
