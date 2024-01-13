"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./signup.module.scss";

import Input from "@/components/common/input";

import {
  ValidationError,
  validationEmail,
  validationNickname,
  validationPassword,
} from "@/utils/validation";

import { useAuth } from "@/providers/AuthProvider";

interface SignupProperty {
  nickname?: string;
  email?: string;
  verifyCode?: string;
  password?: string;
  confirmPassword?: string;
}

type SignupKeys = keyof SignupProperty;

type Signup = {
  [key in SignupKeys]: {
    value: NonNullable<SignupProperty[key]>;
    disabled?: boolean;
  } & ValidationError;
};

// eslint-disable-next-line no-redeclare
const Signup = () => {
  const router = useRouter();
  const { login, mutate } = useAuth()!;

  const [signupInfo, setSignupInfo] = useState<Signup>({
    nickname: {
      value: "",
      errMsg: "",
      isError: false,
    },
    email: {
      value: "",
      errMsg: "",
      isError: false,
      disabled: false,
    },
    verifyCode: {
      value: "",
      errMsg: "인증 번호가 맞지 않습니다.",
      isError: false,
      disabled: true,
    },
    password: {
      value: "",
      errMsg: "올바른 비밀번호 형식이 아닙니다.",
      isError: false,
    },
    confirmPassword: {
      value: "",
      errMsg: "비밀번호가 맞지 않습니다.",
      isError: false,
    },
  });

  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleSignupInfo = useCallback(
    (changedValue: string, name: SignupKeys) => {
      setSignupInfo((prev: Signup) => {
        const { [name]: updatedField, ...rest } = prev;

        return {
          ...rest,
          [name]: {
            ...updatedField,
            value: changedValue,
          },
        } as Signup;
      });
    },
    [],
  );

  const sendVerifyCode = useCallback(() => {
    const changeErrorInfo = (
      name: SignupKeys,
      isError: boolean,
      errMsg?: string,
    ) => {
      const { [name]: updatedField } = signupInfo;
      const newSignupInfo = {
        ...signupInfo,
        [name]: {
          ...updatedField,
          isError,
          errMsg,
        },
      };

      return newSignupInfo;
    };

    const isEmailValid = validationEmail(signupInfo.email.value);

    if (isEmailValid.isError) {
      const newProfileInfo = changeErrorInfo(
        "email",
        isEmailValid.isError,
        isEmailValid.errMsg,
      );
      setSignupInfo(newProfileInfo);
      return;
    } else if (!signupInfo.verifyCode.disabled || isVerified) return;

    // 이메일 전송 API 구현
    const {
      ["email"]: emailField,
      ["verifyCode"]: verifyCodeField,
      ...prev
    } = signupInfo;

    setSignupInfo({
      ...prev,
      email: {
        ...emailField,
        isError: false,
        errMsg: "",
        disabled: true,
      },
      verifyCode: {
        ...verifyCodeField,
        disabled: false,
      },
    });
  }, [isVerified, signupInfo]);

  const checkVerifyCode = useCallback(() => {
    if (signupInfo.verifyCode.disabled || isVerified) return;

    let isError = false;
    const { ["verifyCode"]: verifyCodeField, ...prev } = signupInfo;

    if (signupInfo.verifyCode.value === "1234") {
      setIsVerified(true);
    } else {
      isError = true;
    }

    setSignupInfo({
      ...prev,
      verifyCode: {
        ...verifyCodeField,
        isError,
        disabled: !isError,
        errMsg: "인증 번호가 맞지 않습니다.",
      },
    });
  }, [isVerified, signupInfo]);

  const handleClickCheckBox = useCallback(() => {
    setIsCheck((prev) => !prev);
  }, []);

  const validation = useCallback(() => {
    let isValid = true;
    let newSignupInfo: Signup = {
      ...signupInfo,
    };

    const changeErrorInfo = (
      name: SignupKeys,
      isError: boolean,
      errMsg?: string,
    ) => {
      const { [name]: updatedField } = newSignupInfo;

      newSignupInfo = {
        ...newSignupInfo,
        [name]: {
          ...updatedField,
          isError,
          errMsg: errMsg ? errMsg : signupInfo[name].errMsg,
        },
      };

      if (isError) isValid = false;
    };

    const isNicknameValid = validationNickname(signupInfo.nickname.value);
    changeErrorInfo(
      "nickname",
      isNicknameValid.isError,
      isNicknameValid.errMsg,
    );

    const isEmailValid = validationEmail(signupInfo.email.value);
    changeErrorInfo("email", isEmailValid.isError, isEmailValid.errMsg);

    const isPasswordValid = validationPassword(signupInfo.password.value);
    changeErrorInfo("password", isPasswordValid.isError);

    if (signupInfo.password.value !== signupInfo.confirmPassword.value)
      changeErrorInfo("confirmPassword", true);
    else changeErrorInfo("confirmPassword", false);

    if (!isVerified) changeErrorInfo("verifyCode", true, "인증이 필요합니다.");

    setSignupInfo(newSignupInfo);
    return isValid;
  }, [signupInfo, isVerified]);

  const handleClickSignup = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const isValid = validation();
      if (!isValid) return;
      else if (!isCheck) {
        alert("약관에 동의해주세요.");
        return;
      }

      // 회원가입 API 호출 및 처리 로직
      await login("1234");
      await mutate();

      router.refresh();
      router.replace("/");
    },
    [validation, login, mutate, isCheck, router],
  );

  return (
    <form className={styles.formBox} onSubmit={handleClickSignup}>
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
          value={signupInfo.nickname.value}
          isError={signupInfo.nickname.isError}
          errorMsg={signupInfo.nickname.errMsg}
          onChange={(changedValue: string) =>
            handleSignupInfo(changedValue, "nickname")
          }
        />
      </div>
      <div className={styles.mb20}>
        <div className={styles.mb20}>
          <Input
            type="email"
            title="이메일"
            placeholder="이메일 입력"
            value={signupInfo.email.value}
            disabled={signupInfo.email.disabled}
            isError={signupInfo.email.isError}
            errorMsg={signupInfo.email.errMsg}
            onChange={(changedValue: string) =>
              handleSignupInfo(changedValue, "email")
            }
          />
          <button
            type="button"
            className={`
            ${signupInfo.email.disabled ? styles.disabledBtn : styles.activeBtn}
            ${styles.codeBtn}
          `}
            onClick={sendVerifyCode}
          >
            인증 번호 발송
          </button>
        </div>
        <div className={styles.mb10}>
          <Input
            placeholder="인증 번호 입력"
            length={6}
            value={signupInfo.verifyCode.value}
            disabled={signupInfo.verifyCode.disabled}
            isError={signupInfo.verifyCode.isError}
            errorMsg={signupInfo.verifyCode.errMsg}
            onChange={(changedValue: string) =>
              handleSignupInfo(changedValue, "verifyCode")
            }
          />
        </div>
        <button
          type="button"
          className={`
            ${
              signupInfo.verifyCode.disabled
                ? styles.disabledBtn
                : styles.activeBtn
            }
            ${isVerified && styles.verifiedBtn}
            ${styles.verifyBtn}
          `}
          onClick={checkVerifyCode}
        >
          {isVerified ? "인증 완료" : "인증 번호 확인"}
        </button>
      </div>
      <div className={styles.mb20}>
        <div className={styles.mb10}>
          <Input
            type="password"
            title="비밀번호"
            placeholder="영문자, 숫자, 특수문자 포함 최소 8 ~ 20자"
            value={signupInfo.password.value}
            isError={signupInfo.password.isError}
            errorMsg={signupInfo.password.errMsg}
            onChange={(changedValue: string) =>
              handleSignupInfo(changedValue, "password")
            }
            usePasswordToggle
          />
        </div>
        <Input
          type="password"
          placeholder="비밀번호 확인 입력"
          value={signupInfo.confirmPassword.value}
          isError={signupInfo.confirmPassword.isError}
          errorMsg={signupInfo.confirmPassword.errMsg}
          onChange={(changedValue: string) =>
            handleSignupInfo(changedValue, "confirmPassword")
          }
          usePasswordToggle
        />
      </div>
      <div className={styles.termsBox}>
        <input
          type="checkbox"
          id="terms"
          className={styles.checkBox}
          onChange={handleClickCheckBox}
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
      <button
        type="submit"
        className={`${styles.button} ${notosansBold.className}`}
      >
        회원가입
      </button>
    </form>
  );
};

export default Signup;
