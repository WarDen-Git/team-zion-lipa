import { groq } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "./env";

/**
 * Resilient fetch: returns `fallback` instead of throwing when Sanity is not
 * configured yet (e.g. during the first deploy) or a network error occurs.
 * This keeps `next build` and the live site working before content exists.
 */
export async function sanityFetch<T>(
  query: string,
  fallback: T,
  params: Record<string, unknown> = {},
): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
  } catch (err) {
    console.error("Sanity fetch failed:", err);
    return fallback;
  }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type ServiceTime = { day?: string; time?: string; label?: string };

export type SiteSettings = {
  title?: string;
  tagline?: string;
  heroImage?: import("sanity").Image;
  address?: string;
  mapEmbedUrl?: string;
  serviceTimes?: ServiceTime[];
  email?: string;
  phone?: string;
  social?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    tiktok?: string;
  };
  givingNote?: string;
};

export type Sermon = {
  _id: string;
  title: string;
  slug?: { current: string };
  speaker?: string;
  date: string;
  videoUrl: string;
  description?: string;
  series?: string;
};

export type EventDoc = {
  _id: string;
  title: string;
  slug?: { current: string };
  startDate: string;
  endDate?: string;
  location?: string;
  image?: import("sanity").Image;
  description?: string;
  registrationUrl?: string;
};

export type Announcement = {
  _id: string;
  title: string;
  message: string;
  link?: string;
};

export type PageDoc = {
  title: string;
  body?: unknown[];
};

export type Leader = {
  _id: string;
  name: string;
  role?: string;
  photo?: import("sanity").Image;
  bio?: string;
};

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------
export const settingsQuery = groq`*[_type == "siteSettings"][0]`;

export const sermonsQuery = groq`
  *[_type == "sermon"] | order(date desc) {
    _id, title, slug, speaker, date, videoUrl, description, series
  }`;

export const upcomingEventsQuery = groq`
  *[_type == "event" && startDate >= now()] | order(startDate asc) {
    _id, title, slug, startDate, endDate, location, image, description, registrationUrl
  }`;

export const activeAnnouncementQuery = groq`
  *[_type == "announcement" && active == true] | order(publishedAt desc)[0] {
    _id, title, message, link
  }`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] { title, body }`;

export const leadersQuery = groq`
  *[_type == "leader"] | order(order asc, name asc) {
    _id, name, role, photo, bio
  }`;

// ---------------------------------------------------------------------------
// Convenience loaders
// ---------------------------------------------------------------------------
export const getSettings = () =>
  sanityFetch<SiteSettings | null>(settingsQuery, null);

export const getSermons = () => sanityFetch<Sermon[]>(sermonsQuery, []);

export const getUpcomingEvents = () =>
  sanityFetch<EventDoc[]>(upcomingEventsQuery, []);

export const getActiveAnnouncement = () =>
  sanityFetch<Announcement | null>(activeAnnouncementQuery, null);

export const getPage = (slug: string) =>
  sanityFetch<PageDoc | null>(pageBySlugQuery, null, { slug });

export const getLeaders = () => sanityFetch<Leader[]>(leadersQuery, []);
