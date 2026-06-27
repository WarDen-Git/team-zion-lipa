import type { SiteSettings } from "@/sanity/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/**
 * JSON-LD structured data describing the church as a local organization.
 * Helps Google show service times, address, and links in search results —
 * important for local discovery ("church in Lipa").
 */
export function StructuredData({ settings }: { settings: SiteSettings | null }) {
  const sameAs = [
    settings?.social?.facebook,
    settings?.social?.youtube,
    settings?.social?.instagram,
    settings?.social?.tiktok,
  ].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: settings?.title || "Team Zion Lipa",
    description:
      settings?.tagline ||
      "A Christ-centered church in Lipa City, Batangas.",
    url: siteUrl,
    ...(settings?.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.address,
        addressLocality: "Lipa City",
        addressRegion: "Batangas",
        addressCountry: "PH",
      },
    }),
    ...(settings?.email && { email: settings.email }),
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
