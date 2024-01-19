import { BasePage } from './BasePage';

export class MyAccountPage extends BasePage {
	constructor(page) {
		super(page);

		this.errorMessageLabel = page.locator('.error-message');
	}

	visit = async () => await this.page.goto(this.baseUrl + 'my-account');

	verifyUserIsLoggedIn = async () => {
		await this.expect(
			this.page.locator(`//*[text()='${process.env.ADMIN_USERNAME}']`)
		).toBeVisible();
	};

	verifyMockedErrorMessage = async () => {
		await this.expect(this.errorMessageLabel).toHaveText(
			'PLAYWRIGHT ERROR FROM MOCKING :)'
		);
	};
}
