const { test, expect } = require('@playwright/test');

test('login, add iphone X to cart, and checkout', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('Learning@830$3mK2');

  await page.evaluate(() => {
    const terms = document.querySelector('#terms');
    if (terms) {
      terms.checked = true;
      terms.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await page.locator('#signInBtn').click({ force: true });

  await expect(page).toHaveURL(/angularpractice\/shop/);

  const iphoneCard = page.locator('.card').filter({ hasText: /iphone X/i }).first();
  await expect(iphoneCard).toBeVisible();
  await iphoneCard.getByRole('button', { name: /Add/i }).click();

  await page.locator('a', { hasText: 'Checkout' }).click();
  await expect(page.locator('body')).toContainText('iphone X');
  await expect(page.locator('body')).toContainText('Checkout');
});
