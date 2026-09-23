import { parser } from "@lezer/python";
import { highlightTree, tagHighlighter, tags } from "@lezer/highlight";

// The editor and read-only examples use the same parser and token classes.
export const pythonHighlighter = tagHighlighter([
  { tag: tags.keyword, class: "py-keyword" },
  { tag: tags.comment, class: "py-comment" },
  { tag: tags.string, class: "py-string" },
  { tag: tags.number, class: "py-number" },
  { tag: [tags.bool, tags.null], class: "py-constant" },
  {
    tag: [tags.function(tags.variableName), tags.definition(tags.variableName)],
    class: "py-function",
  },
  { tag: [tags.typeName, tags.className], class: "py-type" },
  { tag: tags.special(tags.variableName), class: "py-builtin" },
  { tag: tags.operator, class: "py-operator" },
  { tag: tags.variableName, class: "py-variable" },
  { tag: tags.punctuation, class: "py-punctuation" },
  { tag: tags.escape, class: "py-escape" },
]);

export type CodeToken = { text: string; className?: string };
export function pythonTokens(code: string): CodeToken[] {
  const result: CodeToken[] = [];
  let position = 0;
  highlightTree(
    parser.parse(code),
    pythonHighlighter,
    (from, to, className) => {
      if (from > position) result.push({ text: code.slice(position, from) });
      result.push({ text: code.slice(from, to), className });
      position = to;
    },
  );
  if (position < code.length) result.push({ text: code.slice(position) });
  return result;
}

export function codeLines(code: string, python = true): CodeToken[][] {
  if (!code) return [];
  const lines: CodeToken[][] = [[]];
  for (const token of python ? pythonTokens(code) : [{ text: code }]) {
    token.text.split("\n").forEach((text, index) => {
      if (index) lines.push([]);
      if (text) lines.at(-1)!.push({ ...token, text });
    });
  }
  if (code.endsWith("\n")) lines.pop();
  return lines;
}
