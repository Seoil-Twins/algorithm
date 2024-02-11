"use client";

import React, {
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./navbar.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

import AlramType from "@/interfaces/alram";

import { useAuth } from "@/providers/authProvider";

import { fetchAlrams } from "@/api/alram";
import { IMAGE_URL } from "@/api";

import { MenuItems } from "./navigation";
import ThemeSwitch from "./themeSwitch";
import ThemeImage from "./themeImage";
import Alram from "./alram";

type NavbarProps = {
  menuItems: MenuItems[];
};

const Navbar = ({ menuItems }: NavbarProps) => {
  const { user, logout, isLoading, isValidating } = useAuth();
  const path: string = usePathname();

  const alramImgRef = useRef<HTMLButtonElement>(null);
  const alramModalRef = useRef<HTMLDivElement>(null);
  const profileImgRef = useRef<HTMLButtonElement>(null);
  const profileModalRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<RefObject<HTMLDivElement>[]>(
    menuItems.map(() => createRef()),
  );

  const [isVisibleAlramModal, setIsVisibleAlramModal] =
    useState<boolean>(false);
  const [isVisibleProfileModal, setIsVisibleProfileModal] =
    useState<boolean>(false);
  const [alrams, setAlrams] = useState<AlramType[]>([]);

  const onAlramClick = useCallback((event: MouseEvent) => {
    const insideAlram = alramModalRef.current?.contains(event.target as Node);
    const insideProfileImg = alramImgRef.current?.contains(
      event.target as Node,
    );

    if (insideAlram || insideProfileImg) {
      return;
    }

    setIsVisibleAlramModal(false);
    document.body.removeEventListener("click", onAlramClick);
  }, []);

  const onProfileClick = useCallback((event: MouseEvent) => {
    const insideOther = profileModalRef.current?.contains(event.target as Node);
    const insideProfileImg = profileImgRef.current?.contains(
      event.target as Node,
    );

    if (insideOther || insideProfileImg) {
      return;
    }

    setIsVisibleProfileModal(false);
    document.body.removeEventListener("click", onProfileClick);
  }, []);

  const openAlramModal = useCallback(() => {
    document.body.removeEventListener("click", onProfileClick);
    document.body.addEventListener("click", onAlramClick);

    setIsVisibleProfileModal(false);
    setIsVisibleAlramModal((prev) => !prev);
  }, [onAlramClick, onProfileClick]);

  const openProfileModal = useCallback(() => {
    document.body.removeEventListener("click", onAlramClick);
    document.body.addEventListener("click", onProfileClick);

    setIsVisibleAlramModal(false);
    setIsVisibleProfileModal((prev) => !prev);
  }, [onAlramClick, onProfileClick]);

  const handleLogout = useCallback(async () => {
    setIsVisibleProfileModal(false);
    logout();
  }, [logout]);

  const callFetchAlrams = useCallback(async () => {
    const newAlrams = await fetchAlrams();
    setAlrams(newAlrams);
  }, []);

  useEffect(() => {
    if (isVisibleAlramModal) {
      callFetchAlrams();
    }
  }, [isVisibleAlramModal, callFetchAlrams]);

  useEffect(() => {
    return () => {
      document.body.removeEventListener("click", onProfileClick);
      document.body.removeEventListener("click", onAlramClick);
    };
  }, [onAlramClick, onProfileClick]);

  return (
    <div className={styles.centerBox}>
      <div className={styles.content}>
        <div className={styles.headerItem}>
          <Link className={styles.logoImg} href="/">
            <Image
              src="/svgs/logo.svg"
              width={40}
              height={40}
              alt="로고 이미지"
            />
          </Link>
          {menuItems.map((menu: MenuItems, idx: number) => {
            return (
              <Link href={menu.link} key={idx}>
                <div
                  className={`${styles.menuItemBox} ${
                    menu.link === path ||
                    (menu.link === "/forum" &&
                      (path === "/forum/all" ||
                        path === "/forum/question" ||
                        path === "/forum/free"))
                      ? styles.active
                      : styles.none
                  }`}
                  ref={menuRefs.current[idx]}
                >
                  {menu.title}
                </div>
              </Link>
            );
          })}
        </div>
        {!isLoading && !isValidating && (
          <>
            {user ? (
              <div className={styles.headerItem}>
                <ThemeSwitch className={styles.theme} />
                <button
                  className={styles.alramImgBox}
                  onClick={openAlramModal}
                  ref={alramImgRef}
                >
                  <ThemeImage
                    lightSrc="/svgs/bell_black.svg"
                    darkSrc="/svgs/bell_white.svg"
                    alt="알람 아이콘"
                    width={30}
                    height={30}
                  />
                </button>
                <button
                  className={styles.profileBox}
                  ref={profileImgRef}
                  onClick={openProfileModal}
                >
                  <Image
                    src={
                      user.profile
                        ? `${IMAGE_URL}/${user.profile}`
                        : "/svgs/user_profile_default.svg"
                    }
                    alt="유저 아이콘"
                    width={38}
                    height={38}
                  />
                </button>
              </div>
            ) : (
              <div className={styles.headerItem}>
                <ThemeSwitch className={styles.theme} />
                <Link href="/signup">
                  <div className={styles.menuItemBox}>회원가입</div>
                </Link>
                <Link href="/login">
                  <div className={`${styles.menuItemBox} ${styles.loginBtn}`}>
                    로그인
                  </div>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
      {isVisibleProfileModal && user && (
        <div className={styles.profileModalBox} ref={profileModalRef}>
          <div className={styles.topBox}>
            <div className={`${styles.title} ${notosansBold.className}`}>
              내 정보
            </div>
            <div className={styles.imgBox}>
              <Image
                src={
                  user.profile
                    ? `${IMAGE_URL}/${user.profile}`
                    : "/svgs/user_profile_default.svg"
                }
                alt="유저 아이콘"
                width={80}
                height={80}
              />
            </div>
            <div className={styles.infoBox}>
              <div className={`${styles.nickname} ${notosansMedium.className}`}>
                {user.nickname}
              </div>
              <div className={styles.algorithmBox}>
                <div className={styles.algorithmItem}>
                  맞춘 문제 <span className={styles.correct}>123</span>
                </div>
                <div className={styles.algorithmItem}>
                  틀린 문제 <span className={styles.wrong}>123</span>
                </div>
                <div className={styles.algorithmItem}>
                  시도한 문제 <span className={styles.try}>123</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btnBox}>
            <Link
              href="/account"
              onClick={() => setIsVisibleProfileModal(false)}
            >
              <button className={styles.btn}>
                <ThemeImage
                  lightSrc="/svgs/mypage_menu_black.svg"
                  darkSrc="/svgs/mypage_menu_white.svg"
                  alt="알람"
                  width={18}
                  height={18}
                  className={styles.img}
                />
                마이페이지
              </button>
            </Link>
            <button className={styles.btn} onClick={handleLogout}>
              <ThemeImage
                lightSrc="/svgs/logout_black.svg"
                darkSrc="/svgs/logout_white.svg"
                alt="알람"
                width={18}
                height={18}
                className={styles.img}
              />
              로그아웃
            </button>
          </div>
        </div>
      )}
      <Alram
        ref={alramModalRef}
        alrams={alrams}
        isVisible={isVisibleAlramModal}
      />
    </div>
  );
};

export default Navbar;
