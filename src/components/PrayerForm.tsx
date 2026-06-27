"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500";

export function PrayerForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl bg-gold-400/20 p-6 text-brand-900">
        🙏 We received your request and our team will be praying for you.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="pf-name" className="mb-1 block text-sm font-medium">
          Name (optional)
        </label>
        <input id="pf-name" name="name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="pf-email" className="mb-1 block text-sm font-medium">
          Email (optional, if you&apos;d like a reply)
        </label>
        <input id="pf-email" name="email" type="email" className={inputClass} />
      </div>
      <div>
        <label htmlFor="pf-request" className="mb-1 block text-sm font-medium">
          How can we pray for you?
        </label>
        <textarea
          id="pf-request"
          name="request"
          required
          rows={5}
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-slate-600">
        <input type="checkbox" name="private" value="yes" className="mt-0.5" />
        <span>Keep this request private to the pastoral team.</span>
      </label>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-brand-950 hover:bg-gold-400 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit prayer request"}
      </button>
    </form>
  );
}
