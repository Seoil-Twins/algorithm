"use client";

import React, { FormEvent, useCallback, useRef, useState } from "react";

import styles from "./new.module.scss";
import { notosansMedium } from "@/styles/_font";

import Dropdown, { DropdownItem } from "@/components/common/dropdown";
import Input from "@/components/common/input";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const DynamicEditor = dynamic(() => import("@/components/common/editor"), {
  ssr: false,
});

type NewParams = {
  algorithmId: number;
};

type RequestBoard = {
  title: string;
  content: string;
  boardType: 3 | 4;
};

const dropdownItems: DropdownItem[] = [
  {
    title: "질문",
    value: 3,
  },
  {
    title: "자유",
    value: 4,
  },
];

const New = ({ params }: { params: NewParams }) => {
  const algorithmId = params.algorithmId;
  const router = useRouter();

  const titleRef = useRef<HTMLDivElement>(null);

  const [requestData, setRequestData] = useState<RequestBoard>({
    title: "",
    content: "",
    boardType: 3,
  });
  const [isErrorTitle, setIsErrorTitle] = useState<boolean>(false);
  const [isVisibleDropdown, setIsVisibleDropdown] = useState<boolean>(false);

  const handleVisibleDropdown = useCallback((value: boolean) => {
    setIsVisibleDropdown(value);
  }, []);

  const handleBoardType = useCallback((value: string | number) => {
    setRequestData((prev) => ({
      ...prev,
      boardType: value as RequestBoard["boardType"],
    }));
  }, []);

  const handleTitle = useCallback((value: string) => {
    setRequestData((prev) => ({
      ...prev,
      title: value,
    }));
  }, []);

  const handleEditor = useCallback((value: string) => {
    setRequestData((prev) => ({
      ...prev,
      content: value,
    }));
  }, []);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.stopPropagation();
      event.preventDefault();

      if (!requestData.title || requestData.title.length <= 0) {
        setIsErrorTitle(true);
        window.scrollTo({
          top: titleRef.current?.offsetTop && titleRef.current?.offsetTop - 200,
        });
        titleRef.current?.focus();
        return;
      }

      setIsErrorTitle(false);

      console.log(requestData);
      router.push(`/algorithm/detail/${algorithmId}/all`);
    },
    [algorithmId, requestData, router],
  );

  return (
    <form className={styles.new} onSubmit={handleSubmit}>
      <div>
        <div className={styles.boardTitle}>
          <span className={`${notosansMedium.className}`}>카테고리</span>
          <span className={styles.required}>*</span>
        </div>
        <div className={styles.dropdown}>
          <Dropdown
            isVisible={isVisibleDropdown}
            onVisible={handleVisibleDropdown}
            items={dropdownItems}
            defaultTitle={dropdownItems[0].title}
            onChange={handleBoardType}
          />
        </div>
      </div>
      <div>
        <div className={styles.boardTitle}>
          <span className={`${notosansMedium.className}`}>제목</span>
          <span className={styles.required}>*</span>
        </div>
        <div className={styles.title} ref={titleRef}>
          <Input
            value={requestData.title}
            onChange={handleTitle}
            placeholder="제목 입력"
            errorMsg="제목을 입력해주세요."
            isError={isErrorTitle}
          />
        </div>
      </div>
      <div>
        <div className={styles.boardTitle}>
          <span className={`${notosansMedium.className}`}>내용</span>
          <span className={styles.required}>*</span>
        </div>
        <DynamicEditor value={requestData.content} onChange={handleEditor} />
      </div>
      <div className={styles.btnBox}>
        <button type="button" className={styles.cancel} onClick={handleCancel}>
          취소
        </button>
        <button type="submit" className={styles.submit}>
          등록
        </button>
      </div>
    </form>
  );
};

export default New;
