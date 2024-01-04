"use client";

import React, { HTMLInputTypeAttribute, useCallback, useState } from "react";

import styles from "./input.module.scss";
import Image from "next/image";
import { notosansMedium } from "@/styles/_font";

type InputType = {
  title?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string;
  isError?: boolean;
  errorMsg: string;
  onChange?: Function;
};

const Input = (props: InputType) => {
  const [value, setValue] = useState<any>(props.defaultValue || "");
  const [type, setType] = useState<HTMLInputTypeAttribute>(
    props.type || "text",
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setValue(inputValue);
      props.onChange?.(inputValue);
    },
    [],
  );

  const handleClickHideOrShow = useCallback(() => {
    setIsVisible((prev) => {
      if (prev) {
        setType("password");
      } else {
        setType("text");
      }

      return !prev;
    });
  }, []);

  return (
    <div className={styles.inputContainer}>
      {props.title && (
        <div className={`${styles.title} ${notosansMedium.className}`}>
          {props.title}
        </div>
      )}
      <div
        className={`${styles.inputBox} ${props.isError ? styles.error : null}`}
      >
        <input
          type={type}
          placeholder={props.placeholder}
          value={value}
          onChange={handleChange}
          className={styles.input}
        />
        {props.type === "password" && isVisible ? (
          <Image
            src="/svgs/password_hide.svg"
            alt="패스워드 보기 아이콘"
            width={20}
            height={20}
            onClick={handleClickHideOrShow}
          />
        ) : null}
        {props.type === "password" && !isVisible ? (
          <Image
            src="/svgs/password_view.svg"
            alt="패스워드 보기 아이콘"
            width={20}
            height={20}
            onClick={handleClickHideOrShow}
          />
        ) : null}
      </div>
      {props.isError && <div className={styles.errorMsg}>{props.errorMsg}</div>}
    </div>
  );
};

export default Input;
