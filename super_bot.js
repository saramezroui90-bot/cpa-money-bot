const puppeteer = require('puppeteer');

async function testSystem() {
  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=2UREbRJxXbaLAJYdece3383b18eb741d5196a0a7717cf1ae0` 
    });
    const page = await browser.newPage();
    console.log("Status: Cloud System is Working!");
    await page.goto('https://www.google.com');
    console.log("Success: Google is accessible from US Server.");
    await browser.close();
  } catch (error) {
    console.error("Error: " + error.message);
    process.exit(1);
  }
}
testSystem();
