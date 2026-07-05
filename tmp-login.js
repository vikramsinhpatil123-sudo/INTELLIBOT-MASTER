const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('Learning@830$3mK2');
  console.log('value', await page.locator('#password').inputValue());
  await page.evaluate(() => {
    const terms = document.querySelector('#terms');
    if (terms) {
      terms.checked = true;
      terms.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await page.locator('#signInBtn').click({ force: true });
  await page.waitForTimeout(2500);
  console.log('url', page.url());
  console.log(await page.locator('body').innerText());
  await browser.close();
})();
