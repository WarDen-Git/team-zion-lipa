// One-time content import for TEAM Lipa (Zion Point Church).
// Usage (PowerShell):
//   $env:SANITY_WRITE_TOKEN="paste-editor-token"; node scripts/seed-content.mjs
//
// Get a token at: Sanity manage -> API -> Tokens -> Add API token (Editor).
// Revoke it afterwards once the import is done.

import { createClient } from "@sanity/client";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var. See instructions at top of file.");
  process.exit(1);
}

const client = createClient({
  projectId: "tydxrhwl",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  title: "TEAM Lipa (Zion Point Church)",
  tagline: "Connect to God. Connect to people.",
  address:
    "St. Joseph Avenue, Villa de Lipa 1 Subdivision, Marauoy, Lipa City, Batangas 4217",
  email: "lipateamzion@gmail.com",
  phone: "0994 179 2218 (Min. Hannah Grace “Honey” Dela Cruz)",
  serviceTimes: [
    { _key: "st1", day: "Sunday", time: "10:00 AM", label: "Worship Service" },
    { _key: "st2", day: "Sunday", time: "4:00 PM", label: "Afternoon Service" },
    { _key: "st3", day: "Women’s Fellowship", time: "Schedule TBA", label: "" },
    { _key: "st4", day: "Men’s Fellowship", time: "Schedule TBA", label: "" },
    { _key: "st5", day: "Youth Gathering", time: "Schedule TBA", label: "" },
  ],
  social: {
    facebook: "https://www.facebook.com/ZionPointChurch",
    youtube: "https://www.youtube.com/@TEAMLIPA",
    instagram: "https://www.instagram.com/teamzionlipa",
    tiktok: "https://www.tiktok.com/@zionpointchurch",
  },
  givingNote:
    "Online giving is coming soon. For now, you can give through:\n\n" +
    "GCash: 0905 523 4790 (Cecile Del Monte)\n" +
    "PSBank: 179110011773 (Zion Point Christian Church Inc.)\n\n" +
    "You may also give in person during our services. Thank you for your generosity!",
  // mapEmbedUrl intentionally left empty until the public Google Maps link is ready.
};

const leaders = [
  ["Romeo “Romy” L. Del Monte", "Senior Pastor"],
  ["Cecile G. Del Monte", "Senior Pastor"],
  ["Alan Michael Dumangeng", "Pastor"],
  ["Ruel Jr. “RJ” C. Katigbak", "Pastor"],
  ["Hazel Grace G. Del Monte", "Minister"],
  ["Hannah Grace Dela Cruz", "Minister"],
  ["Karen “Kars” Katigbak", "Minister"],
  ["Hannah Faye G. Del Monte", "Minister"],
];

const block = (key, style, text, extra = {}) => ({
  _type: "block",
  _key: key,
  style,
  markDefs: [],
  children: [{ _type: "span", _key: key + "s", text, marks: [] }],
  ...extra,
});

const beliefs = [
  "The Bible is the inspired and trustworthy Word of God, our guide for faith and life.",
  "There is one God, eternally existing in three persons — Father, Son, and Holy Spirit.",
  "Jesus Christ, fully God and fully man, lived a sinless life, died for our sins, rose again, and is the only way to the Father.",
  "Salvation is a gift of God received by grace through faith in Jesus Christ — not by our own works.",
  "The Holy Spirit lives in every believer, empowering us to grow in Christ and live for Him.",
  "The Church is God's family, called to worship, fellowship, discipleship, and sharing the good news.",
  "Jesus Christ will return, and we look forward to eternal life with Him.",
];

const aboutPage = {
  _id: "page-about",
  _type: "page",
  title: "About TEAM Lipa",
  slug: { _type: "slug", current: "about" },
  body: [
    block(
      "intro",
      "normal",
      "TEAM Lipa (Zion Point Church) is a Christ-centered church family in the " +
        "heart of Lipa City, Batangas. Our heart is captured in four words: " +
        "Connect to God. Connect to people. We exist to help people of every age " +
        "and background encounter the love of Jesus, grow in God's Word, build " +
        "genuine relationships, and discover the purpose God has for their lives. " +
        "Wherever you are on your journey of faith, you have a place here.",
    ),
    block("believe-h", "h2", "What We Believe"),
    block(
      "believe-lead",
      "normal",
      "As followers of Jesus Christ, we hold to the historic Christian faith. In summary, we believe:",
    ),
    ...beliefs.map((text, i) =>
      block(`believe-${i}`, "normal", text, { listItem: "bullet", level: 1 }),
    ),
    block("story-h", "h2", "Our Story"),
    block(
      "story-1",
      "normal",
      "Zion Point Church was established to bring the hope of the gospel to Lipa " +
        "City and the surrounding communities of Batangas. What began as a small " +
        "gathering of believers has grown into a vibrant church family — TEAM " +
        "Lipa — united by a passion to love God and love people. Today we continue " +
        "that same mission: to be a place where lives are transformed by Jesus and " +
        "where everyone can belong.",
    ),
    // Leadership is rendered as photo cards from "leader" documents (below).
  ],
};

// Leader documents (deterministic _id so re-runs update instead of duplicating).
const leaderDocs = leaders.map(([name, role], i) => ({
  _id: `leader-${i}`,
  _type: "leader",
  name,
  role,
  order: i,
}));

const ministryDocs = [
  {
    name: "Women's Fellowship",
    audience: "For women",
    description:
      "A warm community where women grow in faith, build genuine friendships, and encourage one another in everyday life.",
    schedule: "Schedule TBA",
  },
  {
    name: "Men's Fellowship",
    audience: "For men",
    description:
      "Men sharpening one another to live with purpose, integrity, and boldness for Christ.",
    schedule: "Schedule TBA",
  },
  {
    name: "Youth Gathering",
    audience: "For students",
    description:
      "A vibrant, fun space for young people to encounter God, ask questions, and build lasting friendships.",
    schedule: "Schedule TBA",
  },
  {
    name: "Kids Ministry",
    audience: "For children",
    description:
      "A safe, joyful environment where children learn about Jesus through worship, stories, and play during our services.",
    schedule: "Sundays during service",
  },
].map((m, i) => ({ _id: `ministry-${i}`, _type: "ministry", order: i, ...m }));

async function run() {
  console.log("Importing Site Settings...");
  await client.createOrReplace(siteSettings);
  console.log("Importing About page...");
  await client.createOrReplace(aboutPage);
  console.log(`Importing ${leaderDocs.length} leaders...`);
  for (const doc of leaderDocs) {
    await client.createOrReplace(doc);
  }
  console.log(`Importing ${ministryDocs.length} ministries...`);
  for (const doc of ministryDocs) {
    await client.createOrReplace(doc);
  }
  console.log("\n✅ Done. Published content for TEAM Lipa (Zion Point Church).");
  console.log("Live site should update within ~60 seconds.");
}

run().catch((err) => {
  console.error("Import failed:", err.message);
  process.exit(1);
});
