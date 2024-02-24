"use client";

import React from "react";

import styles from "./emailVerify.module.scss";

import Input from "./input";

type Info = {
  value: string;
  disabled: boolean;
  isError: boolean;
  errMsg: string;
};

export type EmailInfo = {
  email: Info;
  verifyCode: Info;
};

type EmailVerifyProps = {
  isVerified: boolean;
  emailInfo: EmailInfo;
  onChange: (value: string, name: string) => void;
  onSend: () => void;
  onCheck: () => void;
};

const EmailVerify = ({
  isVerified,
  emailInfo,
  onChange,
  onSend,
  onCheck,
}: EmailVerifyProps) => {
  return (
    <div className={styles.emailVerify}>
      <div>
        <Input
          name="email"
          type="email"
          title="이메일"
          placeholder="이메일 입력"
          pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          value={emailInfo.email.value}
          disabled={emailInfo.email.disabled}
          isError={emailInfo.email.isError}
          errorMsg={emailInfo.email.errMsg}
          onChange={(changedValue: string) => onChange(changedValue, "email")}
        />
        <button
          type="button"
          className={`
            ${emailInfo.email.disabled ? styles.disabledBtn : styles.activeBtn}
            ${styles.codeBtn}
          `}
          onClick={onSend}
        >
          인증 번호 발송
        </button>
      </div>
      <Input
        type="text"
        placeholder="인증 번호 입력"
        value={emailInfo.verifyCode.value}
        disabled={emailInfo.verifyCode.disabled}
        isError={emailInfo.verifyCode.isError}
        errorMsg={emailInfo.verifyCode.errMsg}
        onChange={(changedValue: string) =>
          onChange(changedValue, "verifyCode")
        }
      />
      <button
        type="button"
        className={`
            ${
              emailInfo.verifyCode.disabled
                ? styles.disabledBtn
                : styles.activeBtn
            }
            ${isVerified && styles.verifiedBtn}
            ${styles.verifyBtn}
          `}
        onClick={onCheck}
      >
        {isVerified ? "인증 완료" : "인증 번호 확인"}
      </button>
    </div>
  );
};

export default EmailVerify;
