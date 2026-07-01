// Uploads the July 5 poster and creates the upcoming event.
// Usage: $env:SANITY_WRITE_TOKEN="editor-token"; node scripts/add-event-jul5.mjs
import { createClient } from "@sanity/client";
import { createReadStream } from "fs";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var.");
  process.exit(1);
}

const client = createClient({
  projectId: "tydxrhwl",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const IMG = "C:/Users/denve/OneDrive/Desktop/Team Zion Lipa/Photos/July 5.jpg";

async function run() {
  console.log("Uploading poster...");
  const asset = await client.assets.upload("image", createReadStream(IMG), {
    filename: "july-5-blessings-in-the-wilderness.jpg",
  });
  console.log("uploaded ->", asset._id);

  const doc = {
    _id: "event-jul5-2026",
    _type: "event",
    title: "Sunday Service — Blessings in the Wilderness (Week 1)",
    slug: { _type: "slug", current: "sunday-service-jul-5-2026" },
    startDate: "2026-07-05T09:30:00+08:00",
    endDate: "2026-07-05T11:30:00+08:00",
    location:
      "McDonald's, Leviste Highway, Lipa City (in front of UB Lipa Campus)",
    description:
      "Important announcement: our Sunday Service moves to a special venue as we build our future church home. Join us for worship and the message “Blessings in the Wilderness” — Week 1: God's Provision — plus a free lunch. Adjusted schedule: 9:30–11:30 AM. We are the church, not the building. Everyone is invited!",
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
  };

  console.log("Creating event...");
  await client.createOrReplace(doc);
  console.log("\n✅ Done. 'July 5' event added. Live within ~60s.");
}

run().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
