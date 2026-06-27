import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { getSettings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Give",
  description: "Support the mission and ministry of Team Zion Lipa.",
};

export default async function GivePage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow="Thank you for your generosity"
        title="Give"
        description="Your giving fuels our mission to reach Lipa City and beyond with the love of Christ."
      />
      <Section>
        <div className="max-w-2xl rounded-2xl bg-gradient-to-br from-brand-50 to-white p-8 ring-1 ring-brand-100">
          {settings?.givingNote ? (
            <p className="whitespace-pre-line leading-relaxed text-slate-700">
              {settings.givingNote}
            </p>
          ) : (
            <>
              <h2 className="font-display text-xl font-semibold text-brand-900">
                Online giving is coming soon
              </h2>
              <p className="mt-3 leading-relaxed text-slate-700">
                We&apos;re setting up secure online giving (GCash, Maya, and
                card). In the meantime, you can give in person during our
                services, or contact us for bank/GCash details.
              </p>
            </>
          )}
        </div>
      </Section>
    </>
  );
}
