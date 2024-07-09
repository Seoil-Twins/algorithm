"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./login.module.scss";

import Input from "@/components/common/input";

import { useAuth } from "@/providers/authProvider";

import SubmitButton from "@/components/common/submitButton";
import { CustomException } from "@/app/api";
import { UserAPI } from "@/api/user";

const Login = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const { login, logout } = useAuth();

  const [isPending, setIsPending] = useState<boolean>(false);
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

  const handleLogin = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsPending(true);

      try {
        const response = await UserAPI.login({
          email,
          password,
        });

        if (response.ok) {
          login();
          router.replace(redirectUrl.current ? redirectUrl.current : "/");
        } else if (!response.ok) {
          const body = (await response.json()) as CustomException;
          toast.error(body.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsPending(false);
      }
    },
    [router, email, password, login],
  );

  useEffect(() => {
    if (error.current === "unauthorized") {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form className={styles.formBox} method="POST" onSubmit={handleLogin}>
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
            placeholder="이메일 입력"
            value={email}
            onChange={handleEmail}
            required
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
          isPending={isPending}
          btnTitle="로그인"
          pendingTitle="로그인 중"
          className={`${styles.button} ${notosansBold.className}`}
        />
      </form>
    </>
  );
};

export default Login;
