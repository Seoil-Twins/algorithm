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

import styles from "./sidebar.module.scss";
import { MenuItems } from "./navigation";
import { useAuth } from "@/providers/AuthProvider";

type SidebarProps = {
  menuItems: MenuItems[];
};

const Sidebar = ({ menuItems }: SidebarProps) => {
  const { session, isLoading, logout } = useAuth()!;
  const path = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRefs = useRef<RefObject<HTMLDivElement>[]>(
    menuItems.map(() => createRef()),
  );

  const customMenuItems: MenuItems[] = session.sessionId
    ? [...menuItems, { title: "마이페이지", link: "/account" }]
    : [...menuItems];

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
  }, [isOpen]);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  useEffect(() => {
    // 마이페이지가 추가된 경우, menuRefs를 업데이트
    menuRefs.current = customMenuItems.map(() => createRef());
  }, [customMenuItems]);

  useEffect(() => {
    customMenuItems.map((menu, idx) => {
      const ele = menuRefs.current[idx];
      if (!ele.current) return;

      if (menu.link == path) {
        ele.current.style.borderColor = "1px solid #ff9500";
        ele.current.style.color = "#ff9500";
      } else {
        ele.current.style.borderColor = "#cacad6";
        ele.current.style.color = "#222222";
      }
    });
  }, [isOpen, menuRefs.current, path]);

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
        <Image
          src="/svgs/hamburger.svg"
          alt="메뉴 아이콘"
          width={36}
          height={36}
          className={styles.hamburger}
          onClick={toggleModal}
        />
      </div>
      {isOpen && (
        <div className={styles.menuModal}>
          <div className={styles.close}>
            <Image
              src="/svgs/close.svg"
              alt="닫기 아이콘"
              width={36}
              height={36}
              onClick={toggleModal}
            />
          </div>
          <div className={styles.menuItemBox}>
            {customMenuItems.map((menu: MenuItems, idx: number) => {
              return (
                <Link
                  href={menu.link}
                  key={idx}
                  onClick={() => setTimeout(toggleModal, 100)}
                >
                  <div className={styles.menuItem} ref={menuRefs.current[idx]}>
                    {menu.title}
                  </div>
                </Link>
              );
            })}
          </div>
          {!isLoading && session.sessionId ? (
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
        </div>
      )}
    </div>
  );
};

export default Sidebar;
