import { defineType, defineField } from "sanity";

export const sermon = defineType({
  name: "sermon",
  title: "Sermon",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "speaker",
      title: "Speaker",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date Preached",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (YouTube or Facebook)",
      type: "url",
      description: "Paste the full YouTube or Facebook video link.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "series",
      title: "Series",
      type: "string",
    }),
  ],
  orderings: [
    {
      title: "Date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "speaker", date: "date" },
    prepare: ({ title, subtitle, date }) => ({
      title,
      subtitle: [subtitle, date].filter(Boolean).join(" — "),
    }),
  },
});
