"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ImageResize from "tiptap-extension-resize-image";
import Placeholder from "@tiptap/extension-placeholder";

import styles from "./editor.module.scss";

import { Indent } from "@/utils/editor/intent";
import CustomCodeBlockLowlight from "@/utils/editor/codeBlockIndent";

import Toolbar from "./toolbar";

type EditorProps = {
  value: string;
  isVisibleToolbar?: boolean;
  placeholder?: string;
  className?: string;
  init?: boolean;
  onChange: (value: string) => void;
};

const Editor = ({
  value,
  isVisibleToolbar = true,
  placeholder,
  className,
  init = false,
  onChange,
}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Markdown,
      Underline,
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
      Youtube.configure({
        autoplay: false,
        interfaceLanguage: "ko",
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      ImageResize.configure({ allowBase64: true }),
      Placeholder.configure({ placeholder: placeholder }),
      Indent,
      CustomCodeBlockLowlight,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    console.log(init);
    if (init) {
      editor?.commands.setContent("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init]);

  if (!editor) return null;

  return (
    <div className={styles.editorBox}>
      {isVisibleToolbar && <Toolbar editor={editor} />}
      <EditorContent
        editor={editor}
        className={className}
        name="contents"
        minLength={5}
        required
      />
    </div>
  );
};

export default Editor;
