import Link from "next/link";
import { Container } from "./Container";
import type { SiteSettings } from "@/sanity/queries";
import {
  FacebookIcon,
  YouTubeIcon,
  InstagramIcon,
  TikTokIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "./icons";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/visit", label: "Visit" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/connect", label: "Connect" },
  { href: "/give", label: "Give" },
];

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const social = settings?.social ?? {};
  const year = "2026";

  const socials = [
    { url: social.facebook, Icon: FacebookIcon, label: "Facebook" },
    { url: social.youtube, Icon: YouTubeIcon, label: "YouTube" },
    { url: social.instagram, Icon: InstagramIcon, label: "Instagram" },
    { url: social.tiktok, Icon: TikTokIcon, label: "TikTok" },
  ].filter((s) => s.url);

  return (
    <footer className="mt-24 border-t border-slate-100 bg-slate-50">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-bold text-brand-900">
            Team Zion <span className="text-gold-600">Lipa</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
            {settings?.tagline ?? "A Christ-centered church in Lipa City."}
          </p>
          {settings?.address && (
            <p className="mt-4 flex items-start gap-2 text-sm text-slate-600">
              <PinIcon className="mt-0.5 shrink-0 text-brand-500" width={18} height={18} />
              <span className="whitespace-pre-line">{settings.address}</span>
            </p>
          )}
          {socials.length > 0 && (
            <div className="mt-5 flex gap-2">
              {socials.map(({ url, Icon, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Service Times</p>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
            {(settings?.serviceTimes ?? []).map((s, i) => (
              <li key={i}>
                <span className="font-medium text-slate-700">{s.day}</span>{" "}
                {s.time}
              </li>
            ))}
            {(settings?.serviceTimes ?? []).length === 0 && (
              <li>See you this Sunday — check the Visit page.</li>
            )}
          </ul>

          <p className="mt-5 text-sm font-semibold text-slate-900">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {settings?.email && (
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2 hover:text-brand-700"
                >
                  <MailIcon width={16} height={16} className="text-brand-500" />
                  {settings.email}
                </a>
              </li>
            )}
            {settings?.phone && (
              <li className="flex items-center gap-2">
                <PhoneIcon width={16} height={16} className="text-brand-500" />
                {settings.phone}
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-slate-200">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {year} Team Zion Lipa. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-brand-700">
            Privacy Policy
          </Link>
        </Container>
      </div>
    </footer>
  );
}
