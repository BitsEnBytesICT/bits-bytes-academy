import { useState } from "react";
import type { Language } from "../../../shared/types";
import { newFileError } from "../workspace-files";

export function CreateFileForm({
  files,
  language,
  onCreate,
}: {
  files: Record<string, string>;
  language: Language;
  onCreate: (name: string) => void;
}) {
  const [name, setName] = useState(""),
    [message, setMessage] = useState("");
  const tr = (en: string, nl: string) => (language === "nl" ? nl : en);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const filename = name.trim(),
          issue = newFileError(filename, files);
        if (issue) {
          setMessage(
            issue === "duplicate"
              ? tr(
                  "That file already exists. Select its tab to edit it.",
                  "Dat bestand bestaat al. Selecteer de tab om het te bewerken.",
                )
              : issue === "limit"
                ? tr(
                    "This workspace already has 40 files.",
                    "Deze werkruimte heeft al 40 bestanden.",
                  )
                : issue === "python-module"
                  ? tr(
                      "Use a Python module name such as shipping.py: letters, digits and underscores, starting with a letter or underscore. Python keywords cannot be module names.",
                      "Gebruik een Pythonmodulenaam zoals shipping.py: letters, cijfers en underscores, beginnend met een letter of underscore. Python-trefwoorden kunnen geen modulenaam zijn.",
                    )
                  : tr(
                      "Use a filename of at most 100 characters. Folder paths are not supported.",
                      "Gebruik een bestandsnaam van maximaal 100 tekens. Mappaden worden niet ondersteund.",
                    ),
          );
          return;
        }
        onCreate(filename);
      }}
    >
      <h2>{tr("Create a file", "Maak een bestand")}</h2>
      <label htmlFor="new-file-name">{tr("Filename", "Bestandsnaam")}</label>
      <input
        id="new-file-name"
        className="new-file-name"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          setMessage("");
        }}
        placeholder="shipping.py"
        autoComplete="off"
        spellCheck={false}
        aria-invalid={!!message}
        aria-describedby="file-name-feedback"
      />
      <p id="file-name-feedback" role={message ? "alert" : undefined}>
        {message ||
          tr(
            "All files in this activity are saved together. Run starts main.py.",
            "Alle bestanden in deze activiteit worden samen opgeslagen. Run start main.py.",
          )}
      </p>
      <button className="primary" type="submit">
        {tr("Create file", "Maak bestand")}
      </button>
    </form>
  );
}
