import { faker } from '@faker-js/faker';

import { BasePage } from './BasePage';

export class SignUpPage extends BasePage {
	constructor(page) {
		super(page);
		this.emailInputEl = page.getByPlaceholder('E-Mail');
		this.passwordInputEl = page.getByPlaceholder('Password');
		this.registerBtn = page.locator('//div[text()="Register"]');
	}

	visit = async () => await this.page.goto(this.baseUrl + '/signup');

	inputRandomEmail = async () => {
		await this.emailInputEl.fill(faker.internet.email());
	};

	inputRandomPassword = async () => {
		await this.passwordInputEl.fill(faker.internet.password());
	};

	clickRegister = async () => {
		await this.registerBtn.click();
	};
}
