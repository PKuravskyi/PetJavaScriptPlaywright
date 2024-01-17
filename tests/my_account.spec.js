import { test } from '@playwright/test';

import { MyAccountPage } from '../pages/MyAccountPage.spec';
import { LoginEndpoint } from '../services/endpoints/LoginEndpoint';

test.describe('My account page', () => {
	let myAccountPage;
	let loginEndpoint;

	test.beforeEach(async ({ page }) => {
		myAccountPage = new MyAccountPage(page);
		loginEndpoint = new LoginEndpoint(page);

		await page.goto('http://localhost:2221');
	});

	test('Verify login via BE', async () => {
		await loginEndpoint.login();
		await myAccountPage.goToPage('my-account');
		await myAccountPage.verifyUserIsLoggedIn('admin');
	});
});
