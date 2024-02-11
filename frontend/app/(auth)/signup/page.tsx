"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./signup.module.scss";

import {
  Info,
  ValidationError,
  changeErrorInfo,
  validationEmail,
  validationNickname,
  validationPassword,
} from "@/utils/validation";

import { useAuth } from "@/providers/authProvider";

import Input from "@/components/common/input";
import EmailVerify, { EmailInfo } from "@/components/common/emailVerify";

import {
  signup,
  sendVerifyCode as sendVerifyCodeAPI,
  compareVerifyCode,
} from "@/api/user";
import Spinner from "@/components/common/spinner";
import { useDebouncedCallback } from "use-debounce";

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
  } & ValidationError;
};

const Signup = () => {
  const router = useRouter();
  const { login } = useAuth()!;

  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
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
      const isEmailValid = validationEmail(signupInfo.email.value);

      if (isEmailValid.isError) {
        const newProfileInfo = changeErrorInfo(
          signupInfo,
          "email",
          isEmailValid.isError,
          isEmailValid.errMsg,
        ) as SignupInfo;
        setSignupInfo(newProfileInfo);
        return;
      } else if (!signupInfo.verifyCode.disabled || isVerified) {
        return;
      }

      // 이메일 전송 API 구현
      try {
        setIsSending(true);
        await sendVerifyCodeAPI({
          email: signupInfo.email.value,
        });
        setIsSending(false);

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
      } catch (error) {
        if (
          error instanceof AxiosError &&
          error.response?.data.errorCode === 40020
        ) {
          const { ["email"]: emailField, ...prev } = signupInfo;

          setSignupInfo({
            ...prev,
            email: {
              ...emailField,
              isError: true,
              errMsg: "중복된 이메일입니다.",
            },
          });
        } else {
          alert("나중에 다시 시도해주세요.");
        }
      } finally {
        setIsSending(false);
      }
    }, [isVerified, signupInfo]),
    500,
  );

  const checkVerifyCode = useDebouncedCallback(
    useCallback(async () => {
      if (signupInfo.verifyCode.disabled || isVerified) return;

      let isError = false;
      let errMsg = "인증 번호가 맞지 않습니다.";
      const { ["verifyCode"]: verifyCodeField, ...prev } = signupInfo;

      try {
        const response = await compareVerifyCode({
          email: signupInfo.email.value,
          code: signupInfo.verifyCode.value,
        });

        if (response.status === 200) {
          setIsVerified(true);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            isError = true;
            errMsg = "인증 번호가 맞지 않습니다.";
          } else if (error.response?.status === 500) {
            isError = true;
            errMsg =
              "예상치 못한 오류가 발생하였습니다.\n나중에 다시 시도해주세요.";
          }
        }
      }

      setSignupInfo({
        ...prev,
        verifyCode: {
          ...verifyCodeField,
          isError,
          disabled: !isError,
          errMsg,
        },
      });
    }, [isVerified, signupInfo]),
    500,
  );

  const handleClickCheckBox = useCallback(() => {
    setIsCheck((prev) => !prev);
  }, []);

  const validation = useCallback(() => {
    let isValid = true;
    let newSignupInfo: Info<SignupInfo, SignupKeys> = {
      ...signupInfo,
    };

    const isNicknameValid = validationNickname(signupInfo.nickname.value);
    newSignupInfo = changeErrorInfo<SignupInfo, "nickname">(
      newSignupInfo,
      "nickname",
      isNicknameValid.isError,
      isNicknameValid.errMsg,
    ) as SignupInfo;

    const isEmailValid = validationEmail(signupInfo.email.value);
    newSignupInfo = changeErrorInfo<SignupInfo, "email">(
      newSignupInfo,
      "email",
      isEmailValid.isError,
      isEmailValid.errMsg,
    ) as SignupInfo;

    const isPasswordValid = validationPassword(signupInfo.password.value);
    newSignupInfo = changeErrorInfo<SignupInfo, "password">(
      newSignupInfo,
      "password",
      isPasswordValid.isError,
    ) as SignupInfo;

    const notMatchedPassword =
      signupInfo.password.value !== signupInfo.confirmPassword.value;
    newSignupInfo = changeErrorInfo<SignupInfo, "confirmPassword">(
      newSignupInfo,
      "confirmPassword",
      notMatchedPassword,
    ) as SignupInfo;

    newSignupInfo = changeErrorInfo<SignupInfo, "verifyCode">(
      newSignupInfo,
      "verifyCode",
      !isVerified,
      "인증이 필요합니다.",
    ) as SignupInfo;

    if (
      isNicknameValid.isError ||
      isEmailValid.isError ||
      isPasswordValid.isError ||
      notMatchedPassword
    ) {
      isValid = false;
    }

    setSignupInfo(newSignupInfo);
    return isValid;
  }, [signupInfo, isVerified]);

  const handleClickSignup = useDebouncedCallback(
    useCallback(async () => {
      const isValid = validation();
      if (!isValid) return;
      else if (!isCheck) {
        alert("약관에 동의해주세요.");
        return;
      }

      const email = signupInfo.email.value,
        nickname = signupInfo.nickname.value,
        password = signupInfo.password.value;

      // 회원가입 API 호출 및 처리 로직
      try {
        const singupResponse = await signup({
          email,
          nickname,
          userPw: password,
        });

        if (singupResponse.status === 201) {
          await login({ email, userPw: password });
          window.location.replace("/");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            router.replace("/login");
          } else if (error.response?.data.errorCode === 40010) {
            const { ["nickname"]: nicknameField, ...prev } = signupInfo;
            setSignupInfo({
              ...prev,
              nickname: {
                ...nicknameField,
                errMsg: "중복된 닉네임입니다.",
                isError: true,
              },
            });
          }
        } else {
          alert(
            "알 수 없는 오류가 발생하였습니다.\n 나중에 다시 시도해주세요.",
          );
        }
      }
    }, [isCheck, signupInfo, router, login, validation]),
    500,
  );

  return (
    <>
      <Spinner isVisible={isSending} isPage />
      <form
        className={styles.formBox}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleClickSignup();
        }}
      >
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
    </>
  );
};

export default Signup;
