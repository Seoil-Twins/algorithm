"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import styles from "./navigation.module.scss";

import useSession from "@/utils/clientSideSession";
import { useRouter } from "next/router";

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

  const session = useSession();
  const pathname = usePathname();

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
   * 회원가입, 로그인 시 클라이언트 컴포넌트는 재렌더링이 일어나지 않음.
   * 그렇기에, 이벤트를 만들어서 강제로 발생하게 만듦
   *
   * next-auth에서 refetching the sesion 부분을 참고하였습니다.
   * https://next-auth.js.org/getting-started/client#refetching-the-session
   */
  useEffect(() => {
    const reRendering = () => {
      const event = new Event("visibilitychange");
      document.dispatchEvent(event);
    };

    document.addEventListener("sessionUpdate", reRendering);

    return () => {
      document.removeEventListener("sessionUpdate", reRendering);
    };
  }, []);

  return (
    <header className={styles.headerBox}>
      {isMobile ? (
        <DynamicSidebar menuItems={menuItems} sessionInfo={session} />
      ) : (
        <DynamicNavbar menuItems={menuItems} sessionInfo={session} />
      )}
    </header>
  );
};

export default Navigation;
