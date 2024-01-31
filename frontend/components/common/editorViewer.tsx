"use client";

import DOMPurify from "isomorphic-dompurify";
import hljs from "highlight.js";

import { useEffect } from "react";

type EditorViewerProps = {
  content: string;
  className?: string;
};

const EditorViewer = ({ content, className }: EditorViewerProps) => {
  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll("pre code").forEach((el: Element) => {
        const element = el as HTMLElement;

        if (!element.dataset.highlighted) {
          hljs.highlightElement(el as HTMLElement);
          element.dataset.highlighted = "true";
        }
      });
    }, 500);
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
