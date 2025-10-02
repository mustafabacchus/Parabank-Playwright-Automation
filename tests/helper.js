import { test, expect } from '@playwright/test';

export const good_credentials = {user: 'john', pass: 'demo'};
export const bad_credentials = {user: 'dummy', pass: 'dummy'};

export async function goToLandingPage(page) {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
}

export async function login(page, user, pass) {
  //Fill in login info
  await page.locator('input[name="username"]').fill(user);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(pass);
  await page.getByRole('button', { name: 'Log In' }).click();
  if (await page.title() === 'ParaBank | Accounts Overview') {
    console.log('LOGIN SUCCESSFUL, Credentials Accepted!')
  } else if (await page.title() === 'ParaBank | Error'){
    console.log('LOGIN FAILED, Credentials Not Accepted!')
  } else {
    console.log('There is an issue logging in!')
  }
}