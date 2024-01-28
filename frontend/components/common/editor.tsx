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

import styles from "./editor.module.scss";

import { Indent } from "@/utils/editor/intent";
import CustomCodeBlockLowlight from "@/utils/editor/codeBlockIndent";

import Toolbar from "./toolbar";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const Editor = ({ value, onChange }: EditorProps) => {
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
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  );
};

export default Editor;
