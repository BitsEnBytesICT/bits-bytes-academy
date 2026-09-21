import fs from "node:fs";
import path from "node:path";
const src = path.resolve("content-src");
for (const name of fs
  .readdirSync(src)
  .filter((n) => /^\d.*\.mjs$/.test(n))
  .sort())
  await import(new URL("../content-src/" + name, import.meta.url));
const { blueprint, activities } = await import("../content-src/helpers.mjs");
const course = {
  version: 1,
  title: { en: "Python Lab", nl: "Python Lab" },
  chapters: blueprint.chapters.map((c) => ({ ...c, activityIds: [] })),
  activities: [],
  groups: [],
};
for (const c of course.chapters) {
  const coreGroups = blueprint.lessonGroups
    .filter((g) => g.chapter === c.number)
    .map((g) => g.slug);
  const matching = activities.filter((a) => a.chapter === c.number);
  for (const activity of matching)
    activity.estimatedMinutes =
      activity.kind === "quiz"
        ? activity.questions.length
        : activity.kind === "reading"
          ? 2
          : activity.kind === "challenge"
            ? 10
            : 6;
  matching.sort((a, b) => {
    let ga = coreGroups.indexOf(a.group),
      gb = coreGroups.indexOf(b.group);
    if (ga < 0) ga = 999;
    if (gb < 0) gb = 999;
    return ga - gb;
  });
  course.activities.push(...matching);
  for (const activity of matching) {
    const id = `${c.number}:${activity.group}`;
    let group = course.groups.find((group) => group.id === id);
    if (!group) {
      const meta = blueprint.lessonGroups.find(
        (group) => group.slug === activity.group,
      );
      group = {
        id,
        chapter: c.number,
        title: meta ? { en: meta.title, nl: meta.title } : c.title,
        activityIds: [],
      };
      course.groups.push(group);
    }
    group.activityIds.push(activity.id);
  }
  c.activityIds = matching.map((a) => a.id);
  const dir = path.resolve(
    "content/chapters",
    String(c.number).padStart(2, "0") + "-" + c.slug,
  );
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "chapter.json"), JSON.stringify(c, null, 2));
  for (const a of matching)
    fs.writeFileSync(
      path.join(dir, a.id + ".json"),
      JSON.stringify(a, null, 2),
    );
}
const ids = course.activities.map((a) => a.id);
if (ids.length !== new Set(ids).size) throw Error("Duplicate activity IDs");
fs.mkdirSync("content", { recursive: true });
fs.writeFileSync("content/course.json", JSON.stringify(course, null, 2));
console.log(
  `${course.activities.length} activities written in ${course.chapters.length} chapters.`,
);
