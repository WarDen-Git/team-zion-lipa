import { Section, SectionHeading } from "./Section";
import { GalleryGrid } from "./GalleryGrid";
import { urlForImage } from "@/sanity/image";
import type { SiteSettings } from "@/sanity/queries";

export function GallerySection({
  images,
}: {
  images: NonNullable<SiteSettings["gallery"]>;
}) {
  if (!images || images.length === 0) return null;

  const shown = images.slice(0, 8).map((img) => ({
    thumb: urlForImage(img).width(800).height(800).fit("crop").url(),
    full: urlForImage(img).width(1600).url(),
  }));

  return (
    <Section>
      <SectionHeading
        eyebrow="Church life"
        title="Moments together"
        description="A glimpse of life at Team Zion Lipa — worship, fellowship, and community."
        align="center"
        className="mb-12"
      />
      <GalleryGrid images={shown} />
    </Section>
  );
}
