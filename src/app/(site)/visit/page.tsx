import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { getSettings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Everything you need to know before visiting Team Zion Lipa for the first time — service times, location, and what to expect.",
};

export default async function VisitPage() {
  const settings = await getSettings();
  const serviceTimes = settings?.serviceTimes ?? [];

  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl font-bold text-brand-900">
        Plan Your Visit
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-700">
        We can&apos;t wait to meet you. Here&apos;s everything you need for a
        great first visit.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-brand-900">
            When We Gather
          </h2>
          <ul className="mt-4 space-y-3">
            {(serviceTimes.length > 0
              ? serviceTimes
              : [
                  { day: "Sunday", time: "9:00 AM", label: "Morning Service" },
                  { day: "Sunday", time: "4:00 PM", label: "Afternoon Service" },
                ]
            ).map((s, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between border-b border-slate-100 pb-2"
              >
                <span className="font-semibold text-slate-900">{s.day}</span>
                <span className="text-slate-700">
                  {s.time} {s.label ? `· ${s.label}` : ""}
                </span>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-2xl font-semibold text-brand-900">
            What to Expect
          </h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>🅿️ Easy parking and a warm welcome at the door.</li>
            <li>🎶 About 75 minutes of worship and a practical message.</li>
            <li>🧒 A safe, fun environment for kids.</li>
            <li>👕 Come as you are — casual is perfectly fine.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold text-brand-900">
            Find Us
          </h2>
          {settings?.address && (
            <p className="mt-4 whitespace-pre-line text-slate-700">
              {settings.address}
            </p>
          )}
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
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
                Add your Google Maps embed URL in the Studio (Site Settings) to
                show a map here.
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
