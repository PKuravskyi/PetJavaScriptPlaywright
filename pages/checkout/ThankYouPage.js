import { expect } from '@playwright/test';

import { BaseCheckoutPage } from './BaseCheckoutPage';

export class ThankYouPage extends BaseCheckoutPage {
	constructor(page) {
		super(page);

		this.thankYouLabel = page.getByRole('heading', {
			name: 'Thank you for shopping with us!',
		});
	}

	verifySuccessfullPaymentMessage = async () => {
		await expect(this.thankYouLabel).toBeVisible();
	};
}
