const puppeteer = require('puppeteer-core');

async function run() {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"'
        ]
    });

    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });

    try {
        const smartLink = 'https://omg10.com/4/10947636';
        await page.goto(smartLink, { waitUntil: 'networkidle2', timeout: 60000 });

        const randomWait = Math.floor(Math.random() * (50000 - 30000 + 1) + 30000);
        await new Promise(r => setTimeout(r, randomWait));

        await page.evaluate(() => {
            window.scrollBy(0, Math.floor(Math.random() * 500));
        });

        const element = await page.$('a') || await page.$('button');
        if (element) {
            await element.click();
            await new Promise(r => setTimeout(r, 5000));
        }

    } catch (e) {
    } finally {
        await browser.close();
    }
}

run();
