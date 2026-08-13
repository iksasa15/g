import { chromium } from "playwright";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = pathToFileURL(path.join(dir, "cover.html")).href;
const out = path.join(dir, "cover-793x869.png");

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
});

const page = await browser.newPage({
  viewport: { width: 793, height: 869 },
  deviceScaleFactor: 1,
});

await page.goto(html, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  await document.fonts.ready;
});
await page.waitForTimeout(600);
await page.locator("#poster").screenshot({ path: out, type: "png" });
await browser.close();
console.log(`Exported ${out}`);
