import Image from "next/image";
import { Section, SectionHeading } from "./Section";
import { urlForImage } from "@/sanity/image";
import type { SiteSettings } from "@/sanity/queries";

export function GallerySection({
  images,
}: {
  images: NonNullable<SiteSettings["gallery"]>;
}) {
  if (!images || images.length === 0) return null;

  // Show up to 8; first image spans larger on desktop for visual interest.
  const shown = images.slice(0, 8);

  return (
    <Section>
      <SectionHeading
        eyebrow="Church life"
        title="Moments together"
        description="A glimpse of life at Team Zion Lipa — worship, fellowship, and community."
        align="center"
        className="mb-12"
      />
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {shown.map((img, i) => {
          const url = urlForImage(img).width(800).height(800).fit("crop").url();
          const big = i === 0;
          return (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl bg-slate-100 ${
                big ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={url}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          );
        })}
      </div>
    </Section>
  );
}
