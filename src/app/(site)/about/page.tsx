import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { PageHeader } from "@/components/PageHeader";
import { PortableText } from "@/components/PortableText";
import { getPage } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Team Zion Lipa — who we are, what we believe, and our heart for Lipa City.",
};

export default async function AboutPage() {
  const page = await getPage("about");

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
            <h2>Our Heart</h2>
            <p>
              Whether you&apos;re exploring faith for the first time or have
              walked with God for years, you have a place here. Come as you are —
              there&apos;s room at the table for you.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
