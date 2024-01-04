import Image from "next/image";

import { notosansBold } from "@/styles/_font";
import styles from "./login.module.scss";
import LoginForm from "@/components/login/loginForm";

const Login = () => {
  return (
    <>
      <div className={styles.loginBox}>
        <div className={styles.introBox}>
          <div className={`${styles.title} ${notosansBold.className}`}>
            지금 로그인 해서
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

export default Login;
