"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./signupForm.module.scss";

import Input from "@/components/common/input";

import useSession from "@/utils/clientSideSession";

const SignupForm = () => {
  const router = useRouter();
  const session = useSession();

  const [nickname, setNickname] = useState<string>("");
  const [isErrorNickname, setIsErrorNickname] = useState<boolean>(false);
  const [errMsgNickname, setErrMsgNickname] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>(false);
  const [errMsgEmail, setErrMsgEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isErrorConfirmPassword, setIsErrorConfirmPassword] =
    useState<boolean>(false);

  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleChangeNickname = useCallback((changedValue: string) => {
    setNickname(changedValue);
  }, []);

  const handleChangeEmail = useCallback((changedValue: string) => {
    setEmail(changedValue);
  }, []);

  const handleChangePassword = useCallback((changedValue: string) => {
    setPassword(changedValue);
  }, []);

  const handleChangeConfirmPassword = useCallback((changedValue: string) => {
    setConfirmPassword(changedValue);
  }, []);

  const handleClickCheckBox = useCallback(() => {
    setIsCheck((prev) => !prev);
  }, []);

  const validation = useCallback(() => {
    let isValid = true;

    if (nickname.length < 2 || nickname.length > 8) {
      setIsErrorNickname(true);
      setErrMsgNickname("2글자 이상 입력해주세요.");
      isValid = false;
    } else {
      setIsErrorNickname(false);
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      setIsErrorEmail(true);
      setErrMsgEmail("유효하지 않은 이메일입니다.");
      isValid = false;
    } else {
      setIsErrorEmail(false);
    }

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const isValidPassword = passwordRegex.test(password);
    if (!isValidPassword) {
      setIsErrorPassword(true);
      isValid = false;
    } else {
      setIsErrorPassword(false);
    }

    if (password !== confirmPassword) {
      setIsErrorConfirmPassword(true);
      isValid = false;
    } else {
      setIsErrorConfirmPassword(false);
    }

    return isValid;
  }, [nickname, email, password, confirmPassword]);

  const handleClickSignup = useCallback(async () => {
    const isValid = validation();
    if (!isValid) return;
    else if (!isCheck) {
      alert("약관에 동의해주세요.");
      return;
    }

    // 회원가입 API 호출 및 처리 로직
    await session.login("1234");

    // client re-rendering event
    const event = new Event("sessionUpdate");
    document.dispatchEvent(event);

    router.refresh();
    router.replace("/");
  }, [nickname, email, password, confirmPassword, isCheck]);

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
          isError={isErrorNickname}
          errorMsg={errMsgNickname}
          onChange={handleChangeNickname}
        />
      </div>
      <div className={styles.mb20}>
        <Input
          type="email"
          title="이메일"
          placeholder="이메일 입력"
          isError={isErrorEmail}
          errorMsg={errMsgEmail}
          onChange={handleChangeEmail}
        />
      </div>
      <div className={styles.mb20}>
        <div className={styles.mb10}>
          <Input
            type="password"
            title="비밀번호"
            placeholder="영문자, 숫자, 특수문자 포함 최소 8 ~ 20자"
            isError={isErrorPassword}
            errorMsg="올바른 비밀번호 형식이 아닙니다."
            onChange={handleChangePassword}
          />
        </div>
        <Input
          type="password"
          placeholder="비밀번호 확인 입력"
          isError={isErrorConfirmPassword}
          errorMsg="비밀번호가 맞지 않습니다."
          onChange={handleChangeConfirmPassword}
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

export default SignupForm;
