"use client";

import DOMPurify from "isomorphic-dompurify";
import hljs from "highlight.js";

import { useEffect } from "react";

type EditorViewerProps = {
  content: string;
  className: string;
};

const EditorViewer = ({ content, className }: EditorViewerProps) => {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach((el: Element) => {
      hljs.highlightElement(el as HTMLElement);
    });
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
      className={`tiptap ${className}`}
      style={{ color: "#dadae5#ffffff" }}
    />
  );
};

export default EditorViewer;
