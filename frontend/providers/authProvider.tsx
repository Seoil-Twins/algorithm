"use client";

import { ReactNode, createContext, useContext } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import { FRONTEND_API_URL } from "@/app/api";

import { User } from "@/app/api/model/user";

type AuthProviderContext = {
  user: User | undefined | null;
  isLoading: boolean;
  isValidating: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthProviderContext>({
  user: undefined,
  isLoading: false,
  isValidating: false,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user, isLoading, isValidating, addUser, removeUser } = useUser();

  const login = async () => {
    const response = await fetch(FRONTEND_API_URL + "/user", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const user: User = await response.json();
      addUser(user);
    }
  };

  const logout = async () => {
    await fetch(FRONTEND_API_URL + "/user/logout", {
      method: "POST",
      credentials: "include",
    });

    removeUser();
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isValidating, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
