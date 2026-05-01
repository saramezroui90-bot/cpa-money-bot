const puppeteer = require('puppeteer');

async function runHustle() {
  try {
    // Connecting to US Cloud Browser using your Token
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=2UREbRJxXbaLAJYdece3383b18eb741d5196a0a7717cf1ae0` 
    });

    const page = await browser.newPage();
    
    // Set English Language and Real User Identity
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

    console.log("Status: Connection established via US Cloud Server");
    
    // Accessing SproutGigs
    await page.goto('https://sproutgigs.com/login.php', { waitUntil: 'networkidle2' });

    // Login Process
    await page.waitForSelector('#email', { timeout: 40000 });
    await page.type('#email', process.env.SPROUT_EMAIL, { delay: 150 });
    await page.type('#password', process.env.SPROUT_PASS, { delay: 150 });
    
    await page.click('#submit-btn');
    
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log("Status: Authentication successful. Machine is running.");

    // Keep session alive for tasks
    await page.waitForTimeout(5000);

    await browser.close();
  } catch (error) {
    console.error("Error Log: " + error.message);
    process.exit(1);
  }
}
runHustle();
