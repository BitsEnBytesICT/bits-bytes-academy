import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import type {
  Activity,
  Course,
  CourseSummary,
  Exercise,
  Language,
  Progress,
  Quiz,
  State,
  Workspace,
} from "../../shared/types";
import { api, WorkspaceStore } from "./api";
import { recordLessonRun } from "./lesson-progress";
import { CreateFileForm } from "./components/CreateFileForm";
const Editor = lazy(() =>
  import("./Editor").then((module) => ({ default: module.Editor })),
);
import { PythonRunner } from "./runtime";
import { GameRunner } from "./game-runtime";
import { Icon } from "./Icon";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { CourseOverview } from "./components/CourseOverview";
import { LessonPane } from "./components/LessonPane";
import { ProjectPane } from "./components/ProjectPane";
import { ReadingPane } from "./components/ReadingPane";
import { ArchivePage } from "./components/ArchivePage";
import { LessonNavigation } from "./components/LessonNavigation";
import { displayConsolePrompt } from "./console-prompt";
import { CurriculumDrawer } from "./components/CurriculumDrawer";
import { Terminal } from "./components/Terminal";
import { GamePane } from "./components/GamePane";
import { CodeBlock } from "./components/CodeBlock";
import { SolutionDiff } from "./components/SolutionDiff";
import { CodeBlankQuestion } from "./components/CodeBlankQuestion";
import { createQuizState, isCorrect, usesBlanks } from "./quiz-answers";
import "./styles.css";
import "./redesign.css";
import "./quiz-blanks.css";

