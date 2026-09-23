import { useMemo } from "react";
import { pythonTokens, type CodeToken } from "../python-highlighting";

export function CodeTokens({ tokens }: { tokens: CodeToken[] }) {
  return (
    <>
      {tokens.map((token, index) => (
        <span className={token.className} key={index}>
          {token.text}
        </span>
      ))}
    </>
  );
}

export function CodeBlock({
  code,
  className = "",
}: {
  code: string;
  className?: string;
}) {
  const tokens = useMemo(() => pythonTokens(code), [code]);
  return (
    <pre className={`python-code ${className}`}>
      <code>
        <CodeTokens tokens={tokens} />
      </code>
    </pre>
  );
}
