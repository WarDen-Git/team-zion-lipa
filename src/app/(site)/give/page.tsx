import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { getSettings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Give",
  description: "Support the mission and ministry of Team Zion Lipa.",
};

export default async function GivePage() {
  const settings = await getSettings();

  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl font-bold text-brand-900">Give</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-700">
        Thank you for your generosity. Your giving fuels our mission to reach
        Lipa City and beyond with the love of Christ.
      </p>

      <div className="mt-10 max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-8">
        {settings?.givingNote ? (
          <p className="whitespace-pre-line text-slate-700">
            {settings.givingNote}
          </p>
        ) : (
          <>
            <h2 className="font-display text-xl font-semibold text-brand-900">
              Online giving is coming soon
            </h2>
            <p className="mt-3 text-slate-700">
              We&apos;re setting up secure online giving (GCash, Maya, and card).
              In the meantime, you can give in person during our services, or
              contact us for bank/GCash details.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              <em>
                Tip: add temporary giving instructions in the Studio (Site
                Settings → Giving Page Note) and they&apos;ll appear here.
              </em>
            </p>
          </>
        )}
      </div>
    </Container>
  );
}
