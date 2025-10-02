//Import playwright dependencies
import { test, expect } from '@playwright/test';
import {Credentials, goToLandingPage} from './helper.js'


test.describe('TS Para Bank - Login and Account', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await goToLandingPage(page);
  });
  
  test('TC100-1 Login', async() => {
    const credentials = new Credentials();
    //Fill in login info
    await page.locator('input[name="username"]').fill(credentials.user);
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill(credentials.pass);
    await page.getByRole('button', { name: 'Log In' }).click();
    //User is taken to Accounts Overview page
    await expect(page).toHaveTitle('ParaBank | Accounts Overview');
    console.log('Login Successful')
    
    //Account table should be present
    await expect(page.locator('[id="accountTable"]')).toBeVisible();
    console.log('Account Table is Visible');
  });

  test('TC100-2 Access Account Detail', async() => {
    const account = '15675'
    await page.getByText(account).click();
    await expect(page.locator('[id="accountId"]')).toHaveText(account);
    await expect(page.locator('[id="transactionTable"]')).toBeVisible();
    console.log('Transaction Table is Visible - acc: ' + account);
  });
});

