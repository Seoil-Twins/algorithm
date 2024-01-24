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

import { useAuth } from "@/providers/authProvider";
import { revalidatePath } from "next/cache";

interface LoginProperty {
  email?: string;
  password?: string;
}

type LoginKeys = keyof LoginProperty;

type Login = {
  [key in LoginKeys]: {
    value: NonNullable<LoginProperty[key]>;
  } & ValidationError;
};

// eslint-disable-next-line no-redeclare
const Login = () => {
  const router = useRouter();
  const { login, mutate } = useAuth()!;

  const [loginInfo, setLoginInfo] = useState<Login>({
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
      setLoginInfo((prev: Login) => {
        const { [name]: updatedField, ...rest } = prev;

        return {
          ...rest,
          [name]: {
            ...updatedField,
            value: changedValue,
          },
        } as Login;
      });
    },
    [],
  );

  const validation = useCallback(() => {
    let isValid = true;
    let newLoginInfo: Login = {
      ...loginInfo,
    };
    const changeErrorInfo = (
      name: LoginKeys,
      isError: boolean,
      errMsg?: string,
    ) => {
      const { [name]: updatedField } = newLoginInfo;

      newLoginInfo = {
        ...newLoginInfo,
        [name]: {
          ...updatedField,
          isError,
          errMsg: errMsg ? errMsg : loginInfo[name].errMsg,
        },
      };

      if (isError) isValid = false;
    };

    const isEmailValid = validationEmail(loginInfo.email.value);
    changeErrorInfo("email", isEmailValid.isError, isEmailValid.errMsg);

    const isPasswordValid = validationPassword(loginInfo.password.value);
    changeErrorInfo("password", isPasswordValid.isError);

    setLoginInfo(newLoginInfo);
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
      // 로그인 실패
      // const response = {
      //   statusCode: 400,
      // };

      // if (response.statusCode === 400) {
      //   setIsfailedLogin(true);
      // }
      await login("1234");
      await mutate();
      await router.refresh();
      await revalidatePath("/algorithm/[algorithmId]/(board)", "layout");

      router.replace("/");
    },
    [router, login, mutate, validation],
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
