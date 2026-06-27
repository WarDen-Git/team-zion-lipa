import { getYouTubeThumb } from "@/lib/video";
import { PlayIcon } from "./icons";
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
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <PlayIcon width={32} height={32} />
          </div>
        )}
        {/* play overlay */}
        <span className="absolute inset-0 flex items-center justify-center bg-brand-950/0 transition-colors duration-200 group-hover:bg-brand-950/30">
          <span className="flex h-14 w-14 translate-y-2 items-center justify-center rounded-full bg-white/90 text-brand-700 opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <PlayIcon width={24} height={24} className="ml-0.5" />
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        {sermon.series && (
          <span className="text-xs font-semibold uppercase tracking-wide text-gold-700">
            {sermon.series}
          </span>
        )}
        <h3 className="mt-1 font-display text-lg font-semibold text-brand-900 group-hover:text-brand-700">
          {sermon.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {[sermon.speaker, formatDate(sermon.date)].filter(Boolean).join(" · ")}
        </p>
        {sermon.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {sermon.description}
          </p>
        )}
      </div>
    </a>
  );
}
