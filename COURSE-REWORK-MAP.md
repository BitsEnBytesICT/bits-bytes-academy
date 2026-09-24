# Python course version 4 — beginner path

24 modules, 165 focused coding lessons, six graded mini projects, 23 quizzes with two forms each, two self-assessed main projects, and a final local-development article.

Activity estimates sum to 3021 minutes (approximately 51 hours). This is a provisional authoring estimate; no fixed duration target was used. Review time and actual beginner completion times require learner validation.

## Linear path

| Module | Outcome | Activities | Estimated minutes |
| --- | --- | --- | --- |
| 1. Your first Python programs | Run, explain and write a short program with output and comments. | 9 | 84 |
| 2. Variables and values | Name, inspect and change text and numeric values. | 10 | 113 |
| 3. Calculations and changing values | Explain each calculation and track updates in order. | 12 | 148 |
| 4. Building useful text output | Combine text and values into readable messages. | 8 | 98 |
| 5. Asking for input | Read answers, convert numbers and normalise simple commands. | 8 | 109 |
| 6. Comparisons and Boolean values | Predict comparisons and combine Boolean rules. | 10 | 124 |
| 7. Making decisions | Choose one action and test the boundaries of each rule. | 8 | 137 |
| 8. Repeating with while | Control a repeated conversation and explain why it stops. | 10 | 153 |
| 9. Writing small functions | Separate a program into functions with clear inputs and results. | 11 | 138 |
| 10. Handling mistakes and invalid input | Recover from bad input and build a usable calculator. | 8 | 213 |
| 11. Introducing lists | Store, access and change a collection of values. | 7 | 80 |
| 12. Processing lists with loops | Summarise, search and filter a collection with a loop. | 8 | 115 |
| 13. Tuples and multiple results | Unpack coordinates and the results of a function. | 4 | 44 |
| 14. Libraries and separate Python files | Use documented libraries and import your own helper module. | 8 | 120 |
| 15. Drawing and interacting with Pygame | Draw a scene and respond to input in a browser game. | 7 | 116 |
| 16. Movement and game rules | Combine controls, movement, collisions and scoring into Pong. | 9 | 288 |
| 17. More powerful list processing | Reshape, sort and process nested collections. | 10 | 129 |
| 18. Strings as data | Inspect, clean, split and format text. | 12 | 163 |
| 19. Dictionaries and records | Manage named records and handle missing information. | 9 | 117 |
| 20. Reading and writing text files | Read and create inspectable files that survive another run. | 8 | 141 |
| 21. CSV records | Read and write quoted, delimited tabular records. | 6 | 105 |
| 22. JSON and saved data | Load, update and save structured data. | 5 | 107 |
| 23. Classes and objects | Group state and behaviour while keeping instances independent. | 10 | 149 |
| 24. Python on your computer | Set up a local project and begin an idea of your own. | 1 | 30 |

## Projects

- Delivery-price adviser after decisions; activity-log analyser after list loops; number-guessing game after modules.
- One calculator after module 10: functions, input, repetition, validation, retrying and cancellation have already been practised.
- One procedural Pong after module 16: graphics, controls, movement, collision correction, scoring and serving precede it. Its AI extension stays in the same workspace.
- Text cleaner after strings; club results book after CSV and JSON; virtual pet after classes.

## Teaching and assessment

The first eight activities cover running Hello World, writing one print from an empty file, execution order, quotes, numbers versus quoted text, comments, one syntax repair, and an independent announcement. Variables arrive in module 2.

Coding lessons provide bilingual teaching, analogous worked examples, predictions, focused instructions, three hints, explained reference solutions and changed-input experiments. Runtime setup and data fixtures are supplied; short independent tasks use empty editors. New topics later in the course receive working examples again.

Sequential instructions keep future steps readable, neutral and locked. A fully correct first run passes all steps. Otherwise only the active step earns progress; first-time completion requires every current requirement to pass together. Historical definitions retain their earlier grading interface.

Each quiz form has two predictions, two completions, one debugging/test-selection question and one application question. Earlier material is retrieved in later modules. Scores and review links remain advisory; drafts and form identity are persisted.

## Source and preservation

