"use client";

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import CryptoJS from "crypto-js";

import { axiosInstance } from "@/api";
import { getUser } from "@/api/user";
import { User } from "@/interfaces/user";

type LoginData = {
  email: string;
  userPw: string;
};

type AuthProviderContext = {
  user?: User;
  login: (data: LoginData) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthProviderContext>({
  user: undefined,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const secretKey = process.env.NEXT_PUBLIC_COOKIE_VALUE_SECRET_KEY;

  const [user, setUser] = useState<User | undefined>(() => {
    if (typeof window === "undefined" || !secretKey) return undefined;

    const encryptedUserDataFromLocalStorage = localStorage.getItem("user");
    if (!encryptedUserDataFromLocalStorage) return undefined;

    const decryptedUserDataBytes = CryptoJS.AES.decrypt(
      encryptedUserDataFromLocalStorage,
      secretKey,
    );
    const decryptedUserData = JSON.parse(
      decryptedUserDataBytes.toString(CryptoJS.enc.Utf8),
    );
    return decryptedUserData;
  });

  const login = useCallback(
    async (data: LoginData) => {
      if (!secretKey) return;
      const loginResponse = await axiosInstance.post("/login", data);

      if (loginResponse.status === 200) {
        const userResponse = await getUser();
        const user = userResponse.data;
        const encryptedUserData = CryptoJS.AES.encrypt(
          JSON.stringify(user),
          secretKey,
        ).toString();

        setUser(user);
        localStorage.setItem("user", encryptedUserData);
      }
    },
    [secretKey],
  );

  const logout = useCallback(async () => {
    // logout API를 호출하여 Cookie 삭제
    setUser(undefined);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
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
