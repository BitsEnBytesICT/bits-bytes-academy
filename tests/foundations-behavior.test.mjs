import assert from "node:assert/strict";
import path from "node:path";
import { loadPyodide } from "pyodide";
import { execute } from "../frontend/public/runtime/engine.mjs";
import { activities as input } from "../content-src/project-course/02-responsive-programs.mjs";
import { activities as validation } from "../content-src/project-course/03-unexpected-input.mjs";
import { activities as repetition } from "../content-src/project-course/04-repetition.mjs";
import { activities as functions } from "../content-src/project-course/05-organising-solutions.mjs";

const py = await loadPyodide({
  indexURL: path.resolve("node_modules/pyodide"),
});
py.setStdout({ write: (b) => b.length });
py.setStderr({ write: (b) => b.length });
const lessons = new Map(
  [...input, ...validation, ...repetition, ...functions].map((a) => [a.id, a]),
);
const id = (module, activity) =>
  `python-v2-${module}-${String(activity).padStart(2, "0")}`;
const activity = (module, number) => lessons.get(id(module, number));
const source = (module, number) => activity(module, number).solution["main.py"];
let rejected = 0,
  alternatives = 0,
  staged = 0;
async function run(module, number, code) {
  const a = activity(module, number);
  let inputs = [...a.inputs];
  py.setStdin({ stdin: () => inputs.shift() });
  return execute(py, { files: { "main.py": code }, checks: a.checkpoints });
}
async function wrong(module, number, before, after, step, label) {
  const original = source(module, number);
  assert(original.includes(before), `Mutation missing: ${label}`);
  const result = await run(module, number, original.replace(before, after));
  assert.equal(result.results[step - 1].passed, false, label);
  rejected++;
}
async function valid(module, number, code, label) {
  const result = await run(module, number, code);
  assert.equal(result.error, null, label);
  assert(
    result.results.every((r) => r.passed),
    `${label}: ${JSON.stringify(result.results)}`,
  );
  alternatives++;
}

await wrong(
  3,
  1,
  "raw_command.strip().lower()",
  "raw_command.lower()",
  1,
  "Surrounding whitespace was not stripped",
);
await wrong(
  3,
  1,
  "raw_command.strip().lower()",
  "raw_command.strip()",
  2,
  "Case-sensitive command",
);
await wrong(
  3,
  2,
  "in_age_range and has_consent",
  "in_age_range or has_consent",
  3,
  "Incomplete permission rule",
);
await wrong(
  3,
  2,
  "12 <= age <= 17",
  "12 < age < 17",
  1,
  "Allowed age endpoints rejected",
);
await wrong(
  3,
  3,
  'elif command == "address":',
  'if command == "address":',
  2,
  "Error branch still runs after hours response",
);
await wrong(
  3,
  4,
  "result = None",
  "result = 0",
  2,
  "Failed conversion fabricates a result",
);
await wrong(
  3,
  4,
  'except ZeroDivisionError:\n    status = "zero divisor"',
  'except ZeroDivisionError:\n    status = "invalid number"',
  3,
  "Failure reasons collapsed",
);
await wrong(
  3,
  5,
  "(value - 32) * 5 / 9",
  "value - 32 * 5 / 9",
  1,
  "Wrong operation order in conversion",
);
await wrong(
  3,
  5,
  'unit = input("Source unit (C/F): ").strip().lower()',
  'unit = input("Source unit (C/F): ")',
  1,
  "Valid padded uppercase unit rejected",
);
await wrong(
  4,
  1,
  "label_number <= batch_size",
  "label_number < batch_size",
  1,
  "Last label missing",
);
await wrong(
  4,
  2,
  "help_count += 1",
  "help_count = 1",
  2,
  "Session counter resets each successful turn",
);
await wrong(
  4,
  3,
  "if candidate < 0:",
  "amount = candidate\n    if candidate < 0:",
  2,
  "Cancelled session retains rejected amount",
);
await wrong(
  4,
  4,
  "balance += next_deposit\n    next_deposit += increase",
  "next_deposit += increase\n    balance += next_deposit",
  2,
  "Deposit increased a week early",
);
await wrong(
  4,
  5,
  "if amount < 0:",
  "if amount <= 0:",
  2,
  "Zero sale incorrectly rejected",
);
await wrong(
  4,
  5,
  "except ValueError:\n        rejected += 1",
  "except ValueError:\n        count = 0\n        total = 0\n        rejected += 1",
  3,
  "Invalid turn loses earlier sales",
);
await wrong(
  5,
  1,
  "print(message)",
  'print("Quiet room")',
  1,
  "Function hardcodes one message",
);
await wrong(
  5,
  2,
  "return total",
  "return str(total)",
  1,
  "Function returns display text rather than a number",
);
await wrong(
  5,
  2,
  "subtotal + shipping",
  "subtotal + shipping_charge",
  2,
  "Calculation depends on global",
);
await wrong(
  5,
  3,
  "price * (1 - percent / 100)",
  "price - percent",
  1,
  "Percentage treated as absolute reduction",
);
await wrong(
  5,
  3,
  "percent > 100",
  "percent >= 100",
  2,
  "Full discount incorrectly rejected",
);
await wrong(
  5,
  4,
  'if text.strip().lower() == "cancel":',
  'if text.strip().lower() == "cancel" or text == "":',
  2,
  "Blank input confused with cancellation",
);
await wrong(
  5,
  4,
  "except EOFError:\n            return None",
  "except EOFError:\n            raise",
  3,
  "EOF leaves an unhandled exception",
);
await wrong(
  5,
  5,
  "return total * (1 + tip_percent / 100) / people",
  "return round(total * (1 + tip_percent / 100) / people, 2)",
  1,
  "Reusable function rounds prematurely",
);
await wrong(
  5,
  5,
  "people <= 0",
  "people < 0",
  2,
  "Zero people raises the wrong error",
);
await wrong(
  5,
  5,
  "return total * (1 + tip_percent / 100) / people",
  'print("Calculating")\n    return total * (1 + tip_percent / 100) / people',
  3,
  "Calculation prints unrelated output",
);

