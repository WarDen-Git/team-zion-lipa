// Quick read-back to confirm the imported content is in the dataset.
// Usage: $env:SANITY_WRITE_TOKEN="..."; node scripts/verify-content.mjs
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "tydxrhwl",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false, // fresh, not cached
});

const settings = await client.fetch(`*[_type == "siteSettings"][0]{
  _id, title, tagline, email, phone, address, serviceTimes, social
}`);
const about = await client.fetch(`*[_type == "page" && slug.current == "about"][0]{
  _id, title, "blocks": count(body)
}`);
const allSettings = await client.fetch(`count(*[_type == "siteSettings"])`);

console.log("siteSettings count:", allSettings);
console.log("siteSettings doc:", JSON.stringify(settings, null, 2));
console.log("about page:", JSON.stringify(about, null, 2));
