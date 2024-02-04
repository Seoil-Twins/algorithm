"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import styles from "./navigation.module.scss";

import { AUTH_PATHS } from "@/constants";
import { useAuth } from "@/providers/authProvider";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

export type MenuItems = {
  title: string;
  link: string;
};

const regex = new RegExp(/^\/algorithm\/detail(?:\/[^/]+)?\/?$/);

const Navigation = () => {
  const menuItems: MenuItems[] = [
    {
      title: "메인",
      link: "/",
    },
    {
      title: "문제",
      link: "/algorithm",
    },
    {
      title: "게시판",
      link: "/forum",
    },
    {
      title: "랭킹",
      link: "/ranking",
    },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const { session, isLoading } = useAuth()!;

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const checkScreenSize = useCallback(() => {
    const minWidth = 758;
    const windowWidth = window.innerWidth;

    if (minWidth >= windowWidth) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [checkScreenSize]);

  /**
   * 브라우저 뒤로 가기를 하면 캐시된 페이지를 보여주기 때문에
   * middleware가 작동하지가 않음.
   * 그렇기 때문에 페이지 이동마다 session을 체크해야 함.
   */
  useEffect(() => {
    if (!isLoading && !session.sessionId && AUTH_PATHS.includes(pathname)) {
      router.replace("/");
    }
  }, [session.sessionId, pathname, isLoading, router]);

  return (
    <>
      {!regex.test(pathname) && (
        <header className={styles.headerBox}>
          {isMobile ? (
            <Sidebar menuItems={menuItems} />
          ) : (
            <Navbar menuItems={menuItems} />
          )}
        </header>
      )}
    </>
  );
};

export default Navigation;
