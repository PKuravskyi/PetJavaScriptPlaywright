import { BasePage } from './BasePage';

export class ArtsPage extends BasePage {
	constructor(page) {
		super(page);
		this.sortDropdown = page.locator('.sort-dropdown');
		this.productCardEls = page.locator('[data-qa="product-card"]');
		this.artsPrices = page.locator('.product-price');
	}

	visit = async () => await this.page.goto(this.baseUrl);

	#artHandler = async (option, artName) => {
		const basketBtn = await this.page.locator(
			`//*[text()="${artName}"]/..//button/div`
		);
		await basketBtn.click();
		await this.expect(basketBtn).toHaveText(`${option} Basket`);
	};

	#getArtPrice = async elIdx => {
		return parseInt(await this.artsPrices.nth(elIdx).textContent());
	};

	addArtToBasket = async artName => {
		await this.#artHandler('Remove from', artName);
	};

	removeArtFromBasket = async artName => {
		await this.#artHandler('Add to', artName);
	};

	sortBy = async value => {
		await this.sortDropdown.selectOption({ value: value });
	};

	verifyArtsSortedBy = async sortType => {
		for (let i = 0; i < (await this.artsPrices.count()) - 1; i++) {
			switch (sortType) {
				case 'price-asc':
					this.expect(
						(await this.#getArtPrice(i)) <= (await this.#getArtPrice(i + 1))
					).toBeTruthy();
					break;
				case 'price-desc':
					this.expect(
						(await this.#getArtPrice(i)) >= (await this.#getArtPrice(i + 1))
					).toBeTruthy();
					break;
			}
		}
	};

	verifyArtsPresence = async () => {
		await this.expect(this.productCardEls.nth(0)).toBeVisible();
	};
}
