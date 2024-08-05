"use client";

import { useEffect } from "react";
import styles from "./spinner.module.scss";

type SpinnerProps = {
  isVisible: boolean;
  isPage?: boolean;
};

const Spinner = ({ isVisible, isPage = false }: SpinnerProps) => {
  useEffect(() => {
    if (isPage) {
      if (isVisible) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isPage, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={styles.spinner}
        style={isPage ? { position: "fixed" } : { position: "absolute" }}
      >
        <span className={styles.loader} />
      </div>
      {isPage && isVisible && <div className={styles.background}></div>}
    </>
  );
};

export default Spinner;
