import { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { axiosInstance } from "@/api";

import { User } from "@/interfaces/user";

export const GET = async (req: NextRequest) => {
  const { nextUrl } = req;
  const cloneUrl = nextUrl.clone();
  cloneUrl.pathname = "/account";
  cloneUrl.search = "";

  const urlSearchParams = new URLSearchParams(nextUrl.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const code = params.code;
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_CODE_REDIRECT_URI;

  if (!code || !clientId || !clientSecret || !redirectUri)
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=500&message=internal_server_error`,
    );

  const tokenBaseUrl = "https://oauth2.googleapis.com/token";
  const config = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  const response = await fetch(tokenBaseUrl, {
    method: "POST",
    body: JSON.stringify(config),
  });
  const data = await response.json();
  const accessToken = data.access_token;
  if (!accessToken)
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=404&message=not_found_token`,
    );

  const userUrl = "https://www.googleapis.com/userinfo/v2/me";
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

  /**
    {
      id: '113714605051498155953',
      email: 'kseungyong20@gmail.com',
      verified_email: true,
      name: '김승용',
      given_name: '승용',
      family_name: '김',
      picture: 'https://lh3.googleusercontent.com/a/ACg8ocJRhihvl-4IxZMHTFmvOY5t_1hte4JzY4Z2Rcy0BrAU=s96-c',
      locale: 'ko'
    }
   */
  const linkingData = {
    linkKind: "1002",
    id: userData.id,
    domain: userData.email,
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