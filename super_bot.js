const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function runHustle() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--lang=en-US,en'
    ]
  });
  const page = await browser.newPage();

  // Set US Identity
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');

  try {
    console.log("American Citizen Mode Activated...");
    await page.goto('https://sproutgigs.com/login.php', { waitUntil: 'networkidle2' });

    await page.waitForSelector('#email', { timeout: 60000 });
    
    // Human-like mouse movement
    await page.mouse.move(100, 100);
    await page.mouse.move(200, 300);

    // Typing with human delay
    await page.type('#email', process.env.SPROUT_EMAIL, { delay: 200 });
    await page.type('#password', process.env.SPROUT_PASS, { delay: 250 });
    
    console.log("Clicking Login...");
    await page.click('#submit-btn');

    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log("Success! Working invisible.");

  } catch (error) {
    console.error("Critical Error: " + error.message);
    process.exit(1);
  }
}
runHustle();
