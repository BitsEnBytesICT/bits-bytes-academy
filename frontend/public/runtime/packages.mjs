// Only the locally bundled, ABI-matched package is enabled here. Installing
// arbitrary packages is a separate feature, not a side effect of learner code.
const ready = new WeakSet();
export async function ensurePackages(py, files = {}, line = "") {
  if (ready.has(py)) return;
  if (py.loadedPackages?.['pygame-ce']) { ready.add(py); return; }
  const sources = [...Object.values(files), line];
  if (!sources.some((source) => source.includes("pygame"))) return;
  py.globals.set("_lab_package_sources", JSON.stringify(sources));
  const needed = py.runPython(`
import ast as _package_ast, json as _package_json
def _needs_pygame(sources):
    for source in sources:
        try:
            tree = _package_ast.parse(source)
        except SyntaxError:
            continue
        for node in _package_ast.walk(tree):
            if isinstance(node, _package_ast.Import) and any(name.name.split('.')[0] == 'pygame' for name in node.names):
                return True
            if isinstance(node, _package_ast.ImportFrom) and (node.module or '').split('.')[0] == 'pygame' and node.level == 0:
                return True
    return False
_needs_pygame(_package_json.loads(_lab_package_sources))
`);
  py.globals.delete("_lab_package_sources");
  if (needed) {
    py.runPython(
      'import os as _package_os\n_package_os.environ["PYGAME_HIDE_SUPPORT_PROMPT"] = "1"',
    );
    await py.loadPackage("pygame-ce");
    ready.add(py);
  }
}
