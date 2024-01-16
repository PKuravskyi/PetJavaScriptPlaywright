import { expect } from '@playwright/test';

import { BaseCheckoutPage } from './BaseCheckoutPage';

export class PaymentPage extends BaseCheckoutPage {
	constructor(page) {
		super(page);

		this.discountCodeLable = page
			.frameLocator('.active-discount-container')
			.locator('.discount-code');
		this.discountCodeInput = page.getByPlaceholder('Discount code');
		this.submitDiscountBtn = page.locator('.submit-discount-button');
	}

	inputDiscountCode = async () => {
		await this.discountCodeInput.fill(await this.discountCodeLable.innerText());
		await expect(await this.discountCodeInput).toHaveValue(
			await this.discountCodeLable.innerText()
		);
	};

	clickSubmitDiscount = async () => {
		await this.submitDiscountBtn.click();
	};
}
