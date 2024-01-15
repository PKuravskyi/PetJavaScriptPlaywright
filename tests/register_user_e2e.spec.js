import { test, expect } from '@playwright/test';

import { ArtsPage } from '../pages/ArtsPage';
import { SignUpPage } from '../pages/SignUpPage';

test.describe('Sign up page', () => {
	let signUpPage;
	let artsPage;

	test.beforeEach(async ({ page }) => {
		signUpPage = new SignUpPage(page);
		artsPage = new ArtsPage(page);
		await page.goto('http://localhost:2221/signup');
	});

	test('register new user', async ({ page }) => {
		await signUpPage.emailInputEl.fill('auto_user' + `${new Date().getTime()}`);
		await signUpPage.passwordInputEl.fill('test123456');
		await signUpPage.registerBtn.click();
		expect(artsPage.productCardEls).toBeTruthy();
	});
});
