import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { SermonsBrowser } from "@/components/SermonsBrowser";
import { ButtonLink } from "@/components/Button";
import { PlayIcon } from "@/components/icons";
import { getSermons, getSettings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Sermons",
  description: "Watch and re-watch messages from Team Zion Lipa.",
};

export default async function SermonsPage() {
  const [sermons, settings] = await Promise.all([getSermons(), getSettings()]);
  const watchUrl = settings?.social?.youtube || settings?.social?.facebook;

  return (
    <>
      <PageHeader
        eyebrow="Messages"
        title="Sermons"
        description="Catch up on recent messages, or revisit a favorite."
      />
      <Section>
        {sermons.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl bg-slate-50 p-12 text-center ring-1 ring-slate-100">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-brand-600">
              <PlayIcon width={26} height={26} />
            </span>
            <p className="mt-4 font-display text-lg font-semibold text-brand-900">
              Sermons coming soon
            </p>
            <p className="mt-1 max-w-md text-sm text-slate-500">
              We&apos;re preparing our message library. Check back soon, or
              follow us on social media to catch our latest services.
            </p>
            {watchUrl && (
              <ButtonLink href={watchUrl} className="mt-6">
                <PlayIcon width={18} height={18} />
                Watch on {settings?.social?.youtube ? "YouTube" : "Facebook"}
              </ButtonLink>
            )}
          </div>
        ) : (
          <SermonsBrowser sermons={sermons} />
        )}
      </Section>
    </>
  );
}
