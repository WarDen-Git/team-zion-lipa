import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { MinistryCard } from "@/components/MinistryCard";
import { ButtonLink } from "@/components/Button";
import { getMinistries, type Ministry } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Find your place at Team Zion Lipa — fellowships and groups for every age and season of life.",
};

// Sensible defaults shown until ministries are added in the Studio.
const fallback: Ministry[] = [
  {
    _id: "f-women",
    name: "Women's Fellowship",
    audience: "For women",
    description:
      "A warm community where women grow in faith, build genuine friendships, and encourage one another in everyday life.",
    schedule: "Schedule TBA",
  },
  {
    _id: "f-men",
    name: "Men's Fellowship",
    audience: "For men",
    description:
      "Men sharpening one another to live with purpose, integrity, and boldness for Christ.",
    schedule: "Schedule TBA",
  },
  {
    _id: "f-youth",
    name: "Youth Gathering",
    audience: "For students",
    description:
      "A vibrant, fun space for young people to encounter God, ask questions, and build lasting friendships.",
    schedule: "Schedule TBA",
  },
  {
    _id: "f-kids",
    name: "Kids Ministry",
    audience: "For children",
    description:
      "A safe, joyful environment where children learn about Jesus through worship, stories, and play during our services.",
    schedule: "Sundays during service",
  },
];

export default async function MinistriesPage() {
  const fetched = await getMinistries();
  const ministries = fetched.length > 0 ? fetched : fallback;

  return (
    <>
      <PageHeader
        eyebrow="Find your place"
        title="Ministries & Groups"
        description="Life is better together. Whatever your age or season, there's a community here for you."
      />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((m) => (
            <MinistryCard key={m._id} ministry={m} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-gradient-to-br from-brand-50 to-white p-8 text-center ring-1 ring-brand-100 sm:p-12">
          <h2 className="font-display text-2xl font-semibold text-brand-900">
            Not sure where to start?
          </h2>
          <p className="max-w-xl text-slate-600">
            We&apos;d love to help you find the right group. Reach out and
            we&apos;ll connect you.
          </p>
          <ButtonLink href="/connect">Get connected</ButtonLink>
        </div>
      </Section>
    </>
  );
}
