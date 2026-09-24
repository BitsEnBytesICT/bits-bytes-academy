// Only focused practice can require a named construct. Independent problems keep
// behavioural checks and accept equivalent implementations.
const functionNodes = (name) =>
  `_ast.walk(next(n for n in _ast.walk(_ast.parse(_source)) if isinstance(n,_ast.FunctionDef) and n.name == "${name}"))`;
const method = (name, attr) =>
  `any(isinstance(n,_ast.Call) and isinstance(n.func,_ast.Attribute) and n.func.attr == "${attr}" for n in ${functionNodes(name)})`;
const call = (name, fn) =>
  `any(isinstance(n,_ast.Call) and isinstance(n.func,_ast.Name) and n.func.id == "${fn}" for n in ${functionNodes(name)})`;
export function focusedChecks(activities) {
  const add = (id, step, rule) => {
    const a = activities.find((a) => a.id === id);
    if (!a) return;
    if (a.guidance === "independent")
      throw Error("Do not impose syntax on independent transfer");
    a.checkpoints[step - 1].check =
      `(${a.checkpoints[step - 1].check}) and (${rule})`;
  };
  add(
    "python-v3-9-01",
    1,
    `${method("manage", "insert")} and ${method("manage", "remove")}`,
  );
  add(
    "python-v3-9-01",
    2,
    `${method("manage", "pop")} and ${method("manage", "count")}`,
  );
  add("python-v3-9-03", 1, call("ranked", "sorted"));
  add("python-v3-9-03", 2, method("tidy", "sort"));
  add(
    "python-v3-10-05",
    2,
    `${method("positional", "format")} and ${method("named", "format")}`,
  );
}
