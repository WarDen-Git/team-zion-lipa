import Link from "next/link";
import { Container } from "@/components/Container";
import { VideoEmbed } from "@/components/VideoEmbed";
import { EventCard } from "@/components/EventCard";
import { getSettings, getSermons, getUpcomingEvents } from "@/sanity/queries";

export default async function HomePage() {
  const [settings, sermons, events] = await Promise.all([
    getSettings(),
    getSermons(),
    getUpcomingEvents(),
  ]);

  const latestSermon = sermons[0];
  const serviceTimes = settings?.serviceTimes ?? [];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-900 to-brand-700 text-white">
        <Container className="py-20 sm:py-28 text-center">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-gold-400">
            Welcome to
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-6xl">
            Team Zion Lipa
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-brand-100">
            {settings?.tagline ??
              "A Christ-centered church in Lipa City. Wherever you are on your journey of faith, there's a place for you here."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/visit"
              className="rounded-full bg-gold-500 px-7 py-3 font-semibold text-brand-950 hover:bg-gold-400"
            >
              Plan Your Visit
            </Link>
            <Link
              href="/sermons"
              className="rounded-full border border-white/40 px-7 py-3 font-semibold text-white hover:bg-white/10"
            >
              Watch a Message
            </Link>
          </div>
        </Container>
      </section>

      {/* Service times */}
      <section className="border-b border-slate-100">
        <Container className="grid gap-6 py-12 sm:grid-cols-3">
          {(serviceTimes.length > 0
            ? serviceTimes
            : [{ day: "Sunday", time: "9:00 AM & 4:00 PM", label: "Worship Service" }]
          ).map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-2xl font-bold text-brand-900">
                {s.day}
              </p>
              <p className="mt-1 text-lg text-slate-700">{s.time}</p>
              {s.label && <p className="text-sm text-slate-500">{s.label}</p>}
            </div>
          ))}
        </Container>
      </section>

      {/* New here CTA */}
      <section>
        <Container className="py-16">
          <div className="grid items-center gap-8 rounded-2xl bg-brand-50 p-8 sm:p-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-brand-900">
                New here?
              </h2>
              <p className="mt-3 text-slate-700">
                We&apos;d love to meet you. Here&apos;s everything you need to
                know before your first visit — what to expect, where to park,
                and how to find us.
              </p>
              <Link
                href="/visit"
                className="mt-6 inline-block rounded-full bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700"
              >
                What to Expect
              </Link>
            </div>
            <ul className="space-y-3 text-slate-700">
              <li>✅ Come as you are — no dress code.</li>
              <li>✅ Friendly people ready to welcome you.</li>
              <li>✅ A safe, fun space for your kids.</li>
              <li>✅ Worship, a practical message, and community.</li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Latest message */}
      {latestSermon && (
        <section className="bg-slate-50">
          <Container className="py-16">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-3xl font-bold text-brand-900">
                Latest Message
              </h2>
              <Link
                href="/sermons"
                className="text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                All sermons →
              </Link>
            </div>
            <div className="grid items-center gap-8 md:grid-cols-2">
              <VideoEmbed url={latestSermon.videoUrl} title={latestSermon.title} />
              <div>
                {latestSermon.series && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                    {latestSermon.series}
                  </span>
                )}
                <h3 className="mt-1 font-display text-2xl font-semibold text-brand-900">
                  {latestSermon.title}
                </h3>
                {latestSermon.speaker && (
                  <p className="mt-1 text-slate-500">{latestSermon.speaker}</p>
                )}
                {latestSermon.description && (
                  <p className="mt-3 text-slate-700">
                    {latestSermon.description}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Upcoming events */}
      {events.length > 0 && (
        <section>
          <Container className="py-16">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-3xl font-bold text-brand-900">
                Upcoming Events
              </h2>
              <Link
                href="/events"
                className="text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                All events →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.slice(0, 3).map((e) => (
                <EventCard key={e._id} event={e} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Connect CTA */}
      <section className="bg-brand-900 text-white">
        <Container className="py-16 text-center">
          <h2 className="font-display text-3xl font-bold">
            Let&apos;s stay connected
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Have a question, need prayer, or want to know more? We&apos;re here
            for you.
          </p>
          <Link
            href="/connect"
            className="mt-6 inline-block rounded-full bg-gold-500 px-7 py-3 font-semibold text-brand-950 hover:bg-gold-400"
          >
            Get in Touch
          </Link>
        </Container>
      </section>
    </>
  );
}
