export function CourseIcon({ slug }: { slug: string }) {
  return (
    <svg
      className={`course-symbol course-icon-${slug}`}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {slug === "python" ? (
        <>
          <path
            fill="currentColor"
            d="M20 3c-8 0-10 2-10 6v5h10v2H8c-5 0-6 4-6 9s2 8 6 8h2v-7c0-5 3-8 8-8h8c3 0 5-2 5-5V9c0-4-3-6-11-6Zm-5 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
            fillRule="evenodd"
            transform="translate(2 0) scale(.95)"
          />
          <path
            fill="currentColor"
            d="M20 3c-8 0-10 2-10 6v5h10v2H8c-5 0-6 4-6 9s2 8 6 8h2v-7c0-5 3-8 8-8h8c3 0 5-2 5-5V9c0-4-3-6-11-6Zm-5 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
            fillRule="evenodd"
            transform="translate(38 40) rotate(180) scale(.95)"
          />
        </>
      ) : slug === "csharp" ? (
        <g
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m20 3 15 8.5v17L20 37 5 28.5v-17Z" />
          <path d="M22 13a8 8 0 1 0 0 14M27 15l-2 10m6-10-2 10m-6-7h10m-11 4h10" />
        </g>
      ) : (
        <g
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 7h17l-1.5 22L10.5 33l-7-4ZM21 7h17l-1.5 22L29.5 33l-7-4Z" />
          <path d="M14.5 12h-8l.5 7h7l-.5 7-3 1-3-1-.2-3M25 12h9l-.4 7H27m6.6 0-.6 7-3.5 1-3-1-.2-3" />
        </g>
      )}
    </svg>
  );
}
