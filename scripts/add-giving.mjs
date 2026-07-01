// Uploads the GCash QR and sets the Give page methods (merge-safe patch).
// Usage: $env:SANITY_WRITE_TOKEN="editor-token"; node scripts/add-giving.mjs
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

const QR = "C:/Users/denve/OneDrive/Desktop/Team Zion Lipa/Photos/GCash QR Code - Upscaled.png";

async function run() {
  console.log("Uploading GCash QR...");
  const asset = await client.assets.upload("image", createReadStream(QR), {
    filename: "gcash-qr.png",
  });
  console.log("uploaded ->", asset._id);

  const givingMethods = [
    {
      _key: "gcash",
      platform: "GCash",
      accountName: "Cecile Del Monte (Ce•••e D.)",
      accountNumber: "09055234790",
      qr: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    },
    {
      _key: "psbank",
      platform: "PSBank",
      accountName: "Zion Point Christian Church Inc",
      accountNumber: "179110011773",
    },
  ];

  console.log("Setting giving methods (merge)...");
  await client.patch("siteSettings").set({ givingMethods }).commit();
  console.log("\n✅ Done. Giving methods + GCash QR set. Live within ~60s.");
}

run().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});
