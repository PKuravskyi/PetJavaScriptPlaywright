import { expect } from '@playwright/test';

export class BasePage {
	constructor(page) {
		this.page = page;
		this.baseURL = 'http://localhost:2221/';
		this.hamburgerMenuBtn = page.locator('.burger-button');
		this.checkoutBtn = page.getByRole('link', { name: 'Checkout' });
		this.basketCounterEl = page.locator('[data-qa="header-basket-count"]');
	}

	goToHomepage = async () => await this.page.goto(this.baseURL);

	goToPage = async page => await this.page.goto(this.baseURL + page);

	getBasketItemsCount = async () => +(await this.basketCounterEl.textContent());

	clickCheckout = async () => this.waitToClick(this.checkoutBtn);

	openHamburgerMenu = async () => this.waitToClick(this.hamburgerMenuBtn);

	waitToClick = async element => {
		await element.waitFor();
		await element.click();
	};

	verifyBasketItemsCount = async count => {
		expect(await this.getBasketItemsCount()).toEqual(count);
	};
}
