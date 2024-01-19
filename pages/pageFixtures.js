import * as base from '@playwright/test';
import { ArtsPage } from './ArtsPage';
import { BasketPage } from './BasketPage';
import { LoginPage } from './LoginPage';
import { MyAccountPage } from './MyAccountPage';
import { SignUpPage } from './SignUpPage';
import { DeliveryDetailsPage } from './checkout/DeliveryDetailsPage';
import { PaymentPage } from './checkout/PaymentPage';
import { ThankYouPage } from './checkout/ThankYouPage';

exports.test = base.test.extend({
	artsPage: async ({ page }, use) => {
		await use(new ArtsPage(page));
	},

	basketPage: async ({ page }, use) => {
		await use(new BasketPage(page));
	},

	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},

	myAccountPage: async ({ page }, use) => {
		await use(new MyAccountPage(page));
	},

	signUpPage: async ({ page }, use) => {
		await use(new SignUpPage(page));
	},

	deliveryDetailsPage: async ({ page }, use) => {
		await use(new DeliveryDetailsPage(page));
	},

	paymentPage: async ({ page }, use) => {
		await use(new PaymentPage(page));
	},

	thankYouPage: async ({ page }, use) => {
		await use(new ThankYouPage(page));
	},
});
