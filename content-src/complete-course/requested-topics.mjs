// Position-by-position crosswalk to the user's linked syllabus. The earlier
// authored catalogue retains the original URLs; no external lesson text is used.
// Repeated URLs in the request appear once here. Extra historic review lessons
// and the separate old errors chapter are not counted as requested entries.
export const requestedGroups = {
  "python-hello-world":
    "welcome|comments|print|strings|variables|errors|integers floats|arithmetic precedence|changing-numbers|exponents|modulo|concatenation|plus-equals|multiline-strings",
  "python-control-flow":
    "if|boolean-expressions|relational-operators|boolean-variables|if indentation|relational-operators|and|or|not|else|elif",
  "create-python-list":
    "lists|mixed-lists|empty-lists|list-methods|append|list-concatenation|indexing|negative-indexing|list-mutation|remove|2d-lists|2d-access|2d-mutation|list-review collections-review",
  "use-python-list":
    "insert remove pop|insert|pop|range-start-stop-step range-as-sequence|range-start-stop-step|len|slicing|omitted-slice-bounds|count|sort|sorted|collections-review",
  "learn-python-loops":
    "why-loops|why-loops|for|range-start-stop-step|while|list-while|infinite-loops|break|continue|nested-loops|list-comprehensions|conditional-comprehensions|loop-review",
  "intro-to-functions":
    "why-functions|why-functions|defining-functions|calling-functions|execution-flow|parameters|multiple-parameters|positional-arguments keyword-arguments default-arguments|builtins-vs-user-functions|local-scope|return|multiple-returns|function-review",
  "introduction-to-strings":
    "strings|string-indexing|string-slicing|string-concatenation|string-length string-slicing|string-negative-indices|string-immutability|escapes|string-iteration|string-iteration|string-membership|strings-review",
  "string-methods":
    "case-methods|case-methods|split-whitespace|split-delimiter|split-newlines split-tabs|join|join|strip|replace|find|format-positional|format-named|strings-review",
  "modules-python":
    "imports from-import|random|aliases|decimal|local-modules module-scope|module-review",
  "dictionaries-introduction":
    "dictionaries|dictionaries|valid-keys invalid-keys|empty-dictionaries|add-key|update|overwrite|dictionary-comprehensions|dictionary-review",
  "using-dictionaries":
    "dictionaries|get-key|key-error|get|delete-key dict-pop|keys|values|items|dictionary-review",
  "learn-python-files":
    "read|line-iteration|readline|write|append-file|with|csv-structure|csv-reader csv-dictreader csv-conversion|csv-delimiters csv-quoting|csv-writer|json-load|json-dump",
  "data-types":
    "types|class|instantiation|oop|class-variables|methods|method-arguments|constructors|instance-variables|hasattr getattr dir|self|everything-is-object|repr str",
};
export function requestedCrosswalk(legacy, topics) {
  const byTopic = new Map(topics.map((t) => [t.id, t]));
  return Object.entries(requestedGroups).flatMap(([group, rows]) =>
    rows.split("|").map((ids, index) => {
      const historic = legacy.activities.find(
        (a) => a.id === `${group}-${String(index + 1).padStart(2, "0")}`,
      );
      if (!historic?.sourceUrl)
        throw Error(`Missing reference URL: ${group} ${index + 1}`);
      const topicIds = ids.split(" ");
      for (const id of topicIds)
        if (!byTopic.has(id)) throw Error(`Missing requested topic ${id}`);
      return {
        sourceUrl: historic.sourceUrl,
        referenceTitle: historic.title,
        topicIds,
        evidence: topicIds.map((id) => ({
          topicId: id,
          introduction: byTopic.get(id).introduction,
          requiredPractice: byTopic.get(id).requiredPractice,
          assessment: byTopic.get(id).assessment,
          laterRetrieval: byTopic.get(id).laterRetrieval,
        })),
      };
    }),
  );
}
