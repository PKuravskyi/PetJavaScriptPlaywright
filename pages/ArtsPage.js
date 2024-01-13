import { expect } from '@playwright/test';

import { BasePage } from './BasePage';

export class ArtsPage extends BasePage {
	constructor(page) {
		super(page);
	}

	addArtToBasket = async artName => {
		const artAddToBasketBtn = await this.page.locator(
			`//*[text()="${artName}"]/..//button/div`
		);
		await artAddToBasketBtn.click();
		await expect(artAddToBasketBtn).toHaveText('Remove from Basket');
	};

	removeArtFromBasket = async artName => {
		const artAddToBasketBtn = await this.page.locator(
			`//*[text()="${artName}"]/..//button/div`
		);
		await artAddToBasketBtn.click();
		await expect(artAddToBasketBtn).toHaveText('Add to Basket');
	};
}
