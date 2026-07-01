import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { GivingMethods } from "@/components/GivingMethods";
import { getSettings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Give",
  description: "Support the mission and ministry of Team Zion Lipa.",
};

export default async function GivePage() {
  const settings = await getSettings();
  const methods = settings?.givingMethods ?? [];

  return (
    <>
      <PageHeader
        eyebrow="Thank you for your generosity"
        title="Give"
        description="Your giving fuels our mission to reach Lipa City and beyond with the love of Christ."
      />
      <Section>
        {methods.length > 0 ? (
          <>
            <p className="mb-8 max-w-2xl text-slate-700">
              You may give your tithes and offerings through any of the accounts
              below. Tap <span className="font-semibold">Copy</span> to copy the
              account number, or scan the QR code.
            </p>
            <GivingMethods methods={methods} />
            {settings?.givingNote && (
              <p className="mt-8 max-w-2xl whitespace-pre-line text-sm text-slate-500">
                {settings.givingNote}
              </p>
            )}
          </>
        ) : (
          <div className="max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-8">
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
                  In the meantime, you can give in person during our services,
                  or contact us for bank/GCash details.
                </p>
              </>
            )}
          </div>
        )}
      </Section>
    </>
  );
}
