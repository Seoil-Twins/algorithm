import type { Metadata } from "next";
import React from "react";

import "./globals.scss";
import "highlight.js/styles/stackoverflow-dark.min.css";

import { notosansRegular } from "@/styles/_font";

import Navigation from "@/components/common/navigation";
import Footer from "@/components/common/footer";

import { AuthProvider } from "@/providers/authProvider";
import { CodeTypeProvider } from "@/providers/codeTypeProvider";
import ThemeProvider from "@/providers/themeProvider";
import { NextAuthProvider } from "@/providers/nextAuthProvider";

declare global {
  interface Window {
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: "Algorithm",
  description: "Alogrithm Site",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${notosansRegular.className}`}>
        <NextAuthProvider>
          <AuthProvider>
            <CodeTypeProvider>
              <ThemeProvider>
                <Navigation />
                <div className="mainCenterBox">{children}</div>
                <Footer />
              </ThemeProvider>
            </CodeTypeProvider>
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
