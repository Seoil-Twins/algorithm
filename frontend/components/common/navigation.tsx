"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import styles from "./navigation.module.scss";

import useSession from "@/utils/clientSideSession";

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
   * 그렇기에, 세션을 강제로 다시 가져옴
   * Listener들은 sessionUpdate 이벤트를 등록하고,
   * Emiter들은 해당 이벤트를 dispatch 하면 됩니다.
   *
   * next-auth에서 refetching the sesion 부분을 참고하였습니다.
   * https://next-auth.js.org/getting-started/client#refetching-the-session
   */
  useEffect(() => {
    const updateSession = () => {
      session.mutate();
    };

    document.addEventListener("sessionUpdate", updateSession);

    return () => {
      document.removeEventListener("sessionUpdate", updateSession);
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
