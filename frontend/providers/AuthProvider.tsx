"use client";

import { getUser } from "@/api/user";
import { SessionResponse } from "@/app/api/sessionConfig";
import { User } from "@/interfaces/user";
import useSession from "@/utils/clientSideSession";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthProviderContext = {
  user?: User;
} & SessionResponse;

const AuthContext = createContext<AuthProviderContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { session, isLoading, isValidating, mutate, login, logout } =
    useSession();
  const [user, setUser] = useState<User | undefined>(undefined);

  const updateSession = async () => {
    await mutate();
  };

  const logoutSession = async () => {
    await logout();
    updateSession();
  };

  const fetchUser = useCallback(async () => {
    if (isLoading || isValidating) return;

    const user = await getUser(session.sessionId);
    setUser(user);
  }, [isValidating, isLoading]);

  /**
   * 회원가입, 로그인 시 클라이언트 컴포넌트는 재렌더링이 일어나지 않음.
   * 그렇기에, 세션을 강제로 다시 가져옴
   * Listener들은 sessionUpdate 이벤트를 등록하고,
   * Emiter들은 해당 이벤트를 dispatch 하면 됩니다.
   *
   * next-auth에서 refetching the sesion 부분을 참고하였습니다.
   * https://next-auth.js.org/getting-started/client#refetching-the-session
   */
  useEffect(() => {
    document.addEventListener("update", updateSession);
    document.addEventListener("logout", logoutSession);

    return () => {
      document.removeEventListener("update", updateSession);
      document.removeEventListener("logout", logoutSession);
    };
  }, []);

  useEffect(() => {
    if (session.sessionId) {
      fetchUser();
    }
  }, [session.sessionId, isValidating]);

  return (
    <AuthContext.Provider
      value={{ session, isLoading, mutate, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
