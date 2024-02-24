"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./login.module.scss";

import Input from "@/components/common/input";

import { useAuth } from "@/providers/authProvider";

import { getUser } from "@/api/user";
import { login as loginAPI } from "@/app/actions/user";
import SubmitButton from "@/components/common/submitButton";

const Login = () => {
  const [state, formAction] = useFormState(loginAPI, null);
  const router = useRouter();
  const searchParam = useSearchParams();
  const { login, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const error = useRef<string | undefined>(searchParam.get("error"));
  const redirectUrl = useRef<string | undefined>(
    searchParam.get("redirect_url"),
  );

  const handleEmail = useCallback((value: string) => {
    setEmail(value);
  }, []);

  const handlePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const success = useCallback(async () => {
    const userResponse = await getUser();
    login(userResponse.data);

    router.replace(redirectUrl.current || "/");
  }, [router, login]);

  useEffect(() => {
    if (!state) return;

    const options: any = {
      position: "top-center",
      duration: 3000,
    };

    if (state.status === 200) {
      success();
    } else if (state?.status === 400) {
      toast.error(state.data || "서버 에러가 발생하였습니다.", options);
    } else if (state?.status === 406) {
      toast.error(state.data || "서버 에러가 발생하였습니다.", options);
    } else if (state?.status === 500) {
      toast.error("서버 에러가 발생하였습니다.", options);
    }
  }, [state, success]);

  useEffect(() => {
    if (error.current === "unauthorized") {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Toaster />
      <form className={styles.formBox} action={formAction}>
        <div className={`${styles.title} ${notosansMedium.className}`}>
          로그인
        </div>
        <div className={styles.desc}>
          원할한 서비스 이용을 위해 로그인을 진행해주세요.
        </div>
        <div className={styles.mb20}>
          <Input
            name="email"
            type="email"
            title="이메일"
            pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            placeholder="이메일 입력"
            value={email}
            onChange={handleEmail}
            // required
          />
        </div>
        <div className={styles.mb20}>
          <Input
            name="password"
            type="password"
            title="비밀번호"
            pattern="(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
            placeholder="영문자, 숫자, 특수문자 포함 최소 8 ~ 20자"
            value={password}
            onChange={handlePassword}
            usePasswordToggle
            required
          />
        </div>
        <SubmitButton
          btnTitle="로그인"
          pendingTitle="로그인 중"
          className={`${styles.button} ${notosansBold.className}`}
        />
      </form>
    </>
  );
};

export default Login;
