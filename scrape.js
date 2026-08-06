const { chromium } = require("playwright");

const seeds = [55, 56, 57, 58, 59, 60, 61, 62, 63, 64];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("table");

    const cellTexts = await page.$$eval("table td, table th", (cells) =>
      cells.map((c) => c.textContent.trim())
    );

    const seedTotal = cellTexts
      .map((t) => parseFloat(t.replace(/,/g, "")))
      .filter((n) => !isNaN(n))
      .reduce((a, b) => a + b, 0);

    console.log(`Seed ${seed}: sum = ${seedTotal}`);
    grandTotal += seedTotal;
  }

  console.log(`GRAND TOTAL across all seeds: ${grandTotal}`);
  await browser.close();
})();
