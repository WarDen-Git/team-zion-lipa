import Image from "next/image";
import { urlForImage } from "@/sanity/image";
import type { EventDoc } from "@/sanity/queries";

function formatDateTime(d: string) {
  return new Date(d).toLocaleString("en-PH", {
    weekday: "short",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function EventCard({ event }: { event: EventDoc }) {
  const img = event.image ? urlForImage(event.image).width(800).height(450).url() : null;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      {img && (
        <div className="relative aspect-video w-full bg-slate-100">
          <Image src={img} alt={event.title} fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-semibold text-brand-600">
          {formatDateTime(event.startDate)}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold text-brand-900">
          {event.title}
        </h3>
        {event.location && (
          <p className="mt-1 text-sm text-slate-500">📍 {event.location}</p>
        )}
        {event.description && (
          <p className="mt-2 line-clamp-3 text-sm text-slate-600">
            {event.description}
          </p>
        )}
        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block self-start rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Register / RSVP
          </a>
        )}
      </div>
    </article>
  );
}
