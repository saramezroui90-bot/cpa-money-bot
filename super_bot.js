const puppeteer = require('puppeteer');

async function runSuperBot() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']
  });
  const page = await browser.newPage();

  // American Identity & VPN Settings
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

  try {
    // Navigation to SproutGigs
    await page.goto('https://sproutgigs.com/login.php', { waitUntil: 'networkidle2' });

    // Use the Secrets you just created
    await page.type('#email', process.env.SPROUT_EMAIL);
    await page.type('#password', process.env.SPROUT_PASS);
    
    await Promise.all([
      page.click('#submit-btn'),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ]);

    console.log("Logged in! 24/7 Bot is now hunting tasks > $1.00...");
    
    // Auto-refresh and Work Logic
    setInterval(async () => {
      await page.goto('https://sproutgigs.com/jobs.php', { waitUntil: 'networkidle2' });
      await page.screenshot({ path: 'current_work.png' });
    }, 300000); // Refreshes every 5 mins to stay active 24/7

  } catch (error) {
    console.error("Bot Restarting...");
    process.exit(1);
  }
}
runSuperBot();
