"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

import styles from "./modal.module.scss";
import { notosansBold } from "@/styles/_font";

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
  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleVisible = useCallback(
    (event: MouseEvent) => {
      const modalInside = modalRef.current?.contains(event.target as Node);

      if (modalInside) return;

      onCancel();
      document.body.removeEventListener("click", handleVisible);
    },
    [onCancel],
  );

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      document.body.addEventListener("click", handleVisible);
    } else {
      document.body.style.overflow = "auto";
      document.body.removeEventListener("click", handleVisible);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.removeEventListener("click", handleVisible);
    };
  }, [isVisible, handleVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div className={styles.modal}>
        <div
          className={styles.box}
          style={{ maxWidth: `${maxWidth}vw` }}
          ref={modalRef}
        >
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
