"use client";

import { SetStateAction, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./Signup.module.scss";

import Input from "@/components/common/input";

import {
  ValidationError,
  validationEmail,
  validationNickname,
  validationPassword,
} from "@/utils/validation";

import { useAuth } from "@/providers/AuthProvider";

interface Signup {
  nickname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

type SignupKeys = keyof Signup;

type SignupError = {
  [key in SignupKeys]: ValidationError;
};

const Signup = () => {
  const router = useRouter();
  const { login } = useAuth()!;

  const [signupInfo, setSignupInfo] = useState<Signup>({
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });
  const [errorInfo, setErrorInfo] = useState<SignupError>({
    nickname: {
      errMsg: "",
      isError: false,
    },
    email: {
      errMsg: "",
      isError: false,
    },
    password: {
      errMsg: "올바른 비밀번호 형식이 아닙니다.",
      isError: false,
    },
    confirmPassword: {
      errMsg: "비밀번호가 맞지 않습니다.",
      isError: false,
    },
  });

  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleSignupInfo = useCallback(
    (changedValue: string, name: SignupKeys) => {
      setSignupInfo((prev) => {
        const newSignupInfo: Signup = {
          ...prev,
          [name]: changedValue,
        };

        return newSignupInfo;
      });
    },
    [signupInfo],
  );

  const handleClickCheckBox = useCallback(() => {
    setIsCheck((prev) => !prev);
  }, []);

  const validation = useCallback(() => {
    let isValid = true;
    let newErrorInfo = {
      ...errorInfo,
    };
    const changeErrorInfo = (
      name: SignupKeys,
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

    const isNicknameValid = validationNickname(signupInfo.nickname);
    changeErrorInfo(
      "nickname",
      isNicknameValid.isError,
      isNicknameValid.errMsg,
    );

    const isEmailValid = validationEmail(signupInfo.email);
    changeErrorInfo("email", isEmailValid.isError, isEmailValid.errMsg);

    const isPasswordValid = validationPassword(signupInfo.password);
    changeErrorInfo("password", isPasswordValid.isError);

    if (signupInfo.password !== signupInfo.confirmPassword)
      changeErrorInfo("confirmPassword", true);
    else changeErrorInfo("confirmPassword", false);

    setErrorInfo(newErrorInfo);
    return isValid;
  }, [
    signupInfo.nickname,
    signupInfo.email,
    signupInfo.password,
    signupInfo.confirmPassword,
  ]);

  const handleClickSignup = useCallback(async () => {
    const isValid = validation();
    if (!isValid) return;
    else if (!isCheck) {
      alert("약관에 동의해주세요.");
      return;
    }

    // 회원가입 API 호출 및 처리 로직
    await login("1234");

    // client re-rendering event
    const event = new Event("update");
    document.dispatchEvent(event);

    router.refresh();
    router.replace("/");
  }, [signupInfo, isCheck]);

  return (
    <form className={styles.formBox}>
      <div className={`${styles.title} ${notosansMedium.className}`}>
        회원가입
      </div>
      <div className={styles.desc}>
        원할한 서비스 이용을 위해 회원가입을 진행해주세요.
      </div>
      <div className={styles.mb20}>
        <Input
          type="text"
          title="닉네임"
          placeholder="닉네임 입력"
          isError={errorInfo.nickname.isError}
          errorMsg={errorInfo.nickname.errMsg}
          onChange={(changedValue: string) =>
            handleSignupInfo(changedValue, "nickname")
          }
        />
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
        <div className={styles.mb10}>
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
        <Input
          type="password"
          placeholder="비밀번호 확인 입력"
          isError={errorInfo.confirmPassword.isError}
          errorMsg={errorInfo.confirmPassword.errMsg}
          onChange={(changedValue: string) =>
            handleSignupInfo(changedValue, "confirmPassword")
          }
          usePasswordToggle
        />
      </div>
      <div className={styles.termsBox} onClick={handleClickCheckBox}>
        <div
          className={`${styles.checkBox} ${
            isCheck ? styles.active : styles.none
          }`}
        ></div>
        <div>
          <Link
            href="/terms-of-use"
            style={{ textDecoration: "underline" }}
            replace
          >
            이용약관
          </Link>
          과{" "}
          <Link href="/privacy-policy" style={{ textDecoration: "underline" }}>
            개인정보처리방침
          </Link>{" "}
          동의합니다.
        </div>
      </div>
      <input
        type="button"
        value="회원가입"
        className={`${styles.button} ${notosansBold.className}`}
        onClick={handleClickSignup}
      />
    </form>
  );
};

export default Signup;
