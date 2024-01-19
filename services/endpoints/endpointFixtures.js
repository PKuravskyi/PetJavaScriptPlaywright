import * as base from '@playwright/test';
import { LoginEndpoint } from './LoginEndpoint';

exports.test = base.test.extend({
	loginEndpoint: async ({ page }, use) => await use(new LoginEndpoint(page)),
});
