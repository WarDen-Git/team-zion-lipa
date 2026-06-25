import { defineType, defineField } from "sanity";

export const announcement = defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "link",
      title: "Link (optional)",
      type: "url",
    }),
    defineField({
      name: "active",
      title: "Show on site",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "message" },
  },
});
