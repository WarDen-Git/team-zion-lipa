import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/image";
import { ClockIcon, PinIcon, ChevronRightIcon } from "./icons";
import type { EventDoc } from "@/sanity/queries";

function formatDateTime(d: string) {
  return new Date(d).toLocaleString("en-PH", {
    weekday: "short",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  });
}

export function EventCard({ event }: { event: EventDoc }) {
  const img = event.image
    ? urlForImage(event.image).width(800).height(450).fit("crop").url()
    : null;
  const href = event.slug?.current ? `/events/${event.slug.current}` : null;

  const card = (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
      {img ? (
        <div className="relative aspect-video w-full bg-slate-100">
          <Image src={img} alt={event.title} fill className="object-cover" />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-50">
          <ClockIcon width={32} height={32} className="text-brand-500" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          <ClockIcon width={15} height={15} />
          {formatDateTime(event.startDate)}
        </p>
        <h3 className="mt-1.5 font-display text-xl font-semibold text-brand-900 group-hover:text-brand-700">
          {event.title}
        </h3>
        {event.location && (
          <p className="mt-1 flex items-start gap-1.5 text-sm text-slate-500">
            <PinIcon width={15} height={15} className="mt-0.5 shrink-0" />
            {event.location}
          </p>
        )}
        {event.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {event.description}
          </p>
        )}
        {href && (
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
            View details
            <ChevronRightIcon
              width={16}
              height={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        )}
      </div>
    </article>
  );

  return href ? (
    <Link href={href} className="group block h-full">
      {card}
    </Link>
  ) : (
    card
  );
}
