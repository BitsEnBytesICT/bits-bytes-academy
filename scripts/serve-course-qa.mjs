// Separate, disposable profile for verifying the production interface.
import { createApp } from "../dist-server/app.js";
import { openDatabase } from "../dist-server/database.js";
const { app } = createApp(openDatabase(":memory:"));
app.listen(3004, "127.0.0.1", () =>
  console.log("Course QA: http://127.0.0.1:3004 — isolated in-memory profile"),
);
