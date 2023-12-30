"use client";

import React, { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LogoImg from "@/public/svgs/logo.svg";
import styles from "./priamryHeader.module.scss";

import { User } from "@/interfaces/user";

export type headerProps = {
  user?: User;
  sessionId?: string;
};

const priamryHeader = async ({ user, sessionId }: headerProps) => {
  const alrams = [
    {
      title: "나는야 답변왕님께서 답변을 남기셨습니다.",
    },
  ];

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
        {sessionId && user ? (
          <div className={styles.headerItem}>
            <div className={styles.alramImgBox}>
              <Image
                src="/svgs/alram.svg"
                alt="알람 아이콘"
                width={30}
                height={30}
              />
            </div>
            <div className={styles.profileBox}>
              {user.profile ? (
                <img
                  src={user.profile}
                  alt="유저 아이콘"
                  width={38}
                  height={38}
                />
              ) : (
                <Image
                  src="/svgs/user_profile_default.svg"
                  alt="유저 아이콘"
                  width={38}
                  height={38}
                />
              )}
            </div>
          </div>
        ) : (
          <div className={styles.headerItem}>
            <div className={styles.menuItemBox}>
              <Link href="/sign">회원가입</Link>
            </div>
            <div className={`${styles.menuItemBox} ${styles.loginBtn}`}>
              <Link href="/login">로그인</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default priamryHeader;
