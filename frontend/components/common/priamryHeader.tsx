"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./priamryHeader.module.scss";

import LogoImg from "@/public/svgs/logo.svg";

const priamryHeader = () => {
  const path: string = usePathname();
  const menuItems = [
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

  const homeRef = useRef<HTMLDivElement>(null);
  const algorithmRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const rankingRef = useRef<HTMLDivElement>(null);
  const menuRefs = [homeRef, algorithmRef, boardRef, rankingRef];

  useEffect(() => {
    menuItems.map((menu, idx) => {
      const ele = menuRefs[idx].current!;

      if (menu.link == path) {
        ele.style.backgroundColor = "#EFEFEF";
        ele.style.color = "#ff9500";
      } else {
        ele.style.backgroundColor = "transparent";
        ele.style.color = "#222222";
      }
    });
  }, [path]);

  return (
    <header className={styles.headerBox}>
      <div className={styles.centerBox}>
        <div className={styles.headerItem}>
          <Link className={styles.logoImg} href="/">
            <Image src={LogoImg} width={40} height={40} alt="로고 이미지" />
          </Link>
          {menuItems.map((menu, idx) => {
            return (
              <div className={styles.menuItemBox} key={idx} ref={menuRefs[idx]}>
                <Link href={menu.link}>{menu.title}</Link>
              </div>
            );
          })}
        </div>
        <div className={styles.headerItem}>
          <div className={styles.menuItemBox}>
            <Link href="/sign">회원가입</Link>
          </div>
          <div className={`${styles.menuItemBox} ${styles.loginBtn}`}>
            <Link href="/login">로그인</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default priamryHeader;
