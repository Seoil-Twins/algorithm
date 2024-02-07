import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";

import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import json from "highlight.js/lib/languages/json";
import md from "highlight.js/lib/languages/markdown";
import bash from "highlight.js/lib/languages/bash";

lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("javascript", js);
lowlight.registerLanguage("jsx", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("tsx", ts);
lowlight.registerLanguage("typescript", ts);
lowlight.registerLanguage("json", json);
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("xml", html);
lowlight.registerLanguage("md", md);
lowlight.registerLanguage("markdown", md);
lowlight.registerLanguage("bash", bash);
lowlight.registerLanguage("python", python);
lowlight.registerLanguage("cpp", cpp);

const CustomCodeBlockLowlight = CodeBlockLowlight.extend({
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        const { state } = this.editor;
        const { selection } = state;
        const { from, to } = selection;
        const { $from } = selection;

        // 현재 선택 영역의 노드 가져오기
        const nodeAtSelection = $from.node();

        if (nodeAtSelection && nodeAtSelection.type.name === "codeBlock") {
          let tr;
          // 텍스트가 드래그되었는지 확인
          const isTextSelected = selection.from < selection.to;

          if (isTextSelected) {
            tr = state.tr.insertText("    ", from);
          } else {
            tr = state.tr.insertText("    ", from, to);
          }

          this.editor.view.dispatch(tr);
          return true;
        }

        return false;
      },
    };
  },
}).configure({
  lowlight,
});

export default CustomCodeBlockLowlight;
