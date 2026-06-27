"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
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
      <div className="rounded-xl bg-brand-50 p-6 text-brand-900">
        🙏 Thank you for reaching out! We&apos;ll get back to you soon.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input id="cf-name" name="name" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-phone" className="mb-1 block text-sm font-medium">
          Phone (optional)
        </label>
        <input id="cf-phone" name="phone" className={inputClass} />
      </div>
      <div>
        <label htmlFor="cf-message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-slate-600">
        <input type="checkbox" required className="mt-0.5" />
        <span>
          I agree that my details may be used to respond to my message, in line
          with the church&apos;s Privacy Policy (RA 10173).
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
