import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton: edited once, controls global site info.
  fields: [
    defineField({
      name: "title",
      title: "Church Name",
      type: "string",
      initialValue: "Team Zion Lipa",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline / One-liner",
      type: "string",
      description: "Short line shown under the name on the home page.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage",
      title: "Home Hero Background Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional. A wide photo (e.g. worship/congregation) shown behind the home page hero. Falls back to a gradient if empty.",
    }),
    defineField({
      name: "heroImages",
      title: "Home Hero Slideshow Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
      description:
        "Optional. Add 2+ wide photos to rotate as the hero background (cross-fade). If empty, the hero uses the Hero Background Image plus the Photo Gallery.",
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description:
        "Optional. Photos of church life shown in a gallery on the home page. Add 6 or more for the best look.",
      options: { layout: "grid" },
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      description:
        'In Google Maps: Share > Embed a map > copy the URL inside the iframe src="...".',
    }),
    defineField({
      name: "serviceTimes",
      title: "Service Times",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", title: "Day", type: "string" },
            { name: "time", title: "Time", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
          preview: {
            select: { title: "day", subtitle: "time" },
          },
        },
      ],
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook URL", type: "url" },
        { name: "youtube", title: "YouTube URL", type: "url" },
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "tiktok", title: "TikTok URL", type: "url" },
      ],
    }),
    defineField({
      name: "givingNote",
      title: "Giving Page Note",
      type: "text",
      rows: 4,
      description:
        "Temporary giving instructions (e.g. GCash / bank details) shown until full online giving launches.",
    }),
    defineField({
      name: "liveNow",
      title: "We're Live Now",
      type: "boolean",
      initialValue: false,
      description:
        "Turn ON during a live stream to show a 'LIVE NOW' banner across the site. Remember to turn it OFF afterwards.",
    }),
    defineField({
      name: "liveUrl",
      title: "Live Stream Link",
      type: "url",
      description:
        "The YouTube/Facebook link the LIVE NOW banner points to.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
