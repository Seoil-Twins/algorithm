"use client";

import React, {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

import { KindOptions } from "@/api/algorithm";

type CodeType = Exclude<KindOptions, "a">;

type CodeTypeProviderContext = {
  type: CodeType;
  setType: Dispatch<SetStateAction<CodeType>>;
};

const CodeTypeContext = createContext<CodeTypeProviderContext>({
  type: "p",
  setType: () => {},
});

export const CodeTypeProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<CodeType>("p");

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
