import { expect } from '@playwright/test';

import { BasePage } from './BasePage';

export class ArtsPage extends BasePage {
	constructor(page) {
		super(page);
	}

	artHandler = async (option, artName) => {
		const basketBtn = await this.page.locator(
			`//*[text()="${artName}"]/..//button/div`
		);
		await basketBtn.click();
		await expect(basketBtn).toHaveText(`${option} Basket`);
	};

	addArtToBasket = async artName => await this.artHandler('Remove from', artName);
	removeArtFromBasket = async artName => await this.artHandler('Add to', artName);
}
