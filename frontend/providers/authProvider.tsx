"use client";

import { ReactNode, createContext, useContext } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";

import { User } from "@/app/api/model/user";
import { UserAPI } from "@/api/user";

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
    try {
      const response = await UserAPI.getUser();
      const user: User = await response.json();
      addUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await UserAPI.logout();
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
