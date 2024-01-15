import { test, expect } from '@playwright/test';

import { BasePage } from '../pages/BasePage';

test.beforeEach(async ({ page }) => {
	const basePage = new BasePage(page);
	await basePage.goToPage('my-account');
});

test.describe('My Account page', () => {
	test('register new user', async ({ page }) => {});
});
