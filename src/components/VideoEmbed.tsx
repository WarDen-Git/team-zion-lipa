import { getEmbedUrl } from "@/lib/video";

export function VideoEmbed({ url, title }: { url: string; title?: string }) {
  const embed = getEmbedUrl(url);

  if (!embed) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex aspect-video items-center justify-center rounded-xl bg-slate-100 text-sm text-brand-700 underline"
      >
        Watch video
      </a>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
      <iframe
        src={embed}
        title={title ?? "Video"}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
