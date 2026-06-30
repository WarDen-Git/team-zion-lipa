import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { PortableText } from "@/components/PortableText";
import { LeaderCard } from "@/components/LeaderCard";
import { Reveal } from "@/components/Reveal";
import { getPage, getLeaders } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Team Zion Lipa — who we are, what we believe, and our heart for Lipa City.",
};

export default async function AboutPage() {
  const [page, leaders] = await Promise.all([getPage("about"), getLeaders()]);

  return (
    <>
      <PageHeader
        eyebrow="Get to know us"
        title={page?.title ?? "About Team Zion Lipa"}
        description="Who we are, what we believe, and our heart for Lipa City."
      />
      <Section>
        {page?.body ? (
          <div className="max-w-3xl">
            <PortableText value={page.body} />
          </div>
        ) : (
          <div className="prose-church max-w-3xl">
            <p>
              Team Zion Lipa is a Christ-centered church family in the heart of
              Lipa City, Batangas. We exist to help people know God, find
              community, discover their purpose, and make a difference.
            </p>
            <h2>What We Believe</h2>
            <p>
              We believe in one God — Father, Son, and Holy Spirit. We believe
              the Bible is God&apos;s Word, that Jesus Christ is our Savior, and
              that everyone is welcome to experience His love and grace.
            </p>
          </div>
        )}
      </Section>

      {leaders.length > 0 && (
        <div className="bg-slate-50">
          <Section>
            <SectionHeading
              eyebrow="Meet the team"
              title="Our Leadership"
              description="The pastors and ministers who serve and shepherd our church family."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {leaders.map((leader, i) => (
                <Reveal key={leader._id} delay={(i % 4) * 80}>
                  <LeaderCard leader={leader} />
                </Reveal>
              ))}
            </div>
          </Section>
        </div>
      )}
    </>
  );
}
