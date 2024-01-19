import type { Metadata } from "next";
import React from "react";

import "./globals.scss";

import { notosansRegular } from "@/styles/_font";

import Navigation from "@/components/common/navigation";
import Footer from "@/components/common/footer";

import { AuthProvider } from "@/providers/authProvider";
import { CodeTypeProvider } from "@/providers/codeTypeProvider";

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
    <html lang="ko">
      <body className={`${notosansRegular.className}`}>
        <AuthProvider>
          <CodeTypeProvider>
            <Navigation />
            <div className="mainCenterBox">{children}</div>
            <Footer />
          </CodeTypeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
