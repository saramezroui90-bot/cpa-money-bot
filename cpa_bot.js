const puppeteer = require('puppeteer-core');

async function run() {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"']
    });
    const page = await browser.newPage();
    try {
        await page.goto('https://singingfiles.com/show.php?l=0&u=2345977&id=74820', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 5000));
        const randomEmail = `user${Math.floor(Math.random() * 99999)}@gmail.com`;
        const input = await page.$('input[type="email"]') || await page.$('input[type="text"]');
        if (input) {
            await input.type(randomEmail, {delay: 200});
            await page.keyboard.press('Enter');
        }
    } catch (e) {
    }
    await browser.close();
}
run();
