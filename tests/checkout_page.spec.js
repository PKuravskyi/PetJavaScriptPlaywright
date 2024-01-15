import { test, expect } from '@playwright/test';

import { ArtsPage } from '../pages/ArtsPage';
import { BasketPage } from '../pages/BasketPage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';

test.describe('Checkout page', () => {
	let artsPage;
	let basketPage;
	let loginPage;
	let signUpPage;

	test.beforeEach(async ({ page }) => {
		artsPage = new ArtsPage(page);
		basketPage = new BasketPage(page);
		loginPage = new LoginPage(page);
		signUpPage = new SignUpPage(page);
		await page.goto('http://localhost:2221');
	});

	test('Verify unregistered user can go to checkout', async ({ page }) => {
		await artsPage.addArtToBasket('Mountain Landscape');
		await artsPage.addArtToBasket('Baby Zebra with butterfly');
		await artsPage.addArtToBasket('Astronaut dabbing');
		await artsPage.goToCheckout();
		await basketPage.continueToCheckoutBtn.click();
		await loginPage.registerBtn.click();
		await signUpPage.emailInputEl.fill('auto_user' + `${new Date().getTime()}`);
		await signUpPage.passwordInputEl.fill('test123456');
		await signUpPage.registerBtn.click();
		await expect(page).toHaveURL(/.*delivery-details/);
	});
});
