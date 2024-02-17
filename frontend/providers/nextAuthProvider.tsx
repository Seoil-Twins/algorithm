"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

type NextAuthProviderProps = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: NextAuthProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
