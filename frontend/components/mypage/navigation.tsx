"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./navigation.module.scss";

const Navigation = () => {
  const pathname = usePathname();

  const accountRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const activeMenuItem = useCallback(() => {
    if (!accountRef.current || !activityRef.current || !notificationRef.current)
      return;

    if (pathname === "/account") {
      accountRef.current.style.background = `#F1F1F3`;
      activityRef.current.style.background = `inherit`;
      notificationRef.current.style.background = `inherit`;
    } else if (pathname === "/activity") {
      accountRef.current.style.background = `inherit`;
      activityRef.current.style.background = `#F1F1F3`;
      notificationRef.current.style.background = `inherit`;
    } else if (pathname === "/notification") {
      accountRef.current.style.background = `inherit`;
      activityRef.current.style.background = `inherit`;
      notificationRef.current.style.background = `#F1F1F3`;
    }
  }, [pathname]);

  useEffect(() => {
    activeMenuItem();
  }, [activeMenuItem, pathname]);

  return (
    <div className={styles.navigation}>
      <div className={styles.title}>내 정보 관리</div>
      <Link href="/account">
        <div className={styles.item} ref={accountRef}>
          <Image
            src="/svgs/settings.svg"
            alt="설정 아이콘"
            width={25}
            height={25}
            className={styles.menuIcon}
          />
          계정 관리
        </div>
      </Link>
      <Link href="/activity">
        <div className={styles.item} ref={activityRef}>
          <Image
            src="/svgs/user_group.svg"
            alt="그룹 아이콘"
            width={25}
            height={25}
            className={styles.menuIcon}
          />
          나의 활동
        </div>
      </Link>
      <Link href="/notification">
        <div className={styles.item} ref={notificationRef}>
          <Image
            src="/svgs/bell.svg"
            alt="알림 아이콘"
            width={25}
            height={25}
            className={styles.menuIcon}
          />
          알림
        </div>
      </Link>
    </div>
  );
};

export default Navigation;
