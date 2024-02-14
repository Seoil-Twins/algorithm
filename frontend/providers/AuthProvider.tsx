"use client";

import { AxiosError } from "axios";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useSWR, { useSWRConfig } from "swr";

import { axiosInstance } from "@/api";
import { UserKeys, getUser } from "@/api/user";

import { User } from "@/interfaces/user";
import { useRouter } from "next/navigation";

type LoginData = {
  email: string;
  userPw: string;
};

type AuthProviderContext = {
  user: User | null;
  login: (user: LoginData) => void;
  logout: () => void;
  isLoading: boolean;
  isValidating: boolean;
};

const AuthContext = createContext<AuthProviderContext>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
  isValidating: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const {
    data: responseUser,
    error,
    isLoading,
    isValidating,
  } = useSWR(UserKeys.getUser, getUser, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });
  const [user, setUser] = useState<User | null>(() => {
    if (responseUser?.status !== 200 || error) {
      return null;
    }

    return responseUser.data;
  });

  const login = async (data: LoginData) => {
    const loginResponse = await axiosInstance.post("/login", data);

    if (loginResponse.status === 200) {
      await mutate(UserKeys.getUser);
      router.refresh();
    }
  };

  const logout = async () => {
    setUser(null);
    // await axiosInstance.delete("/logout");
    router.refresh();
  };

  useEffect(() => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      logout();
    }
  }, [error]);

  useEffect(() => {
    if (
      !isLoading &&
      !isValidating &&
      responseUser &&
      responseUser.status === 200
    ) {
      setUser(responseUser.data);
    }
  }, [responseUser, error, isLoading, isValidating]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isValidating,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
