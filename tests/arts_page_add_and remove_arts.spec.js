import { test, expect } from '@playwright/test';

import { ArtsPage } from '../pages/ArtsPage';

test.describe('Arts page', () => {
	let artsPage;

	test.beforeEach(async ({ page }) => {
		artsPage = new ArtsPage(page);
		await artsPage.goToHomepage();
	});

	test('Verify art can be added to basket', async ({ page }) => {
		await expect(artsPage.basketCounterEl).toHaveText('0');
		await artsPage.addArtToBasket('Mountain Landscape');
		await expect(artsPage.basketCounterEl).toHaveText('1');
		await artsPage.addArtToBasket('Baby Zebra with butterfly');
		await expect(artsPage.basketCounterEl).toHaveText('2');
	});

	test('Verify art can be removed from basket', async ({ page }) => {
		await artsPage.addArtToBasket('Mountain Landscape');
		await artsPage.addArtToBasket('Young Man in hot air balloon');
		await expect(artsPage.basketCounterEl).toHaveText('2');
		await artsPage.removeArtFromBasket('Mountain Landscape');
		await expect(artsPage.basketCounterEl).toHaveText('1');
		await artsPage.removeArtFromBasket('Young Man in hot air balloon');
		await expect(artsPage.basketCounterEl).toHaveText('0');
	});
});
