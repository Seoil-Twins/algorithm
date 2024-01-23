"use client";

import React, { useCallback } from "react";

import styles from "./modal.module.scss";
import { notosansBold } from "@/styles/_font";

import ThemeImage from "./themeImage";
import Image from "next/image";

type ModalProps = {
  isVisible: boolean;
  title: string;
  children: React.ReactNode;
  onOk: () => void;
  onCancel: () => void;
  /** default : 확인 */
  primaryMsg?: string;
  primaryType?: "confirm" | "danger";
  /** default: false */
  visibleCancel?: boolean;
  /** default : 취소 */
  cancelMsg?: string;
  maxWidth?: number;
};

const Modal = ({
  isVisible,
  title,
  onOk,
  onCancel,
  primaryMsg = "확인",
  primaryType = "confirm",
  visibleCancel = false,
  cancelMsg = "취소",
  maxWidth = 60,
  children,
}: ModalProps) => {
  const handleOk = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onOk();
    },
    [onOk],
  );

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      event.stopPropagation();
      onCancel();
    },
    [onCancel],
  );

  if (!isVisible) return null;

  return (
    <>
      <div className={styles.modal} onClick={handleCancel}>
        <div className={styles.box} style={{ maxWidth: `${maxWidth}vw` }}>
          <div className={styles.header}>
            <span className={`${styles.title} ${notosansBold.className}`}>
              {title}
            </span>
            <button
              type="button"
              className={styles.cancel}
              onClick={handleCancel}
            >
              <Image
                src="/svgs/modal_cancel_white.svg"
                alt="취소"
                width={16}
                height={16}
              />
            </button>
          </div>
          {children}
          <div className={styles.btnBox}>
            {visibleCancel && (
              <button
                type="button"
                className={`${styles.btn} ${styles.cancel}`}
                onClick={handleCancel}
              >
                {cancelMsg}
              </button>
            )}
            <button
              type="button"
              className={`${styles.btn} 
              ${primaryType === "confirm" && styles.confirm} 
              ${primaryType === "danger" && styles.danger}
            `}
              onClick={handleOk}
            >
              {primaryMsg}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.background}></div>
    </>
  );
};

export default Modal;
