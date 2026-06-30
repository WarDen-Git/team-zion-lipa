"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CloseIcon, ChevronRightIcon } from "./icons";

type Img = { thumb: string; full: string };

export function GalleryGrid({ images }: { images: Img[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const show = useCallback(
    (dir: number) =>
      setOpen((i) =>
        i === null ? i : (i + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(1);
      else if (e.key === "ArrowLeft") show(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, show]);

  return (
    <>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            aria-label={`Open photo ${i + 1}`}
            className={`group relative overflow-hidden rounded-2xl bg-slate-100 ${
              i === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <Image
              src={img.thumb}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <CloseIcon width={24} height={24} />
          </button>
          <button
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              show(-1);
            }}
            className="absolute left-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
          >
            <ChevronRightIcon width={28} height={28} className="rotate-180" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[open].full}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
          />
          <button
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              show(1);
            }}
            className="absolute right-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
          >
            <ChevronRightIcon width={28} height={28} />
          </button>
        </div>
      )}
    </>
  );
}
