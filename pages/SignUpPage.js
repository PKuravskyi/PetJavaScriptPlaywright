import { BasePage } from './BasePage';

export class SignUpPage extends BasePage {
	constructor(page) {
		super(page);
		this.emailInputEl = page.getByPlaceholder('E-Mail');
		this.passwordInputEl = page.getByPlaceholder('Password');
		this.registerBtn = page.locator('//div[text()="Register"]');
	}
}
