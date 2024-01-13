export class BasePage {
	constructor(page) {
		this.page = page;
		this.basketCounterEl = page.locator('[data-qa="header-basket-count"]');
	}

	visit = async link => await this.page.goto(link);
}
