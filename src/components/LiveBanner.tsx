import type { SiteSettings } from "@/sanity/queries";

/** Prominent banner shown only when staff flip "We're Live Now" on in Sanity. */
export function LiveBanner({ settings }: { settings: SiteSettings | null }) {
  if (!settings?.liveNow || !settings?.liveUrl) return null;

  return (
    <a
      href={settings.liveUrl}
      target="_blank"
      rel="noreferrer"
      className="block bg-red-600 text-white transition-colors hover:bg-red-700"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2.5 text-sm font-semibold">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        </span>
        We&apos;re LIVE now — click to watch
        <span aria-hidden>→</span>
      </div>
    </a>
  );
}
