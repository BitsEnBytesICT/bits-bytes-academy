import { focus } from "./focused.mjs";
import { call, local } from "./authoring.mjs";
export function functionPractice(chapter, slug, s) {
  const signature = `${s.name}(${s.params})`;
  return focus(chapter, slug, {
    ...s,
    starter:
      s.starter ??
      (s.guidance === "independent"
        ? ""
        : `def ${signature}:\n    # Complete this function.\n    return None\n`),
    solution: `def ${signature}:\n${s.body
      .split("\n")
      .map((line) => "    " + line)
      .join("\n")}\n`,
    tasks: [
      {
        task: [
          `Write ${signature} in main.py. ${local(s.task).en}`,
          `Schrijf ${signature} in main.py. ${local(s.task).nl}`,
        ],
        check: s.check || `callable(${s.name})`,
        help: s.help,
        fragment: s.fragment,
        probes: s.cases.map(([args, check]) =>
          call(s.name, args, `(${check}) and _error is None`),
        ),
      },
    ],
  });
}
