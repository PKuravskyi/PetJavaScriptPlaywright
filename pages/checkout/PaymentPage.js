import { expect } from '@playwright/test';

import { BaseCheckoutPage } from './BaseCheckoutPage';

export class PaymentPage extends BaseCheckoutPage {
	constructor(page) {
		super(page);

		this.totalLabel = page.locator('.total-value');
		this.totalIncludingDiscountLabel = page.locator(
			'.total-with-discount-value'
		);
		this.discountPercentageLabel = page
			.frameLocator('.active-discount-container')
			.locator('//*[contains(text(),"Use the following code")]');
		this.discountCodeLabel = page
			.frameLocator('.active-discount-container')
			.locator('.discount-code');
		this.discountCodeInput = page.getByPlaceholder('Discount code');
		this.submitDiscountBtn = page.locator('.submit-discount-button');
	}

	inputDiscountCode = async () => {
		await this.discountCodeInput.fill(await this.discountCodeLabel.innerText());
		await expect(await this.discountCodeInput).toHaveValue(
			await this.discountCodeLabel.innerText()
		);
	};

	clickSubmitDiscount = async () => {
		await this.submitDiscountBtn.click();
	};

	verifyDiscountPrice = async () => {
		const totalAmount = +(await this.totalLabel.innerText()).replace('$', '');
		
		const discountPercentage = +(
			await this.discountPercentageLabel.innerText()
		).match(/\d+/);
		const discountAmount = (discountPercentage / 100) * totalAmount;
		const expectedPrice = Math.floor(totalAmount - discountAmount);

		expect(await this.totalIncludingDiscountLabel.innerText()).toBe(
			`${expectedPrice}$`
		);
	};
}
