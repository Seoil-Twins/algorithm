"use client";

import Image from "next/image";
import ErrorType from "next/error";

import styles from "./error.module.scss";

const Error = ({ reset }: { error: ErrorType; reset: () => void }) => {
  return (
    <div className={styles.error}>
      <Image
        src="/svgs/internal_server_error.svg"
        alt="서버 오류 발생"
        width={0}
        height={0}
        className={styles.dynamicImg}
      />
      <p>서버에서 알 수 없는 오류가 발생하였습니다.</p>
      <button type="button" onClick={reset} className={styles.retry}>
        다시 시도
      </button>
    </div>
  );
};

export default Error;
