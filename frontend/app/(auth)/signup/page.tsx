"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";
import { useDebouncedCallback } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";
import { useFormState } from "react-dom";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./signup.module.scss";

import {
  ValidationError,
  changeErrorInfo,
  validationEmail,
} from "@/utils/validation";

import {
  sendVerifyCode as sendVerifyCodeAPI,
  compareVerifyCode,
} from "@/api/user";

import Input from "@/components/common/input";
import EmailVerify, { EmailInfo } from "@/components/common/emailVerify";
import Spinner from "@/components/common/spinner";
import { signup } from "@/app/actions/user";
import SubmitButton from "@/components/common/submitButton";

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
  } & Partial<ValidationError>;
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
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const [state, formAction] = useFormState(
    async (_: any, formData: FormData) => {
      return await signup(
        isCheck,
        isVerified,
        signupInfo.email.value,
        formData,
      );
    },
    null,
  );

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
          error.response?.data.errorCode === 40920
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
          verifyCode: signupInfo.verifyCode.value,
        });

        if (response.status === 200) {
          setIsVerified(true);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 406) {
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

  const success = useCallback(() => {
    router.replace("/login");
  }, [router]);

  useEffect(() => {
    if (!state) return;

    if (state?.status === 201) {
      toast.success(state.data, { position: "top-center", duration: 3000 });
      success();
    } else {
      toast.error(state?.data || "서버 에러가 발생하였습니다.", {
        position: "top-center",
        duration: 3000,
      });
    }
  }, [state, success]);

  return (
    <>
      <Spinner isVisible={isSending} isPage />
      <Toaster />
      <form className={styles.formBox} action={formAction}>
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
            placeholder="닉네임 입력"
            value={signupInfo.nickname.value}
            onChange={(changedValue: string) =>
              handleSignupInfo(changedValue, "nickname")
            }
            minLength={2}
            maxLength={8}
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
