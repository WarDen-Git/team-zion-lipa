import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  // Required for embedded Studio inside a Next.js app.
  studioHost: "team-zion-lipa",
  autoUpdates: true,
});
