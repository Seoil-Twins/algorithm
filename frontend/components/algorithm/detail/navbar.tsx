"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { notosansBold } from "@/styles/_font";
import styles from "./navbar.module.scss";

import { Algorithm } from "@/interfaces/algorithm";

import Share from "./share";
import Dropdown from "@/components/common/dropdown";
import ThemeSwitch from "@/components/common/themeSwitch";
import ThemeImage from "@/components/common/themeImage";

import {
  CODE_TYPE_OPTIONS_ARRAY,
  CodeType,
  useCodeType,
} from "@/providers/codeTypeProvider";

import { checkMyType } from "@/api/algorithm/algorithm";
import { useAuth } from "@/providers/authProvider";

type AlgorithmNavbarProps = {
  algorithm: Algorithm;
};

const codeTypeDropdownItems = [
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
];

const Navbar = ({ algorithm }: AlgorithmNavbarProps) => {
  const { user } = useAuth();
  const { type, setType } = useCodeType();
  const defaultTitle = codeTypeDropdownItems.filter(({ value }) => {
    return type === value;
  })[0].title;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleVisible = useCallback((value: boolean) => {
    setIsVisible(value);
  }, []);

  const handleTypeChange = useCallback(
    (value: string | number) => {
      const codeType: CodeType = checkMyType(
        CODE_TYPE_OPTIONS_ARRAY,
        value as CodeType,
      )
        ? (value as CodeType)
        : "p";

      setType(codeType);
    },
    [setType],
  );

  const handleBoomark = useCallback(() => {
    if (!user) return;
    console.log("bookmark");
  }, [user]);

  return (
    <header className={styles.header}>
      <div className={styles.chapter}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/svgs/logo.svg"
            alt="로고 이미지"
            width={35}
            height={35}
          />
        </Link>
        <span className={styles.notRequireChapter}>
          <span>알고리즘</span>
          <Image
            src="/svgs/arrow_right_gray.svg"
            alt="오른쪽 회색 화살표"
            width={12}
            height={12}
            className={styles.m15}
          />
          <span>{algorithm.kinds}</span>
          <Image
            src="/svgs/arrow_right_gray.svg"
            alt="오른쪽 회색 화살표"
            width={12}
            height={12}
            className={styles.m15}
          />
        </span>
        <span>
          <span className={notosansBold.className}>{algorithm.title}</span>
        </span>
      </div>
      <div className={styles.func}>
        <Share
          algorithmId={algorithm.algorithmId}
          title={algorithm.title}
          description={algorithm.content}
          thumbnail={algorithm.thumbnail}
        />
        {algorithm.isFavorite ? (
          <button className={styles.btn}>
            <ThemeImage
              lightSrc="/svgs/bookmark_active_black.svg"
              darkSrc="/svgs/bookmark_active_white.svg"
              alt="북마크"
              width={28}
              height={28}
            />
          </button>
        ) : (
          <button className={styles.btn} onClick={handleBoomark}>
            <ThemeImage
              lightSrc="/svgs/bookmark_none_black.svg"
              darkSrc="/svgs/bookmark_none_white.svg"
              alt="북마크"
              width={28}
              height={28}
            />
          </button>
        )}
        <ThemeSwitch className={styles.btn} />
        <Dropdown
          defaultTitle={defaultTitle}
          items={codeTypeDropdownItems}
          isVisible={isVisible}
          onVisible={handleVisible}
          onChange={handleTypeChange}
        />
      </div>
    </header>
  );
};

export default Navbar;
