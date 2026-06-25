"use client";

import { useState } from "react";
import type { Announcement } from "@/sanity/queries";

export function AnnouncementBar({
  announcement,
}: {
  announcement: Announcement | null;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (!announcement || dismissed) return null;

  const body = (
    <span>
      <strong className="font-semibold">{announcement.title}:</strong>{" "}
      {announcement.message}
    </span>
  );

  return (
    <div className="bg-brand-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-sm sm:px-6 lg:px-8">
        {announcement.link ? (
          <a href={announcement.link} className="underline-offset-2 hover:underline">
            {body}
          </a>
        ) : (
          body
        )}
        <button
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="shrink-0 text-white/70 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
