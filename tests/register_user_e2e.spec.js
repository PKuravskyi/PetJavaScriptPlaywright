import { test } from '../support/env';

test.describe('Sign up page', () => {
	test.beforeEach(async ({ signUpPage }) => await signUpPage.visit());

	test('Verify new user can be registered', async ({
		signUpPage,
		artsPage,
	}) => {
		await signUpPage.inputRandomEmail();
		await signUpPage.inputRandomPassword();
		await signUpPage.clickRegister();
		await artsPage.verifyArtsPresence();
	});
});
