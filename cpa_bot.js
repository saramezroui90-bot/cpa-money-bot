const puppeteer = require('puppeteer-core');

async function run() {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    try {
        await page.goto('https://singingfiles.com/show.php?l=0&u=2345977&id=74820', { waitUntil: 'networkidle2' });
        const randomEmail = `user${Math.floor(Math.random() * 99999)}@gmail.com`;
        const input = await page.$('input[type="email"]') || await page.$('input[type="text"]');
        if (input) {
            await input.type(randomEmail, {delay: 100});
            await page.keyboard.press('Enter');
            console.log("Success: Form Submitted");
        }
    } catch (e) {
        console.log("Error: " + e.message);
    }
    await browser.close();
}
run();