function shuffle<T>(values: T[]): T[] {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function App() {
  const [catalog, setCatalog] = useState<CourseSummary[]>([]);
  const [course, setCourse] = useState<Course | null>(null),
    [state, setState] = useState<State>({
      progress: {},
      settings: {},
      unlocks: [],
    }),
    [language, setLanguage] = useState<Language>("en");
  const [active, setActive] = useState<Activity | null>(null),
    [files, setFiles] = useState<Record<string, string>>({}),
    [file, setFile] = useState("main.py"),
    [quizState, setQuizState] = useState<Workspace["quiz"]>();
  const [projectMilestones, setProjectMilestones] = useState<string[]>([]);
  const [executionKind, setExecutionKind] = useState<"run" | "console">("run");
  const [drawer, setDrawer] = useState(false),
    [saveStatus, setSaveStatus] = useState("saved"),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  const [output, setOutput] = useState<{ text: string; channel: string }[]>([]),
    [runStatus, setRunStatus] = useState("idle"),
    [results, setResults] = useState<Record<string, boolean>>({}),
    [consolePrompt, setConsolePrompt] = useState(">>>");
  const [modal, setModal] = useState<
      | "settings"
      | "solution"
      | "reset"
      | "import"
      | "finish"
      | "new-file"
      | "copy-project"
      | null
    >(null),
    [pendingJump, setPendingJump] = useState<Activity | null>(null),
    [backup, setBackup] = useState<any>(null),
    [backupSummary, setBackupSummary] = useState<any>(null),
    [widths, setWidths] = useState([360, 360]),
    [mobileTab, setMobileTab] = useState("learn");
  const store = useRef(new WorkspaceStore()),
    runner = useRef(new PythonRunner()),
    gameRunner = useRef(new GameRunner()),
    gamePreview = useRef<HTMLDivElement>(null),
    saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined),
    activeRef = useRef<Activity | null>(null),
    executing = useRef(false),
    dialogRef = useRef<HTMLDivElement>(null),
    navToken = useRef(0);
  const location = useLocation(),
    navigate = useNavigate();
  const isLesson = location.pathname.startsWith("/learn/");
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  const text = (x: { en: string; nl: string }) => x[language];
  const progress = active
    ? state.progress[active.id] || { complete: false }
    : { complete: false };
  const busy = [
    "loading",
    "running",
    "input",
    "paused",
    "finishing",
    "grading",
  ].includes(runStatus);
  useEffect(() => {
    store.current.status = setSaveStatus;
    Promise.all([
      api<Course>("/course"),
      api<State>("/state"),
      api<CourseSummary[]>("/courses"),
    ])
      .then(([c, s, catalog]) => {
        setCatalog(catalog);
        setCourse(c);
        setState(s);
        setLanguage(s.settings.language || "en");
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
    return () => {
      runner.current.cancel();
      gameRunner.current.cancel();
    };
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const scheduleSave = () => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(
      () => void store.current.save().catch((e) => setError(e.message)),
      500,
    );
  };
  const editFiles = (next: Record<string, string>) => {
    setFiles(next);
    store.current.edit({ files: next });
    scheduleSave();
  };
  const updateQuiz = (next: NonNullable<Workspace["quiz"]>) => {
    setQuizState(next);
    store.current.edit({ quiz: next });
    scheduleSave();
  };
  const markProgress = async (id: string, value: Progress) => {
    const saved = await api<Progress>("/progress/" + id, value, "PUT");
    setState((s) => ({ ...s, progress: { ...s.progress, [id]: saved } }));
    return saved;
  };
  useEffect(() => {
    if (!course) return;
    const token = ++navToken.current;
    clearTimeout(saveTimer.current);
    runner.current.cancel();
    gameRunner.current.cancel();
    executing.current = false;
    activeRef.current = null;
    setActive(null);
    setDrawer(false);
    setOutput([]);
    setResults({});
    setConsolePrompt(">>>");
    setRunStatus("idle");
    setLoading(true);
    setError("");
    void (async () => {
      try {
        await store.current.save();
        if (token !== navToken.current) return;
        if (!isLesson) {
          setLoading(false);
          return;
        }
        const id = decodeURIComponent(
          location.pathname.slice("/learn/".length),
        );
        const activity = course.activities.find((a) => a.id === id);
        if (!activity) {
          navigate("/archive/" + encodeURIComponent(id), { replace: true });
          return;
        }
        const workspace = await store.current.load(
          activity.id,
          activity.kind === "quiz" ? {} : activity.files,
        );
        if (token !== navToken.current) return;
        activeRef.current = activity;
        setActive(activity);
        setFiles(workspace.files);
        setFile(
          Object.hasOwn(workspace.files, "main.py")
            ? "main.py"
            : Object.keys(workspace.files)[0] || "main.py",
        );
        setQuizState(workspace.quiz);
        setProjectMilestones(workspace.project?.milestones || []);
        setLoading(false);
        setState((s) => ({
          ...s,
          settings: { ...s.settings, lastActivity: activity.id },
        }));
        void api("/settings", { lastActivity: activity.id }, "PATCH").catch(
          (e) => setError(e.message),
        );
      } catch (e) {
        setError((e as Error).message);
        setLoading(false);
      }
    })();
  }, [course, location.pathname]);
  // Drafts are written synchronously to local storage on each edit, so closing a tab needs no prompt.
  useEffect(() => {
    if (!modal && !pendingJump) return;
    const previous = document.activeElement as HTMLElement | null;
    const elements = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not(:disabled), input, select, a[href], [tabindex="0"]',
        ) || [],
      );
    elements()[0]?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModal(null);
        setPendingJump(null);
      }
      if (event.key === "Tab") {
        const items = elements(),
          first = items[0],
          last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
      previous?.focus();
    };
  }, [modal, pendingJump]);
  const appendOutput = (text: string, channel = "stdout") =>
    setOutput((previous) => {
      const next = [...previous];
      const last = next[next.length - 1];
      if (last?.channel === channel)
        next[next.length - 1] = { channel, text: last.text + text };
      else next.push({ channel, text });
      let size = next.reduce((n, line) => n + line.text.length, 0);
      while (size > 1048576 && next.length > 1)
        size -= next.shift()!.text.length;
      if (next[0]?.text.length > 1048576)
        next[0] = { ...next[0], text: next[0].text.slice(-1048576) };
      return next;
    });
  const startPython = async (kind: "run" | "console", line = "") => {
    const a = activeRef.current;
    if (!a || a.kind === "quiz" || executing.current) return;
    executing.current = true;
    setExecutionKind(kind);
    const engine = a.runtime === "pygame" ? gameRunner.current : runner.current;
    const token = navToken.current,
      sessionBeforeSave = engine.runId;
    setRunStatus("loading");
    setError("");
    if (kind === "run") {
      setResults({});
      setConsolePrompt(">>>");
      appendOutput("> python main.py\n", "command");
    }
    try {
      await store.current.save();
      if (token !== navToken.current || engine.runId !== sessionBeforeSave)
        return;
      const revision = store.current.generation;
      engine.onEvent = (event) => {
        if (token !== navToken.current || activeRef.current?.id !== a.id)
          return;
        if (event.type === "output")
          appendOutput(event.text || "", event.channel);
        if (
          [
            "loading",
            "running",
            "input",
            "resume",
            "paused",
            "finishing",
            "grading",
          ].includes(event.type)
        )
          setRunStatus(event.type === "resume" ? "running" : event.type);
        if (event.type === "watchdog")
          appendOutput((event.message || "") + "\n", "stderr");
        if (event.type === "done" || event.type === "console-done") {
          executing.current = false;
          const result = event.result!;
          setRunStatus(result.error ? "error" : "done");
          setConsolePrompt(result.syntax === "incomplete" ? "..." : ">>>");
          if (result.display != null) appendOutput(result.display + "\n");
          if (store.current.generation !== revision) {
            setError(
              tr(
                "Your code changed during execution. Run it again to check the latest version.",
                "Je code veranderde tijdens het uitvoeren. Voer de nieuwste versie opnieuw uit.",
              ),
            );
            return;
          }
          if (
            JSON.stringify(result.files) !==
            JSON.stringify(store.current.current.files)
          )
            editFiles(result.files);
          if (event.type === "done" && a.kind !== "project") {
            const checks = result.results || [];
            setResults(Object.fromEntries(checks.map((r) => [r.id, r.passed])));
            void markProgress(
              a.id,
              recordLessonRun(state.progress[a.id], a.checkpoints, checks),
            ).catch((e) => setError(e.message));
            void api("/attempts/" + a.id, {
              type: "run",
              results: checks,
              error: result.error,
            }).catch((e) => setError(e.message));
          }
        }
        if (event.type === "failure" || event.type === "cancelled") {
          executing.current = false;
          setRunStatus("error");
          setConsolePrompt(">>>");
          appendOutput(
            (event.message || "Execution stopped.") + "\n",
            "stderr",
          );
        }
      };
      if (a.runtime === "pygame") {
        if (!gamePreview.current)
          throw new Error(
            tr(
              "The game preview is not ready. Try again.",
              "Het spelvoorbeeld is nog niet gereed. Probeer opnieuw.",
            ),
          );
        if (kind === "run") {
          setMobileTab("terminal");
          gameRunner.current.execute(
            gamePreview.current,
            { ...store.current.current.files },
            a.kind === "project" ? [] : a.checkpoints,
          );
        } else
          gameRunner.current.command(
            gamePreview.current,
            { ...store.current.current.files },
            line,
          );
      } else if (kind === "run")
        runner.current.execute(
          { ...store.current.current.files },
          a.checkpoints,
        );
      else runner.current.command({ ...store.current.current.files }, line);
    } catch (e) {
      if (token === navToken.current) {
        executing.current = false;
        setError((e as Error).message);
        setRunStatus("error");
      }
    }
  };
  const run = () => startPython("run");
  const stop = () => {
    runner.current.cancel();
    gameRunner.current.cancel();
    executing.current = false;
    setRunStatus("error");
    setConsolePrompt(">>>");
    appendOutput(
      "^C\n" +
        tr(
          "Execution stopped. The console session has been reset.",
          "Uitvoering gestopt. De consolesessie is opnieuw gestart.",
        ) +
        "\n",
      "stderr",
    );
  };
  const command = (line: string) => {
    if (executing.current) return;
    if (
      consolePrompt === ">>>" &&
      ["python main.py", "/run"].includes(line.trim())
    ) {
      void run();
      return;
    }
    if (
      consolePrompt === ">>>" &&
      ["/clear", "clear", "cls"].includes(line.trim())
    ) {
      setOutput([]);
      return;
    }
    if (consolePrompt === ">>>") {
      const cmd = line.trim();
      let reply: string | undefined;
      if (["ls", "dir"].includes(cmd))
        reply = Object.keys(files).join("\n") + "\n";
      else if (cmd === "pwd") reply = "/home/pyodide/workspace\n";
      else if (cmd === "/help")
        reply = tr(
          "Python expressions and statements run here.\npython main.py / /run: run and check your solution\nls / dir: list lesson files\npwd: show the workspace folder\ncat filename / type filename: read a lesson file\nclear / cls / /clear: clear the terminal\n/reset: reset Python variables\n",
          "Hier voer je Python-expressies en opdrachten uit.\npython main.py / /run: voer je oplossing uit en controleer deze\nls / dir: toon lesbestanden\npwd: toon de werkruimtemap\ncat bestandsnaam / type bestandsnaam: lees een lesbestand\nclear / cls / /clear: wis de terminal\n/reset: herstel de Python-variabelen\n",
        );
      else if (/^(cat|type)\s+/.test(cmd)) {
        const name = cmd
          .replace(/^(cat|type)\s+/, "")
          .replace(/^(["'])(.*)\1$/, "$2");
        reply = Object.hasOwn(files, name)
          ? files[name] + (files[name].endsWith("\n") ? "" : "\n")
          : tr("File not found: ", "Bestand niet gevonden: ") + name + "\n";
      }
      if (reply !== undefined) {
        appendOutput("> " + line + "\n", "command");
        appendOutput(reply);
        return;
      }
    }
    if (consolePrompt === ">>>" && line.trim() === "/reset") {
      runner.current.cancel();
      gameRunner.current.cancel();
      setConsolePrompt(">>>");
      setRunStatus("idle");
      appendOutput(
        tr(
          "Console reset. Saved files are unchanged.\n",
          "Console opnieuw gestart. Opgeslagen bestanden zijn behouden.\n",
        ),
        "command",
      );
      return;
    }
    appendOutput(
      displayConsolePrompt(consolePrompt) + " " + line + "\n",
      "command",
    );
    void startPython("console", line);
  };
  const sendInput = (line: string | null) => {
    try {
      if (
        activeRef.current &&
        activeRef.current.kind !== "quiz" &&
        activeRef.current.runtime === "pygame"
      )
        gameRunner.current.input(line);
      else runner.current.input(line);
      appendOutput(line === null ? "^D\n" : line + "\n", "stdin");
      setRunStatus("running");
    } catch (e) {
      setError((e as Error).message);
    }
  };
  const navigatePage = async (path: string) => {
    try {
      await store.current.save();
      navigate(path);
    } catch (e) {
      setError((e as Error).message);
    }
  };
  const unlocked = (a: Activity) => {
    if (
      !course ||
      a.optional ||
      state.unlocks.includes(a.id) ||
      state.progress[a.id]?.complete
    )
      return true;
    const index = course.activities.findIndex((x) => x.id === a.id);
    return course.activities
      .slice(0, index)
      .filter((x) => !x.optional)
      .every((x) => state.progress[x.id]?.complete);
  };
  const go = async (a: Activity, force = false) => {
    setDrawer(false);
    if (!force && !unlocked(a)) {
      setPendingJump(a);
      return;
    }
    try {
      await store.current.save();
      if (force) {
        const unlocks = await api<string[]>("/unlocks/" + a.id, {});
        setState((s) => ({ ...s, unlocks }));
      }
      setPendingJump(null);
      setMobileTab("learn");
      navigate("/learn/" + a.id);
    } catch (e) {
      setError((e as Error).message);
    }
  };
  const next = async () => {
    if (!course || !active) return;
    if (!state.progress[active.id]?.complete) return;
    try {
      const index = course.activities.findIndex((a) => a.id === active.id);
      const target = course.activities[index + 1];
      if (target) await go(target, true);
      else setModal("finish");
    } catch (e) {
      setError((e as Error).message);
    }
  };
  const changeLanguage = (next: Language) => {
    setLanguage(next);
    void api("/settings", { language: next }, "PATCH").catch((e) =>
      setError(e.message),
    );
  };
  const download = (name: string, data: string, type = "text/plain") => {
    const url = URL.createObjectURL(new Blob([data], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const newQuiz = () => {
    if (active?.kind !== "quiz") return;
    updateQuiz(createQuizState(active, quizState?.attempt || 0, shuffle));
  };
  useEffect(() => {
    if (active?.kind === "quiz" && !quizState && !loading) newQuiz();
  }, [active, loading]);
  if (!course)
    return (
      <main className="boot">
        <img
          className="brand-logo"
          src="/images/LogoBits.jpeg"
          alt="Bits & Bytes"
        />
        <h1>Python Lab</h1>
        <p>{error || "Preparing your learning space…"}</p>
        {error && (
          <button onClick={() => window.location.reload()}>Retry</button>
        )}
      </main>
    );
  const completed = course.activities.filter(
      (a) => !a.optional && state.progress[a.id]?.complete,
    ).length,
    total = course.activities.filter((a) => !a.optional).length,
    pct = Math.round((completed / total) * 100),
    chapter = course.chapters.find((c) => c.number === active?.chapter);
  const index = course.activities.findIndex((a) => a.id === active?.id);
  const a = active;
  const exercise = a && a.kind !== "quiz" ? a : null;
  const quizView = () => {
    if (a?.kind !== "quiz" || !quizState) return null;
    const q = a.questions[quizState.index],
      chosen = quizState.answers[q.id],
      finished = quizState.finished,
      correct = a.questions.filter((q) => isCorrect(q, quizState)).length;
    const finish = async () => {
      if (quizState.index < a.questions.length - 1) {
        updateQuiz({ ...quizState, index: quizState.index + 1 });
        return;
      }
      const score = Math.floor((correct / a.questions.length) * 100);
      updateQuiz({ ...quizState, finished: true });
      await store.current.save();
      await markProgress(a.id, { complete: true, score });
      await api("/attempts/" + a.id, {
        type: "quiz",
        score,
        answers: quizState.answers,
        attempt: quizState.attempt,
        format: quizState.format,
      });
    };
    return (
      <div
        className="quiz-scroll"
        key={a.id + quizState.index + String(finished)}
      >
        <div className="quiz-content">
          <span className="eyebrow">
            {tr("KNOWLEDGE CHECK", "KENNISCHECK")} · {text(chapter!.title)}
          </span>
          <h1>
            {finished
              ? tr(
                  "Look how far you’ve come.",
                  "Kijk eens wat je hebt geleerd.",
                )
              : text(a.title)}
          </h1>
          {finished ? (
            <>
              <div className="score-card">
                <div className="score-ring">
                  {Math.floor((correct / a.questions.length) * 100)}
                  <small>%</small>
                </div>
                <div>
                  <h2>{tr("Quiz complete", "Quiz afgerond")}</h2>
                  <p>
                    {correct} {tr("correct", "goed")} ·{" "}
                    {a.questions.length - correct}{" "}
                    {tr("to revisit", "om te herhalen")}
                  </p>
                  <p>
                    {tr("Best score", "Beste score")}:{" "}
                    {state.progress[a.id]?.best || 0}%
                  </p>
                </div>
                <button className="secondary" onClick={newQuiz}>
                  <Icon name="reset" />
                  {tr("Try again", "Opnieuw proberen")}
                </button>
              </div>
              <h2>{tr("Review your answers", "Bekijk je antwoorden")}</h2>
              {a.questions.map((question, i) => (
                <details className="review-question" key={question.id}>
                  <summary>
                    <span
                      className={
                        isCorrect(question, quizState) ? "good" : "bad"
                      }
                    >
                      {isCorrect(question, quizState) ? "✓" : "×"}
                    </span>{" "}
                    {i + 1}.{" "}
                    {text(
                      usesBlanks(question, quizState)
                        ? question.codeBlank!.prompt
                        : question.prompt,
                    )}
                  </summary>
                  {usesBlanks(question, quizState) ? (
                    <CodeBlankQuestion
                      question={question}
                      state={quizState}
                      language={language}
                      review
                    />
                  ) : (
                    <>
                      {question.code && <CodeBlock code={question.code} />}
                      <p>
                        {tr("Your answer", "Jouw antwoord")}:{" "}
                        {text(
                          question.choices.find(
                            (c) => c.id === quizState.answers[question.id],
                          )!.label,
                        )}
                      </p>
                      <p>
                        {tr("Correct answer", "Goed antwoord")}:{" "}
                        <strong>
                          {text(
                            question.choices.find(
                              (c) => c.id === question.answer,
                            )!.label,
                          )}
                        </strong>
                      </p>
                      <p>
                        {text(
                          question.choices.find(
                            (c) => c.id === quizState.answers[question.id],
                          )!.reason,
                        )}
                      </p>
                    </>
                  )}
                </details>
              ))}
            </>
          ) : (
            <>
              <div className="question-meta">
                <span>
                  {tr("Question", "Vraag")} {quizState.index + 1} /{" "}
                  {a.questions.length}
                </span>
                <span>
                  {Math.round(
                    (Object.keys(quizState.answers).length /
                      a.questions.length) *
                      100,
                  )}
                  %
                </span>
              </div>
              <div className="progress-track">
                <i
                  style={{
                    width:
                      (Object.keys(quizState.answers).length /
                        a.questions.length) *
                        100 +
                      "%",
                  }}
                />
              </div>
              <h2 className="question-prompt">
                {text(
                  usesBlanks(q, quizState) ? q.codeBlank!.prompt : q.prompt,
                )}
              </h2>
              {usesBlanks(q, quizState) ? (
                <CodeBlankQuestion
                  question={q}
                  state={quizState}
                  language={language}
                  update={updateQuiz}
                />
              ) : (
                <>
                  {q.code && <CodeBlock className="quiz-code" code={q.code} />}
                  <div className="choices">
                    {(
                      quizState.orders[quizState.index] ||
                      q.choices.map((c) => c.id)
                    ).map((id, i) => {
                      const choice = q.choices.find((c) => c.id === id)!;
                      return (
                        <button
                          key={id}
                          className={
                            "choice " +
                            (chosen
                              ? id === q.answer
                                ? "correct"
                                : id === chosen
                                  ? "incorrect"
                                  : "muted"
                              : "")
                          }
                          disabled={!!chosen}
                          onClick={() =>
                            updateQuiz({
                              ...quizState,
                              answers: { ...quizState.answers, [q.id]: id },
                            })
                          }
                        >
                          <span className="choice-letter">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span>{text(choice.label)}</span>
                          {chosen && id === q.answer && <Icon name="check" />}
                        </button>
                      );
                    })}
                  </div>
                  {chosen && (
                    <div
                      className={
                        "quiz-feedback " +
                        (chosen === q.answer ? "good" : "bad")
                      }
                      role="status"
                    >
                      <strong>
                        {chosen === q.answer
                          ? tr("That’s right.", "Dat klopt.")
                          : tr(
                              "Not quite — here’s why.",
                              "Nog niet helemaal — dit is waarom.",
                            )}
                      </strong>
                      <p>
                        {text(q.choices.find((c) => c.id === chosen)!.reason)}
                      </p>
                    </div>
                  )}
                </>
              )}
              <div className="quiz-next">
                <button
                  className="primary"
                  disabled={!chosen}
                  onClick={() =>
                    void finish().catch((e) => setError(e.message))
                  }
                >
                  {quizState.index === a.questions.length - 1
                    ? tr("See results", "Bekijk resultaat")
                    : tr("Next question", "Volgende vraag")}
                  <Icon name="arrow" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  const resize = (which: number, start: React.PointerEvent) => {
    start.preventDefault();
    const x = start.clientX,
      initial = widths[which];
    const move = (e: PointerEvent) =>
      setWidths((w) =>
        w.map((v, i) =>
          i === which
            ? Math.max(
                280,
                Math.min(
                  540,
                  initial + (e.clientX - x) * (which === 0 ? 1 : -1),
                ),
              )
            : v,
        ),
      );
    const end = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", end);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", end);
  };
  return (
    <div className="app">
      <Header
        language={language}
        onLanguage={changeLanguage}
        onHome={() => void navigatePage("/")}
        lessonNavigation={
          isLesson && a ? (
            <LessonNavigation
              activity={a}
              course={course}
              state={state}
              language={language}
              onCurriculum={() => setDrawer(true)}
              onActivity={(activity) => void go(activity)}
            />
          ) : undefined
        }
      />
      {error && (
        <div className="error-banner" role="alert">
          <span>{error}</span>
          <button onClick={() => setError("")} aria-label="Close">
            <Icon name="close" size={15} />
          </button>
        </div>
      )}
      {!isLesson ? (
        location.pathname === "/archive" ||
        location.pathname.startsWith("/archive/") ? (
          <ArchivePage
            key={location.pathname}
            language={language}
            id={
              location.pathname.startsWith("/archive/")
                ? decodeURIComponent(location.pathname.slice(9))
                : undefined
            }
            onOpen={(id) =>
              void navigatePage("/archive/" + encodeURIComponent(id))
            }
            onBack={() =>
              void navigatePage(
                location.pathname === "/archive" ? "/" : "/archive",
              )
            }
          />
        ) : catalog.find((c) => location.pathname === "/courses/" + c.slug) ? (
          <CourseOverview
            summary={
              catalog.find((c) => location.pathname === "/courses/" + c.slug)!
            }
            course={course}
            state={state}
            language={language}
            onBack={() => void navigatePage("/")}
            onStart={() => {
              const target =
                course.activities.find(
                  (a) => a.id === state.settings.lastActivity,
                ) || course.activities[0];
              void go(target, true);
            }}
            onActivity={(a) => void go(a)}
          />
        ) : (
          <HomePage
            courses={catalog}
            language={language}
            progress={pct}
            onOpen={(slug) => void navigatePage("/courses/" + slug)}
            onManage={() => setModal("settings")}
          />
        )
      ) : !a ? (
        <div className="loading-state">
          {loading
            ? tr("Opening your workspace…", "Je werkruimte wordt geopend…")
            : tr(
                "Could not open this activity.",
                "Deze activiteit kon niet worden geopend.",
              )}
        </div>
      ) : (
        <>
          <div className="mobile-nav">
            {a.kind === "reading" && a.presentation === "article" ? (
              <button className="selected">{tr("Reading", "Leesles")}</button>
            ) : a.kind === "quiz" ? (
              <>
                <button className="selected">Quiz</button>
                <button onClick={() => setDrawer(true)}>Curriculum</button>
              </>
            ) : (
              ["learn", "code", "terminal"].map((item) => (
                <button
                  key={item}
                  className={mobileTab === item ? "selected" : ""}
                  onClick={() => setMobileTab(item)}
                >
                  {item === "learn"
                    ? tr("Learn", "Leren")
                    : item === "code"
                      ? "Code"
                      : "Terminal"}
                </button>
              ))
            )}
          </div>
          <main
            className={
              "workspace " +
              (a?.kind === "quiz"
                ? "quiz-layout"
                : a.kind === "reading" && a.presentation === "article"
                  ? "article-layout"
                  : "") +
              " mobile-" +
              mobileTab
            }
            style={
              {
                "--left": widths[0] + "px",
                "--right": widths[1] + "px",
              } as React.CSSProperties
            }
          >
            {a.kind === "reading" && a.presentation === "article" ? (
              <ReadingPane
                key={a.id}
                activity={a}
                language={language}
                complete={progress.complete}
                onComplete={async () => {
                  try {
                    await markProgress(a.id, { complete: true });
                  } catch (e) {
                    setError((e as Error).message);
                  }
                }}
              />
            ) : a.kind === "project" ? (
              <ProjectPane
                key={a.id}
                activity={a}
                course={course}
                language={language}
                milestones={projectMilestones}
                complete={progress.complete}
                onMilestones={(milestones) => {
                  setProjectMilestones(milestones);
                  store.current.edit({ project: { milestones } });
                  scheduleSave();
                }}
                onComplete={async () => {
                  try {
                    await store.current.save();
                    await markProgress(a.id, { complete: true });
                  } catch (e) {
                    setError((e as Error).message);
                  }
                }}
                onActivity={(activity) => void go(activity)}
                onCopy={
                  a.continueFrom ? () => setModal("copy-project") : undefined
                }
              />
            ) : (
              <LessonPane
                activity={a}
                course={course}
                language={language}
                progress={progress}
                results={results}
              />
            )}
            {a.kind === "reading" &&
            a.presentation === "article" ? null : a?.kind === "quiz" ? (
              quizView()
            ) : (
              <>
                <div
                  className="resize-handle"
                  role="separator"
                  aria-label="Resize instructions"
                  aria-orientation="vertical"
                  tabIndex={0}
                  onPointerDown={(e) => resize(0, e)}
                  onKeyDown={(e) => {
                    if (["ArrowLeft", "ArrowRight"].includes(e.key))
                      setWidths((w) => [
                        Math.max(
                          280,
                          Math.min(
                            540,
                            w[0] + (e.key === "ArrowRight" ? 20 : -20),
                          ),
                        ),
                        w[1],
                      ]);
                  }}
                />
                <section className="code-pane">
                  <div className="file-tabs">
                    {Object.keys(files).map((name) => (
                      <button
                        key={name}
                        onClick={() => setFile(name)}
                        className={file === name ? "active" : ""}
                      >
                        <span className="file-icon">
                          {name.endsWith(".py") ? (
                            <img
                              src="/images/courses/python.svg"
                              width="16"
                              height="16"
                              alt=""
                              aria-hidden="true"
                            />
                          ) : (
                            "≡"
                          )}
                        </span>
                        {name}
                      </button>
                    ))}
                    <button
                      className="add-file"
                      title={tr("Create a file", "Maak een bestand")}
                      onClick={() => setModal("new-file")}
                    >
                      +
                    </button>
                  </div>
                  <div className="editor-meta">
                    <span>
                      <span className={"save-dot " + saveStatus} />
                      {saveStatus === "saved"
                        ? tr("All changes saved", "Alle wijzigingen opgeslagen")
                        : saveStatus === "saving"
                          ? tr("Saving…", "Opslaan…")
                          : saveStatus === "conflict"
                            ? tr(
                                "Save conflict — reload",
                                "Opslagconflict — herlaad",
                              )
                            : saveStatus === "error"
                              ? tr(
                                  "Save failed — local draft kept",
                                  "Opslaan mislukt — lokale versie bewaard",
                                )
                              : saveStatus === "recovered"
                                ? tr("Draft recovered", "Concept hersteld")
                                : tr(
                                    "Unsaved changes",
                                    "Niet-opgeslagen wijzigingen",
                                  )}
                    </span>
                    <button
                      onClick={() => setModal("reset")}
                      className="icon-button"
                      title={tr("Reset code", "Code herstellen")}
                    >
                      <Icon name="reset" size={15} />
                    </button>
                  </div>
                  {loading ? (
                    <div className="loading-state">
                      {tr(
                        "Opening your workspace…",
                        "Je werkruimte wordt geopend…",
                      )}
                    </div>
                  ) : (
                    <Suspense
                      fallback={
                        <div className="loading-state">
                          {tr("Opening editor…", "Editor openen…")}
                        </div>
                      }
                    >
                      <Editor
                        key={a?.id + ":" + file}
                        name={file}
                        value={files[file] || ""}
                        onChange={(value) => {
                          if (store.current.current.files[file] !== value)
                            editFiles({
                              ...store.current.current.files,
                              [file]: value,
                            });
                        }}
                        onRun={() => void run()}
                      />
                    </Suspense>
                  )}
                  <div className="editor-toolbar">
                    <button
                      className="primary run-button"
                      disabled={loading || busy}
                      onClick={() => void run()}
                    >
                      <Icon name="play" size={15} />
                      {tr("Run code", "Code uitvoeren")}
                    </button>
                    <span className="shortcut">Ctrl ↵</span>
                    {busy && (
                      <button className="stop-button" onClick={stop}>
                        <Icon name="stop" size={14} />
                        {tr("Stop", "Stop")}
                      </button>
                    )}
                    {a.kind !== "project" && (
                      <button
                        className="solution-button"
                        onClick={() => setModal("solution")}
                        disabled={loading}
                      >
                        {tr("View solution", "Bekijk oplossing")}
                      </button>
                    )}
                  </div>
                </section>
                <div
                  className="resize-handle"
                  role="separator"
                  aria-label="Resize terminal"
                  aria-orientation="vertical"
                  tabIndex={0}
                  onPointerDown={(e) => resize(1, e)}
                  onKeyDown={(e) => {
                    if (["ArrowLeft", "ArrowRight"].includes(e.key))
                      setWidths((w) => [
                        w[0],
                        Math.max(
                          280,
                          Math.min(
                            540,
                            w[1] + (e.key === "ArrowLeft" ? 20 : -20),
                          ),
                        ),
                      ]);
                  }}
                />
                {a.runtime === "pygame" ? (
                  <GamePane
                    key={a.id}
                    previewRef={gamePreview}
                    project={a.kind === "project"}
                    previewRunning={executionKind === "run"}
                    output={output}
                    status={runStatus}
                    prompt={consolePrompt}
                    language={language}
                    onCommand={command}
                    onInput={sendInput}
                    onStop={stop}
                    onClear={() => setOutput([])}
                    onFinish={() => gameRunner.current.finish()}
                    onResume={() => gameRunner.current.resume()}
                  />
                ) : (
                  <Terminal
                    key={a.id}
                    output={output}
                    status={runStatus}
                    prompt={consolePrompt}
                    language={language}
                    onCommand={command}
                    onInput={sendInput}
                    onStop={stop}
                    onClear={() => setOutput([])}
                  />
                )}
              </>
            )}
          </main>
          <footer className="bottom-bar">
            <button
              className="back-button"
              disabled={index <= 0 || loading}
              onClick={() => void go(course.activities[index - 1], true)}
            >
              <Icon name="back" size={15} />
              {tr("Back", "Terug")}
            </button>
            <div className="footer-center">
              {runStatus === "error" ? (
                tr(
                  "Check the terminal, then try again.",
                  "Bekijk de terminal en probeer opnieuw.",
                )
              ) : Object.values(results).some((passed) => !passed) ? (
                tr(
                  "Some checks need another try.",
                  "Probeer de openstaande checks opnieuw.",
                )
              ) : a?.kind === "quiz" && !quizState?.finished ? (
                tr("One question at a time", "Eén vraag tegelijk")
              ) : progress.complete ? (
                <>
                  <span className="good">
                    <Icon name="check" size={17} />
                  </span>
                  {progress.assisted
                    ? tr(
                        "Completed with a solution",
                        "Afgerond met een oplossing",
                      )
                    : tr(
                        "Nicely done. Keep going!",
                        "Goed gedaan. Ga zo door!",
                      )}
                </>
              ) : (
                <>
                  {a?.kind === "quiz"
                    ? tr("One question at a time", "Eén vraag tegelijk")
                    : ""}
                </>
              )}
            </div>
            <span className="activity-position">
              {index + 1} / {course.activities.length}
            </span>
            <button
              className="next-button"
              disabled={loading || !progress.complete}
              onClick={() => void next()}
            >
              {index === course.activities.length - 1
                ? tr("Finish", "Afronden")
                : tr("Continue", "Verder")}
              <Icon name="arrow" size={15} />
            </button>
          </footer>
        </>
      )}
      {drawer && (
        <CurriculumDrawer
          course={course}
          state={state}
          active={active}
          language={language}
          onClose={() => setDrawer(false)}
          onOverview={() => {
            setDrawer(false);
            void navigatePage("/courses/python");
          }}
          onActivity={(activity) => void go(activity)}
          unlocked={unlocked}
        />
      )}
      {(modal || pendingJump) && (
        <div
          className="modal-backdrop"
          onClick={() => {
            setModal(null);
            setPendingJump(null);
          }}
        >
          <div
            className={"modal " + (modal === "solution" ? "wide" : "")}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={tr("Course options", "Cursusopties")}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              autoFocus
              className="modal-close icon-button"
              onClick={() => {
                setModal(null);
                setPendingJump(null);
              }}
              aria-label={tr("Close", "Sluiten")}
            >
              <Icon name="close" />
            </button>
            {pendingJump ? (
              <>
                <span className="eyebrow">
                  {tr("CHOOSE YOUR PACE", "KIES JE EIGEN TEMPO")}
                </span>
                <h2>
                  {tr("Jump to this activity?", "Naar deze activiteit gaan?")}
                </h2>
                <p>{text(pendingJump.title)}</p>
                <p>
                  {tr(
                    "Earlier activities will stay incomplete. You can return to them at any time.",
                    "Eerdere activiteiten blijven onafgerond. Je kunt er altijd naar terug.",
                  )}
                </p>
                <button
                  className="primary"
                  onClick={() => void go(pendingJump, true)}
                >
                  {tr("Jump here", "Ga hierheen")}
                  <Icon name="arrow" />
                </button>
              </>
            ) : modal === "new-file" ? (
              <CreateFileForm
                files={files}
                language={language}
                onCreate={(name) => {
                  editFiles({ ...files, [name]: "" });
                  setFile(name);
                  setModal(null);
                  setError("");
                }}
              />
            ) : modal === "copy-project" &&
              a?.kind === "project" &&
              a.continueFrom ? (
              <>
                <h2>
                  {tr("Copy your saved Pong?", "Je opgeslagen Pong kopiëren?")}
                </h2>
                <p>
                  {tr(
                    "This replaces the files in this optional extension. Your original Pong project stays unchanged.",
                    "Dit vervangt de bestanden in deze optionele uitbreiding. Je oorspronkelijke Pong-project blijft ongewijzigd.",
                  )}
                </p>
                <button
                  className="primary"
                  onClick={() =>
                    void (async () => {
                      const targetId = a.id,
                        token = navToken.current;
                      await store.current.save();
                      const source = await api<Workspace | null>(
                        "/workspaces/" + a.continueFrom,
                      );
                      if (
                        token !== navToken.current ||
                        activeRef.current?.id !== targetId
                      )
                        return;
                      if (!source || !Object.keys(source.files).length)
                        throw new Error(
                          tr(
                            "No saved Pong files yet. Save your Pong project first.",
                            "Nog geen opgeslagen Pong-bestanden. Sla eerst je Pong-project op.",
                          ),
                        );
                      runner.current.cancel();
                      gameRunner.current.cancel();
                      executing.current = false;
                      setRunStatus("idle");
                      setConsolePrompt(">>>");
                      setOutput([]);
                      setResults({});
                      editFiles({ ...source.files });
                      setFile(
                        Object.hasOwn(source.files, "main.py")
                          ? "main.py"
                          : Object.keys(source.files)[0],
                      );
                      await store.current.save();
                      setModal(null);
                    })().catch((e) => setError(e.message))
                  }
                >
                  {tr("Copy files", "Bestanden kopiëren")}
                </button>
              </>
            ) : modal === "finish" ? (
              <>
                <span className="eyebrow">PYTHON LAB</span>
                <h2>
                  {completed === total
                    ? tr(
                        "You completed the course.",
                        "Je hebt de cursus afgerond.",
                      )
                    : tr(
                        "You reached the final page.",
                        "Je bent bij de laatste pagina.",
                      )}
                </h2>
                <p>
                  {completed} / {total}{" "}
                  {tr(
                    "required activities complete. Your progress is saved. Return to the curriculum to revisit any unfinished activities or try optional challenges.",
                    "verplichte activiteiten afgerond. Je voortgang is opgeslagen. Ga terug naar het curriculum om openstaande activiteiten of optionele oefeningen te doen.",
                  )}
                </p>
                <button
                  className="primary"
                  onClick={() => {
                    setModal(null);
                    setDrawer(true);
                  }}
                >
                  {tr("Open curriculum", "Open curriculum")}
                </button>
              </>
            ) : modal === "settings" ? (
              <>
                <span className="eyebrow">PYTHON LAB</span>
                <h2>{tr("Manage learning data", "Beheer leergegevens")}</h2>
                <h3>{tr("Your learning, saved", "Je leerwerk, opgeslagen")}</h3>
                <button
                  className="text-button"
                  onClick={() => {
                    setModal(null);
                    void navigatePage("/archive");
                  }}
                >
                  {tr(
                    "Open original-course saved work",
                    "Open opgeslagen werk uit de oorspronkelijke cursus",
                  )}
                </button>
                <p>
                  {tr(
                    "Your code, results, and preferences are saved on this computer. Export a backup to take them with you.",
                    "Je code, resultaten en voorkeuren worden op deze computer opgeslagen. Exporteer een back-up om ze mee te nemen.",
                  )}
                </p>
                <button
                  className="secondary"
                  onClick={() =>
                    void (async () => {
                      await store.current.save();
                      const data = await api("/backup");
                      download(
                        "python-lab-backup.json",
                        JSON.stringify(data, null, 2),
                        "application/json",
                      );
                    })().catch((e) => setError(e.message))
                  }
                >
                  <Icon name="download" />
                  {tr("Export backup", "Back-up exporteren")}
                </button>
                <label className="import-label">
                  {tr("Import backup", "Back-up importeren")}
                  <input
                    type="file"
                    accept="application/json,.json"
                    onChange={(e) =>
                      void (async () => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        const data = JSON.parse(await f.text());
                        const summary = await api("/backup/preview", data);
                        setBackup(data);
                        setBackupSummary(summary);
                        setModal("import");
                      })().catch((e) => setError(e.message))
                    }
                  />
                </label>
                <small>
                  {tr(
                    "Original Python course · No videos or separate projects.",
                    "Originele Python-cursus · Geen video’s of losse projecten.",
                  )}
                </small>
              </>
            ) : modal === "import" ? (
              <>
                <h2>
                  {tr("Restore this backup?", "Deze back-up herstellen?")}
                </h2>
                <p>
                  {backupSummary?.completed}{" "}
                  {tr("completed activities", "afgeronde activiteiten")} ·{" "}
                  {backupSummary?.workspaces}{" "}
                  {tr("saved workspaces", "opgeslagen werkruimtes")}
                </p>
                <p>
                  {tr(
                    "This replaces current progress. A copy of your current data will be saved before the import.",
                    "Dit vervangt je huidige voortgang. Voor het importeren wordt een kopie van je huidige gegevens opgeslagen.",
                  )}
                </p>
                <button
                  className="primary"
                  onClick={() =>
                    void api("/backup/restore", backup)
                      .then(() => {
                        for (const key of Object.keys(localStorage))
                          if (key.startsWith("python-lab-draft:"))
                            localStorage.removeItem(key);
                        window.location.reload();
                      })
                      .catch((e) => setError(e.message))
                  }
                >
                  {tr("Restore backup", "Back-up herstellen")}
                </button>
              </>
            ) : modal === "reset" ? (
              <>
                <h2>{tr("Start with a clean page?", "Opnieuw beginnen?")}</h2>
                <p>
                  {tr(
                    "This restores the starter files for this activity. Your completed progress and attempt history stay saved.",
                    "Dit herstelt de startbestanden van deze activiteit. Je voortgang en eerdere pogingen blijven bewaard.",
                  )}
                </p>
                <button
                  className="primary"
                  onClick={() => {
                    if (exercise) {
                      runner.current.cancel();
                      gameRunner.current.cancel();
                      executing.current = false;
                      setRunStatus("idle");
                      setConsolePrompt(">>>");
                      editFiles({ ...exercise.files });
                      setFile("main.py");
                      setOutput([]);
                      setResults({});
                      setModal(null);
                    }
                  }}
                >
                  {tr("Reset files", "Bestanden herstellen")}
                </button>
              </>
            ) : exercise ? (
              <>
                <span className="eyebrow">
                  {tr("A HELPING HAND", "EEN HELPENDE HAND")}
                </span>
                <h2>{tr("One way to solve it", "Eén mogelijke oplossing")}</h2>
                <p>
                  {exercise.solutionNote
                    ? text(exercise.solutionNote)
                    : tr(
                        "Compare this approach with your own code.",
                        "Vergelijk deze aanpak met je eigen code.",
                      )}
                </p>
                <SolutionDiff
                  files={files}
                  solution={exercise.solution}
                  language={language}
                />
                <div className="modal-actions">
                  <button className="secondary" onClick={() => setModal(null)}>
                    {tr("Keep my code", "Mijn code behouden")}
                  </button>
                  <button
                    className="primary"
                    onClick={() =>
                      void (async () => {
                        runner.current.cancel();
                        gameRunner.current.cancel();
                        executing.current = false;
                        setRunStatus("idle");
                        setConsolePrompt(">>>");
                        editFiles({ ...exercise.files, ...exercise.solution });
                        setFile("main.py");
                        setResults({});
                        await store.current.save();
                        await markProgress(exercise.id, {
                          complete: !!state.progress[exercise.id]?.complete,
                          assisted: true,
                          checkpoints:
                            state.progress[exercise.id]?.checkpoints || [],
                        });
                        setModal(null);
                      })().catch((e) => setError(e.message))
                    }
                  >
                    {tr("Use solution", "Oplossing gebruiken")}
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
const root = createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
if (import.meta.hot) import.meta.hot.dispose(() => root.unmount());
