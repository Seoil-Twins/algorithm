"use client";

import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { RequestBoard } from "@/types/board";

import styles from "./boardForm.module.scss";
import { notosansMedium } from "@/styles/_font";

import Dropdown, { DropdownItem } from "@/components/common/dropdown";
import Input from "@/components/common/input";
import Editor from "@/components/common/editor";
import SubmitButton from "./submitButton";

type BoardFormProps = {
  request: RequestBoard;
  dropdownItems: DropdownItem[];
  action: (payload: FormData) => void;
  onChangeRequest: (request: RequestBoard) => void;
};

const BoardForm = ({
  request,
  dropdownItems,
  action,
  onChangeRequest,
}: BoardFormProps) => {
  const router = useRouter();

  const titleRef = useRef<HTMLDivElement>(null);

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

  return (
    <form className={styles.form} action={action}>
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
            name="title"
            type="text"
            value={request.title}
            onChange={handleTitle}
            placeholder="제목 입력"
            minLength={2}
            required
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
        <SubmitButton
          btnTitle="작성"
          pendingTitle="작성중"
          className={styles.submit}
        />
      </div>
    </form>
  );
};

export default BoardForm;
