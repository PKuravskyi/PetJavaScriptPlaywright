import { expect } from '@playwright/test';

import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
	constructor(page) {
		super(page);

		this.basketCardEls = page.locator('[data-qa="basket-card"]');
		this.basketCardRemoveItemBtns = page.locator('.basket-card-remove-item');
	}

	removeCheapestArt = async () => {
		const artsPrices = [];

		for (const card of await this.basketCardEls.all()) {
			const cardPrice = await card.locator('.basket-item-price').textContent();
			artsPrices.push(+cardPrice.replace('$', ''));
		}

		const cheapestPriceIdx = artsPrices.indexOf(Math.min(...artsPrices));
		await this.basketCardRemoveItemBtns.nth(cheapestPriceIdx).click();
		await this.page.waitForTimeout(500);
	};
}
