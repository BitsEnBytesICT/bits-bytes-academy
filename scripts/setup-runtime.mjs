import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
const source = path.resolve("node_modules/pyodide");
const dest = path.resolve("frontend/public/runtime/pyodide");
fs.mkdirSync(dest, { recursive: true });
const files = [
  "pyodide.mjs",
  "pyodide.asm.mjs",
  "pyodide.asm.wasm",
  "python_stdlib.zip",
  "pyodide-lock.json",
];
const manifest = { version: "314.0.7", files: {} };
for (const file of files) {
  const data = fs.readFileSync(path.join(source, file));
  fs.writeFileSync(path.join(dest, file), data);
  manifest.files[file] = {
    bytes: data.length,
    sha256: crypto.createHash("sha256").update(data).digest("hex"),
  };
}
// Use the wheel built for this exact Pyodide ABI, not a desktop pygame wheel.
const lock = JSON.parse(
  fs.readFileSync(path.join(source, "pyodide-lock.json"), "utf8"),
);
const pygame = lock.packages["pygame-ce"];
if (!pygame || pygame.depends.length)
  throw new Error(
    "Review pygame runtime dependencies before upgrading Pyodide",
  );
const wheel = path.join(dest, pygame.file_name);
const digest = (bytes) =>
  crypto.createHash("sha256").update(bytes).digest("hex");
if (!fs.existsSync(wheel) || digest(fs.readFileSync(wheel)) !== pygame.sha256) {
  const response = await fetch(
    `https://cdn.jsdelivr.net/pyodide/v${manifest.version}/full/${pygame.file_name}`,
    {
      signal: AbortSignal.timeout(60000),
    },
  );
  if (!response.ok)
    throw new Error(`Could not download pygame-ce: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (digest(bytes) !== pygame.sha256)
    throw new Error("pygame-ce checksum does not match the Pyodide lockfile");
  fs.writeFileSync(wheel, bytes);
}
manifest.files[pygame.file_name] = {
  bytes: fs.statSync(wheel).size,
  sha256: pygame.sha256,
};
manifest.packages = { "pygame-ce": pygame.version };
for (const file of fs.readdirSync(source).filter((x) => /license/i.test(x)))
  fs.copyFileSync(path.join(source, file), path.join(dest, file));
fs.writeFileSync(
  path.join(dest, "runtime-manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log("Python runtime bundled locally. No CDN is required.");
