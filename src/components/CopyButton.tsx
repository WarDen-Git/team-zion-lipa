"use client";

import { useState } from "react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked — no-op
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${value}`}
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
        copied
          ? "bg-green-600 text-white"
          : "bg-brand-600 text-white hover:bg-brand-700"
      }`}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
