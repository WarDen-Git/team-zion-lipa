import { defineType, defineField } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
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
      name: "startDate",
      title: "Start Date & Time",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date & Time",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration / RSVP Link",
      type: "url",
    }),
  ],
  orderings: [
    {
      title: "Start date, soonest first",
      name: "startAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "startDate", media: "image" },
    prepare: ({ title, date, media }) => ({
      title,
      subtitle: date ? new Date(date).toLocaleString() : "",
      media,
    }),
  },
});
