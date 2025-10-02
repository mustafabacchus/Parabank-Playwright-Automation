import { test, expect } from '@playwright/test';
import {goToLandingPage} from './helper.js'


test.describe('TS Para Bank - Contact Us', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await goToLandingPage(page);
  });

  test('TC001 Contact Us - Fields Unfilled', async() => {
    //Footer link
    await page.getByRole('link', { name: 'Contact Us' }).click();
    await expect(page).toHaveTitle('ParaBank | Customer Care');

    //Unfilled fields throw error
    await page.getByRole('button', { name: 'Send to Customer Care' }).click();
    await expect(page.getByRole('cell', { name: 'Name is required.' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Email is required.' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Phone is required.' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Message is required.' })).toBeVisible();
    console.log('Contact fields unfilled.')
  });

  test('TC002 Contact Us - Send', async() => {
    //Primary link
    await page.getByRole('link', { name: 'contact', exact: true }).click();
    await expect(page).toHaveTitle('ParaBank | Customer Care');
    
    //Field error should be hidden
    await expect(page.getByRole('cell', { name: 'Name is required.' })).toBeHidden();
    await expect(page.getByRole('cell', { name: 'Email is required.' })).toBeHidden();
    await expect(page.getByRole('cell', { name: 'Phone is required.' })).toBeHidden();
    await expect(page.getByRole('cell', { name: 'Message is required.' })).toBeHidden();

    //Fill the contact us page
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('johndoe@scrubbed');
    await page.locator('#phone').fill('1234567890')
    await page.locator('#message').fill('Etypay orway astepay ouryay ontentcay erehay')
    //Send the request
    await page.getByRole('button', { name: 'Send to Customer Care' }).click();
    //Request sent verification
    await expect(page.getByText('A Customer Care Representative will be contacting you.')).toBeVisible();
    console.log('Contact request sent.')
  });
});