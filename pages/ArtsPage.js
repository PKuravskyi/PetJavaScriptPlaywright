import { BasePage } from './BasePage';

export class ArtsPage extends BasePage {
	constructor(page) {
		super(page);
		this.sortDropdown = page.locator('.sort-dropdown');
		this.productCardEls = page.locator('[data-qa="product-card"]');
	}

	visit = async () => await this.page.goto(this.baseUrl);

	#artHandler = async (option, artName) => {
		const basketBtn = await this.page.locator(
			`//*[text()="${artName}"]/..//button/div`
		);
		await basketBtn.click();
		await this.expect(basketBtn).toHaveText(`${option} Basket`);
	};

	addArtToBasket = async artName =>
		await this.#artHandler('Remove from', artName);

	removeArtFromBasket = async artName =>
		await this.#artHandler('Add to', artName);

	sortBy = async value => {
		await this.sortDropdown.selectOption({ value: value });
	};

	verifyArtsSortedBy = async sortType => {
		const artsPrices = [];
		let isSortedCorrectly = true;

		for (let i = 1; i <= artsPrices.length; i++) {
			switch (sortType) {
				case 'price-asc':
					if (artsPrices[i] > artsPrices[i + 1]) {
						isSortedCorrectly = false;
						break;
					}
					break;
				case 'price-desc':
					if (artsPrices[i] < artsPrices[i + 1]) {
						isSortedCorrectly = false;
						break;
					}
					break;
			}
		}

		this.expect(isSortedCorrectly).toBeTruthy();
	};

	verifyArtsPresence = async () => {
		await this.expect(this.productCardEls.nth(0)).toBeVisible();
	};
}
