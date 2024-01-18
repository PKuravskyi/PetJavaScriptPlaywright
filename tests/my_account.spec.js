import { test } from '../pages/pageFixtures';

import { LoginEndpoint } from '../services/endpoints/LoginEndpoint';

test.describe('My account page', () => {
	let loginEndpoint;

	test.beforeEach(async ({ page }) => {
		loginEndpoint = new LoginEndpoint(page);

		await page.goto('http://localhost:2221');
	});

	test('Verify login via BE', async ({ myAccountPage }) => {
		await loginEndpoint.login();
		await myAccountPage.goToPage('my-account');
		await myAccountPage.verifyUserIsLoggedIn();
	});

	test('Verify login via BE with mocked request', async ({ myAccountPage }) => {
		await loginEndpoint.login('withMockedRequest');
		await myAccountPage.goToPage('my-account');
		await myAccountPage.verifyMockedErrorMessage();
	});
});
