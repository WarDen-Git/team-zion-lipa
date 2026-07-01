import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { ClockIcon, PinIcon, ChevronRightIcon } from "@/components/icons";
import { urlForImage } from "@/sanity/image";
import { getEvent, getEventSlugs } from "@/sanity/queries";

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return { title: "Event" };
  const image = event.image
    ? urlForImage(event.image).width(1200).url()
    : undefined;
  return {
    title: event.title,
    description: event.description,
    openGraph: image ? { images: [image] } : undefined,
  };
}

function formatRange(start: string, end?: string) {
  const date = new Date(start).toLocaleDateString("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Manila",
  });
  const time = (d: string) =>
    new Date(d).toLocaleTimeString("en-PH", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Manila",
    });
  return `${date} · ${time(start)}${end ? ` – ${time(end)}` : ""}`;
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  const poster = event.image
    ? urlForImage(event.image).width(1400).url()
    : null;
  const directionsUrl = event.location
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        event.location,
      )}`
    : null;

  return (
    <Section>
      <Link
        href="/events"
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
      >
        <ChevronRightIcon width={16} height={16} className="rotate-180" />
        All events
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        {poster && (
          <div>
            {/* Full, uncropped poster */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={poster}
              alt={event.title}
              className="w-full rounded-2xl ring-1 ring-slate-200"
            />
          </div>
        )}

        <div className={poster ? "" : "max-w-2xl"}>
          <h1 className="font-display text-3xl font-bold text-brand-900 sm:text-4xl">
            {event.title}
          </h1>

          <div className="mt-5 space-y-3">
            <p className="flex items-center gap-2 text-slate-700">
              <ClockIcon width={18} height={18} className="text-brand-500" />
              {formatRange(event.startDate, event.endDate)}
            </p>
            {event.location && (
              <p className="flex items-start gap-2 text-slate-700">
                <PinIcon
                  width={18}
                  height={18}
                  className="mt-0.5 shrink-0 text-brand-500"
                />
                {event.location}
              </p>
            )}
          </div>

          {event.description && (
            <p className="mt-6 whitespace-pre-line leading-relaxed text-slate-700">
              {event.description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {event.registrationUrl && (
              <ButtonLink href={event.registrationUrl}>
                Register / RSVP
              </ButtonLink>
            )}
            {directionsUrl && (
              <ButtonLink
                href={directionsUrl}
                variant="ghost"
                className="ring-1 ring-brand-200"
              >
                <PinIcon width={18} height={18} />
                Get Directions
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
