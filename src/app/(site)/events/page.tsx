import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EventCard } from "@/components/EventCard";
import { getUpcomingEvents } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events and gatherings at Team Zion Lipa.",
};

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl font-bold text-brand-900">Events</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-700">
        There&apos;s always something happening. Join us!
      </p>

      {events.length === 0 ? (
        <div className="mt-10 rounded-xl bg-slate-50 p-10 text-center text-slate-500">
          No upcoming events right now. Check back soon, or add one in the
          Studio.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <EventCard key={e._id} event={e} />
          ))}
        </div>
      )}
    </Container>
  );
}
