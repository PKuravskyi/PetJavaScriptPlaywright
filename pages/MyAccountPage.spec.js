import { expect } from '@playwright/test';

import { BasePage } from './BasePage';

export class MyAccountPage extends BasePage {
	constructor(page) {
		super(page);

		this.errorMessageLabel = page.locator('.error-message');
	}

	verifyUserIsLoggedIn = async () => {
		await expect(
			this.page.locator(`//*[text()='${process.env.ADMIN_USERNAME}']`)
		).toBeVisible();
	};

	verifyMockedErrorMessage = async () => {
		await expect(this.errorMessageLabel).toHaveText(
			'PLAYWRIGHT ERROR FROM MOCKING :)'
		);
	};
}
