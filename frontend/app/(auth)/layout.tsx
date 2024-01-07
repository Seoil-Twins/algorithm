import Image from "next/image";

import styles from "./auth.module.scss";
import { notosansBold } from "@/styles/_font";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className={styles.authBox}>
        <div className={styles.introBox}>
          <div className={`${styles.title} ${notosansBold.className}`}>
            지금 로그인 해서
            <br /> 다양한 문제를 풀어보세요!
          </div>
          <Image
            src="/svgs/login_logo.svg"
            alt="인증 유도 아이콘"
            sizes="100vw"
            width={0}
            height={0}
          />
        </div>
        {children}
      </div>
    </>
  );
};

export default layout;
