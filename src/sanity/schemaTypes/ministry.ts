import { defineType, defineField } from "sanity";

export const ministry = defineType({
  name: "ministry",
  title: "Ministry / Group",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "audience",
      title: "Who it's for",
      type: "string",
      description: 'e.g. "For women", "For students (ages 13–24)"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "schedule",
      title: "Schedule",
      type: "string",
      description: 'e.g. "Sundays after service" or "Schedule TBA"',
    }),
    defineField({
      name: "leader",
      title: "Leader / Contact",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image (optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "schedule", media: "image" },
  },
});
