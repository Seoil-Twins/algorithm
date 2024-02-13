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
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret)
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=500&message=internal_server_error`,
    );

  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: clientId,
    client_secret: clientSecret,
    code,
  };
  const authParams = new URLSearchParams(config).toString();
  const accessTokenUrl = `${baseUrl}?${authParams}`;

  const response = await fetch(accessTokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  if (response.status >= 400)
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=401&message=not_authorized`,
    );

  const data = await response.json();
  const accessToken = data.access_token;
  if (!accessToken)
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=404&message=not_found_token`,
    );

  const userUrl = "https://api.github.com/user";
  const userData = await (
    await fetch(userUrl, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    })
  ).json();
  if (!userData)
    return NextResponse.redirect(
      `${cloneUrl}?errorCode=404&message=not_found_user`,
    );

  /**
   {
    login: 'seungyong',
    id: 44765636,
    node_id: 'MDQ6VXNlcjQ0NzY1NjM2',
    avatar_url: 'https://avatars.githubusercontent.com/u/44765636?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/seungyong',
    html_url: 'https://github.com/seungyong',
    followers_url: 'https://api.github.com/users/seungyong/followers',
    following_url: 'https://api.github.com/users/seungyong/following{/other_user}',
    gists_url: 'https://api.github.com/users/seungyong/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/seungyong/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/seungyong/subscriptions',
    organizations_url: 'https://api.github.com/users/seungyong/orgs',
    repos_url: 'https://api.github.com/users/seungyong/repos',
    events_url: 'https://api.github.com/users/seungyong/events{/privacy}',
    received_events_url: 'https://api.github.com/users/seungyong/received_events',
    type: 'User',
    site_admin: false,
    name: 'seungyong',
    company: null,
    blog: '',
    location: null,
    email: 'seungyong20@naver.com',
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 5,
    public_gists: 0,
    followers: 1,
    following: 1,
    created_at: '2018-11-05T07:20:26Z',
    updated_at: '2024-01-09T10:32:05Z',
    private_gists: 0,
    total_private_repos: 3,
    owned_private_repos: 3,
    disk_usage: 15482,
    collaborators: 1,
    two_factor_authentication: true,
    plan: {
      name: 'free',
      space: 976562499,
      collaborators: 0,
      private_repos: 10000
    }
   }
   */
  const linkingData = {
    linkKind: "1001",
    id: userData.id,
    domain: userData.html_url,
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
