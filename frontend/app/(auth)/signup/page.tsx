"use client";

import { useCallback, useState } from "react";
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
    value: SignupProperty[key];
    disabled?: boolean;
  } & ValidationError;
};

const Signup = () => {
  const router = useRouter();
  const { login, mutate } = useAuth()!;

  const [inputInfo, setInputInfo] = useState<Signup>({
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
      setInputInfo((prev: Signup) => {
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
    [inputInfo],
  );

  const sendVerifyCode = useCallback(() => {
    if (!inputInfo.verifyCode.disabled || isVerified) return;
    console.log("send");

    // 이메일 전송 API 구현
    const {
      ["email"]: emailField,
      ["verifyCode"]: verifyCodeField,
      ...prev
    } = inputInfo;

    setInputInfo({
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
  }, [inputInfo]);

  const checkVerifyCode = useCallback(() => {
    if (inputInfo.verifyCode.disabled || isVerified) return;
    console.log("check");

    let isError = false;
    const { ["verifyCode"]: verifyCodeField, ...prev } = inputInfo;

    if (inputInfo.verifyCode.value === "1234") {
      setIsVerified(true);
    } else {
      isError = true;
    }

    setInputInfo({
      ...prev,
      verifyCode: {
        ...verifyCodeField,
        isError,
        errMsg: "인증 번호가 맞지 않습니다.",
      },
    });
  }, [inputInfo]);

  const handleClickCheckBox = useCallback(() => {
    setIsCheck((prev) => !prev);
  }, []);

  const validation = useCallback(() => {
    let isValid = true;
    let newInputInfo: Signup = {
      ...inputInfo,
    };

    const changeErrorInfo = (
      name: SignupKeys,
      isError: boolean,
      errMsg?: string,
    ) => {
      const { [name]: updatedField } = newInputInfo;

      newInputInfo = {
        ...newInputInfo,
        [name]: {
          ...updatedField,
          isError,
          errMsg: errMsg ? errMsg : inputInfo[name].errMsg,
        },
      };

      if (isError) isValid = false;
    };

    const isNicknameValid = validationNickname(inputInfo.nickname.value);
    changeErrorInfo(
      "nickname",
      isNicknameValid.isError,
      isNicknameValid.errMsg,
    );

    const isEmailValid = validationEmail(inputInfo.email.value);
    changeErrorInfo("email", isEmailValid.isError, isEmailValid.errMsg);

    const isPasswordValid = validationPassword(inputInfo.password.value);
    changeErrorInfo("password", isPasswordValid.isError);

    if (inputInfo.password.value !== inputInfo.confirmPassword.value)
      changeErrorInfo("confirmPassword", true);
    else changeErrorInfo("confirmPassword", false);

    if (!isVerified) changeErrorInfo("verifyCode", true, "인증이 필요합니다.");

    setInputInfo(newInputInfo);
    return isValid;
  }, [inputInfo, isVerified]);

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
    [inputInfo, isCheck, isVerified],
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
          isError={inputInfo.nickname.isError}
          errorMsg={inputInfo.nickname.errMsg}
          onChange={(changedValue: string) =>
            handleSignupInfo(changedValue, "nickname")
          }
        />
      </div>
      <div className={styles.mb20}>
        <div className={`${styles.mb10} ${styles.flexBox}`}>
          <Input
            type="email"
            title="이메일"
            placeholder="이메일 입력"
            disabled={inputInfo.email.disabled}
            isError={inputInfo.email.isError}
            errorMsg={inputInfo.email.errMsg}
            onChange={(changedValue: string) =>
              handleSignupInfo(changedValue, "email")
            }
          />
          <button
            type="button"
            className={`
            ${inputInfo.email.disabled ? styles.disabledBtn : styles.activeBtn}
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
            disabled={inputInfo.verifyCode.disabled}
            isError={inputInfo.verifyCode.isError}
            errorMsg={inputInfo.verifyCode.errMsg}
            onChange={(changedValue: string) =>
              handleSignupInfo(changedValue, "verifyCode")
            }
          />
        </div>
        <button
          type="button"
          className={`
            ${
              inputInfo.verifyCode.disabled
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
            isError={inputInfo.password.isError}
            errorMsg={inputInfo.password.errMsg}
            onChange={(changedValue: string) =>
              handleSignupInfo(changedValue, "password")
            }
            usePasswordToggle
          />
        </div>
        <Input
          type="password"
          placeholder="비밀번호 확인 입력"
          isError={inputInfo.confirmPassword.isError}
          errorMsg={inputInfo.confirmPassword.errMsg}
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
