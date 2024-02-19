"use client";

import { ReactNode, createContext, useContext } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import { User } from "@/interfaces/user";

type AuthProviderContext = {
  user: User | undefined;
  isLoading: boolean;
  isValidating: boolean;
  login: (user: User) => Promise<void>;
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

  const login = async (user: User) => {
    addUser(user);
  };

  const logout = async () => {
    // remove Cookie
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
