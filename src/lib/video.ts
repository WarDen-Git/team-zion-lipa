/**
 * Convert a pasted YouTube or Facebook video URL into an embeddable iframe URL.
 * Returns null if the URL is not recognized.
 */
export function getEmbedUrl(url: string): string | null {
  if (!url) return null;

  // YouTube: watch?v=, youtu.be/, /shorts/, /embed/
  const yt =
    url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/) ??
    null;
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

  // Facebook: use the official video plugin
  if (/facebook\.com|fb\.watch/.test(url)) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      url,
    )}&show_text=false`;
  }

  return null;
}

/** YouTube thumbnail for cards, if the URL is a YouTube link. */
export function getYouTubeThumb(url: string): string | null {
  const yt =
    url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/) ??
    null;
  return yt ? `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg` : null;
}
