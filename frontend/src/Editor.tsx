import { useEffect, useRef } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { indentWithTab } from "@codemirror/commands";
import { python } from "@codemirror/lang-python";
import { basicSetup } from "codemirror";
import { syntaxHighlighting } from "@codemirror/language";
import { pythonHighlighter } from "./python-highlighting";
export function Editor({
  value,
  onChange,
  onRun,
  name,
}: {
  value: string;
  onChange: (s: string) => void;
  onRun: () => void;
  name: string;
}) {
  const host = useRef<HTMLDivElement>(null),
    view = useRef<EditorView | null>(null),
    callbacks = useRef({ onChange, onRun });
  callbacks.current = { onChange, onRun };
  useEffect(() => {
    if (!host.current) return;
    const editor = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          ...(name.endsWith(".py")
            ? [python(), syntaxHighlighting(pythonHighlighter)]
            : []),
          keymap.of([
            indentWithTab,
            {
              key: "Mod-Enter",
              run: () => {
                callbacks.current.onRun();
                return true;
              },
            },
          ]),
          EditorView.contentAttributes.of({
            "aria-label": "Code editor: " + name,
            spellcheck: "false",
          }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged)
              callbacks.current.onChange(update.state.doc.toString());
          }),
          EditorView.theme({
            "&": { height: "100%", fontSize: "14px" },
            ".cm-scroller": {
              overflow: "auto",
              fontFamily: 'Consolas, "Courier New", monospace',
              lineHeight: "1.85",
            },
            ".cm-content": { padding: "22px 0" },
            ".cm-gutters": {
              background: "#f7fbff",
              color: "#879eae",
              border: "none",
            },
            ".cm-activeLine": { background: "transparent" },
            "& .cm-selectionLayer .cm-selectionBackground": {
              backgroundColor: "#d0e1ee",
            },
            "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":
              {
                backgroundColor: "#acd2ec",
              },
            ".cm-activeLineGutter": { background: "#e8f1f8" },
            "&.cm-focused": { outline: "none" },
            ".cm-line": { padding: "0 20px" },
          }),
        ],
      }),
    });
    view.current = editor;
    return () => {
      editor.destroy();
      view.current = null;
    };
  }, [name]);
  useEffect(() => {
    const editor = view.current;
    if (editor && editor.state.doc.toString() !== value)
      editor.dispatch({
        changes: { from: 0, to: editor.state.doc.length, insert: value },
      });
  }, [value]);
  return <div className="editor-host" ref={host} />;
}
