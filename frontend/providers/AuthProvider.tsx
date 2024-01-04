"use client";

import { SessionResponse } from "@/app/api/sessionConfig";
import useSession from "@/utils/clientSideSession";
import React, { ReactNode, createContext, useContext, useEffect } from "react";

const AuthContext = createContext<SessionResponse | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { session, isLoading, mutate, login, logout } = useSession();

  const updateSession = async () => {
    await mutate();
  };

  const logoutSession = async () => {
    await logout();
    updateSession();
  };

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
    document.addEventListener("sessionUpdate", updateSession);
    document.addEventListener("logout", logoutSession);

    return () => {
      document.removeEventListener("sessionUpdate", updateSession);
      document.removeEventListener("logout", logoutSession);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, isLoading, mutate, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
