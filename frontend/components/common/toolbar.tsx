"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Editor } from "@tiptap/react";

import styles from "./toolbar.module.scss";

import EditorInputModal, { ModalItem } from "./editorInputModal";

import { postBoardImage } from "@/api/board";
import { useParams } from "next/navigation";

type ToolbarProps = {
  editor: Editor;
};

const Toolbar = ({ editor }: ToolbarProps) => {
  const param = useParams();
  const boardId = param.boardId;

  const linkKeys = useMemo(() => ["url", "text"], []);
  const [isVisibleLinkModal, setIsVisibleLinkModal] = useState<boolean>(false);
  const [linkItems, setLinkItems] = useState<ModalItem[]>([
    {
      key: linkKeys[0],
      title: "URL",
      value: "",
      placeholder: "URL 입력",
    },
    {
      key: linkKeys[1],
      title: "Text",
      value: "",
      placeholder: "대체할 텍스트 입력",
    },
  ]);

  const youtubeKeys = useMemo(() => ["width", "height", "url"], []);
  const [isVisibleYoutubeModal, setIsVisibleYoutubeModal] =
    useState<boolean>(false);
  const [youtubeItems, setYoutubeItems] = useState<ModalItem[]>([
    {
      key: youtubeKeys[0],
      title: "너비",
      value: "320",
      placeholder: "너비 입력",
      type: "number",
    },
    {
      key: youtubeKeys[1],
      title: "높이",
      value: "180",
      placeholder: "높이 입력",
      type: "number",
    },
    {
      key: youtubeKeys[2],
      title: "URL",
      value: "",
      placeholder: "Yotubue URL 입력",
    },
  ]);

  const tableKeys = useMemo(() => ["row", "cell"], []);
  const [isVisibleTableModal, setIsVisibleTableModal] =
    useState<boolean>(false);
  const [tableItems, setTableItems] = useState<ModalItem[]>([
    {
      key: tableKeys[0],
      title: "Row",
      value: "1",
      placeholder: "Row 입력",
      type: "number",
    },
    {
      key: tableKeys[1],
      title: "Column",
      value: "1",
      placeholder: "Column 입력",
      type: "number",
    },
  ]);

  const imageKeys = useMemo(() => ["url", "file"], []);
  const [isVisibleImageModal, setIsVisibleImageModal] =
    useState<boolean>(false);
  const [imageItems, setImageItems] = useState<ModalItem[]>([
    {
      key: imageKeys[0],
      title: "URL",
      value: "",
      placeholder: "이미지 URL 입력",
    },
    {
      key: imageKeys[1],
      title: "파일 선택",
      value: "",
      placeholder: "",
      type: "file",
    },
  ]);

  const changeValue = useCallback(
    (key: string, list: any[], value: string | File) => {
      const findedIdx = list.findIndex((val) => val.key === key);
      const newItems = [...list];
      newItems[findedIdx].value = value;

      return newItems;
    },
    [],
  );

  const handleLinkModal = useCallback(() => {
    setIsVisibleLinkModal((prev) => !prev);
  }, []);

  const handleLink = useCallback(
    (key: string, changedVal: string) => {
      const newItems = changeValue(key, linkItems, changedVal);
      setLinkItems(newItems);
    },
    [linkItems, changeValue],
  );

  const setLink = useCallback(() => {
    setIsVisibleLinkModal(false);
    if (!linkItems[0].value || !linkItems[1].value) return;

    const { state } = editor;
    const { selection } = state;
    const { from, to } = selection;
    const { $from } = selection;

    const isTextSelected = from < to;
    const nodeAtSelection = $from.node();
    let tr;

    // 드래그 한 후 텍스트 선택 시
    if (
      nodeAtSelection &&
      nodeAtSelection.type.name !== "codeBlock" &&
      isTextSelected
    ) {
      const href = linkItems[0].value;
      const text = linkItems[1].value;

      tr = state.tr.deleteSelection();
      tr = state.tr.insertText(text as string);

      const linkMarkType = state.schema.marks.link;
      const linkMark = linkMarkType.create({ href: href });
      // 새로 넣은 텍스트 시작 위치(from)부터 끝 위치(to)를 링크로 변경
      tr = tr.addMark(from, from + (text as string).length, linkMark);

      editor.view.dispatch(tr);
    } else if (nodeAtSelection.type.name !== "codeBlock") {
      editor
        .chain()
        .focus()
        .setLink({
          href: linkItems[0].value as string,
        })
        .insertContent(linkItems[1].value as string)
        .run();
    }

    const newLinkItems = [...linkItems];
    newLinkItems[0].value = "";
    newLinkItems[1].value = "";

    setLinkItems(newLinkItems);
  }, [editor, linkItems]);

  const handleYoutubeModal = useCallback(() => {
    setIsVisibleYoutubeModal((prev) => !prev);
  }, []);

  const handleYoutube = useCallback(
    (key: string, changedVal: string) => {
      const newItems = changeValue(key, youtubeItems, changedVal);
      setYoutubeItems(newItems);
    },
    [youtubeItems, changeValue],
  );

  const setYoutube = useCallback(() => {
    editor.commands.setYoutubeVideo({
      src: youtubeItems[2].value as string,
      width: !isNaN(Number(youtubeItems[0].value))
        ? Number(youtubeItems[0].value)
        : 320,
      height: !isNaN(Number(youtubeItems[1].value))
        ? Number(youtubeItems[1].value)
        : 180,
    });

    const newYoutubeItems = [...youtubeItems];
    newYoutubeItems[0].value = "320";
    newYoutubeItems[1].value = "180";
    newYoutubeItems[2].value = "";

    setYoutubeItems(newYoutubeItems);
    setIsVisibleYoutubeModal(false);
  }, [editor, youtubeItems]);

  const handleTableModal = useCallback(() => {
    setIsVisibleTableModal((prev) => !prev);
  }, []);

  const handleTable = useCallback(
    (key: string, changedVal: string) => {
      const newItems = changeValue(key, tableItems, changedVal);
      setTableItems(newItems);
    },
    [tableItems, changeValue],
  );

  const setTable = useCallback(() => {
    const rows = !isNaN(Number(tableItems[0].value))
      ? Number(tableItems[0].value)
      : 1;
    const cols = !isNaN(Number(tableItems[1].value))
      ? Number(tableItems[1].value)
      : 1;
    if (rows <= 0 || cols <= 0) return;

    editor.commands.insertTable({
      rows: rows,
      cols: cols,
      withHeaderRow: false,
    });

    const newTableItems = [...tableItems];
    newTableItems[0].value = "1";
    newTableItems[1].value = "1";

    setTableItems(newTableItems);
    setIsVisibleTableModal(false);
  }, [editor.commands, tableItems]);

  const handleImageModal = useCallback(() => {
    setIsVisibleImageModal((prev) => !prev);
  }, []);

  const handleImage = useCallback(
    (key: string, changedVal: string) => {
      const newItems = changeValue(key, imageItems, changedVal);
      setImageItems(newItems);
    },
    [imageItems, changeValue],
  );

  const setImage = useCallback(async () => {
    const url = imageItems[0].value;
    const file = imageItems[1].value;

    if (file && typeof file === "object") {
      // upload 후 src 받아서 처리
      // await postBoardImage(boardId, file);
      editor.commands.setImage({ src: URL.createObjectURL(file) });
    } else {
      editor.commands.setImage({ src: url as string });
    }

    const newImageItems = [...imageItems];
    newImageItems[0].value = "";
    newImageItems[1].value = "";

    setImageItems(newImageItems);
    setIsVisibleImageModal(false);
  }, [boardId, imageItems, param, editor.commands]);

  const handleImageFile = useCallback(
    (key: string, file: File) => {
      const newItems = changeValue(key, imageItems, file);
      setImageItems(newItems);
      setIsVisibleImageModal(false);
      setImage();
    },
    [imageItems, setImage, changeValue],
  );

  return (
    <div className={styles.toolbar}>
      <div className={styles.itemBox}>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.h1} ${
            editor.isActive("heading", { level: 2 }) ? styles.active : null
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.h2} ${
            editor.isActive("heading", { level: 3 }) ? styles.active : null
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
        />
      </div>
      <div className={styles.line} />
      <div className={styles.itemBox}>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.bold} ${
            editor.isActive("bold") ? styles.active : null
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.italic} ${
            editor.isActive("italic") ? styles.active : null
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.underline} ${
            editor.isActive("underline") ? styles.active : null
          }`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.strike} ${
            editor.isActive("strike") ? styles.active : null
          }`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        />
      </div>
      <div className={`${styles.line} `} />
      <div className={styles.itemBox}>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.bulleted} ${
            editor.isActive("bulletList") ? styles.active : null
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.numbered} ${
            editor.isActive("orderedList") ? styles.active : null
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
      </div>
      <div className={styles.line} />
      <div className={styles.itemBox}>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.quote} ${
            editor.isActive("blockquote") ? "is-active" : null
          }`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <div className={styles.modalBox}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${styles.link} ${
              editor.isActive("link") ? styles.active : null
            }`}
            onClick={handleLinkModal}
          />
          <EditorInputModal
            isVisible={isVisibleLinkModal}
            items={linkItems}
            closeVisible={handleLinkModal}
            onChange={handleLink}
            onSubmit={setLink}
          />
        </div>
        <div className={styles.modalBox}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${styles.image}`}
            onClick={handleImageModal}
          />
          <EditorInputModal
            isVisible={isVisibleImageModal}
            items={imageItems}
            closeVisible={handleImageModal}
            onChange={handleImage}
            onChangeFile={handleImageFile}
            onSubmit={setImage}
          />
        </div>
        <div className={styles.modalBox}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${styles.youtube}`}
            onClick={handleYoutubeModal}
          />
          <EditorInputModal
            isVisible={isVisibleYoutubeModal}
            items={youtubeItems}
            closeVisible={handleYoutubeModal}
            onChange={handleYoutube}
            onSubmit={setYoutube}
          />
        </div>
        <div className={styles.modalBox}>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${styles.table}`}
            onClick={handleTableModal}
          />
          <EditorInputModal
            isVisible={isVisibleTableModal}
            items={tableItems}
            closeVisible={handleTableModal}
            onChange={handleTable}
            onSubmit={setTable}
          />
        </div>
        <button
          type="button"
          className={`${styles.toolbarBtn} ${styles.newline}`}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </div>
    </div>
  );
};

export default Toolbar;
