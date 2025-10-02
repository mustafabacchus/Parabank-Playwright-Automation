import { test, expect } from '@playwright/test';
import {goToLandingPage, login, good_credentials, bad_credentials} from './helper.js'


test.describe('TS Para Bank - Login', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await goToLandingPage(page);
  });
  
  test('TC100 Successful Login', async() => {
    //Enter good credentials
    await login(page, good_credentials.user, good_credentials.pass);
    //User is taken to Accounts Overview page
    await expect(page).toHaveTitle('ParaBank | Accounts Overview');
    //Account table should be present
    await expect(page.locator('[id="accountTable"]')).toBeVisible();
    console.log('Account Table is Visible');
  });

  test('TC101 Failed Login', async() => {
    //Enter bad credentials
    await login(page, bad_credentials.user, bad_credentials.pass);
    //Error page is loaded
    await expect(page).toHaveTitle('ParaBank | Error');
    await expect(page.getByText('An internal error has occurred and has been logged.')).toBeVisible();
  });
});