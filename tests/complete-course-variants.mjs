export function variantsFor(a) {
  const variants = [];
  if(a.id === 'python-v3-11-04') {
    variants.push({name:'Dutch retry messages',passes:true,files:{'reader.py':a.solution['reader.py'].replace('Try a number','Probeer een getal').replace('Use a finite number of 0 or more','Gebruik een eindig getal van 0 of meer')}});
    variants.push({name:'silent conversion retry',passes:false,failedCheckpoint:0,files:{'reader.py':a.solution['reader.py'].replace('print("Try a number")','pass')}});
  }
  const mutation = (id, file, from, to, step, name) => {
    if (a.id !== id) return;
    if (!a.solution[file]?.includes(from))
      throw Error(`Stale variant ${id}: ${name}`);
    variants.push({
      name,
      passes: false,
      failedCheckpoint: step - 1,
      files: { [file]: a.solution[file].replace(from, to) },
    });
  };
  const alternative = (id, code, name) => {
    if (a.id === id)
      variants.push({ name, passes: true, files: { "main.py": code } });
  };
  mutation(
    "python-v3-1-02",
    "main.py",
    "subtotal = quantity * price",
    "subtotal = 10",
    1,
    "hardcoded subtotal",
  );
  mutation(
    "python-v3-2-03",
    "main.py",
    "balance >= cost",
    "balance > cost",
    1,
    "exclusive boundary",
  );
  mutation(
    "python-v3-4-04",
    "main.py",
    "fee=3",
    "fee=0",
    1,
    "wrong omitted default",
  );
  mutation(
    "python-v3-5-02",
    "main.py",
    "snapshot = scores.copy()",
    "snapshot = scores",
    1,
    "alias instead of snapshot",
  );
  mutation(
    "python-v3-6-03",
    "main.py",
    "Decimal(price_text)",
    "Decimal(float(price_text))",
    1,
    "float contamination of Decimal",
  );
  mutation(
    "python-v3-9-03",
    "main.py",
    "return sorted(scores, reverse=True)",
    "return scores.sort(reverse=True)",
    1,
    "mutation returns None",
  );
  mutation(
    "python-v3-9-01",
    "main.py",
    "last = result.pop()",
    "last = result[-1]\n    del result[-1]",
    2,
    "focused pop practice requires pop",
  );
  mutation(
    "python-v3-10-05",
    "main.py",
    'return "{0}: {1}".format(name, score)',
    'return f"{name}: {score}"',
    2,
    "focused format practice requires format",
  );
  mutation(
    "python-v3-11-02",
    "main.py",
    "except ValueError:",
    "except Exception:",
    2,
    "overbroad exception hides caller bug",
  );
  mutation(
    "python-v3-11-03",
    "main.py",
    "0 <= age <= 120",
    "0 < age < 120",
    1,
    "zero and upper bound rejected",
  );
  mutation(
    "python-v3-13-03",
    "main.py",
    '"a", encoding="utf-8"',
    '"w", encoding="utf-8"',
    2,
    "append accidentally overwrites",
  );
  mutation(
    "python-v3-14-05",
    "main.py",
    "except FileNotFoundError:",
    "except Exception:",
    2,
    "damaged JSON silently discarded",
  );
  mutation(
    "python-v3-15-04",
    "main.py",
    "        self.notes = []",
    "        self.notes = Notebook.shared",
    1,
    "notes shared across instances",
  );
  if (a.id === "python-v3-15-04" && variants.length)
    variants.at(-1).files["main.py"] = variants
      .at(-1)
      .files[
        "main.py"
      ].replace("class Notebook:", "class Notebook:\n    shared = []");
  mutation(
    "python-v3-15-06",
    "main.py",
    "if seconds >= 0:",
    "if True:",
    1,
    "negative tick adds time",
  );
  mutation(
    "python-v3-16-02",
    "game.py",
    '    if state != "playing":\n        return state, left, right\n',
    "",
    2,
    "same miss scores repeatedly",
  );
  alternative(
    "python-v3-4-05",
    "def booking_total(seats, price, discount=0):\n    if seats <= 0: return 0\n    if seats * price < discount: return 0\n    return price * seats - discount\nprint(booking_total(3, 4, 2))\n",
    "equivalent branching",
  );
  alternative(
    "python-v3-5-05",
    "def recording_stats(values, limit):\n    i = 0\n    total = 0\n    above = 0\n    while i < len(values):\n        total += values[i]\n        if values[i] > limit: above += 1\n        i += 1\n    return (total, above)\nprint(recording_stats([2, 6, -1, 6], 2))\n",
    "independent indexed loop",
  );
  alternative(
    "python-v3-10-06",
    'def clean_tags(text):\n    tags = []\n    for line in text.split("\\n"):\n        tag = line.lower().strip().replace(" ", "-")\n        if tag and tag not in tags: tags.append(tag)\n    tags.sort()\n    return tags\nprint(clean_tags(" Ada \\nBo\\nada\\n \\nCee Dee"))\n',
    "independent split and in-place sort",
  );
  alternative(
    "python-v3-15-06",
    "class Timer:\n    def __init__(self, duration):\n        self.duration = duration\n        self.remaining = duration\n    def tick(self, seconds=1):\n        if seconds < 0: return self.remaining\n        self.remaining -= seconds\n        if self.remaining < 0: self.remaining = 0\n        return self.remaining\n    def reset(self):\n        self.remaining = self.duration\ntimer = Timer(5)\nprint(timer.tick(2))\n",
    "independent explicit clamp",
  );
  return variants;
}
