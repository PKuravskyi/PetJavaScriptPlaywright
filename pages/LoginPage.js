import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
	constructor(page) {
		super(page);
		this.registerBtn = page.locator('.go-to-signup-button');
	}

	clickRegister = async () => {
		await this.registerBtn.click();
	};
}
