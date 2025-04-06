const puppeteer = require('puppeteer');

// Deschide browserul
async function startBrowser() {
    return puppeteer.launch({ headless: false });
}

// Navighează către un URL
async function openPage(browser, url) {
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

// Așteaptă un timp dat
function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

// Închide browserul
async function closeBrowser(browser) {
    if (browser) {
        await browser.close();
    }
}

// Cronometrează execuția unei funcții
async function measureExecutionTime(fn) {
    const startTime = performance.now();
    const result = await fn();
    const endTime = performance.now();
    console.log('Timpul de execuție a fost:', (endTime - startTime).toFixed(2), 'milisecunde');
    return result;
}

// Funcția principală care deschide și închide site-ul
async function openAndCloseSite() {
    let browser;
    try {
        browser = await startBrowser();

        // Cronometrează timpul de încărcare a paginii
        const page = await measureExecutionTime(() => openPage(browser, 'https://oportunitatisicariere.ro'));

        // Afișează titlul paginii
        const pageTitle = await page.title();
        console.log('Titlul paginii este:', pageTitle);

        // Așteaptă 5 secunde
        await wait(5);
    } catch (error) {
        console.error('A apărut o eroare:', error);
    } finally {
        // Închide browserul în mod sigur
        await closeBrowser(browser);
    }
}

// Rulează funcția principală
openAndCloseSite();