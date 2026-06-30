"use client";

import { useEffect, useMemo, useState } from "react";
import { ClockIcon } from "./icons";
import type { ServiceTime } from "@/sanity/queries";

const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const MANILA_OFFSET = 8 * 3600 * 1000; // PH is UTC+8, no DST

type Parsed = { weekday: number; hour: number; minute: number; label: string };

function parse(times: ServiceTime[]): Parsed[] {
  const out: Parsed[] = [];
  for (const s of times) {
    const weekday = DAYS.indexOf((s.day ?? "").trim().toLowerCase());
    if (weekday < 0) continue;
    const m = (s.time ?? "").match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (!m) continue;
    let hour = parseInt(m[1], 10);
    const minute = m[2] ? parseInt(m[2], 10) : 0;
    const ap = m[3]?.toLowerCase();
    if (ap === "pm" && hour < 12) hour += 12;
    if (ap === "am" && hour === 12) hour = 0;
    out.push({
      weekday,
      hour,
      minute,
      label: [s.day, s.time].filter(Boolean).join(" · "),
    });
  }
  return out;
}

function nextOccurrence(svc: Parsed, nowMs: number): number {
  const nowM = new Date(nowMs + MANILA_OFFSET); // UTC fields = Manila wall clock
  const target = new Date(nowM.getTime());
  target.setUTCHours(svc.hour, svc.minute, 0, 0);
  const dayDiff = (svc.weekday - nowM.getUTCDay() + 7) % 7;
  target.setUTCDate(nowM.getUTCDate() + dayDiff);
  if (target.getTime() <= nowM.getTime())
    target.setUTCDate(target.getUTCDate() + 7);
  return target.getTime() - MANILA_OFFSET; // back to real UTC instant
}

type State = { label: string; d: number; h: number; m: number; s: number };

export function NextService({ serviceTimes }: { serviceTimes: ServiceTime[] }) {
  const parsed = useMemo(() => parse(serviceTimes), [serviceTimes]);
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    if (parsed.length === 0) return;
    const tick = () => {
      const now = Date.now();
      let soonest: Parsed | null = null;
      let soonestMs = Infinity;
      for (const svc of parsed) {
        const t = nextOccurrence(svc, now);
        if (t < soonestMs) {
          soonestMs = t;
          soonest = svc;
        }
      }
      if (!soonest) return;
      const diff = Math.max(0, soonestMs - now);
      setState({
        label: soonest.label,
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [parsed]);

  // No parseable service times -> render nothing (server + client agree).
  if (parsed.length === 0) return null;

  // The frame renders at a fixed size on the server (digits show "--" until the
  // client mounts), so hydration never causes layout shift (CLS).
  const parts: { l: string; v: number | null }[] = [
    { l: "days", v: state?.d ?? null },
    { l: "hrs", v: state?.h ?? null },
    { l: "min", v: state?.m ?? null },
    { l: "sec", v: state?.s ?? null },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-brand-50 px-6 py-5 ring-1 ring-brand-100 sm:flex-row sm:gap-6">
      <p className="flex items-center gap-2 text-sm font-medium text-brand-800">
        <ClockIcon width={18} height={18} className="text-brand-500" />
        Next service{state ? " · " : ""}
        {state && <span className="font-semibold">{state.label}</span>}
      </p>
      <div className="flex gap-3" role="timer" aria-live="off">
        {parts.map((p) => (
          <div key={p.l} className="text-center">
            <div className="min-w-[2.5rem] rounded-lg bg-white px-2 py-1.5 font-display text-xl font-bold tabular-nums text-brand-900 shadow-sm">
              {p.v === null ? "--" : String(p.v).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-600">
              {p.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
