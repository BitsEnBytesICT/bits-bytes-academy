import { createApp } from "./app.js";
const { app, db } = createApp();
const port = Number(process.env.PORT || 3001);
const server = app.listen(port, "127.0.0.1", () =>
  console.log(`Python Lab is ready: http://localhost:${port}`),
);
process.on("SIGINT", () =>
  server.close(() => {
    db.close();
    process.exit(0);
  }),
);
process.on("SIGTERM", () =>
  server.close(() => {
    db.close();
    process.exit(0);
  }),
);
