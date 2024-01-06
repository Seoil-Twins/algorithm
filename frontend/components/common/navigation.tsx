"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";

import styles from "./navigation.module.scss";

import { AUTH_PATHS } from "@/constants";
import { useAuth } from "@/providers/AuthProvider";

const DynamicNavbar = dynamic(() => import("./navbar"), { ssr: false });
const DynamicSidebar = dynamic(() => import("./sidebar"), { ssr: false });

export type MenuItems = {
  title: string;
  link: string;
};

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
      link: "/board",
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
  }, [isMobile]);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  /**
   * 브라우저 뒤로 가기를 하면 캐시된 페이지를 보여주기 때문에
   * middleware가 작동하지가 않음.
   * 그렇기 때문에 페이지 이동마다 session을 체크해야 함.
   */
  useEffect(() => {
    if (!isLoading && !session.sessionId && AUTH_PATHS.includes(pathname)) {
      router.replace("/");
    }
  }, [session.sessionId, pathname]);

  return (
    <header className={styles.headerBox}>
      {isMobile ? (
        <DynamicSidebar menuItems={menuItems} />
      ) : (
        <DynamicNavbar menuItems={menuItems} />
      )}
    </header>
  );
};

export default Navigation;
