import { test, expect } from '@playwright/test';
import {goToLandingPage} from './helper.js'

test.describe('TS Para Bank - News', () => {
  let page;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await goToLandingPage(page);
  });

  test('TC400 News', async() => {
    //Dynamically get all news links
    const eventLinks = await page.$$eval('ul.events li a', links =>
        links.map(link => link.textContent)
    );
    //Click on each news link
    for (const event of eventLinks) {
       await page.click('ul.events a:has-text("' + event + '")')
       await expect(page).toHaveTitle('ParaBank | News');
       console.log('Clicked on: ' + event);
       await page.goBack();
    }
    //Click on the news - "read more" link
    await page.getByRole('link', { name: 'Read More' }).nth(1).click();
    await expect(page).toHaveTitle('ParaBank | News');
    console.log('Clicked on: News - "Read More"')
  });
});