"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import LogoImg from "@/public/svgs/logo.svg";
import styles from "./priamryHeader.module.scss";

import { User } from "@/interfaces/user";
import { notosansBold, notosansMedium } from "@/styles/_font";
import useSession from "@/utils/clientSideSession";

export type headerProps = {
  user?: User;
  sessionId?: string;
};

const priamryHeader = ({ user, sessionId }: headerProps) => {
  const alrams = [
    {
      title: "나는야 답변왕님께서 답변을 남기셨습니다.",
    },
  ];

  const session = useSession();
  const router = useRouter();
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

  const profileImgRef = useRef<HTMLDivElement>(null);
  const profileModalRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const algorithmRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const rankingRef = useRef<HTMLDivElement>(null);
  const menuRefs = [homeRef, algorithmRef, boardRef, rankingRef];

  const [isOpenProfileModal, setIsOpenProfileModal] = useState<boolean>(false);

  const onClick = (event: MouseEvent) => {
    const insideOther = profileModalRef.current?.contains(event.target as Node);
    const insideProfileImg = profileImgRef.current?.contains(
      event.target as Node,
    );

    if (insideOther || insideProfileImg) {
      return;
    }

    setIsOpenProfileModal(false);
    document.body.removeEventListener("click", onClick);
  };

  const openProfileModal = useCallback(() => {
    document.body.addEventListener("click", onClick);
    setIsOpenProfileModal((prev) => !prev);
  }, [isOpenProfileModal]);

  const moveMypage = useCallback(() => {
    router.push("/mypage");
  }, []);

  const onLogout = useCallback(async () => {
    await session.logout();
    router.refresh();
  }, [user, sessionId]);

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

  useEffect(() => {
    return () => {
      document.body.removeEventListener("click", onClick);
    };
  }, []);

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
            <div
              className={styles.profileBox}
              ref={profileImgRef}
              onClick={openProfileModal}
            >
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
      <div ref={profileModalRef}>
        {isOpenProfileModal && user && (
          <div className={styles.profileModalBox}>
            <div className={styles.topBox}>
              <div className={`${styles.title} ${notosansBold.className}`}>
                내 정보
              </div>
              <div className={styles.imgBox}>
                {user.profile ? (
                  <img
                    src={user.profile}
                    alt="유저 아이콘"
                    width={80}
                    height={80}
                  />
                ) : (
                  <Image
                    src="/svgs/user_profile_default.svg"
                    alt="유저 기본 아이콘"
                    width={80}
                    height={80}
                  />
                )}
              </div>
              <div className={styles.infoBox}>
                <div
                  className={`${styles.nickname} ${notosansMedium.className}`}
                >
                  {user.nickname}
                </div>
                <div className={styles.algorithmBox}>
                  <div className={styles.algorithmItem}>
                    맞춘 문제 <span className={styles.correct}>512</span>
                  </div>
                  <div className={styles.algorithmItem}>
                    틀린 문제 <span className={styles.wrong}>555</span>
                  </div>
                  <div className={styles.algorithmItem}>
                    시도한 문제 <span className={styles.try}>1067</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.btnBox}>
              <div className={styles.btn} onClick={moveMypage}>
                <Image
                  src="/svgs/mypage_menu.svg"
                  alt="마이페이지"
                  width={20}
                  height={20}
                  className={styles.img}
                />
                마이페이지
              </div>
              <div className={styles.btn} onClick={onLogout}>
                <Image
                  src="/svgs/logout.svg"
                  alt="로그아웃"
                  width={20}
                  height={20}
                  className={styles.img}
                />
                로그아웃
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default priamryHeader;
