import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { PrayerForm } from "@/components/PrayerForm";
import { getSettings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Get in touch with Team Zion Lipa, or send us a prayer request. We'd love to hear from you.",
};

export default async function ConnectPage() {
  const settings = await getSettings();

  return (
    <Container className="py-16">
      <h1 className="font-display text-4xl font-bold text-brand-900">Connect</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-700">
        Questions, prayer, or just want to say hello? Reach out — a real person
        will get back to you.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-brand-900">
            Send a Message
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {settings?.email
              ? `Prefer email? Reach us at ${settings.email}.`
              : "We'll reply as soon as we can."}
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <div>
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
    </Container>
  );
}
