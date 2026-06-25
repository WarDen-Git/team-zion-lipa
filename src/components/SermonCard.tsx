import { getYouTubeThumb } from "@/lib/video";
import type { Sermon } from "@/sanity/queries";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function SermonCard({ sermon }: { sermon: Sermon }) {
  const thumb = getYouTubeThumb(sermon.videoUrl);

  return (
    <a
      href={sermon.videoUrl}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="aspect-video w-full overflow-hidden bg-slate-100">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={sermon.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            ▶ Watch
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        {sermon.series && (
          <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
            {sermon.series}
          </span>
        )}
        <h3 className="mt-1 font-display text-lg font-semibold text-brand-900">
          {sermon.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {[sermon.speaker, formatDate(sermon.date)].filter(Boolean).join(" · ")}
        </p>
        {sermon.description && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
            {sermon.description}
          </p>
        )}
      </div>
    </a>
  );
}
