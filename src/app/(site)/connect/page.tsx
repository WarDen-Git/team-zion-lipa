import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { PrayerForm } from "@/components/PrayerForm";
import { MailIcon, PhoneIcon } from "@/components/icons";
import { getSettings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Get in touch with Team Zion Lipa, or send us a prayer request. We'd love to hear from you.",
};

export default async function ConnectPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow="We'd love to hear from you"
        title="Connect"
        description="Questions, prayer, or just want to say hello? Reach out — a real person will get back to you."
      />
      <Section>
        {(settings?.email || settings?.phone) && (
          <div className="mb-10 flex flex-wrap gap-3">
            {settings?.email && (
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800 ring-1 ring-brand-100 hover:bg-brand-100"
              >
                <MailIcon width={16} height={16} /> {settings.email}
              </a>
            )}
            {settings?.phone && (
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800 ring-1 ring-brand-100">
                <PhoneIcon width={16} height={16} /> {settings.phone}
              </span>
            )}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-brand-900">
              Send a Message
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We&apos;ll reply as soon as we can.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-gold-400/10 to-white p-6 shadow-sm ring-1 ring-gold-400/30 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-brand-900">
              Prayer Request
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Our team would be honored to pray with you. Nothing is too big or
              too small.
            </p>
            <div className="mt-6">
              <PrayerForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
