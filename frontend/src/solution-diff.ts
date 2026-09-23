import { diffLines } from "diff";

export type DiffLine = { number: number; kind: "same" | "removed" | "added" };
export type DiffRow = { left?: DiffLine; right?: DiffLine };

export function compareLines(before: string, after: string): DiffRow[] {
  const normalizedBefore = before.replace(/\r\n/g, "\n");
  const normalizedAfter = after.replace(/\r\n/g, "\n");
  const count = (text: string) =>
    text ? text.split("\n").length - Number(text.endsWith("\n")) : 0;
  const changes = diffLines(normalizedBefore, normalizedAfter, {
    timeout: 100,
  }) ?? [
    {
      removed: true,
      added: false,
      count: count(normalizedBefore),
      value: normalizedBefore,
    },
    {
      removed: false,
      added: true,
      count: count(normalizedAfter),
      value: normalizedAfter,
    },
  ];
  const rows: DiffRow[] = [];
  let left = 1,
    right = 1;
  for (let index = 0; index < changes.length; index++) {
    const change = changes[index];
    if (!change.removed && !change.added) {
      for (let i = 0; i < change.count; i++)
        rows.push({
          left: { number: left++, kind: "same" },
          right: { number: right++, kind: "same" },
        });
    } else {
      const removed = change.removed ? change.count : 0;
      const addition =
        change.removed && changes[index + 1]?.added
          ? changes[++index]
          : change.added
            ? change
            : null;
      const added = addition?.count ?? 0;
      for (let i = 0; i < Math.max(removed, added); i++)
        rows.push({
          ...(i < removed
            ? { left: { number: left++, kind: "removed" as const } }
            : {}),
          ...(i < added
            ? { right: { number: right++, kind: "added" as const } }
            : {}),
        });
    }
  }
  return rows;
}
