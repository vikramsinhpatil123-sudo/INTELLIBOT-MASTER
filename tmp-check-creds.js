const { chromium } = require('playwright');
(async()=>{
  const combos = [
    ['rahulshettyacademy','Learning@830$3mK2','Admin'],
    ['rahulshettyacademy','Learning@830$3mK2','User'],
    ['rahulshettyacademy','learning','Admin'],
    ['rahulshettyacademy','learning','User'],
    ['rahulshettyacademy','Learning@123','Admin'],
    ['rahulshettyacademy','Learning@123','User'],
    ['rahulshettyacademy','Learning@830$3mK2',''],
    ['rahulshettyacademy','learning',''],
  ];
  for (const [user, pass, role] of combos) {
    const browser = await chromium.launch({headless:true});
    const page = await browser.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/', {waitUntil:'domcontentloaded'});
    await page.getByLabel('Username:').fill(user);
    await page.getByLabel('Password:').fill(pass);
    if (role) {
      await page.getByRole('radio', { name: role }).check().catch(()=>{});
    }
    await page.evaluate(() => {
      const terms=document.querySelector('#terms');
      if(terms){terms.checked=true; terms.dispatchEvent(new Event('change',{bubbles:true}));}
    });
    await page.getByRole('button', { name: 'Sign In' }).click({force:true}).catch(()=>{});
    await page.waitForTimeout(1500);
    const bodyText = await page.locator('body').innerText();
    console.log('---', user, pass, role, '---');
    console.log(page.url());
    console.log(bodyText.slice(0,600));
    await browser.close();
  }
})();
