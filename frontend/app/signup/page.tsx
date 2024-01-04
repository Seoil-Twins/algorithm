import Image from "next/image";

import styles from "./signup.module.scss";
import { notosansBold } from "@/styles/_font";

import SignupForm from "@/components/signup/signupForm";

const Signup = () => {
  return (
    <>
      <div className={styles.signupBox}>
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
        <SignupForm />
      </div>
    </>
  );
};

export default Signup;
