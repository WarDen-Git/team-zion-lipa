import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const BASE = "https://team-zion-lipa.vercel.app";
const routes = ["/", "/about", "/visit", "/sermons", "/events", "/connect", "/give"];

const browser = await chromium.launch();
const ctx = await browser.newContext();
const page = await ctx.newPage();
let total = 0;
for (const route of routes) {
  await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const v = results.violations;
  total += v.length;
  console.log(`\n=== ${route} === violations: ${v.length}`);
  for (const issue of v) {
    console.log(`  [${issue.impact}] ${issue.id}: ${issue.help}`);
    for (const node of issue.nodes.slice(0, 3)) {
      console.log(`     -> ${node.target.join(" ")}`);
    }
  }
}
console.log(`\nTOTAL VIOLATIONS: ${total}`);
await browser.close();
