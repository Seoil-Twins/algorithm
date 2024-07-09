"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";

import {
  compareVerifyCode,
  sendVerifyCode as sendVerifyCodeAPI,
  signup,
} from "@/app/actions/user";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./signup.module.scss";

import Input from "@/components/common/input";
import EmailVerify, { EmailInfo } from "@/components/common/emailVerify";
import Spinner from "@/components/common/spinner";
import SubmitButton from "@/components/common/submitButton";
import { CustomException, FRONTEND_API_URL } from "@/app/api";
import {
  validationEmail,
  validationNickname,
  validationPassword,
} from "@/utils/validation";

interface SignupProperty {
  nickname: string;
  email: string;
  verifyCode: string;
  password: string;
  confirmPassword: string;
}

type SignupKeys = keyof SignupProperty;

type SignupInfo = {
  [key in SignupKeys]: {
    value: SignupProperty[key];
    disabled?: boolean;
  };
};

const Signup = () => {
  const router = useRouter();

  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    nickname: {
      value: "",
    },
    email: {
      value: "",
      disabled: false,
    },
    verifyCode: {
      value: "",
      disabled: true,
    },
    password: {
      value: "",
    },
    confirmPassword: {
      value: "",
    },
  });
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSignupInfo = useCallback(
    (changedValue: string, name: SignupKeys) => {
      setSignupInfo((prev: SignupInfo) => {
        const { [name]: updatedField, ...rest } = prev;

        return {
          ...rest,
          [name]: {
            ...updatedField,
            value: changedValue,
          },
        } as SignupInfo;
      });
    },
    [],
  );

  const sendVerifyCode = useDebouncedCallback(
    useCallback(async () => {
      if (!signupInfo.verifyCode.disabled || isVerified) {
        return;
      }

      // 이메일 전송 API 구현
      try {
        setIsSending(true);
        const response = await fetch(FRONTEND_API_URL + "/user/verify/send", {
          method: "POST",
          body: JSON.stringify({
            email: signupInfo.email.value,
          }),
        });

        if (response.ok) {
          const {
            ["email"]: emailField,
            ["verifyCode"]: verifyCodeField,
            ...prev
          } = signupInfo;

          setSignupInfo({
            ...prev,
            email: {
              ...emailField,
              disabled: true,
            },
            verifyCode: {
              ...verifyCodeField,
              disabled: false,
            },
          });
        } else {
          const error: CustomException =
            (await response.json()) as CustomException;
          toast.error(error.message);
        }
      } catch (error) {
        toast.error("나중에 다시 시도해주세요.");
      } finally {
        setIsSending(false);
      }
    }, [isVerified, signupInfo]),
    500,
  );

  const checkVerifyCode = useDebouncedCallback(
    useCallback(async () => {
      if (signupInfo.verifyCode.disabled || isVerified) return;

      try {
        const response = await fetch(
          FRONTEND_API_URL + "/user/verify/compare",
          {
            method: "POST",
            body: JSON.stringify({
              email: signupInfo.email.value,
              verifyCode: signupInfo.verifyCode.value,
            }),
          },
        );

        if (response.ok) {
          setIsVerified(true);
        } else {
          const error: CustomException =
            (await response.json()) as CustomException;
          toast.error(error.message);
        }
      } catch (error) {
        toast.error("서버와의 통신 중 오류가 발생하였습니다.");
      }
    }, [isVerified, signupInfo]),
    500,
  );

  const handleSignup = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsFinish(true);

      try {
        if (!isCheck) {
          toast.error("약관에 등의해주세요.");
          return;
        }
        if (!isVerified) {
          toast.error("이메일 인증을 진행해주세요.");
          return;
        }
        if (signupInfo.password.value !== signupInfo.confirmPassword.value) {
          toast.error("비밀번호가 일치하지 않습니다.");
          return;
        }

        const validatedNickname = validationNickname(signupInfo.nickname.value);
        const validatedEmail = validationEmail(signupInfo.email.value);
        const validatedPassword = validationPassword(signupInfo.password.value);

        if (validatedNickname.isError) {
          toast.error(validatedNickname.errMsg);
          return;
        }
        if (validatedEmail.isError) {
          toast.error(validatedEmail.errMsg);
          return;
        }
        if (validatedPassword.isError) {
          toast.error(validatedPassword.errMsg);
          return;
        }

        const response = await fetch(FRONTEND_API_URL + "/user", {
          method: "POST",
          body: JSON.stringify({
            email: signupInfo.email.value,
            userPw: signupInfo.password.value,
            nickname: signupInfo.nickname.value,
          }),
        });

        if (response.ok) {
          toast.success("회원가입에 성공하였습니다.");
          router.replace("/login");
        } else {
          const error: CustomException =
            (await response.json()) as CustomException;
          toast.error(error.message);
        }
      } catch (error) {
        toast.error("서버에 오류가 발생하였습니다.");
      } finally {
        setIsFinish(false);
      }
    },
    [
      router,
      isCheck,
      isVerified,
      signupInfo.confirmPassword.value,
      signupInfo.email.value,
      signupInfo.nickname.value,
      signupInfo.password.value,
    ],
  );

  const handleClickCheckBox = useCallback(() => {
    setIsCheck((prev) => !prev);
  }, []);

  return (
    <>
      <Spinner isVisible={isSending} isPage />
      <form className={styles.formBox} onSubmit={handleSignup}>
        <div className={`${styles.title} ${notosansMedium.className}`}>
          회원가입
        </div>
        <div className={styles.desc}>
          원할한 서비스 이용을 위해 회원가입을 진행해주세요.
        </div>
        <div className={styles.mb20}>
          <Input
            name="nickname"
            type="text"
            title="닉네임"
            placeholder="닉네임 입력 (2 ~ 16자)"
            value={signupInfo.nickname.value}
            onChange={(changedValue: string) =>
              handleSignupInfo(changedValue, "nickname")
            }
            minLength={2}
            maxLength={16}
            required
          />
        </div>
        <div className={styles.mb20}>
          <EmailVerify
            emailInfo={signupInfo as EmailInfo}
            isVerified={isVerified}
            onChange={(changedValue: string, name: string) =>
              handleSignupInfo(changedValue, name as SignupKeys)
            }
            onSend={sendVerifyCode}
            onCheck={checkVerifyCode}
          />
        </div>
        <div className={styles.mb20}>
          <div className={styles.mb10}>
            <Input
              name="password"
              type="password"
              title="비밀번호"
              pattern="(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
              placeholder="영문자, 숫자, 특수문자 포함 최소 8 ~ 20자"
              value={signupInfo.password.value}
              onChange={(changedValue: string) =>
                handleSignupInfo(changedValue, "password")
              }
              usePasswordToggle
              required
            />
          </div>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인 입력"
            value={signupInfo.confirmPassword.value}
            onChange={(changedValue: string) =>
              handleSignupInfo(changedValue, "confirmPassword")
            }
            usePasswordToggle
            required
          />
        </div>
        <div className={styles.termsBox}>
          <input
            type="checkbox"
            id="terms"
            className={styles.checkBox}
            onChange={handleClickCheckBox}
            required
          />
          <Link
            href="/terms-of-use"
            style={{ textDecoration: "underline" }}
            replace
          >
            이용약관
          </Link>
          <label htmlFor="terms" className={styles.pr5}>
            과
          </label>
          <Link href="/privacy-policy" style={{ textDecoration: "underline" }}>
            개인정보처리방침
          </Link>
          <label htmlFor="terms" className={styles.pl5}>
            동의합니다.
          </label>
        </div>
        <SubmitButton
          btnTitle="회원가입"
          pendingTitle="회원가입 중"
          className={`${styles.button} ${notosansBold.className}`}
        />
      </form>
    </>
  );
};

export default Signup;
