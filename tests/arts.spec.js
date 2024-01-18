import { test, expect } from '../pages/pageFixtures';

test.describe('Arts page', () => {
	test.beforeEach(async ({ page }) => await page.goto('http://localhost:2221'));

	test('Verify art can be added to basket', async ({ artsPage }) => {
		expect(await artsPage.getBasketItemsCount()).toEqual(0);
		await artsPage.addArtToBasket('Mountain Landscape');
		expect(await artsPage.getBasketItemsCount()).toEqual(1);
		await artsPage.addArtToBasket('Baby Zebra with butterfly');
		expect(await artsPage.getBasketItemsCount()).toEqual(2);
	});

	test('Verify art can be removed from basket', async ({ artsPage }) => {
		await artsPage.addArtToBasket('Mountain Landscape');
		await artsPage.addArtToBasket('Young Man in hot air balloon');
		expect(await artsPage.getBasketItemsCount()).toEqual(2);
		await artsPage.removeArtFromBasket('Mountain Landscape');
		expect(await artsPage.getBasketItemsCount()).toEqual(1);
		await artsPage.removeArtFromBasket('Young Man in hot air balloon');
		expect(await artsPage.getBasketItemsCount()).toEqual(0);
	});

	test('Verify arts can be sorted', async ({ artsPage }) => {
		await artsPage.sortBy('price-asc');
		await artsPage.verifyArtsSortedBy('price-asc');
		await artsPage.sortBy('price-desc');
		await artsPage.verifyArtsSortedBy('price-desc');
	});
});
