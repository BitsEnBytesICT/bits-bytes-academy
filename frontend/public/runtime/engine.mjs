import { ensurePackages } from "./packages.mjs";
// One namespace per activity; every graded run starts fresh.
export const harness = String.raw`
import sys, os, json, io, traceback, ast, contextlib, shutil, re, math, random, importlib
from pyodide.console import Console, repr_shorten
_lab_root = '/home/pyodide/workspace'
_lab_ns = None
_lab_console = None
_lab_names = set()

def _lab_probe(files, probe):
    # Real Python, fresh files/modules/input for every case. A test must not
    # alter the learner's variables, random generator, imports, or saved files.
    files = dict(files, **probe.get('files', {}))
    root = '/home/pyodide/behavior-probe'
    original_cwd, original_path = os.getcwd(), sys.path[:]
    original_stdin, original_random = sys.stdin, random.getstate()
    original_modules = sys.modules.copy()
    stdout, stderr = io.StringIO(), io.StringIO()
    class BoundedOutput(io.TextIOBase):
        def __init__(self, target): self.target, self.size = target, 0
        def write(self, value):
            self.size += len(value.encode('utf-8'))
            if self.size > 1048576: raise RuntimeError('Output limit exceeded (1 MiB)')
            return self.target.write(value)
        def flush(self): pass
    namespace = {'__name__': '__main__', '__file__': 'main.py'}
    result, error = None, None
    call_reached, call_stdout_start, call_stderr_start, call_input_start = False, 0, 0, 0
    call_args, call_kwargs = [], {}
    try:
        if os.path.exists(root): shutil.rmtree(root)
        os.makedirs(root)
        for name, value in files.items():
            if not re.fullmatch(r'[a-zA-Z0-9_][a-zA-Z0-9_.-]{0,99}', name): raise ValueError('Invalid workspace filename')
            with open(os.path.join(root, name), 'w', encoding='utf-8') as handle: handle.write(value)
        for name, module in list(sys.modules.items()):
            if str(getattr(module, '__file__', '')).startswith((_lab_root + '/', root + '/')):
                del sys.modules[name]
        os.chdir(root)
        sys.path[:] = [root] + [p for p in original_path if p not in (_lab_root, root)]
        sys.stdin = io.StringIO(''.join(line + '\n' for line in probe.get('stdin', [])))
        random.seed(1729)
        tree = ast.parse(files.get('main.py', ''))
        remaining = set(probe.get('inputs', {}))
        for node in tree.body:
            if isinstance(node, ast.Assign) and len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
                name = node.targets[0].id
                if name in remaining:
                    node.value = ast.copy_location(ast.parse(repr(probe['inputs'][name]), mode='eval').body, node.value)
                    remaining.remove(name)
        if remaining: raise ValueError('Missing exercise input assignments: ' + ', '.join(sorted(remaining)))
        with contextlib.redirect_stdout(BoundedOutput(stdout)), contextlib.redirect_stderr(BoundedOutput(stderr)):
            try:
                if not probe.get('moduleOnly'):
                    exec(compile(ast.fix_missing_locations(tree), 'main.py', 'exec'), namespace)
                elif not probe.get('call', {}).get('module'):
                    raise ValueError('A module-only probe requires a module function')
                if probe.get('call'):
                    call = probe['call']
                    module = importlib.import_module(call['module']) if call.get('module') else None
                    namespace['_module'] = module
                    function = getattr(module, call['name']) if module is not None else namespace[call['name']]
                    call_stdout_start, call_stderr_start = len(stdout.getvalue()), len(stderr.getvalue())
                    call_input_start, call_reached = sys.stdin.tell(), True
                    call_args, call_kwargs = call.get('args', []), call.get('kwargs', {})
                    result = function(*call_args, **call_kwargs)
            except BaseException as exc:
                error = type(exc).__name__
        # An error during setup is not evidence of the function's behavior.
        if probe.get('call') and not call_reached: return False
        call_input_chars = sys.stdin.tell() - call_input_start if call_reached else 0
        namespace.update(_return=result, _error=error, _stdout=stdout.getvalue(), _stderr=stderr.getvalue(), _remaining_input=sys.stdin.read(), _close=math.isclose,
            _call_stdout=stdout.getvalue()[call_stdout_start:] if call_reached else '',
            _call_stderr=stderr.getvalue()[call_stderr_start:] if call_reached else '',
            _call_input_chars=call_input_chars, _args=call_args, _kwargs=call_kwargs)
        return bool(eval(probe['check'], namespace))
    finally:
        os.chdir(original_cwd)
        sys.path[:] = original_path
        sys.stdin = original_stdin
        random.setstate(original_random)
        for name, module in list(sys.modules.items()):
            if str(getattr(module, '__file__', '')).startswith(root + '/'):
                del sys.modules[name]
        for name, module in original_modules.items():
            if str(getattr(module, '__file__', '')).startswith((_lab_root + '/', root + '/')):
                sys.modules[name] = module
        if os.path.exists(root): shutil.rmtree(root)

def _lab_prepare(files, fresh=False):
    global _lab_ns, _lab_console, _lab_names
    os.chdir('/home/pyodide')
    if fresh or _lab_ns is None:
        for name, module in list(sys.modules.items()):
            if str(getattr(module, '__file__', '')).startswith(_lab_root + '/'):
                del sys.modules[name]
        if os.path.exists(_lab_root): shutil.rmtree(_lab_root)
        os.makedirs(_lab_root, exist_ok=True)
        _lab_ns = {'__name__': '__main__', '__file__': 'main.py'}
        _lab_console = Console(globals=_lab_ns)
        _lab_names = set()
    os.chdir(_lab_root)
    if _lab_root not in sys.path: sys.path.insert(0, _lab_root)
    for name in _lab_names - set(files):
        full = os.path.join(_lab_root, name)
        if os.path.isfile(full): os.remove(full)
    for name, text in files.items():
        if not re.fullmatch(r'[a-zA-Z0-9_][a-zA-Z0-9_.-]{0,99}', name):
            raise ValueError('Invalid workspace filename')
        with open(os.path.join(_lab_root, name), 'w', encoding='utf-8') as handle:
            handle.write(text)
    _lab_names = set(files)

def _lab_files():
    global _lab_names
    files = {}; size = 0
    for name in sorted(os.listdir(_lab_root)):
        full = os.path.join(_lab_root, name)
        if not re.fullmatch(r'[a-zA-Z0-9_][a-zA-Z0-9_.-]{0,99}', name) or not os.path.isfile(full): continue
        if os.path.getsize(full) > 5242880: continue
        try:
            with open(full, encoding='utf-8') as handle: text = handle.read()
            size += len(text.encode('utf-8'))
            if size > 5242880 or len(files) >= 40: break
            files[name] = text
        except (UnicodeError, OSError): pass
    _lab_names = set(files)
    return files

def _lab_evaluate_checks(payload, error, check_ns, case_namespace=None):
    results = []
    for check in payload.get('checks', []):
        try:
            with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
                passed = (error == check['expectedError']) if check.get('expectedError') else (error is None and bool(eval(check['check'], check_ns)))
                if passed:
                    for case in check.get('cases', []):
                        if case_namespace is None or not bool(eval(case['check'], case_namespace(case['inputs']))):
                            passed = False
                            break
                if passed:
                    passed = all(_lab_probe(payload['files'], probe) for probe in check.get('probes', []))
        except BaseException: passed = False
        results.append({'id':check['id'], 'passed':bool(passed)})
    return results

def _lab_game_grade(payload_json):
    payload = json.loads(payload_json)
    check_ns = dict(_lab_ns, _stdout=payload.get('stdout', ''), _error=payload.get('error'),
        _source=payload['files'].get('main.py', ''), _ast=ast, _json=json, _os=os,
        _rendered_frames=payload.get('frames', 0))
    return json.dumps(_lab_evaluate_checks(payload, payload.get('error'), check_ns))

def _lab_run(payload_json):
    payload = json.loads(payload_json)
    _lab_prepare(payload['files'], fresh=True)
    source = payload['files'].get('main.py', '')
    error = None
    class Capture(io.TextIOBase):
        def __init__(self, target): self.target=target; self.parts=[]; self.size=0
        def write(self, value):
            self.size += len(value.encode('utf-8'))
            if self.size > 1048576: raise RuntimeError('Output limit exceeded (1 MiB)')
            self.parts.append(value); self.target.write(value); self.target.flush(); return len(value)
        def flush(self): self.target.flush()
    captured = Capture(sys.stdout)
    try:
        with contextlib.redirect_stdout(captured): exec(compile(source, 'main.py', 'exec'), _lab_ns)
    except BaseException as exc:
        error = type(exc).__name__
        traceback.print_exception(type(exc), exc, exc.__traceback__.tb_next if exc.__traceback__ else None)
    output = ''.join(captured.parts)
    check_ns = dict(_lab_ns, _stdout=output, _error=error, _source=source, _ast=ast, _json=json, _os=os)
    # Opt-in boundary checks for pure introductory programs. Substitute only
    # each supplied input's first top-level assignment, keeping later updates.
    # A separate namespace/output stream leaves console inspection untouched.
    case_cache = {}
    def case_namespace(inputs):
        key = json.dumps(inputs, sort_keys=True)
        if key in case_cache: return case_cache[key]
        tree = ast.parse(source)
        remaining = set(inputs)
        for node in tree.body:
            if isinstance(node, ast.Assign) and len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
                name = node.targets[0].id
                if name in remaining:
                    node.value = ast.copy_location(ast.parse(repr(inputs[name]), mode='eval').body, node.value)
                    remaining.remove(name)
        if remaining: raise ValueError('Keep the named input assignments at the top of the program')
        case_output = Capture(io.StringIO())
        # Probe programs need no imports, input prompts or filesystem access.
        allowed = {name: getattr(__import__('builtins'), name) for name in
                   ('print', 'int', 'float', 'str', 'bool', 'type', 'len', 'abs', 'round', 'min', 'max', 'sum', 'range', 'list', 'tuple', 'dict', 'set', 'sorted', 'enumerate', 'zip')}
        namespace = {'__builtins__': allowed, '__name__': '__main__'}
        with contextlib.redirect_stdout(case_output), contextlib.redirect_stderr(io.StringIO()):
            exec(compile(ast.fix_missing_locations(tree), 'main.py', 'exec'), namespace)
        namespace['_stdout'] = ''.join(case_output.parts)
        case_cache[key] = namespace
        return namespace
    results = _lab_evaluate_checks(payload, error, check_ns, case_namespace)
    return json.dumps({'results':results, 'error':error, 'files':_lab_files(), 'stdout':output})

async def _lab_push(payload_json):
    payload = json.loads(payload_json)
    _lab_prepare(payload['files'])
    future = _lab_console.push(payload['line'])
    syntax = future.syntax_check
    error = None; display = None
    try:
        value = await future
        if value is not None: display = repr_shorten(value, limit=4096)
    except BaseException as exc:
        error = 'SyntaxError' if isinstance(exc, SyntaxError) else type(exc).__name__
        formatted = future.formatted_error
        if formatted: formatted = formatted.replace('_IncompleteInputError', 'SyntaxError')
        if formatted: sys.stderr.write(formatted)
        else: traceback.print_exception(type(exc), exc, exc.__traceback__.tb_next if exc.__traceback__ else None)
    return json.dumps({'syntax':syntax, 'error':error, 'display':display, 'files':_lab_files()})
`;
const initialized = new WeakSet();
function initialize(py) {
  if (!initialized.has(py)) {
    py.runPython(harness);
    initialized.add(py);
  }
}
export async function execute(py, payload) {
  await ensurePackages(py, payload.files);
  initialize(py);
  const fn = py.globals.get("_lab_run");
  try {
    return JSON.parse(fn(JSON.stringify(payload)));
  } finally {
    fn.destroy();
  }
}
export async function consoleLine(py, payload) {
  initialize(py);
  const pending = py.runPython(
    '"\\n".join(_lab_console.buffer) if _lab_console is not None else ""',
  );
  await ensurePackages(py, payload.files, pending + "\n" + payload.line);
  const fn = py.globals.get("_lab_push");
  try {
    return JSON.parse(await fn(JSON.stringify(payload)));
  } finally {
    fn.destroy();
  }
}
