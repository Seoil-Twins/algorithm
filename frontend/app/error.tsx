"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./error.module.scss";

const Error = ({ error, reset }: { error: any; reset: () => void }) => {
  const [message, setMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (error.message) {
      setMessage(error.message);
      return;
    }

    setMessage(undefined);
  }, [error]);

  return (
    <div className={styles.error}>
      <Image
        src="/svgs/internal_server_error.svg"
        alt="서버 오류 발생"
        width={0}
        height={0}
        className={styles.dynamicImg}
      />
      <p>{message || "서버에서 알 수 없는 오류가 발생하였습니다."}</p>
      <button type="button" onClick={reset} className={styles.retry}>
        다시 시도
      </button>
    </div>
  );
};

export default Error;
