"use client";

import { useMemo, useState } from "react";
import { SermonCard } from "./SermonCard";
import { Reveal } from "./Reveal";
import type { Sermon } from "@/sanity/queries";

const PAGE_SIZE = 9;

const inputClass =
  "w-full rounded-full border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500";

export function SermonsBrowser({ sermons }: { sermons: Sermon[] }) {
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState("all");
  const [count, setCount] = useState(PAGE_SIZE);

  const seriesList = useMemo(
    () =>
      Array.from(
        new Set(sermons.map((s) => s.series).filter(Boolean) as string[]),
    ).sort(),
    [sermons],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sermons.filter((s) => {
      if (series !== "all" && s.series !== series) return false;
      if (!q) return true;
      return [s.title, s.speaker, s.description, s.series]
        .filter(Boolean)
        .some((t) => (t as string).toLowerCase().includes(q));
    });
  }, [sermons, query, series]);

  const visible = filtered.slice(0, count);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCount(PAGE_SIZE);
            }}
            placeholder="Search messages, speakers…"
            aria-label="Search sermons"
            className={inputClass}
          />
        </div>
        {seriesList.length > 0 && (
          <select
            value={series}
            onChange={(e) => {
              setSeries(e.target.value);
              setCount(PAGE_SIZE);
            }}
            aria-label="Filter by series"
            className="rounded-full border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 sm:w-56"
          >
            <option value="all">All series</option>
            {seriesList.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl bg-slate-50 p-10 text-center text-slate-500 ring-1 ring-slate-100">
          No messages match your search.
        </p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((s, i) => (
              <Reveal key={s._id} delay={(i % 3) * 80}>
                <SermonCard sermon={s} />
              </Reveal>
            ))}
          </div>
          {count < filtered.length && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setCount((c) => c + PAGE_SIZE)}
                className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
