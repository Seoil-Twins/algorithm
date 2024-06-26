"use client";

import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

export type CodeType = "c" | "p" | "j";
export const CODE_TYPE_OPTIONS_ARRAY: CodeType[] = ["c", "p", "j"];

export const getCodeValue = (code: CodeType) => {
  switch (code) {
    case "c":
      return 3001;
    case "p":
      return 3002;
    case "j":
      return 3003;
    default:
      return 3001;
  }
};

type CodeTypeProviderContext = {
  type: CodeType;
  setType: (value: CodeType) => void;
};

const CodeTypeContext = createContext<CodeTypeProviderContext>({
  type: "p",
  setType: () => {},
});

export type CodeTypeInfo = {
  [K in (typeof CODE_TYPE_OPTIONS_ARRAY)[number]]: string;
};

const myCodeTitle: CodeTypeInfo = {
  c: "cpp",
  j: "java",
  p: "python",
};

export const findMyTitle = (value: CodeType) => {
  return myCodeTitle[value];
};

export const checkMyType = (compareArray: CodeType[], value: CodeType) => {
  return compareArray.includes(value);
};

export const CodeTypeProvider = ({ children }: { children: ReactNode }) => {
  const [type, setStateType] = useState<CodeType>("p");

  useEffect(() => {
    const codeType = window.localStorage.getItem("codeType") || "p";

    setStateType(
      checkMyType(CODE_TYPE_OPTIONS_ARRAY, codeType as CodeType)
        ? (codeType as CodeType)
        : "p",
    );
  }, [type]);

  const setType = (value: CodeType) => {
    window.localStorage.setItem("codeType", value);
    setStateType(value);
  };

  return (
    <CodeTypeContext.Provider value={{ type, setType }}>
      {children}
    </CodeTypeContext.Provider>
  );
};

export const useCodeType = () => {
  const context = useContext(CodeTypeContext);
  return context;
};
