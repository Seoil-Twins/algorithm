"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./login.module.scss";

import Input from "@/components/common/input";

import {
  Info,
  ValidationError,
  changeErrorInfo,
  validationEmail,
  validationPassword,
} from "@/utils/validation";

import { useAuth } from "@/providers/authProvider";
import { AxiosError } from "axios";

interface LoginProperty {
  email: string;
  password: string;
}

type LoginKeys = keyof LoginProperty;

type LoginInfo = {
  [key in LoginKeys]: {
    value: LoginProperty[key];
  } & ValidationError;
};

const Login = () => {
  const router = useRouter();
  const { login } = useAuth()!;

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: {
      value: "",
      isError: false,
      errMsg: "",
    },
    password: {
      value: "",
      isError: false,
      errMsg: "올바른 비밀번호 형식이 아닙니다.",
    },
  });

  const [isFailedLogin, setIsfailedLogin] = useState<boolean>(false);

  const handleLoginInfo = useCallback(
    (changedValue: string, name: LoginKeys) => {
      setLoginInfo((prev: LoginInfo) => {
        const { [name]: updatedField, ...rest } = prev;

        return {
          ...rest,
          [name]: {
            ...updatedField,
            value: changedValue,
          },
        } as LoginInfo;
      });
    },
    [],
  );

  const validation = useCallback(() => {
    let isValid = true;
    let newLoginInfo: Info<LoginInfo, LoginKeys> = { ...loginInfo };

    const isEmailValid = validationEmail(loginInfo.email.value);
    newLoginInfo = changeErrorInfo<LoginInfo, "email">(
      newLoginInfo,
      "email",
      isEmailValid.isError,
      isEmailValid.errMsg,
    ) as LoginInfo;

    const isPasswordValid = validationPassword(loginInfo.password.value);
    newLoginInfo = changeErrorInfo<LoginInfo, "password">(
      newLoginInfo,
      "password",
      isPasswordValid.isError,
    ) as LoginInfo;

    if (isEmailValid.isError || isPasswordValid.isError) isValid = false;

    setLoginInfo(newLoginInfo as LoginInfo);
    return isValid;
  }, [loginInfo]);

  const handleClickLogin = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isValid = validation();
      if (!isValid) {
        setIsfailedLogin(false);
        return;
      }

      // 로그인 API 호출 및 처리 로직
      try {
        await login({
          email: loginInfo.email.value,
          userPw: loginInfo.password.value,
        });

        window.location.replace("/");
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          setIsfailedLogin(true);
        } else {
          alert("알 수 없는 에러가 발생하였습니다.\n나중에 다시 시도해주세요.");
        }
      }
    },
    [loginInfo.email.value, loginInfo.password.value, login, validation],
  );

  return (
    <form className={styles.formBox} onSubmit={handleClickLogin}>
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
          value={loginInfo.email.value}
          isError={loginInfo.email.isError}
          errorMsg={loginInfo.email.errMsg}
          onChange={(changedValue: string) =>
            handleLoginInfo(changedValue, "email")
          }
        />
      </div>
      <div className={styles.mb20}>
        <Input
          type="password"
          title="비밀번호"
          placeholder="영문자, 숫자, 특수문자 포함 최소 8 ~ 20자"
          value={loginInfo.password.value}
          isError={loginInfo.password.isError}
          errorMsg={loginInfo.password.errMsg}
          onChange={(changedValue: string) =>
            handleLoginInfo(changedValue, "password")
          }
          usePasswordToggle
        />
      </div>
      {isFailedLogin && (
        <div className={`${styles.mb20} ${styles.failed}`}>
          이메일 또는 비밀번호를 다시 확인하세요.
        </div>
      )}
      <button
        type="submit"
        className={`${styles.button} ${notosansBold.className}`}
      >
        로그인
      </button>
    </form>
  );
};

export default Login;