All 56 files in curriculum/ were reviewed as pacing references. Empty or answer-filled source files were not mistaken for starters; new source lives in content-src/beginner-course/. Codecademy URLs identify the supplied checklist; external lesson text was not copied.

Version 3 is frozen at content/legacy/course-v3.json alongside versions 1 and 2. New activities have v4 IDs. Archive stages resolve to canonical project files; no credit transfers to changed tasks. The active course has no project stages or copy-earlier-project UI.

## Verification

Run npm run test:beginner-course, npm test, the runtime/persistence suites and npm run build. Browser fixtures test real pygame-ce rendering and controls. See COURSE-V4-IMPLEMENTATION.md for release evidence and remaining real-learner validation.

## Full lesson sequence

### 1. Your first Python programs

- Hello, world! (reading, 5 min) — python-v4-01-welcome
- Write your first print (coding, 8 min) — python-v4-01-first-print
- One line after another (coding, 8 min) — python-v4-01-print-order
- Text is a string (coding, 10 min) — python-v4-01-strings-quotes
- Numbers and quoted numbers (coding, 9 min) — python-v4-01-print-numbers
- Comments are for readers (coding, 9 min) — python-v4-01-comments
- Your first error message (coding, 12 min) — python-v4-01-repair-syntax
- Make a terminal announcement (coding, 15 min) — python-v4-01-announcement
- Your first Python programs: review (quiz, 8 min) — python-v4-01-quiz

### 2. Variables and values

- Give a value a name (coding, 12 min) — python-v4-02-assignment
- A name or literal text? (coding, 10 min) — python-v4-02-name-or-text
- Choose readable names (coding, 10 min) — python-v4-02-names
- Change a stored value (coding, 12 min) — python-v4-02-reassignment
- Whole numbers (coding, 10 min) — python-v4-02-integers
- Numbers with a decimal point (coding, 11 min) — python-v4-02-floats
- Ask Python for a value's type (coding, 12 min) — python-v4-02-inspect-types
- Read a NameError (coding, 10 min) — python-v4-02-repair-name
- Create a small profile (coding, 18 min) — python-v4-02-profile
- Variables and values: review (quiz, 8 min) — python-v4-02-quiz

### 3. Calculations and changing values

- Add quantities (coding, 12 min) — python-v4-03-addition
- Find what remains (coding, 12 min) — python-v4-03-subtraction
- Multiply equal groups (coding, 12 min) — python-v4-03-multiplication
- Share a quantity equally (coding, 12 min) — python-v4-03-division
- Control the order of a calculation (coding, 12 min) — python-v4-03-precedence
- Update a number step by step (coding, 13 min) — python-v4-03-update-a-number
- The += and -= shortcuts (coding, 11 min) — python-v4-03-short-updates
- Repeated multiplication with ** (coding, 12 min) — python-v4-03-powers
- Count complete groups with // (coding, 12 min) — python-v4-03-whole-groups
- Find the leftovers with % (coding, 12 min) — python-v4-03-remainder
- Calculate a simple receipt (coding, 20 min) — python-v4-03-receipt
- Calculations and changing values: review (quiz, 8 min) — python-v4-03-quiz

### 4. Building useful text output

- Join two pieces of text (coding, 12 min) — python-v4-04-concatenate
- Include a number in text (coding, 12 min) — python-v4-04-convert-to-text
- Print several values together (coding, 10 min) — python-v4-04-print-values
- Place values inside a message (coding, 13 min) — python-v4-04-f-strings
- Newlines and special characters (coding, 13 min) — python-v4-04-escapes
- Text across several source lines (coding, 12 min) — python-v4-04-multiline
- Build a visitor card (coding, 18 min) — python-v4-04-visitor-card
- Building useful text output: review (quiz, 8 min) — python-v4-04-quiz

### 5. Asking for input

- Ask and wait for an answer (coding, 14 min) — python-v4-05-first-input
- Digits entered are still text (coding, 12 min) — python-v4-05-input-is-text
- Convert a whole-number answer (coding, 14 min) — python-v4-05-integer-input
- Read a decimal measurement (coding, 13 min) — python-v4-05-float-input
- Ask two questions in order (coding, 14 min) — python-v4-05-two-answers
- Clean a typed command (coding, 14 min) — python-v4-05-normalise-command
- Make an interactive trip report (coding, 20 min) — python-v4-05-trip-report
- Asking for input: review (quiz, 8 min) — python-v4-05-quiz

