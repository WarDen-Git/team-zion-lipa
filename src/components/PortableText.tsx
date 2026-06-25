import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";
import type { Image as SanityImage } from "sanity";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string } }) => {
      const url = urlForImage(value).width(1200).url();
      return (
        <span className="my-6 block">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={1200}
            height={675}
            className="rounded-xl"
          />
        </span>
      );
    },
  },
};

export function PortableText({ value }: { value: unknown[] }) {
  return (
    <div className="prose-church max-w-none">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <BasePortableText value={value as any} components={components} />
    </div>
  );
}
