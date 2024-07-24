"use client";

import {
  CODE_TYPE_OPTIONS_ARRAY,
  CodeType,
  Language,
  checkMyType,
} from "@/types/constants";
import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

type CodeTypeProviderContext = {
  type: CodeType;
  setType: (value: CodeType) => void;
};

const CodeTypeContext = createContext<CodeTypeProviderContext>({
  type: Language.PYTHON,
  setType: () => {},
});

export const CodeTypeProvider = ({ children }: { children: ReactNode }) => {
  const [type, setStateType] = useState<CodeType>(Language.PYTHON);

  useEffect(() => {
    const codeType = window.localStorage.getItem("codeType") || Language.PYTHON;

    setStateType(
      checkMyType(CODE_TYPE_OPTIONS_ARRAY, codeType as CodeType)
        ? (codeType as CodeType)
        : Language.PYTHON,
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
