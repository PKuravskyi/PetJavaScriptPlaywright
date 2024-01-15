import { test, expect } from '@playwright/test';

import { ArtsPage } from '../pages/ArtsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout page', () => {
	let artsPage;
	let checkoutPage;

	test.beforeEach(async ({ page }) => {
		artsPage = new ArtsPage(page);
		checkoutPage = new CheckoutPage(page);
		await page.goto('http://localhost:2221');
	});

	test('Verify art can be removed from basket', async ({ page }) => {
		await artsPage.addArtToBasket('Mountain Landscape');
		await artsPage.addArtToBasket('Baby Zebra with butterfly');
		await artsPage.addArtToBasket('Astronaut dabbing');
		await artsPage.goToPage('basket');
		await checkoutPage.removeCheapestArt();
		expect(await checkoutPage.getBasketItemsCount()).toEqual(2);
	});
});
