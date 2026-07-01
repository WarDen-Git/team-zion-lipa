"use client";

import { useEffect, useState } from "react";

/**
 * Cross-fading background slideshow for the hero. Rotates through the given
 * image URLs. Static (first image only) when reduced motion is preferred or
 * there's a single image.
 */
export function HeroSlideshow({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % images.length),
      6000,
    );
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div aria-hidden className="absolute inset-0">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          // @ts-expect-error fetchpriority is valid HTML but not yet in types
          fetchpriority={i === 0 ? "high" : undefined}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
