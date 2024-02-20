"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import ThemeImage from "../common/themeImage";

import styles from "./navigation.module.scss";

import Dropdown, { DropdownItem } from "../common/dropdown";

import { useAuth } from "@/providers/authProvider";

import { AlgorithmKind } from "@/api/algorithm/algorithm";

type NavigationProps = {
  algorithmKinds: AlgorithmKind[];
};

type DropdownItems = {
  queryKey: string;
  isVisible: boolean;
  items: DropdownItem[];
  placeholder: string;
  defaultTitle?: string;
};

const DEFAULT_PREFIX = "algorithm";
const solvedDropdownItems: DropdownItems = {
  queryKey: "solved",
  placeholder: "해결 여부",
  isVisible: false,
  items: [
    {
      title: "전체",
      value: "a",
    },
    {
      title: "푼 문제",
      value: "s",
    },
    {
      title: "안 푼 문제",
      value: "ns",
    },
  ],
};
const sortDropdownItems: DropdownItems = {
  queryKey: "sort",
  placeholder: "최신순",
  isVisible: false,
  items: [
    {
      title: "최신순",
      value: "r",
    },
    {
      title: "오래된 순",
      value: "or",
    },
    {
      title: "시도 순",
      value: "t",
    },
  ],
};
const levelDropdownItems: DropdownItems = {
  queryKey: "level",
  placeholder: "알고리즘 레벨",
  isVisible: false,
  items: [
    {
      title: "전체",
      value: "-1",
    },
    {
      title: "Lv. 0",
      value: "0",
    },
    {
      title: "Lv. 1",
      value: "1",
    },
    {
      title: "Lv. 2",
      value: "2",
    },
    {
      title: "Lv. 3",
      value: "3",
    },
    {
      title: "Lv. 4",
      value: "4",
    },
    {
      title: "Lv. 5",
      value: "5",
    },
  ],
};
const kindDropdownItems: DropdownItems = {
  queryKey: "kind",
  placeholder: "언어",
  isVisible: false,
  items: [
    {
      title: "전체",
      value: "a",
    },
    {
      title: "C++",
      value: "c",
    },
    {
      title: "Python",
      value: "p",
    },
    {
      title: "Java",
      value: "j",
    },
  ],
};
const rateDropdownItems: DropdownItems = {
  queryKey: "rate",
  placeholder: "정답률",
  isVisible: false,
  items: [
    {
      title: "전체",
      value: "",
    },
    {
      title: "정답률 높은순",
      value: "h",
    },
    {
      title: "정답률 낮은순",
      value: "l",
    },
  ],
};
const tagDropdownItems: DropdownItems = {
  queryKey: "tag",
  placeholder: "알고리즘 분류",
  isVisible: false,
  items: [
    {
      title: "선택 안 함",
      value: "",
    },
  ],
};

const Navigation = ({ algorithmKinds }: NavigationProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const prevParams = Object.fromEntries(Array.from(searchParams.entries()));

  const [keyword, setKeyword] = useState<string>(prevParams.keyword);

  const initialDropdownItems = () => {
    // deep copy
    const newTagDropdownItems: DropdownItems = JSON.parse(
      JSON.stringify(tagDropdownItems),
    );

    algorithmKinds.forEach((value: AlgorithmKind) => {
      newTagDropdownItems.items.push({
        title: value.kindName,
        value: value.kindId,
      });
    });

    const newDropdownItems = [
      sortDropdownItems,
      levelDropdownItems,
      kindDropdownItems,
      rateDropdownItems,
      newTagDropdownItems,
    ];

    const updatedDropdownItems = newDropdownItems.map((item) => {
      if (Object.prototype.hasOwnProperty.call(prevParams, item.queryKey)) {
        const matchingItem = item.items.find(
          (subItem) => subItem.value === prevParams[item.queryKey],
        );
        if (matchingItem) {
          return { ...item, defaultTitle: matchingItem.title };
        }
      }
      return item;
    });

    return updatedDropdownItems;
  };
  const [dropdownItems, setDropdownItems] = useState<DropdownItems[]>(
    initialDropdownItems(),
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
        delete prevParams["keyword"];

        router.replace(
          `/${DEFAULT_PREFIX}?keyword=${keyword}&${new URLSearchParams(
            prevParams,
          ).toString()}`,
        );
      }
    },
    [keyword, prevParams, router],
  );

  const handleRouter = useCallback(
    (value: string | number, queryKey?: string) => {
      delete prevParams[`${queryKey}`];

      router.replace(
        `/${DEFAULT_PREFIX}?${queryKey}=${value}&${new URLSearchParams(
          prevParams,
        ).toString()}`,
      );
    },
    [prevParams, router],
  );

  const handleVisible = useCallback((value: boolean, queryKey?: string) => {
    setDropdownItems((prev: DropdownItems[]) => {
      const prevItems: DropdownItems[] = [...prev];
      const hasQuerykeyItems: DropdownItems[] = prevItems.map(
        (item: DropdownItems) => {
          if (item.queryKey === queryKey) {
            return { ...item, isVisible: value };
          } else {
            return { ...item, isVisible: false };
          }
        },
      );

      return hasQuerykeyItems;
    });
  }, []);

  useEffect(() => {
    if (user) {
      setDropdownItems((prev) => [...prev, solvedDropdownItems]);
    } else {
      setDropdownItems((prev) => {
        const newItem = prev.filter((item) => item.queryKey !== "solved");
        return newItem;
      });
    }
  }, [user]);

  return (
    <nav className={styles.navigation}>
      <div className={styles.dropdown}>
        {dropdownItems.map((item: DropdownItems) => (
          <Dropdown
            key={item.queryKey}
            queryKey={item.queryKey}
            isVisible={item.isVisible}
            defaultTitle={item.defaultTitle || item.placeholder}
            items={item.items}
            onChange={handleRouter}
            onVisible={handleVisible}
          />
        ))}
      </div>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="문제 검색"
          value={keyword}
          onChange={handleKeyword}
          onKeyDown={handleEnter}
        />
        <Link
          href={{
            query: { ...prevParams, keyword },
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
    </nav>
  );
};

export default Navigation;