await valid(
  3,
  1,
  source(3, 1).replace(
    "command = raw_command.strip().lower()",
    "command = raw_command.strip()\ncommand = command.lower()",
  ),
  "Separate normalisation steps",
);
await valid(
  3,
  2,
  source(3, 2).replace("12 <= age <= 17", "not (age < 12 or age > 17)"),
  "Equivalent Boolean expression",
);
await valid(
  3,
  4,
  source(3, 4).replace(
    'result = first / second\n    status = "ok"',
    'if second == 0:\n        status = "zero divisor"\n    else:\n        result = first / second\n        status = "ok"',
  ),
  "Explicit divisor validation",
);
await valid(
  4,
  2,
  `help_count = 0
command = input("Command: ").strip().lower()
while command != "quit":
    if command == "help":
        help_count += 1
        print("Ask the welcome desk")
    else:
        print("Unknown command")
    command = input("Command: ").strip().lower()
print("Help requests:", help_count)
`,
  "Sentinel-controlled loop instead of break",
);
await valid(
  4,
  5,
  `count = 0
total = 0
rejected = 0
text = input().strip().lower()
while text != "done":
    try:
        value = float(text)
        if value >= 0:
            total = total + value
            count = count + 1
        else:
            rejected = rejected + 1
    except ValueError:
        rejected = rejected + 1
    text = input().strip().lower()
print("Accepted", count, "rejected", rejected, "sum %.2f" % total)
`,
  "Independent session without continue",
);
await valid(
  5,
  2,
  source(5, 2).replace(
    "total = subtotal + shipping\n    return total",
    "return float(shipping + subtotal)",
  ),
  "Direct float return and alternate numeric display",
);
await valid(
  5,
  3,
  source(5, 3).replace(
    "price * (1 - percent / 100)",
    "price - price * percent / 100",
  ),
  "Equivalent discount formula",
);
await valid(
  5,
  5,
  `def split_bill(total, people, tip_percent=0):
    if total < 0:
        raise ValueError("Negative total")
    if people < 1:
        raise ValueError("Nobody to split with")
    if tip_percent < 0:
        raise ValueError("Negative tip")
    tip_amount = total / 100 * tip_percent
    return (total + tip_amount) / people

try:
    bill = float(input())
    group_size = int(input())
    percentage = float(input())
    print("Your share: %.2f" % split_bill(bill, tip_percent=percentage, people=group_size))
except ValueError as error:
    print("Invalid:", error)
`,
  "Independent bill splitter with different locals, error messages, keyword order, and formatting",
);

// A partly repaired exercise must show useful progress without completing it.
const departure = await run(
  2,
  3,
  activity(2, 3).files["main.py"].replace(
    "buffer = 0",
    "buffer = minutes_left - walk_minutes",
  ),
);
assert.equal(departure.results[0].passed, true);
assert.equal(departure.results[1].passed, false);
staged++;
const delivery = await run(
  5,
  2,
  activity(5, 2).files["main.py"].replace("print(total)", "return total"),
);
assert.equal(
  delivery.results[0].passed,
  false,
  "Returning the wrong calculation cannot complete the numeric contract",
);
assert(delivery.results.some((r) => !r.passed));
staged++;

console.log(
  JSON.stringify({
    foundations: {
      mistakesRejected: rejected,
      validAlternatives: alternatives,
      stagedChecks: staged,
    },
  }),
);
