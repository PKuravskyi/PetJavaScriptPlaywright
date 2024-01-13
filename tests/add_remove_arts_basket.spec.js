import { test, expect } from '@playwright/test';

import { ArtsPage } from '../pages/ArtsPage';

test.describe('Arts page', () => {
	let artsPage;

	test.beforeEach(async ({ page }) => {
		artsPage = new ArtsPage(page);
		await artsPage.visit('http://localhost:2221');
	});

	test('Verify art art can be added to basket', async ({ page }) => {
		await expect(artsPage.basketCounterEl).toHaveText('0');
		artsPage.addArtToBasket('Mountain Landscape');
		await expect(artsPage.basketCounterEl).toHaveText('1');
	});

	test('Verify art can be removed from basket', async ({ page }) => {
		await expect(artsPage.basketCounterEl).toHaveText('0');
		artsPage.addArtToBasket('Mountain Landscape');
		await expect(artsPage.basketCounterEl).toHaveText('1');
		artsPage.removeArtFromBasket('Mountain Landscape');
		await expect(artsPage.basketCounterEl).toHaveText('0');
	});
});
