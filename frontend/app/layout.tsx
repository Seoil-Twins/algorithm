import type { Metadata } from "next";

import "./globals.scss";

import { notosansRegular } from "@/styles/_font";

import Navigation from "@/components/common/navigation";
import Footer from "@/components/common/footer";

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
        <Navigation />
        <div className="mainCenterBox">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
