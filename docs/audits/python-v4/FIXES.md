# Changes following the Python v4 audit

The original [audit](README.md), [198-activity ledger](activity-by-activity.md) and `evidence.json` describe commit `beec730`. They are retained as historical findings. This document describes the corrections; `verification.json` records the new regression results.

## What changed

| Finding | Resolution |
| --- | --- |
| F01: hidden normalisation variable | Check the requested input, `choice` and printed result. Both direct chaining and intermediate variables work. |
| F02: instruction 1 needs instruction 2 | Repeated-input step 1 accepts a complete loop before the final Done message. Step 2 checks that message separately. A finished first-run program still passes both. |
| F03: missing function interfaces | Function briefs explicitly name the signature and file, including `with_count(items)` and `pack_groups(items, size)`. Both have concrete ordinary/empty examples. |
| F04: invisible or untestable functions | Safe call-and-print panels expose observable results. Interactive function probes isolate definitions from demonstration calls. Panels are omitted when extra output would violate the existing task. Mini-project reports and class callers show state. |
| F05: hidden implementation restrictions | Break accepts different prompt wording. Lamp, Bag and Pet mutation methods may return useful values unless a return contract is explicitly required. Input substitution supports grouped assignments. |
| F06: weak checks | Added changed Boolean-output cases, deterministic seeded random comparisons, exact-energy and changed-representation pet cases, and named-construct checks for powers, range, unpacking and managed UTF-8 reading. |
| F07: rerun-dependent file checks | File probes use their own complete text/CSV/JSON fixtures, isolated from learner-generated files. Normal Run still reads and saves the learner's real workspace. |
| F08: overstated evidence | Incidental practice tags no longer become checkpoint assessment tags automatically. Explicit contracts distinguish required contributions from supplied drawing/event code; new exercises assess rendering/blitting, event dispatch, both format styles, empty mappings/update, and keys/values. The manifest separately lists independent application. |
| F09: gaps before projects | Added a complete conversion session before the calculator and five practical graphics/game exercises before Pong. Project readiness links and responsibility maps connect them. There are still two main projects and six mini projects. |
| F10: arbitrary recall | Recall is placed at a later lesson using the source concept. Cards include the code they refer to. Other topics go to a clearly optional, individually expandable review library; the final local-development article has no recall pile-up. |
| F11: quiz precision and retries | Corrected the three factual/editorial errors, replaced copied prior-quiz items with changed recall scenarios, and varied several retries by boundary/state/branch. Incorrect completion feedback is generated from executed snippets, including their error or actual output. |
| F12: experiments precede requirements | Required instructions come before a clearly labelled, collapsed optional experiment. Three-level hints and sequential locks remain. |
| F13: pacing/support | Added bilingual traces for Boolean boundaries, loops, calls/defaults, nested data, file position and classes; concrete file/report examples; visible early accomplishments. Estimates remain provisional. Actual beginner sessions are still needed. |

### New required practice

1. Module 10: `converter-session` — read, retry, validate, return, display and repeat in a complete non-calculator conversation.
2. Module 15: `event-wiring` — handle real event objects, including events without a key.
3. Module 15: `render-label` — render text and blit it into a scene; actual pixels are checked.
4. Module 16: `two-controls` — simultaneous keys, elapsed time and boundary clamping.
5. Module 16: `mirror-collision` — right-side approach, correction, outgoing motion and misses.
6. Module 16: `rally-session` — serve, move, miss, score once, wait and serve again.
7. Module 18: `both-format-forms` — positional and named `.format()` calls.
8. Module 19: `build-record` — create an empty record and apply an update without modifying the input.
9. Module 19: `keys-and-values` — choose dictionary views and preserve insertion order.

The active course has **208 activities**, including **180 graded coding/challenge activities**, **23 quizzes with 46 forms**, **two main projects**, and one optional review library. The 24-module backbone and the six mini projects are retained. Timing is approximately 54 hours from authored estimates, not measured learner sessions.

## Saved work

Corrections retain activity/checkpoint IDs where the existing task contract is unchanged. New practice has new IDs. Revised quizzes use `quiz-r2` IDs; the exact original 23 v4 quiz definitions are frozen in `content/legacy/course-v4-original-quizzes.json`. The backend registry accepts their original drafts, question forms and backup records. No completion is transferred to a different quiz. Versions 1–3 and their canonical project-stage workspace lookup remain intact.

The audit ledger renderer explicitly reads its original Git revision; rebuilding it does not relabel new activities as previously audited. Re-running the adversarial script writes `verification.json` and fails on a mismatch rather than overwriting the original audit evidence.

## Verification

- 188 executable examples produce their documented output.
- 180 graded reference solutions pass; unfinished starters cannot complete.
- 461 behavioral probes are exercised by the reference suite.
- All 27 audit regression cases match their intended outcome, including permitted alternatives and file reruns. All 184 incorrect quiz tokens fail to produce the requested output.
- Ten additional integration mutations fail for their intended reason. Visible call/report panels run with the reference and preserve grading.
- Both forms of all 23 quizzes execute and score correctly; completion tokens have bilingual feedback. Original v4 quiz drafts/completion survive archive lookup and backup round trips under their own IDs.
- In the real browser: all 18 graphical references render and pass, and all 14 Pong interaction checks pass, including simultaneous controls, contacts, scoring, focus and Stop/Run.
- The full application accepts normalisation without `raw`. Repeated-input instruction 1 alone completes, leaves instruction 2 neutral, and survives reload.
- Generated text, quoted CSV and updated JSON survive save and reload in the full application. Repeated append and JSON-update runs still pass without grading against the learner's accumulated file state.

Reproduction commands:

```text
npm run test:beginner-course
npm run test:audit-regressions
npm test
npm run test:rework
npm run build
node scripts/serve-browser-checks.mjs
```

Browser verification uses the production build on a separate port with `LEARNING_DB=:memory:`. The graphical harness does not use a learner database. No real learner records are replaced for tests.

## Remaining learning validation

Automated correctness and expert walkthroughs cannot establish how an actual first-time programmer learns. Run the beginner pilot described in the original audit in both languages, measure hint use and completion time, and adjust pacing from those observations. A separate Dutch editorial pass and measured duration estimates remain appropriate. These are learning-validation tasks, not known unresolved grading failures.
