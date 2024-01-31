"use client";

import React from "react";
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
  onChange: (value: string) => void;
};

const Editor = ({
  value,
  isVisibleToolbar = true,
  placeholder,
  className,
  onChange,
}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
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

  if (!editor) return null;

  return (
    <div className={styles.editorBox}>
      {isVisibleToolbar && <Toolbar editor={editor} />}
      <EditorContent editor={editor} className={className} />
    </div>
  );
};

export default Editor;