### 6. Comparisons and Boolean values

- Two Boolean values (coding, 12 min) — python-v4-06-boolean-values
- Compare with == (coding, 13 min) — python-v4-06-equal
- Compare with != (coding, 13 min) — python-v4-06-not-equal
- Greater than and less than (coding, 13 min) — python-v4-06-greater-less
- Include the boundary (coding, 13 min) — python-v4-06-inclusive-boundaries
- Require both conditions with and (coding, 13 min) — python-v4-06-and
- Allow either condition with or (coding, 13 min) — python-v4-06-or
- Reverse a Boolean with not (coding, 13 min) — python-v4-06-not
- Combine a complete access rule (coding, 13 min) — python-v4-06-access-rule
- Comparisons and Boolean values: review (quiz, 8 min) — python-v4-06-quiz

### 7. Making decisions

- Run an instruction only when needed (coding, 15 min) — python-v4-07-first-if
- See which lines belong together (coding, 13 min) — python-v4-07-indentation
- Choose between two actions (coding, 15 min) — python-v4-07-else
- Choose among several actions (coding, 16 min) — python-v4-07-elif
- Separate checks or one choice? (coding, 15 min) — python-v4-07-separate-or-chain
- Respond to a typed choice (coding, 20 min) — python-v4-07-command-menu
- Mini project: delivery-price adviser (challenge, 35 min) — python-v4-07-delivery-adviser
- Making decisions: review (quiz, 8 min) — python-v4-07-quiz

### 8. Repeating with while

- Repeat a small block (coding, 16 min) — python-v4-08-why-repeat
- Trace the counter (coding, 14 min) — python-v4-08-trace-counter
- Keep a running total (coding, 16 min) — python-v4-08-accumulate
- Recognise and stop an endless loop (coding, 14 min) — python-v4-08-stop-endless-loop
- Keep asking until a stop word (coding, 17 min) — python-v4-08-repeat-input
- Exit a loop with break (coding, 16 min) — python-v4-08-break
- Skip one iteration with continue (coding, 16 min) — python-v4-08-continue
- Repair a loop that exits too soon (coding, 14 min) — python-v4-08-repair-exit
- Summarise a short session (coding, 22 min) — python-v4-08-session-summary
- Repeating with while: review (quiz, 8 min) — python-v4-08-quiz

### 9. Writing small functions

- Give instructions a name (coding, 12 min) — python-v4-09-define-and-call
- Follow a function call (coding, 12 min) — python-v4-09-flow
- Pass a value into a function (coding, 12 min) — python-v4-09-parameters
- Use two arguments (coding, 12 min) — python-v4-09-multiple-parameters
- Return an answer to the caller (coding, 12 min) — python-v4-09-return-values
- A function without a return value (coding, 12 min) — python-v4-09-none
- Keep a function independent (coding, 12 min) — python-v4-09-local-scope
- Optional inputs and named arguments (coding, 12 min) — python-v4-09-named-and-default
- Stop a function at a guard (coding, 12 min) — python-v4-09-early-return
- Build a reusable ticket calculation (coding, 22 min) — python-v4-09-ticket-function
- Writing small functions: review (quiz, 8 min) — python-v4-09-quiz

### 10. Handling mistakes and invalid input

- Name the kind of mistake (coding, 12 min) — python-v4-10-diagnose
- Recover from a conversion failure (coding, 12 min) — python-v4-10-value-error
- Handle division by zero (coding, 12 min) — python-v4-10-zero-division
- A number can still be invalid (coding, 12 min) — python-v4-10-validate
- Try again after invalid input (coding, 12 min) — python-v4-10-retry
- Give every retry a way out (coding, 25 min) — python-v4-10-cancel-safely
- Handling mistakes and invalid input: review (quiz, 8 min) — python-v4-10-quiz
- Project: your calculator (project, 120 min) — python-v4-10-calculator-project

### 11. Introducing lists

