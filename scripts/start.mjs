import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 3001);
const url = `http://localhost:${port}`;
const entry = path.join(root, "dist-server", "index.js");

async function health() {
  try {
    const response = await fetch(`${url}/api/health`, {
      signal: AbortSignal.timeout(1000),
    });
    const data = await response.json();
    if (data.app !== "bits-bytes-python-lab")
      throw new Error(`Port ${port} is occupied by another application.`);
    return data.ok === true;
  } catch (error) {
    if (error.message.includes("occupied")) throw error;
    return false;
  }
}

try {
  if (!(await health())) {
    if (!fs.existsSync(entry))
      throw new Error(
        "Build the app first: npm ci, then npm run build. See README.md.",
      );
    const data = path.join(root, "data");
    fs.mkdirSync(data, { recursive: true });
    const out = fs.openSync(path.join(data, "server.log"), "a");
    const err = fs.openSync(path.join(data, "server-error.log"), "a");
    const child = spawn(process.execPath, [entry], {
      cwd: root,
      detached: true,
      windowsHide: true,
      stdio: ["ignore", out, err],
    });
    child.unref();
    fs.closeSync(out);
    fs.closeSync(err);
    fs.writeFileSync(path.join(data, "server.pid"), String(child.pid));
    let ready = false;
    for (let attempt = 0; attempt < 30; attempt++) {
      if (await health()) {
        ready = true;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    if (!ready)
      throw new Error(
        "The server could not start. Check data/server-error.log.",
      );
  }
  console.log(`Python Lab is running: ${url}`);
  if (!process.argv.includes("--no-browser")) {
    const command =
      process.platform === "win32"
        ? "cmd.exe"
        : process.platform === "darwin"
          ? "open"
          : "xdg-open";
    const args =
      process.platform === "win32" ? ["/c", "start", "", url] : [url];
    spawn(command, args, {
      detached: true,
      stdio: "ignore",
      windowsHide: true,
    }).unref();
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
