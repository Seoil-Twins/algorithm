"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./login.module.scss";

import Input from "@/components/common/input";

import {
  ValidationError,
  validationEmail,
  validationPassword,
} from "@/utils/validation";

import { useAuth } from "@/providers/AuthProvider";

interface Login {
  email?: string;
  password?: string;
}

type LoginKeys = keyof Login;

type LoginError = {
  [key in LoginKeys]: ValidationError;
};

const Login = () => {
  const router = useRouter();
  const { login } = useAuth()!;

  const [loginInfo, setLoginInfo] = useState<Login>({
    email: "",
    password: "",
  });
  const [errorInfo, setErrorInfo] = useState<LoginError>({
    email: {
      errMsg: "",
      isError: false,
    },
    password: {
      errMsg: "올바른 비밀번호 형식이 아닙니다.",
      isError: false,
    },
  });

  const [isFailedLogin, setIsfailedLogin] = useState<boolean>(false);

  const handleSignupInfo = useCallback(
    (changedValue: string, name: LoginKeys) => {
      setLoginInfo((prev) => {
        const newSignupInfo: Login = {
          ...prev,
          [name]: changedValue,
        };

        return newSignupInfo;
      });
    },
    [loginInfo],
  );

  const validation = useCallback(() => {
    let isValid = true;
    let newErrorInfo = {
      ...errorInfo,
    };
    const changeErrorInfo = (
      name: LoginKeys,
      isError: boolean,
      errMsg?: string,
    ) => {
      newErrorInfo = {
        ...newErrorInfo,
        [name]: {
          isError,
          errMsg: errMsg ? errMsg : errorInfo[name].errMsg,
        },
      };

      if (isError) isValid = false;
    };

    const isEmailValid = validationEmail(loginInfo.email);
    changeErrorInfo("email", isEmailValid.isError, isEmailValid.errMsg);

    const isPasswordValid = validationPassword(loginInfo.password);
    changeErrorInfo("password", isPasswordValid.isError);

    setErrorInfo(newErrorInfo);
    return isValid;
  }, [loginInfo.email, loginInfo.password]);

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
    await login("1234");

    // // client re-rendering event
    const event = new Event("update");
    document.dispatchEvent(event);

    router.refresh();
    router.replace("/");
  }, [loginInfo]);

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
          isError={errorInfo.email.isError}
          errorMsg={errorInfo.email.errMsg}
          onChange={(changedValue: string) =>
            handleSignupInfo(changedValue, "email")
          }
        />
      </div>
      <div className={styles.mb20}>
        <Input
          type="password"
          title="비밀번호"
          placeholder="영문자, 숫자, 특수문자 포함 최소 8 ~ 20자"
          isError={errorInfo.password.isError}
          errorMsg={errorInfo.password.errMsg}
          onChange={(changedValue: string) =>
            handleSignupInfo(changedValue, "password")
          }
          usePasswordToggle
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
