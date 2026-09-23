export type FileNameError =
  | "empty"
  | "invalid"
  | "duplicate"
  | "limit"
  | "python-module";
const pythonKeywords = new Set(
  "False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(
    " ",
  ),
);

export function newFileError(
  name: string,
  files: Record<string, string>,
): FileNameError | null {
  if (!name) return "empty";
  if (name.length > 100 || !/^[a-zA-Z0-9_][a-zA-Z0-9_.-]*$/.test(name))
    return "invalid";
  if (Object.hasOwn(files, name)) return "duplicate";
  if (Object.keys(files).length >= 40) return "limit";
  if (name.endsWith(".py")) {
    const module = name.slice(0, -3);
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(module) || pythonKeywords.has(module))
      return "python-module";
  }
  return null;
}
