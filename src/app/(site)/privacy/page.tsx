import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Team Zion Lipa collects and uses your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <Section>
        <div className="prose-church max-w-3xl">
        <p className="text-sm text-slate-500">
          Last updated: June 2026. Please review with legal counsel before
          launch.
        </p>

        <h2>Who we are</h2>
        <p>
          Team Zion Lipa (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this
          website. We are committed to protecting your personal data in
          accordance with the Philippine Data Privacy Act of 2012 (Republic Act
          No. 10173).
        </p>

        <h2>What we collect</h2>
        <p>
          When you submit our contact or prayer request forms, we collect the
          information you provide — such as your name, email address, phone
          number, and message. We may also collect basic, anonymous analytics
          about how visitors use the site.
        </p>

        <h2>How we use it</h2>
        <ul>
          <li>To respond to your messages and prayer requests.</li>
          <li>To follow up with you about church life, when you ask us to.</li>
          <li>To improve our website and ministry.</li>
        </ul>
        <p>
          We do not sell your personal information. Prayer requests marked
          private are shared only with our pastoral team.
        </p>

        <h2>Your rights</h2>
        <p>
          You have the right to access, correct, or request deletion of your
          personal data. To do so, contact us using the details on our Connect
          page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Please reach out through our{" "}
          <a href="/connect">Connect page</a>.
        </p>
        </div>
      </Section>
    </>
  );
}
