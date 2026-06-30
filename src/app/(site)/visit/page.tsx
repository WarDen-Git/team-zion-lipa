import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { ButtonLink } from "@/components/Button";
import { ClockIcon, PinIcon } from "@/components/icons";
import { getSettings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Everything you need to know before visiting Team Zion Lipa for the first time — service times, location, and what to expect.",
};

export default async function VisitPage() {
  const settings = await getSettings();
  const serviceTimes =
    settings?.serviceTimes && settings.serviceTimes.length > 0
      ? settings.serviceTimes
      : [
          { day: "Sunday", time: "9:00 AM", label: "Morning Service" },
          { day: "Sunday", time: "4:00 PM", label: "Afternoon Service" },
        ];

  // Pull the exact pin coordinates out of whatever Google Maps URL is saved so
  // "Get Directions" points to the same spot as the map. Supports the embed
  // (...!2d<lng>!3d<lat>...), the q=<lat>,<lng> format, and @<lat>,<lng>.
  // Falls back to an address search if no coordinates are found.
  const embed = settings?.mapEmbedUrl ?? "";
  const pb = embed.match(/!2d(-?\d+(?:\.\d+)?)!3d(-?\d+(?:\.\d+)?)/);
  const qOrAt = embed.match(/[?&@]q=?(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  const dest = pb
    ? `${pb[2]},${pb[1]}` // pb gives lng then lat
    : qOrAt
      ? `${qOrAt[1]},${qOrAt[2]}` // q/@ give lat then lng
      : encodeURIComponent(
          settings?.address || "Team Zion Lipa, Lipa City, Batangas",
        );
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest}`;

  const faqs = [
    {
      q: "Do I need to be a member or bring anything?",
      a: "Not at all! Just come as you are. There's nothing you need to bring or prepare — we're simply glad you're here.",
    },
    {
      q: "What should I wear?",
      a: "Whatever's comfortable. Most people dress casually — there's no dress code.",
    },
    {
      q: "How long is a service?",
      a: "Services run about two hours, including worship and the message.",
    },
    {
      q: "Is there anything for my kids?",
      a: "Yes — we provide a safe, fun environment for children during the service.",
    },
    {
      q: "Where do I park?",
      a: "Parking is available on-site, and a friendly team will help you find your way in.",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="We can't wait to meet you"
        title="Plan Your Visit"
        description="Here's everything you need for a great first visit."
      />
      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-brand-900">
              <ClockIcon className="text-brand-500" /> When We Gather
            </h2>
            <ul className="mt-5 space-y-3">
              {serviceTimes.map((s, i) => (
                <li
                  key={i}
                  className="flex items-baseline justify-between rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100"
                >
                  <span className="font-semibold text-slate-900">{s.day}</span>
                  <span className="text-slate-700">
                    {s.time}
                    {s.label ? ` · ${s.label}` : ""}
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl font-semibold text-brand-900">
              What to Expect
            </h2>
            <ul className="mt-5 space-y-3 text-slate-700">
              {[
                ["🅿️", "Easy parking and a warm welcome at the door."],
                ["🎶", "Worship and a practical, encouraging message."],
                ["🧒", "A safe, fun environment for kids."],
                ["👕", "Come as you are — casual is perfectly fine."],
              ].map(([emoji, text]) => (
                <li key={text} className="flex items-start gap-3">
                  <span aria-hidden>{emoji}</span>
                  {text}
                </li>
              ))}
            </ul>

            <ButtonLink href="/connect" className="mt-8">
              Questions? Get in touch
            </ButtonLink>
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-brand-900">
              <PinIcon className="text-brand-500" /> Find Us
            </h2>
            {settings?.address && (
              <p className="mt-4 whitespace-pre-line leading-relaxed text-slate-700">
                {settings.address}
              </p>
            )}
            <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-slate-200">
              {settings?.mapEmbedUrl ? (
                <iframe
                  src={settings.mapEmbedUrl}
                  title="Map to Team Zion Lipa"
                  className="h-80 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-80 items-center justify-center bg-slate-50 p-6 text-center text-sm text-slate-500">
                  A map will appear here once the location is added.
                </div>
              )}
            </div>
            <ButtonLink
              href={directionsUrl}
              variant="ghost"
              className="mt-4 ring-1 ring-brand-200"
            >
              <PinIcon width={18} height={18} />
              Get Directions
            </ButtonLink>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-brand-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 divide-y divide-slate-100 rounded-2xl ring-1 ring-slate-100">
            {faqs.map((item) => (
              <details key={item.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-slate-900">
                  {item.q}
                  <span className="ml-4 text-brand-500 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
