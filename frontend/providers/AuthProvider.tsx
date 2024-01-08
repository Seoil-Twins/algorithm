"use client";

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { getUser } from "@/api/user";
import { SessionResponse } from "@/app/api/sessionConfig";
import { User } from "@/interfaces/user";
import useSession from "@/utils/clientSideSession";

type AuthProviderContext = {
  user?: User;
} & SessionResponse;

const AuthContext = createContext<AuthProviderContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { session, isLoading, isValidating, mutate, login, logout } =
    useSession();
  const [user, setUser] = useState<User | undefined>(undefined);

  const fetchUser = useCallback(async () => {
    if (isLoading || isValidating) return;

    const user = await getUser(session.sessionId);
    setUser(user);
  }, [isLoading, isValidating, session.sessionId]);

  useEffect(() => {
    if (session.sessionId) {
      fetchUser();
    }
  }, [session.sessionId, isValidating, fetchUser]);

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