- Keep several values in a list (coding, 12 min) — python-v4-11-create
- Start empty and append (coding, 12 min) — python-v4-11-append
- Combine two lists (coding, 12 min) — python-v4-11-combine
- Select a position (coding, 12 min) — python-v4-11-indexes
- Replace an element (coding, 12 min) — python-v4-11-change-element
- Count and copy a list (coding, 12 min) — python-v4-11-length-copy
- Introducing lists: review (quiz, 8 min) — python-v4-11-quiz

### 12. Processing lists with loops

- Visit every value with for (coding, 12 min) — python-v4-12-for-values
- Repeat a known number of times (coding, 12 min) — python-v4-12-range-stop
- Choose the start and step (coding, 12 min) — python-v4-12-range-step
- Traverse a list with an index (coding, 12 min) — python-v4-12-indexed-while
- Search until a match (coding, 12 min) — python-v4-12-search
- Build a list of matching values (coding, 12 min) — python-v4-12-filter
- Mini project: activity-log analyser (challenge, 35 min) — python-v4-12-activity-log
- Processing lists with loops: review (quiz, 8 min) — python-v4-12-quiz

### 13. Tuples and multiple results

- Keep a coordinate pair in a tuple (coding, 12 min) — python-v4-13-pairs
- Unpack a pair into names (coding, 12 min) — python-v4-13-unpack
- Return two related answers (coding, 12 min) — python-v4-13-multiple-results
- Tuples and multiple results: review (quiz, 8 min) — python-v4-13-quiz

### 14. Libraries and separate Python files

- Use a standard-library module (coding, 12 min) — python-v4-14-import
- Import a function or choose an alias (coding, 12 min) — python-v4-14-selected-and-alias
- Generate a random choice (coding, 12 min) — python-v4-14-random
- Repeat a random experiment (coding, 12 min) — python-v4-14-repeatable-random
- Use decimal arithmetic deliberately (coding, 12 min) — python-v4-14-decimal
- Put reusable code in another file (coding, 12 min) — python-v4-14-helper-files
- Mini project: number-guessing game (challenge, 40 min) — python-v4-14-guessing-game
- Libraries and separate Python files: review (quiz, 8 min) — python-v4-14-quiz

### 15. Drawing and interacting with Pygame

- Meet the Pygame preview (coding, 18 min) — python-v4-15-coordinates
- Use an object’s attributes (coding, 18 min) — python-v4-15-attributes
- Paint an image on a Surface (coding, 18 min) — python-v4-15-surface-colour
- Draw the background before the foreground (coding, 18 min) — python-v4-15-drawing-order
- Respond to a key press (coding, 18 min) — python-v4-15-events
- Draw text on the court (coding, 18 min) — python-v4-15-score-label
- Drawing and interacting with Pygame: review (quiz, 8 min) — python-v4-15-quiz

### 16. Movement and game rules

- Move by elapsed time (coding, 18 min) — python-v4-16-velocity
- Hold keys to move both paddles (coding, 18 min) — python-v4-16-held-controls
- Keep a paddle inside the court (coding, 18 min) — python-v4-16-boundaries
- Bounce once at a wall (coding, 18 min) — python-v4-16-wall-bounce
- Use Rect collision detection (coding, 18 min) — python-v4-16-paddle-contact
- Score a miss once (coding, 18 min) — python-v4-16-score-once
- Start the next rally deliberately (coding, 22 min) — python-v4-16-serve
- Movement and game rules: review (quiz, 8 min) — python-v4-16-quiz
- Project: a complete Pong rally (project, 150 min) — python-v4-16-pong-project

### 17. More powerful list processing

- Insert at a chosen position (coding, 12 min) — python-v4-17-insert
- Remove by value (coding, 12 min) — python-v4-17-remove
- Remove by index and keep the value (coding, 12 min) — python-v4-17-pop
- Take a slice of a list (coding, 12 min) — python-v4-17-slicing
- Sort in place or make a sorted copy (coding, 12 min) — python-v4-17-sorting
- Read and change a grid (coding, 12 min) — python-v4-17-nested-grid
- Visit rows and their elements (coding, 12 min) — python-v4-17-nested-loops
- Express a simple transformation compactly (coding, 12 min) — python-v4-17-comprehensions
- Build a report without losing the original (coding, 25 min) — python-v4-17-score-report
- More powerful list processing: review (quiz, 8 min) — python-v4-17-quiz

