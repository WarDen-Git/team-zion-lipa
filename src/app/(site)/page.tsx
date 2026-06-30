import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Section, SectionHeading } from "@/components/Section";
import { ButtonLink } from "@/components/Button";
import { VideoEmbed } from "@/components/VideoEmbed";
import { EventCard } from "@/components/EventCard";
import { GallerySection } from "@/components/GallerySection";
import { NextService } from "@/components/NextService";
import { Reveal } from "@/components/Reveal";
import {
  ClockIcon,
  ChevronRightIcon,
  PlayIcon,
  HeartIcon,
  BookIcon,
  UsersIcon,
  HandHeartIcon,
} from "@/components/icons";
import { urlForImage } from "@/sanity/image";
import { getSettings, getSermons, getUpcomingEvents } from "@/sanity/queries";

const values = [
  {
    Icon: HeartIcon,
    title: "Authentic Worship",
    text: "We gather to encounter God through heartfelt worship and prayer.",
  },
  {
    Icon: BookIcon,
    title: "Biblical Teaching",
    text: "Practical, Christ-centered messages rooted in God's Word.",
  },
  {
    Icon: UsersIcon,
    title: "Genuine Community",
    text: "Real friendships and small groups where everyone belongs.",
  },
  {
    Icon: HandHeartIcon,
    title: "Serving Others",
    text: "Loving Lipa City and beyond through compassion and outreach.",
  },
];

export default async function HomePage() {
  const [settings, sermons, events] = await Promise.all([
    getSettings(),
    getSermons(),
    getUpcomingEvents(),
  ]);

  const latestSermon = sermons[0];
  const allTimes =
    settings?.serviceTimes && settings.serviceTimes.length > 0
      ? settings.serviceTimes
      : [{ day: "Sunday", time: "9:00 AM & 4:00 PM", label: "Worship Service" }];
  // On the landing page show only services with a concrete time (skip "TBA").
  const timed = allTimes.filter((s) => s.time && !/tba/i.test(s.time));
  const serviceTimes = (timed.length > 0 ? timed : allTimes).slice(0, 3);

  const heroImg = settings?.heroImage
    ? urlForImage(settings.heroImage).width(1920).height(1080).fit("crop").url()
    : null;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        {/* optional background photo */}
        {heroImg && (
          <>
            <Image
              src={heroImg}
              alt=""
              fill
              priority
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-brand-950/70"
            />
          </>
        )}
        {/* decorative gradients (also serve as fallback when no photo) */}
        {!heroImg && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-800 via-brand-900 to-brand-950"
          />
        )}
        <div
          aria-hidden
          className="animate-float pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="animate-float pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl"
          style={{ animationDelay: "-4s" }}
        />
        <Container className="relative py-24 text-center sm:py-32">
          <p className="font-display text-sm uppercase tracking-[0.25em] text-gold-400 animate-fade-up">
            Welcome to
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight animate-fade-up sm:text-7xl">
            Team Zion Lipa
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-100 animate-fade-up">
            {settings?.tagline ??
              "A Christ-centered church in Lipa City. Wherever you are on your journey of faith, there's a place for you here."}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 animate-fade-up sm:flex-row">
            <ButtonLink href="/visit" variant="gold" size="lg">
              Plan Your Visit
            </ButtonLink>
            <ButtonLink href="/sermons" variant="outline" size="lg">
              <PlayIcon width={18} height={18} />
              Watch a Message
            </ButtonLink>
          </div>
          <a
            href="#welcome"
            aria-label="Scroll down"
            className="mt-16 hidden justify-center text-brand-200/70 transition-colors hover:text-white sm:flex"
          >
            <ChevronRightIcon
              width={28}
              height={28}
              className="rotate-90 animate-bounce"
            />
          </a>
        </Container>
      </section>

      {/* Next-service countdown (parses service times; hidden if none parse) */}
      <div id="welcome" className="bg-white">
        <Container className="pt-10">
          <NextService serviceTimes={allTimes} />
        </Container>
      </div>

      {/* Service times */}
      <div className="border-b border-slate-100 bg-white">
        <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:flex-wrap sm:justify-center">
          {serviceTimes.map((s, i) => (
            <div
              key={i}
              className="flex flex-1 items-center gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100 sm:max-w-xs"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <ClockIcon width={22} height={22} />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-brand-900">
                  {s.day}
                </p>
                <p className="text-slate-700">{s.time}</p>
                {s.label && <p className="text-xs text-slate-500">{s.label}</p>}
              </div>
            </div>
          ))}
        </Container>
      </div>

      {/* New here */}
      <Section>
        <Reveal className="grid items-center gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 to-white p-8 ring-1 ring-brand-100 sm:p-12 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="First time?"
              title="New here?"
              description="We'd love to meet you. Here's everything you need to know before your first visit — what to expect, where to park, and how to find us."
            />
            <ButtonLink href="/visit" className="mt-7">
              What to Expect
            </ButtonLink>
          </div>
          <ul className="space-y-4">
            {[
              "Come as you are — no dress code.",
              "Friendly people ready to welcome you.",
              "A safe, fun space for your kids.",
              "Worship, a practical message, and community.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-brand-950">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* What we're about */}
      <Section>
        <SectionHeading
          eyebrow="What we're about"
          title="Come as you are"
          description="Whoever you are and wherever you've been, you're welcome here. Here's what you'll find at Team Zion Lipa."
          align="center"
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, title, text }, i) => (
            <Reveal
              key={title}
              delay={i * 80}
              className="rounded-2xl bg-white p-6 text-center ring-1 ring-slate-100 transition-shadow hover:shadow-md"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon width={26} height={26} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {text}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Latest message */}
      {latestSermon && (
        <div className="bg-slate-50">
          <Section>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <SectionHeading eyebrow="Watch" title="Latest Message" />
              <Link
                href="/sermons"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                All sermons
                <ChevronRightIcon
                  width={16}
                  height={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
            <div className="grid items-center gap-8 md:grid-cols-2">
              <VideoEmbed url={latestSermon.videoUrl} title={latestSermon.title} />
              <div>
                {latestSermon.series && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-700">
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
                  <p className="mt-3 leading-relaxed text-slate-700">
                    {latestSermon.description}
                  </p>
                )}
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* Upcoming events */}
      {events.length > 0 && (
        <Section>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <SectionHeading eyebrow="What's on" title="Upcoming Events" />
            <Link
              href="/events"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              All events
              <ChevronRightIcon
                width={16}
                height={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((e, i) => (
              <Reveal key={e._id} delay={i * 80}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Photo gallery (shows only when images are added) */}
      {settings?.gallery && settings.gallery.length > 0 && (
        <div className="bg-slate-50">
          <GallerySection images={settings.gallery} />
        </div>
      )}

      {/* Connect CTA */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl"
        />
        <Container className="relative py-16 text-center sm:py-20">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Let&apos;s stay connected
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Have a question, need prayer, or want to know more? We&apos;re here
            for you.
          </p>
          <ButtonLink href="/connect" variant="gold" size="lg" className="mt-7">
            Get in Touch
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
