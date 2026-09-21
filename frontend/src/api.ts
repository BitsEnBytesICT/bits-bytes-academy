import type { Workspace } from "../../shared/types";
export async function api<T>(
  url: string,
  body?: unknown,
  method?: string,
): Promise<T> {
  const response = await fetch("/api" + url, {
    method: method || (body === undefined ? "GET" : "POST"),
    headers: body === undefined ? {} : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok)
    throw Object.assign(
      new Error(
        data.error ||
          (response.status === 409
            ? "This activity was changed in another tab. Reload to use the saved version."
            : "Request failed"),
      ),
      { status: response.status, data },
    );
  return data;
}
export class WorkspaceStore {
  current: Workspace = { files: {}, revision: 0 };
  id = "";
  status: (s: string) => void = () => {};
  chain: Promise<void> = Promise.resolve();
  generation = 0;
  dirty = false;
  private loadVersion = 0;
  async load(id: string, files: Record<string, string>) {
    const version = ++this.loadVersion;
    const saved = await api<Workspace | null>("/workspaces/" + id);
    if (version !== this.loadVersion)
      return saved || { files: { ...files }, revision: 0 };
    this.id = id;
    this.current = saved || { files: { ...files }, revision: 0 };
    this.dirty = false;
    this.status("saved");
    const recovery = localStorage.getItem("python-lab-draft:" + id);
    if (recovery) {
      try {
        const local = JSON.parse(recovery);
        if (local.baseRevision === this.current.revision) {
          this.current = {
            ...local.workspace,
            revision: this.current.revision,
          };
          this.dirty = true;
          this.status("recovered");
        } else this.status("conflict");
      } catch {
        this.status("error");
      }
    }
    return this.current;
  }
  edit(patch: Partial<Workspace>) {
    this.current = { ...this.current, ...patch };
    this.generation++;
    this.dirty = true;
    localStorage.setItem(
      "python-lab-draft:" + this.id,
      JSON.stringify({
        baseRevision: this.current.revision,
        workspace: this.current,
      }),
    );
    this.status("unsaved");
  }
  async save() {
    this.chain = this.chain
      .catch(() => {})
      .then(async () => {
        if (!this.dirty) return;
        const id = this.id;
        const snapshot = structuredClone(this.current);
        const generation = this.generation;
        this.status("saving");
        try {
          const result = await api<{ revision: number }>(
            "/workspaces/" + id,
            snapshot,
            "PUT",
          );
          this.current.revision = result.revision;
          if (generation === this.generation) {
            this.dirty = false;
            localStorage.removeItem("python-lab-draft:" + id);
            this.status("saved");
          } else {
            localStorage.setItem(
              "python-lab-draft:" + id,
              JSON.stringify({
                baseRevision: result.revision,
                workspace: this.current,
              }),
            );
            this.status("unsaved");
          }
        } catch (e) {
          this.status((e as any).status === 409 ? "conflict" : "error");
          throw e;
        }
      });
    return this.chain;
  }
}
