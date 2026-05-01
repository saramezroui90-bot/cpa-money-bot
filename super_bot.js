const puppeteer = require('puppeteer');

async function runHustle() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // American Identity Setup
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  try {
    console.log("Starting Automation...");
    await page.goto('https://sproutgigs.com/login.php', { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait for the login fields
    await page.waitForSelector('#email', { timeout: 30000 });
    
    // Injecting Secrets from GitHub
    await page.type('#email', process.env.SPROUT_EMAIL);
    await page.type('#password', process.env.SPROUT_PASS);
    
    console.log("Details entered, clicking login...");
    await page.click('#submit-btn');

    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log("Login Successful! Bot is now working...");

  } catch (error) {
    console.error("The bot hit a wall: " + error.message);
    process.exit(1);
  }
}
runHustle();
