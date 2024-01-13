"use client";

import React, { HTMLInputTypeAttribute, useCallback, useState } from "react";
import Image from "next/image";

import styles from "./input.module.scss";
import { notosansMedium } from "@/styles/_font";

type PasswordVisibilityToggleProps = {
  isVisible?: boolean;
  onClick: () => void;
};

type BaseInputProps = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  length?: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
};

type InputProps = {
  title?: string;
  usePasswordToggle?: boolean;
  isError?: boolean;
  errorMsg?: string;
} & BaseInputProps;

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
  length,
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
      maxLength={length}
    />
  );
};

const Input = ({
  title,
  type = "text",
  placeholder = "",
  value = "",
  length,
  disabled = false,
  usePasswordToggle = false,
  isError = false,
  errorMsg = "",
  onChange,
}: InputProps) => {
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleChange = useCallback(
    (changedValue: string) => {
      onChange?.(changedValue);
    },
    [onChange],
  );

  const handleClickHideOrShow = useCallback(() => {
    setIsVisible((prev) => {
      if (prev) {
        setInputType("password");
      } else {
        setInputType("text");
      }

      return !prev;
    });
  }, []);

  return (
    <div className={styles.inputContainer}>
      {title && (
        <div className={styles.topBox}>
          <div className={`${styles.title} ${notosansMedium.className}`}>
            {title}
          </div>
        </div>
      )}
      <div className={`${styles.inputBox} ${isError ? styles.error : null}`}>
        <BaseInput
          type={inputType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          length={length}
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
