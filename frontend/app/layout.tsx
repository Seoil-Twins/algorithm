import type { Metadata } from "next";
import React from "react";
import { Toaster } from "react-hot-toast";

import "./globals.scss";
import "highlight.js/styles/stackoverflow-dark.min.css";

import { notosansRegular } from "@/styles/_font";

import Navigation from "@/components/common/navigation";
import Footer from "@/components/common/footer";

import { CodeTypeProvider } from "@/providers/codeTypeProvider";
import ThemeProvider from "@/providers/themeProvider";
import { AuthProvider } from "@/providers/authProvider";

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
        <AuthProvider>
          <CodeTypeProvider>
            <ThemeProvider>
              <Navigation />
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 3000,
                }}
              />
              <div className="mainCenterBox">{children}</div>
              <Footer />
            </ThemeProvider>
          </CodeTypeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
