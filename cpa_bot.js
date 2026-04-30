const puppeteer = require('puppeteer-core');

async function run() {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    });
    const page = await browser.newPage();
    
    // Set USA User Agent to simulate American visitor
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    try {
        console.log("Visiting: https://singingfiles.com/show.php?l=0&u=2345977&id=74820");
        
        // Navigate to your specific CPA link
        await page.goto('https://singingfiles.com/show.php?l=0&u=2345977&id=74820', { 
            waitUntil: 'networkidle2', 
            timeout: 60000 
        });
        
        // Wait a few seconds to ensure the click/visit is registered
        await new Promise(r => setTimeout(r, 5000));
        
        console.log("Success: Visit registered.");
    } catch (e) {
        console.log("Error during execution: " + e.message);
    }
    
    await browser.close();
}

run();
