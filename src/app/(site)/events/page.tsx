import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/EventCard";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { ClockIcon } from "@/components/icons";
import { getUpcomingEvents, type EventDoc } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events and gatherings at Team Zion Lipa.",
};

// Group upcoming events (already sorted ascending) by "Month YYYY".
function groupByMonth(events: EventDoc[]) {
  const groups: { key: string; items: EventDoc[] }[] = [];
  for (const e of events) {
    const key = new Date(e.startDate).toLocaleString("en-PH", {
      month: "long",
      year: "numeric",
      timeZone: "Asia/Manila",
    });
    let g = groups.find((x) => x.key === key);
    if (!g) {
      g = { key, items: [] };
      groups.push(g);
    }
    g.items.push(e);
  }
  return groups;
}

export default async function EventsPage() {
  const events = await getUpcomingEvents();
  const groups = groupByMonth(events);

  return (
    <>
      <PageHeader
        eyebrow="What's on"
        title="Events"
        description="There's always something happening. Join us!"
      />
      <Section>
        {events.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl bg-slate-50 p-12 text-center ring-1 ring-slate-100">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <ClockIcon width={26} height={26} />
            </span>
            <p className="mt-4 font-display text-lg font-semibold text-brand-900">
              No upcoming events right now
            </p>
            <p className="mt-1 max-w-md text-sm text-slate-500">
              Check back soon — we&apos;d love to see you at our next gathering.
              In the meantime, join us this Sunday!
            </p>
            <ButtonLink href="/visit" className="mt-6">
              Plan Your Visit
            </ButtonLink>
          </div>
        ) : (
          <div className="space-y-14">
            {groups.map((group) => (
              <div key={group.key}>
                <h2 className="mb-6 flex items-center gap-3 font-display text-2xl font-semibold text-brand-900">
                  <span className="h-px flex-none bg-gold-500" style={{ width: 24 }} />
                  {group.key}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((e, i) => (
                    <Reveal key={e._id} delay={(i % 3) * 80}>
                      <EventCard event={e} />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
