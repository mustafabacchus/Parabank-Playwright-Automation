//Import playwright dependencies
import { test, expect } from '@playwright/test';
import {login, goToLandingPage, good_credentials} from './helper.js'


test.describe('TS Para Bank - Account Overview', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await goToLandingPage(page);
    await login(page, good_credentials.user, good_credentials.pass);
  });
  
  test('TC300 Access Account Detail', async() => {
    const account = '15675'
    await page.getByText(account).click();
    await expect(page.locator('[id="accountId"]')).toHaveText(account);
    await expect(page.locator('[id="transactionTable"]')).toBeVisible();
    console.log('Transaction Table is Visible - acc: ' + account);
  });
});

