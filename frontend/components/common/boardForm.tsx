"use client";

import React, { useCallback, useRef, useState } from "react";

import styles from "./boardForm.module.scss";
import { notosansMedium } from "@/styles/_font";
import { useRouter } from "next/navigation";

import Dropdown, { DropdownItem } from "@/components/common/dropdown";
import Input from "@/components/common/input";
import Editor from "@/components/common/editor";

export type BOARD_TYPE_VALUE = 1 | 2 | 3 | 4;

export const BOARD_TYPE = {
  PUBLIC_QUESTION: 1,
  PUBLIC_FREE: 2,
  ALGORITHM_QUESTION: 3,
  ALGORITHM_FEEDBACK: 4,
} as const;

export type RequestBoard = {
  title: string;
  content: string;
  boardType: BOARD_TYPE_VALUE;
};

type BoardFormProps = {
  request: RequestBoard;
  dropdownItems: DropdownItem[];
  btnTitle: string;
  onChangeRequest: (request: RequestBoard) => void;
  onSubmit: () => void;
};

const BoardForm = ({
  request,
  dropdownItems,
  btnTitle,
  onChangeRequest,
  onSubmit,
}: BoardFormProps) => {
  const router = useRouter();

  const titleRef = useRef<HTMLDivElement>(null);

  const [isErrorTitle, setIsErrorTitle] = useState<boolean>(false);
  const [isVisibleDropdown, setIsVisibleDropdown] = useState<boolean>(false);

  const handleVisibleDropdown = useCallback((value: boolean) => {
    setIsVisibleDropdown(value);
  }, []);

  const handleBoardType = useCallback(
    (value: string | number) => {
      const newRequest = {
        ...request,
        boardType: value as RequestBoard["boardType"],
      };

      onChangeRequest(newRequest);
    },
    [request, onChangeRequest],
  );

  const handleTitle = useCallback(
    (value: string) => {
      const newRequest = {
        ...request,
        title: value,
      };

      onChangeRequest(newRequest);
    },
    [request, onChangeRequest],
  );

  const handleEditor = useCallback(
    (value: string) => {
      const newRequest = {
        ...request,
        content: value,
      };

      onChangeRequest(newRequest);
    },
    [request, onChangeRequest],
  );

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.stopPropagation();
      event.preventDefault();

      if (!request.title || request.title.length <= 0) {
        setIsErrorTitle(true);
        window.scrollTo({
          top: titleRef.current?.offsetTop && titleRef.current?.offsetTop - 200,
        });
        titleRef.current?.focus();
        return;
      }

      setIsErrorTitle(false);
      onSubmit();
    },
    [request, onSubmit],
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
            defaultTitle={
              dropdownItems.find((item) => item.value === request.boardType)
                ?.title || dropdownItems[0].title
            }
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
            value={request.title}
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
        <Editor
          value={request.content}
          onChange={handleEditor}
          className={styles.editor}
        />
      </div>
      <div className={styles.btnBox}>
        <button type="button" className={styles.cancel} onClick={handleCancel}>
          취소
        </button>
        <button type="submit" className={styles.submit}>
          {btnTitle}
        </button>
      </div>
    </form>
  );
};

export default BoardForm;
