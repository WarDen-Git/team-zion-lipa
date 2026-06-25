import type { Metadata } from "next";
import { Container } from "@/components/Container";
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
    <Container className="py-16">
      <h1 className="font-display text-4xl font-bold text-brand-900">
        {page?.title ?? "About Team Zion Lipa"}
      </h1>

      {page?.body ? (
        <div className="mt-8">
          <PortableText value={page.body} />
        </div>
      ) : (
        <div className="prose-church mt-8 max-w-3xl">
          <p>
            Team Zion Lipa is a Christ-centered church family in the heart of
            Lipa City, Batangas. We exist to help people know God, find
            community, discover their purpose, and make a difference.
          </p>
          <h2>What We Believe</h2>
          <p>
            We believe in one God — Father, Son, and Holy Spirit. We believe the
            Bible is God&apos;s Word, that Jesus Christ is our Savior, and that
            everyone is welcome to experience His love and grace.
          </p>
          <h2>Our Heart</h2>
          <p>
            Whether you&apos;re exploring faith for the first time or have walked
            with God for years, you have a place here. Come as you are — there&apos;s
            room at the table for you.
          </p>
          <p className="text-sm text-slate-500">
            <em>
              This is placeholder text. Edit it anytime in the Studio: create a
              &ldquo;Page&rdquo; with the slug <code>about</code>.
            </em>
          </p>
        </div>
      )}
    </Container>
  );
}
