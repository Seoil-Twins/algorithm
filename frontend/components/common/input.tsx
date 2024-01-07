"use client";

import React, { HTMLInputTypeAttribute, useCallback, useState } from "react";
import Image from "next/image";

import styles from "./input.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

type EmailVerificationStatusProps = {
  isVerified?: boolean;
};

type PasswordVisibilityToggleProps = {
  isVisible?: boolean;
  onClick: () => void;
};

type BaseInputProps = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

type BaseInputWithoutValueProps = Omit<BaseInputProps, "value">;

type InputProps = {
  title?: string;
  defaultValue?: string;
  usePasswordToggle?: boolean;
  useEmailVerified?: boolean;
  isError?: boolean;
  errorMsg?: string;
} & EmailVerificationStatusProps &
  BaseInputWithoutValueProps;

const EmailVerificationStatus = ({
  isVerified,
}: EmailVerificationStatusProps) => {
  return (
    <>
      {isVerified ? (
        <>
          <div
            className={`${styles.valid} ${styles.verified} ${notosansBold.className}`}
          >
            <Image
              src={"/svgs/valid_check.svg"}
              alt="이메일 인증 아이콘"
              width={16}
              height={16}
            />
            <span className={styles.verifiedText}>이메일 인증</span>
          </div>
        </>
      ) : (
        <>
          <div
            className={`${styles.invalid} ${styles.verified} ${notosansBold.className}`}
          >
            <Image
              src={"/svgs/invalid_check.svg"}
              alt="이메일 미인증 아이콘"
              width={16}
              height={16}
            />
            <span className={styles.verifiedText}>이메일 미인증</span>
          </div>
        </>
      )}
    </>
  );
};

const PasswordVisibilityToogle = ({
  isVisible,
  onClick,
}: PasswordVisibilityToggleProps) => {
  return (
    <Image
      src={isVisible ? "/svgs/password_hide.svg" : "/svgs/password_view.svg"}
      alt="패스워드 보기 아이콘"
      width={20}
      height={20}
      onClick={onClick}
    />
  );
};

const BaseInput = ({
  type,
  placeholder,
  value,
  onChange,
  disabled,
}: BaseInputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(event.target.value)
      }
      disabled={disabled}
      className={styles.input}
    />
  );
};

const Input = ({
  title,
  type = "text",
  placeholder = "",
  defaultValue = "",
  disabled = false,
  usePasswordToggle = false,
  useEmailVerified = false,
  isVerified = false,
  isError = false,
  errorMsg = "",
  onChange,
}: InputProps) => {
  const [value, setValue] = useState<any>(defaultValue);
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleChange = useCallback((changedValue: string) => {
    setValue(changedValue);
    onChange?.(changedValue);
  }, []);

  const handleClickHideOrShow = useCallback(() => {
    setIsVisible((prev) => {
      if (prev) {
        setInputType("password");
      } else {
        setInputType("text");
      }

      return !prev;
    });
  }, [inputType, isVisible]);

  return (
    <div className={styles.inputContainer}>
      {title && (
        <div className={styles.topBox}>
          <div className={`${styles.title} ${notosansMedium.className}`}>
            {title}
          </div>
          {inputType === "email" && useEmailVerified && (
            <EmailVerificationStatus isVerified={isVerified} />
          )}
        </div>
      )}
      <div className={`${styles.inputBox} ${isError ? styles.error : null}`}>
        <BaseInput
          type={inputType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        {type === "password" && usePasswordToggle && (
          <PasswordVisibilityToogle
            isVisible={isVisible}
            onClick={handleClickHideOrShow}
          />
        )}
      </div>
      {isError && <div className={styles.errorMsg}>{errorMsg}</div>}
    </div>
  );
};

export default Input;
