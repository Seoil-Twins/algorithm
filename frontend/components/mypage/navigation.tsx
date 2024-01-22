"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { usePathname } from "next/navigation";

import styles from "./navigation.module.scss";

const DynamicThemeImage = dynamic(() => import("../common/themeImage"), {
  ssr: false,
});

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    {
      lightSrc: "/svgs/settings_black.svg",
      darkSrc: "/svgs/settings_white.svg",
      title: "계정 관리",
      link: "/account",
    },
    {
      lightSrc: "/svgs/user_group_black.svg",
      darkSrc: "/svgs/user_group_white.svg",
      title: "나의 활동",
      link: "/activity",
    },
    {
      lightSrc: "/svgs/bell_black.svg",
      darkSrc: "/svgs/bell_white.svg",
      title: "알림",
      link: "/notification",
    },
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.title}>내 정보 관리</div>
      {navItems.map((item, idx: number) => (
        <Link href={item.link} key={idx}>
          <div
            className={`${styles.item} ${
              pathname.includes(item.link) && styles.active
            }`}
          >
            <span className={styles.iconBox}>
              <DynamicThemeImage
                lightSrc={item.lightSrc}
                darkSrc={item.darkSrc}
                alt={`${item.title} 아이콘`}
                width={25}
                height={25}
                className={styles.icon}
              />
            </span>
            {item.title}
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
