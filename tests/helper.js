import { test, expect } from '@playwright/test';

export class Credentials {
    constructor(user, pass) {
    this.user = 'john';
    this.pass = 'demo';
  }
}

export function TestTemp() {
    console.log('Hello');
}

export async function goToLandingPage(page) {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await expect(page).toHaveTitle('ParaBank | Welcome | Online Banking');
}
