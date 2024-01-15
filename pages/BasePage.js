export class BasePage {
	constructor(page) {
		this.page = page;
		this.baseURL = 'http://localhost:2221/';
		this.basketCounterEl = page.locator('[data-qa="header-basket-count"]');
	}

	goToHomepage = async () => await this.page.goto(this.baseURL);

	goToPage = async page => await this.page.goto(this.baseURL + page);

	getBasketItemsCount = async () => +(await this.basketCounterEl.textContent());

	goToCheckout = async () =>
		await this.page.getByRole('link', { name: 'Checkout' }).click();
}
