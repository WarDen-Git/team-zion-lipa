// Uploads local images (hero, gallery, logo) to Sanity and links them on
// Site Settings via a merge patch (does not touch other fields).
// Usage (PowerShell, from project root):
//   $env:SANITY_WRITE_TOKEN="paste-editor-token"; node scripts/upload-images.mjs
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

const DIR =
  "C:/Users/denve/AppData/Local/Temp/claude/C--Users-denve-OneDrive-Desktop-Team-Zion-Lipa/baa05056-4b4d-40ca-8926-b9745fee153d/scratchpad/upload";

async function upload(file) {
  const asset = await client.assets.upload("image", createReadStream(`${DIR}/${file}`), {
    filename: file,
  });
  console.log("uploaded", file, "->", asset._id);
  return asset._id;
}

const imageRef = (ref) => ({ _type: "image", asset: { _type: "reference", _ref: ref } });

async function run() {
  console.log("Uploading hero...");
  const hero = await upload("hero.jpg");
  console.log("Uploading logo...");
  const logo = await upload("logo.jpg");
  console.log("Uploading 8 gallery photos...");
  const gallery = [];
  for (let i = 1; i <= 8; i++) {
    const ref = await upload(`g${i}.jpg`);
    gallery.push({ ...imageRef(ref), _key: `g${i}` });
  }

  console.log("Linking on Site Settings (merge)...");
  await client
    .patch("siteSettings")
    .set({ heroImage: imageRef(hero), logo: imageRef(logo), gallery })
    // Restore the map only if it's still missing (won't override a re-paste).
    .setIfMissing({
      mapEmbedUrl:
        "https://maps.google.com/maps?q=13.964228727059021,121.16431116884179&z=18&output=embed",
    })
    .commit();

  console.log("\n✅ Done. Hero, logo, and gallery set. Live within ~60s.");
}

run().catch((e) => {
  console.error("Upload failed:", e.message);
  process.exit(1);
});
