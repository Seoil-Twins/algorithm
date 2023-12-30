import { SessionData, sessionOptions } from "@/app/api/sessionConfig";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

/**
 * 이 함수는 서버 컴포넌트에서만 작동합니다.
 *
 *
 * 클라이언트 컴포넌트에서 사용하고싶다면 /utils/clientSideSession.ts를 사용하세요.
 * @returns Promise<string | undefined>
 */
export const getSessionId = async (): Promise<string | undefined> => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session.sessionId ? session.sessionId : undefined;
};
