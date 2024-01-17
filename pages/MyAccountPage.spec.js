import { expect } from '@playwright/test';

import { BasePage } from './BasePage';

export class MyAccountPage extends BasePage {
	constructor(page) {
		super(page);
	}

	verifyUserIsLoggedIn = async userEmail => {
		await expect(this.page.locator(`//*[text()='${userEmail}']`)).toBeVisible();
	};
}
