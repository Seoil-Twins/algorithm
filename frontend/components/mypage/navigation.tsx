"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import styles from "./navigation.module.scss";

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    {
      icon: "/svgs/settings.svg",
      title: "계정 관리",
      link: "/account",
    },
    {
      icon: "/svgs/user_group.svg",
      title: "나의 활동",
      link: "/activity",
    },
    {
      icon: "/svgs/alram.svg",
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
            <Image
              src={item.icon}
              alt={`${item.title} 아이콘`}
              width={25}
              height={25}
              className={styles.menuIcon}
            />
            {item.title}
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
