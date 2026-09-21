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
for (const file of fs.readdirSync(source).filter((x) => /license/i.test(x)))
  fs.copyFileSync(path.join(source, file), path.join(dest, file));
fs.writeFileSync(
  path.join(dest, "runtime-manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log("Python runtime bundled locally. No CDN is required.");
