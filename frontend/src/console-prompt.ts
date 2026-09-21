// Keep the Python prompt state independent from its visual presentation.
export function displayConsolePrompt(prompt: string): string {
  return prompt === ">>>" ? ">" : prompt;
}
