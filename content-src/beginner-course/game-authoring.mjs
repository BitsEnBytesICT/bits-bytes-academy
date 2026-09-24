import { focus } from "./focused.mjs";
import { call } from "./authoring.mjs";
import { courtMain, preview } from "../complete-course/game-support.mjs";
export { courtMain };
export function gameLesson(chapter, slug, s) {
  const main = courtMain(s.preview);
  return focus(chapter, slug, {
    ...s,
    runtime: "pygame",
    minutes: s.minutes || 18,
    sections: [preview, ...(s.sections || [])],
    starter: { "main.py": main, "game.py": "import pygame\n\n" + s.starter },
    solution: { "main.py": main, "game.py": "import pygame\n\n" + s.solution },
    tasks: s.tasks.map((t) => ({
      ...t,
      check: "_rendered_frames > 0",
      probes: t.cases.map(([args, check, options = {}]) =>
        call(t.name, args, `(${check}) and _error is None`, {
          module: "game",
          ...options,
        }),
      ),
    })),
  });
}
