import * as base from '@playwright/test';
import { LoginEndpoint } from './LoginEndpoint';
import { SignUpEndpoint } from './SignUpEndpoint';

exports.test = base.test.extend({
	loginEndpoint: async ({ page }, use) => {
		await use(new LoginEndpoint(page));
	},

	signUpEndpoint: async ({ page }, use) => {
		await use(new SignUpEndpoint(page));
	},
});
