/**
 * 해당 파일은 IronSession에서 예제를 보고 변형한 것입니다.
 * 보다 자세히 확인하고, 더 많은 예제 샘플을 보고싶으면 다음 링크 주소를 통해서 보세요.
 * https://github.com/vvo/iron-session/blob/main/examples/next/src/app/app-router-client-component-route-handler-swr/use-session.ts
 */

import useSWR from "swr";
import { SessionData } from "@/app/api/sessionConfig";
import useSWRMutation from "swr/mutation";

const sessionApiRoute = "/api/auth";

async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  return fetch(input, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    ...init,
  }).then((res) => res.json());
}

function doLogin(url: string, { arg }: { arg: string }) {
  return fetchJson<SessionData>(url, {
    method: "POST",
    body: JSON.stringify({ userId: arg }),
  });
}

function doLogout(url: string) {
  return fetchJson<SessionData>(url, {
    method: "DELETE",
  });
}

export default function useSession() {
  const { data: session, isLoading } = useSWR(
    sessionApiRoute,
    fetchJson<SessionData>,
    {
      fallbackData: { sessionId: undefined },
    },
  );

  const { trigger: login } = useSWRMutation(sessionApiRoute, doLogin, {
    revalidate: false,
  });
  const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout);

  return { session, logout, login, isLoading };
}
