import { useEffect, useRef, useState, useId } from "react";
import type { ReactNode } from "react";
import type { Language } from "../../../shared/types";
export function Flag({ language }: { language: Language }) {
  const clipId = useId();
  return language === "nl" ? (
    <svg className="flag" viewBox="0 0 30 20" aria-hidden="true">
      <path fill="#ae1c28" d="M0 0h30v7H0z" />
      <path fill="#fff" d="M0 7h30v6H0z" />
      <path fill="#21468b" d="M0 13h30v7H0z" />
    </svg>
  ) : (
    <svg className="flag" viewBox="0 0 30 20" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d="M0 0h30v20H0z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path fill="#012169" d="M0 0h30v20H0z" />
        <path stroke="#fff" strokeWidth="5" d="m0 0 30 20M30 0 0 20" />
        <path stroke="#c8102e" strokeWidth="2" d="m0 0 30 20M30 0 0 20" />
        <path stroke="#fff" strokeWidth="7" d="M15 0v20M0 10h30" />
        <path stroke="#c8102e" strokeWidth="4" d="M15 0v20M0 10h30" />
      </g>
    </svg>
  );
}
export function Header({
  language,
  onLanguage,
  onHome,
  lessonNavigation,
}: {
  language: Language;
  onLanguage: (language: Language) => void;
  onHome: () => void;
  lessonNavigation?: ReactNode;
}) {
  const [open, setOpen] = useState(false),
    menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!menu.current?.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <header
      className={"topbar" + (lessonNavigation ? " has-lesson-navigation" : "")}
    >
      <button
        className="brand"
        onClick={onHome}
        aria-label={language === "nl" ? "Naar cursussen" : "Go to courses"}
      >
        <img
          className="brand-logo"
          src="/images/bits-bytes-mark.png"
          alt="Bits & Bytes"
        />
      </button>
      {lessonNavigation}
      <div ref={menu} className="language-picker">
        <button
          className="language"
          aria-label={language === "nl" ? "Kies taal" : "Choose language"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Flag language={language} />
          {language === "nl" ? "Nederlands" : "English"}
          <span>⌄</span>
        </button>
        {open && (
          <div className="language-menu" role="group" aria-label="Language">
            {(["en", "nl"] as Language[]).map((value) => (
              <button
                key={value}
                aria-pressed={value === language}
                onClick={() => {
                  onLanguage(value);
                  setOpen(false);
                }}
              >
                <Flag language={value} />
                {value === "en" ? "English" : "Nederlands"}
                <span>{value === language ? "✓" : ""}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
