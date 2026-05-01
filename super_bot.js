const puppeteer = require('puppeteer');

async function runHustle() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // American Identity
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  try {
    console.log("Starting Automation...");
    await page.goto('https://sproutgigs.com/login.php', { waitUntil: 'networkidle2' });

    // Reading from Secrets
    await page.type('#email', process.env.SPROUT_EMAIL);
    await page.type('#password', process.env.SPROUT_PASS);
    
    await Promise.all([
      page.click('#submit-btn'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);

    console.log("Login Successful - Hunting for tasks...");
  } catch (error) {
    console.error("Connection issue, retrying...");
    process.exit(1);
  }
}
runHustle();
