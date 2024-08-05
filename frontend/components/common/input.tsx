"use client";

import React, {
  HTMLInputTypeAttribute,
  useCallback,
  useEffect,
  useState,
} from "react";
import Image from "next/image";

import styles from "./input.module.scss";
import { notosansMedium } from "@/styles/_font";

type PasswordVisibilityToggleProps = {
  isVisible?: boolean;
  onClick: () => void;
};

type BaseInputProps = {
  type: HTMLInputTypeAttribute;
  onChange?: (value: string) => void;
  onChangeFile?: (file: File | FileList) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">;

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

const BaseInput = ({ type, onChange, ...props }: BaseInputProps) => {
  return (
    <input
      type={type}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChange?.(event.target.value)
      }
      className={styles.input}
      autoComplete="none"
      {...props}
    />
  );
};

const Input = ({
  title,
  type,
  usePasswordToggle = false,
  isError = false,
  errorMsg = "",
  onChange,
  onChangeFile,
  ...props
}: InputProps) => {
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(
    type || "text",
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleChange = useCallback(
    (changedValue: string) => {
      onChange?.(changedValue);
    },
    [onChange],
  );

  const handleFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;

      if (props.multiple) onChangeFile?.(event.target.files);
      else onChangeFile?.(event.target.files[0]);
    },
    [props.multiple, onChangeFile],
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
        {type !== "file" ? (
          <BaseInput type={inputType} onChange={handleChange} {...props} />
        ) : (
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleFile}
            className={styles.input}
            {...props}
          />
        )}
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
