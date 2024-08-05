"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { notosansBold } from "@/styles/_font";
import styles from "./navbar.module.scss";

import { Algorithm } from "@/app/api/model/algorithm";
import { AlgorithmAPI } from "@/api/algorithm";

import Share from "./share";
import Dropdown from "@/components/common/dropdown";
import ThemeSwitch from "@/components/common/themeSwitch";
import ThemeImage from "@/components/common/themeImage";

import { useCodeType } from "@/providers/codeTypeProvider";
import { useAuth } from "@/providers/authProvider";

import {
  CODE_TYPE_OPTIONS_ARRAY,
  CodeType,
  Language,
  checkMyType,
} from "@/types/constants";

type AlgorithmNavbarProps = {
  algorithm: Algorithm;
};

const codeTypeDropdownItems = [
  {
    title: "C++",
    value: Language.CPP,
  },
  {
    title: "Python",
    value: Language.PYTHON,
  },
  {
    title: "Java",
    value: Language.JAVA,
  },
];

const Navbar = ({ algorithm }: AlgorithmNavbarProps) => {
  const router = useRouter();
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

  const handleBoomark = useCallback(async () => {
    console.log("in");
    if (!user) {
      toast.error("로그인이 필요한 시스템입니다.");
      router.push(
        `/login?error=unauthorized&redirect_url=/algorithm/${algorithm.algorithmId}`,
      );
      return;
    }

    try {
      console.log(algorithm.isRecommend);
      if (algorithm.isRecommend) {
        await AlgorithmAPI.deleteBookmark(algorithm.algorithmId);
      } else {
        await AlgorithmAPI.addBookmark(algorithm.algorithmId);
      }

      router.refresh();
    } catch (error) {
      toast.error(
        "예상치 못한 에러가 발생하였습니다.\n나중에 다시 시도해주세요.",
      );
    }
  }, [algorithm.algorithmId, algorithm.isRecommend, router, user]);

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
          <span>{algorithm.kind}</span>
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
        <button className={styles.btn} onClick={handleBoomark}>
          <ThemeImage
            lightSrc={`${
              algorithm.isRecommend
                ? "/svgs/bookmark_active_black.svg"
                : "/svgs/bookmark_none_black.svg"
            }`}
            darkSrc={`${
              algorithm.isRecommend
                ? "/svgs/bookmark_active_white.svg"
                : "/svgs/bookmark_none_white.svg"
            }`}
            alt="북마크"
            width={28}
            height={28}
          />
        </button>
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
