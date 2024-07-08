import React, {
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./sidebar.module.scss";

import { useAuth } from "@/providers/authProvider";

import { MenuItems } from "./navigation";

import AlramType from "@/types2/alram";

import { fetchAlrams } from "@/api/alram";

import ThemeImage from "./themeImage";
import ThemeSwitch from "./themeSwitch";
import Alram from "./alram";

type SidebarProps = {
  menuItems: MenuItems[];
};

const Sidebar = ({ menuItems }: SidebarProps) => {
  const { user, isLoading, isValidating, logout } = useAuth();
  const path = usePathname();

  const alramModalRef = useRef<HTMLDivElement>(null);
  const alramImgRef = useRef<HTMLButtonElement>(null);
  const menuRefs = useRef<RefObject<HTMLDivElement>[]>(
    menuItems.map(() => createRef()),
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisibleAlramModal, setIsVisibleAlramModal] =
    useState<boolean>(false);
  const [alrams, setAlrams] = useState<AlramType[]>([]);

  const customMenuItems: MenuItems[] = useMemo(() => {
    return user
      ? [...menuItems, { title: "마이페이지", link: "/account" }]
      : [...menuItems];
  }, [menuItems, user]);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => {
      const curVal = !prev;

      if (curVal) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }

      return curVal;
    });
  }, []);

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

  const openAlramModal = useCallback(() => {
    document.body.addEventListener("click", onAlramClick);

    setIsVisibleAlramModal((prev) => !prev);
  }, [onAlramClick]);

  const callFetchAlrams = useCallback(async () => {
    const newAlrams = await fetchAlrams();
    setAlrams(newAlrams);
  }, []);

  const handleLogout = useCallback(async () => {
    // cookie 삭제 api 호출
    logout();
  }, [logout]);

  useEffect(() => {
    // 마이페이지가 추가된 경우, menuRefs를 업데이트
    menuRefs.current = customMenuItems.map(() => createRef());
  }, [customMenuItems]);

  useEffect(() => {
    if (isVisibleAlramModal) {
      callFetchAlrams();
    }
  }, [isVisibleAlramModal, callFetchAlrams]);

  return (
    <div className={styles.centerBox}>
      <div className={styles.content}>
        <Link href="/">
          <div className={styles.logo}>
            <Image
              src="/svgs/logo.svg"
              alt="로고 아이콘"
              width={36}
              height={36}
            />
            Algorithm
          </div>
        </Link>
        <div className={styles.right}>
          <ThemeSwitch className={styles.themeBtn} />
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
          <button onClick={toggleModal}>
            <ThemeImage
              lightSrc="/svgs/hamburger_black.svg"
              darkSrc="/svgs/hamburger_white.svg"
              alt="메뉴 아이콘"
              width={36}
              height={36}
              className={styles.hamburger}
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className={styles.menuModal}>
          <div className={styles.close}>
            <button onClick={toggleModal}>
              <ThemeImage
                lightSrc="/svgs/close_black.svg"
                darkSrc="/svgs/close_white.svg"
                alt="닫기 아이콘"
                width={36}
                height={36}
              />
            </button>
          </div>
          <div className={styles.menuItemBox}>
            {customMenuItems.map((menu: MenuItems, idx: number) => {
              return (
                <Link
                  href={menu.link}
                  key={idx}
                  onClick={() => setTimeout(toggleModal, 100)}
                >
                  <div
                    className={`${styles.menuItem} ${
                      menu.link === path && styles.active
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
                <div className={styles.authBtn} onClick={handleLogout}>
                  로그아웃
                </div>
              ) : (
                <div className={styles.authBtn}>
                  <Link
                    href="/login"
                    onClick={() => setTimeout(() => toggleModal(), 100)}
                  >
                    로그인
                  </Link>
                  <div className={styles.mlr10}>|</div>
                  <Link
                    href="/signup"
                    onClick={() => setTimeout(() => toggleModal(), 100)}
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </>
          )}
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

export default Sidebar;
