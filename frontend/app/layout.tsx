import type { Metadata } from "next";

import "./globals.scss";
import { notosansRegular } from "@/styles/_font";

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
      <body className={notosansRegular.className}>
        <div style={{ maxWidth: 1280, margin: "auto" }}>{children}</div>
      </body>
    </html>
  );
}
