import Image from "next/image";

import styles from "./signup.module.scss";
import { notosansBold } from "@/styles/_font";

import LoginForm from "@/components/login/loginForm";

const page = () => {
  return (
    <>
      <div className={styles.loginBox}>
        <div className={styles.introBox}>
          <div className={`${styles.title} ${notosansBold.className}`}>
            지금 회원가입 해서
            <br /> 다양한 문제를 풀어보세요!
          </div>
          <Image
            src="/svgs/login_logo.svg"
            alt="로그인 아이콘"
            sizes="100vw"
            width={0}
            height={0}
          />
        </div>
        <LoginForm />
      </div>
    </>
  );
};

export default page;
