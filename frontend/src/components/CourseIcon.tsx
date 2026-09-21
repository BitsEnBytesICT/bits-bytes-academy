const courseIcons: Record<string, string[]> = {
  python: ["python"],
  csharp: ["csharp"],
  "html-css": ["html5", "css3"],
};

export function CourseIcon({ slug }: { slug: string }) {
  return (
    <span className={`course-symbol course-icon-${slug}`} aria-hidden="true">
      {(courseIcons[slug] ?? []).map((icon) => (
        <img
          key={icon}
          src={`/images/courses/${icon}.svg`}
          width="40"
          height="40"
          alt=""
          draggable={false}
        />
      ))}
    </span>
  );
}
