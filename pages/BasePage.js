import { expect } from '@playwright/test';

export class BasePage {
	constructor(page) {
		this.page = page;
		this.expect = expect;
		this.baseUrl = 'http://localhost:2221/';
		this.hamburgerMenuBtn = page.locator('.burger-button');
		this.checkoutBtn = page.getByRole('link', { name: 'Checkout' });
		this.basketCounterEl = page.locator('[data-qa="header-basket-count"]');
	}

	isDesktopViewport = () => this.page.viewportSize().width >= 600;

	getBasketItemsCount = async () => +(await this.basketCounterEl.textContent());

	clickCheckout = async () => this.waitToClick(this.checkoutBtn);

	openHamburgerMenu = async () => this.waitToClick(this.hamburgerMenuBtn);

	waitToClick = async element => {
		await element.waitFor();
		await element.click();
	};

	verifyURLMatchesPattern = async url => {
		await this.expect(this.page).toHaveURL(url);
	};

	verifyBasketItemsCount = async count => {
		this.expect(await this.getBasketItemsCount()).toEqual(count);
	};
}
