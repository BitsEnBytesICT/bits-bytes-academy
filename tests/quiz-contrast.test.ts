import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const luminance = (hex: string) => {
  const c = hex
    .replace("#", "")
    .match(/../g)!
    .map((v) => parseInt(v, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
};
const contrast = (a: string, b: string) => {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
};
test("Every syntax category and fallback meets WCAG 4.5:1 on the dark quiz surface", () => {
  const css = fs.readFileSync("frontend/src/styles.css", "utf8");
  const surface = css.match(/\.python-code\.quiz-code\s*\{([^}]+)\}/)![1];
  const background = surface.match(/background:\s*(#[0-9a-f]{6})/)![1];
  const fallback = surface.match(/color:\s*(#[0-9a-f]{6})/)![1];
  assert(contrast(background, fallback) >= 4.5);
  const rules = [
    ...css.matchAll(
      /((?:\.quiz-code \.py-[\w-]+(?:, )?)+)\s*\{ color: (#[0-9a-f]{6}); \}/g,
    ),
  ];
  const covered = new Set(
    rules.flatMap((r) => [...r[1].matchAll(/py-([\w-]+)/g)].map((m) => m[1])),
  );
  for (const name of [
    "keyword",
    "comment",
    "string",
    "number",
    "constant",
    "function",
    "type",
    "builtin",
    "operator",
    "variable",
    "punctuation",
    "escape",
  ])
    assert(covered.has(name), name);
  for (const [, selector, colour] of rules)
    assert(
      contrast(background, colour) >= 4.5,
      `${selector}: ${contrast(background, colour)}`,
    );
});
test("Blank, review and token surfaces keep readable text in every state", () => {
  const component = fs.readFileSync(
    "frontend/src/components/CodeBlankQuestion.tsx",
    "utf8",
  );
  assert(component.includes("quiz-code blank-program"));
  assert(component.includes('code={blankCode(q)} className="quiz-code"'));
  const css = fs.readFileSync("frontend/src/quiz-blanks.css", "utf8");
  for (const selector of [
    ".code-slot",
    ".code-slot.correct",
    ".code-slot.incorrect",
    ".code-token",
    ".code-token.used",
  ]) {
    const block = css
      .split("}")
      .find((part) => part.includes(selector + " {") && /color:/.test(part))!;
    const colour = block.match(/color:\s*(#[0-9a-f]{6})/)![1];
    const background = block.match(/background:\s*(#[0-9a-f]{6}|white)/)![1];
    assert(
      contrast(colour, background === "white" ? "#ffffff" : background) >= 4.5,
      selector,
    );
  }
});
