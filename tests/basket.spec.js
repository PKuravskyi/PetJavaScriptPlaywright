import { test, expect } from '../pages/pageFixtures';

test.describe('Checkout page', () => {
	test.beforeEach(async ({ page }) => await page.goto('http://localhost:2221'));

	test('Verify arts can be removed from basket', async ({
		artsPage,
		basketPage,
	}) => {
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
