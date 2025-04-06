// const puppeteer = require('puppeteer');
// async function openAndCloseSite() {
//     const browser = await puppeteer.launch({ headless: false }); // setează false ca să vezi browserul
//     const page = await browser.newPage();
//     await page.goto('https://oportunitatisicariere.ro');
//     await new Promise(resolve => setTimeout(resolve, 5000)); // așteaptă 5 secunde
//     await browser.close();
// }
// openAndCloseSite();

const puppeteer = require('puppeteer');
// Deschide browserul
async function startBrowser() {
    return await puppeteer.launch({ headless: false });
}
// Navighează către un URL
async function openPage(browser, url) {
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}
// Așteaptă un timp dat
async function wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
// Închide browserul
async function closeBrowser(browser) {
    await browser.close();
}
// Funcția principală care deschide și închide site-ul
async function openAndCloseSite() {
    const browser = await startBrowser();
    // Cronometrăm timpul de încărcare a paginii
    const startTime = performance.now();
    const page = await openPage(browser, 'https://oportunitatisicariere.ro');
    // Afișează titlul paginii
    const pageTitle = await page.title();
    console.log('Titlul paginii este:', pageTitle);
    // Cronometrăm timpul de încărcare
    const endTime = performance.now();
    console.log('Timpul de încărcare a fost:', (endTime - startTime).toFixed(2), 'milisecunde');
    await wait(5);
    await closeBrowser(browser);
}
openAndCloseSite();