"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

// Studio is embedded at /studio. Visit it to manage content.
export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton for global site settings
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
            S.documentTypeListItem("sermon").title("Sermons"),
            S.documentTypeListItem("event").title("Events"),
            S.documentTypeListItem("ministry").title("Ministries"),
            S.documentTypeListItem("leader").title("Leaders"),
            S.documentTypeListItem("announcement").title("Announcements"),
            S.documentTypeListItem("page").title("Pages"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
