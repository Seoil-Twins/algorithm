"use client";

import Link from "next/link";
import React, { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./boardNavigation.module.scss";
import ThemeImage from "./themeImage";

export type NavItem = {
  title: string;
  link: string;
};

type BoardNavigationProps = {
  items: NavItem[];
  isVisiblePost: boolean;
  placeholder?: string;
};

const BoardNavigation = ({
  items,
  isVisiblePost,
  placeholder = "제목으로 검색",
}: BoardNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState<string>(
    searchParams.get("keyword") || "",
  );

  const handleKeyword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
    },
    [],
  );

  const handleEnter = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        router.replace(`${pathname}?keyword=${keyword}`);
      }
    },
    [keyword, router, pathname],
  );

  return (
    <nav className={styles.nav}>
      <div className={styles.btnBox}>
        {items.map((item: NavItem, idx: number) => (
          <Link
            href={{
              pathname: item.link,
            }}
            key={idx}
            className={`${styles.btn} ${
              pathname === item.link && styles.active
            }`}
          >
            <button>{item.title}</button>
          </Link>
        ))}
      </div>
      <div className={styles.func}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder={placeholder}
            value={keyword || ""}
            onChange={handleKeyword}
            onKeyDown={handleEnter}
          />
          <Link
            href={{
              query: { keyword },
            }}
          >
            <ThemeImage
              lightSrc="/svgs/search_black.svg"
              darkSrc="/svgs/search_white.svg"
              alt="검색 아이콘"
              width={18}
              height={18}
              className={styles.searchImg}
            />
          </Link>
        </div>
        {isVisiblePost && (
          <Link
            href={`${pathname.slice(0, pathname.lastIndexOf("/"))}/new`}
            className={styles.post}
          >
            <button>글쓰기</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default BoardNavigation;
