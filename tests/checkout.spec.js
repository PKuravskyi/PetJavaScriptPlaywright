import { test, expect } from '@playwright/test';

import { ArtsPage } from '../pages/ArtsPage';
import { BasketPage } from '../pages/BasketPage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { DeliveryDetailsPage } from '../pages/checkout/DeliveryDetailsPage';

test.describe('Checkout page', () => {
	let artsPage;
	let basketPage;
	let loginPage;
	let signUpPage;
	let deliveryDetailsPage;

	test.beforeEach(async ({ page }) => {
		artsPage = new ArtsPage(page);
		basketPage = new BasketPage(page);
		loginPage = new LoginPage(page);
		signUpPage = new SignUpPage(page);
		deliveryDetailsPage = new DeliveryDetailsPage(page);

		await page.goto('http://localhost:2221');
		await artsPage.addArtToBasket('Mountain Landscape');
		await artsPage.addArtToBasket('Baby Zebra with butterfly');
		await artsPage.addArtToBasket('Astronaut dabbing');
		await artsPage.goToCheckout();
		await basketPage.continueToCheckoutBtn.click();
		await loginPage.registerBtn.click();
		await signUpPage.emailInputEl.fill('auto_user' + `${new Date().getTime()}`);
		await signUpPage.passwordInputEl.fill('test123456');
		await signUpPage.registerBtn.click();
	});

	test('Verify user can go to checkout after registering', async ({ page }) => {
		await expect(page).toHaveURL(/.*delivery-details/);
	});

	test('Verify user can fill in delivery details', async ({ page }) => {
		await deliveryDetailsPage.inputRandomFirstName();
		await deliveryDetailsPage.inputRandomLastName();
		await deliveryDetailsPage.inputRandomStreet();
		await deliveryDetailsPage.inputRandomPostCode();
		await deliveryDetailsPage.inputRandomCity();
		await deliveryDetailsPage.selectCountry('Ukraine');
		await deliveryDetailsPage.clickContinueToPayment();
		await expect(page).toHaveURL(/.*payment/);
	});
});
