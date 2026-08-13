import { chromium } from "playwright";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = pathToFileURL(path.join(dir, "background.html")).href;
const out = path.join(dir, "background-1080x1350.png");

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
});

const page = await browser.newPage({
  viewport: { width: 1080, height: 1350 },
  deviceScaleFactor: 1,
});

await page.goto(html, { waitUntil: "networkidle" });
await page.waitForTimeout(300);
await page.locator("#poster").screenshot({ path: out, type: "png" });
await browser.close();
console.log(`Exported ${out}`);
