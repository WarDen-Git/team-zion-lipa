import Link from "next/link";
import { Container } from "./Container";
import type { SiteSettings } from "@/sanity/queries";

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const social = settings?.social ?? {};
  const year = "2026"; // updated on each deploy; avoids server/client clock drift

  return (
    <footer className="mt-20 border-t border-slate-100 bg-slate-50">
      <Container className="grid gap-8 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-brand-900">
            Team Zion Lipa
          </p>
          <p className="mt-2 text-sm text-slate-600">
            {settings?.tagline ?? "A Christ-centered church in Lipa City."}
          </p>
          {settings?.address && (
            <p className="mt-3 whitespace-pre-line text-sm text-slate-600">
              {settings.address}
            </p>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Service Times</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            {(settings?.serviceTimes ?? []).map((s, i) => (
              <li key={i}>
                <span className="font-medium">{s.day}</span> {s.time}
                {s.label ? ` · ${s.label}` : ""}
              </li>
            ))}
            {(settings?.serviceTimes ?? []).length === 0 && (
              <li>See you this Sunday — check the Visit page.</li>
            )}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">Connect</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>
              <Link href="/connect" className="hover:text-brand-700">
                Contact us
              </Link>
            </li>
            {settings?.email && (
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-brand-700"
                >
                  {settings.email}
                </a>
              </li>
            )}
            {settings?.phone && <li>{settings.phone}</li>}
          </ul>
          <div className="mt-3 flex gap-4 text-sm">
            {social.facebook && (
              <a href={social.facebook} className="hover:text-brand-700">
                Facebook
              </a>
            )}
            {social.youtube && (
              <a href={social.youtube} className="hover:text-brand-700">
                YouTube
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram} className="hover:text-brand-700">
                Instagram
              </a>
            )}
          </div>
        </div>
      </Container>

      <Container className="flex flex-col items-center justify-between gap-2 border-t border-slate-200 py-6 text-xs text-slate-500 sm:flex-row">
        <p>© {year} Team Zion Lipa. All rights reserved.</p>
        <Link href="/privacy" className="hover:text-brand-700">
          Privacy Policy
        </Link>
      </Container>
    </footer>
  );
}
