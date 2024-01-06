"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./login.module.scss";

import Input from "@/components/common/input";

import useSession from "@/utils/clientSideSession";

const Login = () => {
  const router = useRouter();
  const session = useSession();

  const [email, setEmail] = useState<string>("");
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);
  const [errMsgEmail, setErrMsgEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

  const [isFailedLogin, setIsfailedLogin] = useState<boolean>(false);

  const handleChangeEmail = useCallback((changedValue: string) => {
    setEmail(changedValue);
  }, []);

  const handleChangePassword = useCallback((changedValue: string) => {
    setPassword(changedValue);
  }, []);

  const validation = useCallback(() => {
    let isValid = true;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      setIsErrorEmail(true);
      setErrMsgEmail("유효하지 않은 이메일입니다.");
      isValid = false;
    } else {
      setIsErrorEmail(false);
    }

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const isValidPassword = passwordRegex.test(password);
    if (!isValidPassword) {
      setIsErrorPassword(true);
      isValid = false;
    } else {
      setIsErrorPassword(false);
    }

    return isValid;
  }, [email, password]);

  const handleClickSignup = useCallback(async () => {
    const isValid = validation();
    if (!isValid) {
      setIsfailedLogin(false);
      return;
    }

    // 로그인 API 호출 및 처리 로직
    // 로그인 실패
    // const response = {
    //   statusCode: 400,
    // };

    // if (response.statusCode === 400) {
    //   setIsfailedLogin(true);
    // }
    await session.login("1234");

    // // client re-rendering event
    const event = new Event("sessionUpdate");
    document.dispatchEvent(event);

    router.refresh();
    router.replace("/");
  }, [email, password]);

  return (
    <form className={styles.formBox}>
      <div className={`${styles.title} ${notosansMedium.className}`}>
        로그인
      </div>
      <div className={styles.desc}>
        원할한 서비스 이용을 위해 로그인을 진행해주세요.
      </div>
      <div className={styles.mb20}>
        <Input
          type="email"
          title="이메일"
          placeholder="이메일 입력"
          isError={isErrorEmail}
          errorMsg={errMsgEmail}
          onChange={handleChangeEmail}
        />
      </div>
      <div className={styles.mb20}>
        <Input
          type="password"
          title="비밀번호"
          placeholder="영문자, 숫자, 특수문자 포함 최소 8 ~ 20자"
          isError={isErrorPassword}
          errorMsg="올바른 비밀번호 형식이 아닙니다."
          onChange={handleChangePassword}
        />
      </div>
      {isFailedLogin && (
        <div className={`${styles.mb20} ${styles.failed}`}>
          이메일 또는 비밀번호를 다시 확인하세요.
        </div>
      )}
      <input
        type="button"
        value="로그인"
        className={`${styles.button} ${notosansBold.className}`}
        onClick={handleClickSignup}
      />
    </form>
  );
};

export default Login;
