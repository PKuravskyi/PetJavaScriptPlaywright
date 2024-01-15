import { test, expect } from '@playwright/test';

import { ArtsPage } from '../pages/ArtsPage';
import { BasketPage } from '../pages/BasketPage';

test.describe('Checkout page', () => {
	let artsPage;
	let basketPage;

	test.beforeEach(async ({ page }) => {
		artsPage = new ArtsPage(page);
		basketPage = new BasketPage(page);
		await page.goto('http://localhost:2221');
	});

	test('Verify arts can be removed from basket', async ({ page }) => {
		await artsPage.addArtToBasket('Mountain Landscape');
		await artsPage.addArtToBasket('Baby Zebra with butterfly');
		await artsPage.addArtToBasket('Astronaut dabbing');
		await artsPage.goToPage('basket');
		await basketPage.removeCheapestArt();
		expect(await basketPage.getBasketItemsCount()).toEqual(2);
		await basketPage.removeCheapestArt();
		expect(await basketPage.getBasketItemsCount()).toEqual(1);
	});
});