### 18. Strings as data

- Read characters by position (coding, 12 min) — python-v4-18-sequence
- Extract a piece of text (coding, 12 min) — python-v4-18-slice
- Build a changed string (coding, 12 min) — python-v4-18-immutable
- Loop over characters and test membership (coding, 12 min) — python-v4-18-characters
- Return differently cased text (coding, 12 min) — python-v4-18-case
- Split ordinary whitespace (coding, 12 min) — python-v4-18-split-whitespace
- Split a known separator (coding, 12 min) — python-v4-18-split-delimiter
- Join cleaned pieces of text (coding, 12 min) — python-v4-18-join-strip
- Search and replace text (coding, 12 min) — python-v4-18-replace-find
- Fill a text template with format (coding, 12 min) — python-v4-18-format
- Mini project: text cleaner (challenge, 35 min) — python-v4-18-text-cleaner
- Strings as data: review (quiz, 8 min) — python-v4-18-quiz

### 19. Dictionaries and records

- Name fields with dictionary keys (coding, 12 min) — python-v4-19-records
- Choose valid keys (coding, 12 min) — python-v4-19-keys
- Build and update a record (coding, 12 min) — python-v4-19-update
- Handle a missing key (coding, 12 min) — python-v4-19-lookup
- Remove a dictionary entry (coding, 12 min) — python-v4-19-delete
- Visit keys, values and pairs (coding, 12 min) — python-v4-19-views
- Derive a new mapping (coding, 12 min) — python-v4-19-comprehension
- Maintain a small scoreboard (coding, 25 min) — python-v4-19-registry
- Dictionaries and records: review (quiz, 8 min) — python-v4-19-quiz

### 20. Reading and writing text files

- Read your first text file (coding, 18 min) — python-v4-20-read
- Process one line at a time (coding, 18 min) — python-v4-20-lines
- Read a header, then the remaining file (coding, 18 min) — python-v4-20-position
- Create or replace a text file (coding, 18 min) — python-v4-20-write
- Append a new log entry (coding, 18 min) — python-v4-20-append
- Handle a missing file explicitly (coding, 18 min) — python-v4-20-missing
- Generate a text report from a file (coding, 25 min) — python-v4-20-report
- Reading and writing text files: review (quiz, 8 min) — python-v4-20-quiz

### 21. CSV records

- Read rows and columns with csv.reader (coding, 18 min) — python-v4-21-rows
- Use a header as field names (coding, 18 min) — python-v4-21-named-records
- Read a different CSV dialect (coding, 18 min) — python-v4-21-delimiter
- Export records to CSV (coding, 18 min) — python-v4-21-write
- Transform a CSV export (coding, 25 min) — python-v4-21-csv-report
- CSV records: review (quiz, 8 min) — python-v4-21-quiz

### 22. JSON and saved data

- Load nested JSON data (coding, 18 min) — python-v4-22-load
- Save and reopen JSON (coding, 18 min) — python-v4-22-save
- Update saved data and recognise malformed JSON (coding, 18 min) — python-v4-22-update-and-recover
- Mini project: club results book (challenge, 45 min) — python-v4-22-club-book
- JSON and saved data: review (quiz, 8 min) — python-v4-22-quiz

### 23. Classes and objects

- Define a new type with class (coding, 12 min) — python-v4-23-class
- Give each instance initial state (coding, 12 min) — python-v4-23-initialise
- Let an object perform an action (coding, 12 min) — python-v4-23-methods
- Pass an argument to a method (coding, 12 min) — python-v4-23-method-arguments
- Separate shared defaults from instance data (coding, 12 min) — python-v4-23-shared-state
- Inspect an unfamiliar object (coding, 12 min) — python-v4-23-inspect
- Give objects useful text representations (coding, 12 min) — python-v4-23-representation
- A function is an object too (coding, 12 min) — python-v4-23-functions-as-values
- Mini project: virtual pet (challenge, 45 min) — python-v4-23-virtual-pet
- Classes and objects: review (quiz, 8 min) — python-v4-23-quiz

### 24. Python on your computer

- Python on your own computer (reading, 30 min) — python-v4-24-local-development
