"use client";

import "react-quill/dist/quill.bubble.css";

import React, { useCallback, useEffect, useState } from "react";
import { Resizable } from "re-resizable";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import DOMPurify from "isomorphic-dompurify";

import { Algorithm } from "@/interfaces/algorithm";

import { notosansBold } from "@/styles/_font";
import styles from "./contents.module.scss";

import { useCodeType } from "@/providers/codeTypeProvider";

type DetailProps = {
  algorithm: Algorithm;
};

const contentDefaultSize = {
  width: "40%",
  height: "100%",
  minWidth: "30%",
  maxWidth: "70%",
};

const codeDefaultSize = {
  width: "100%",
  height: "75%",
  minHeight: "50%",
  maxHeight: "85%",
};

const Contents = ({ algorithm }: DetailProps) => {
  const { type } = useCodeType();

  const [language, setLanguage] = useState<Extension>(python);
  const [code, setCode] = useState<string>("\n\n\n\n\n\n");
  const [isVisibleContentResize, setIsVisibleContentResize] =
    useState<boolean>(true);
  const [isVisibleCodeResize, setIsVisibleCodeResize] = useState<boolean>(true);

  const handleChangeCode = useCallback((val: string) => {
    setCode(val);
  }, []);

  const handleResize = useCallback(() => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 767) {
      setIsVisibleContentResize(false);
      setIsVisibleCodeResize(false);
    } else {
      setIsVisibleContentResize(true);
      setIsVisibleCodeResize(true);
    }
  }, []);

  useEffect(() => {
    if (type === "p") {
      setLanguage(python);
    } else if (type === "c") {
      setLanguage(cpp);
    } else if (type === "j") {
      setLanguage(java);
    }
  }, [type]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return (
    <div className={styles.content}>
      {isVisibleContentResize ? (
        <>
          <Resizable
            defaultSize={contentDefaultSize}
            minWidth={contentDefaultSize.minWidth}
            maxWidth={contentDefaultSize.maxWidth}
            enable={{
              top: false,
              right: true,
              bottom: false,
              left: false,
              topLeft: false,
              bottomLeft: false,
              bottomRight: false,
            }}
            handleStyles={{
              right: {
                width: "2px",
                bottom: "0px",
                right: "0px",
                backgroundColor: "#090E1B",
              },
            }}
          >
            <div className={styles.description}>
              <h4 className={`${styles.title} ${notosansBold.className}`}>
                문제 설명
              </h4>
              <div className={styles.viewer}>
                <div className="quill">
                  <div className="ql-container ql-bubble ql-disabled">
                    <div
                      className="ql-editor"
                      data-gramm="false"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(algorithm.content),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Resizable>
          <div className={styles.right}>
            <Resizable
              defaultSize={codeDefaultSize}
              minHeight={codeDefaultSize.minHeight}
              maxHeight={codeDefaultSize.maxHeight}
              enable={{
                top: false,
                right: false,
                bottom: true,
                left: false,
                topLeft: false,
                bottomLeft: false,
                bottomRight: false,
              }}
              handleStyles={{
                bottom: {
                  position: "absolute",
                  width: "100%",
                  height: "2px",
                  right: "0px",
                  backgroundColor: "#090E1B",
                },
              }}
            >
              <div className={styles.codeBox}>
                <h4 className={styles.title}>코드창</h4>
                <div className={styles.code}>
                  <CodeMirror
                    value={code}
                    placeholder="코드를 작성해주세요."
                    extensions={[language]}
                    onChange={handleChangeCode}
                    theme={"dark"}
                    basicSetup={{
                      lineNumbers: true,
                      autocompletion: true,
                    }}
                  />
                </div>
              </div>
            </Resizable>
            <div className={styles.run}>
              <div className={styles.runTitle}>
                <h4 className={notosansBold.className}>실행결과</h4>
                <div className={styles.limit}>
                  <span className={styles.mr15}>
                    제한시간 {algorithm.limitTime}초
                  </span>
                  <span>메모리 제한 {algorithm.limitMem}MB</span>
                </div>
              </div>
              <div className={styles.testcase}>asd</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.description}>
            <h4 className={`${styles.title} ${notosansBold.className}`}>
              문제 설명
            </h4>
            <div className={styles.viewer}>
              <div className="quill">
                <div className="ql-container ql-bubble ql-disabled">
                  <div
                    className="ql-editor"
                    data-gramm="false"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(algorithm.content),
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            {isVisibleCodeResize ? (
              <>
                <Resizable
                  defaultSize={codeDefaultSize}
                  minHeight={codeDefaultSize.minHeight}
                  maxHeight={codeDefaultSize.maxHeight}
                  enable={{
                    top: false,
                    right: false,
                    bottom: true,
                    left: false,
                    topLeft: false,
                    bottomLeft: false,
                    bottomRight: false,
                  }}
                  handleStyles={{
                    bottom: {
                      position: "absolute",
                      width: "100%",
                      height: "2px",
                      right: "0px",
                      backgroundColor: "#090E1B",
                    },
                  }}
                >
                  <div className={styles.codeBox}>
                    <h4 className={styles.title}>코드창</h4>
                    <div className={styles.code}>
                      <CodeMirror
                        value={code}
                        placeholder="코드를 작성해주세요."
                        extensions={[language]}
                        onChange={handleChangeCode}
                        theme={"dark"}
                        basicSetup={{
                          lineNumbers: true,
                          autocompletion: true,
                        }}
                      />
                    </div>
                  </div>
                </Resizable>
                <div className={styles.run}>
                  <div className={styles.runTitle}>
                    <h4 className={notosansBold.className}>실행결과</h4>
                    <div className={styles.limit}>
                      <span className={styles.mr15}>
                        제한시간 {algorithm.limitTime}초
                      </span>
                      <span>메모리 제한 {algorithm.limitMem}MB</span>
                    </div>
                  </div>
                  <div className={styles.testcase}>asd</div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.codeBox}>
                  <h4 className={styles.title}>코드창</h4>
                  <div className={styles.code}>
                    <CodeMirror
                      value={code}
                      placeholder="코드를 작성해주세요."
                      extensions={[language]}
                      onChange={handleChangeCode}
                      theme={"dark"}
                      basicSetup={{
                        lineNumbers: true,
                        autocompletion: true,
                      }}
                    />
                  </div>
                </div>
                <div className={styles.run}>
                  <div className={styles.runTitle}>
                    <h4 className={notosansBold.className}>실행결과</h4>
                    <div className={styles.limit}>
                      <span className={styles.mr15}>
                        제한시간 {algorithm.limitTime}초
                      </span>
                      <span>메모리 제한 {algorithm.limitMem}MB</span>
                    </div>
                  </div>
                  <div className={styles.testcase}>asd</div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Contents;
