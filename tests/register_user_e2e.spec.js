import { test, expect } from '../pages/pageFixtures';

test.describe('Sign up page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:2221/signup');
	});

	test('register new user', async ({ signUpPage, artsPage }) => {
		await signUpPage.inputRandomEmail();
		await signUpPage.inputRandomPassword();
		await signUpPage.clickRegister();
		await artsPage.verifyArtsPresence();
	});
});
