import { chromium } from "playwright";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = pathToFileURL(path.join(dir, "pages-backgrounds.html")).href;

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1700, height: 2000 },
  deviceScaleFactor: 1,
});

await page.goto(html, { waitUntil: "networkidle" });
await page.waitForTimeout(400);

for (const id of ["p1", "p2", "p3", "p4"]) {
  const out = path.join(dir, `bg-page-${id.slice(1)}-793x869.png`);
  await page.locator(`#${id}`).screenshot({ path: out, type: "png" });
  console.log(`Exported ${out}`);
}

await browser.close();
