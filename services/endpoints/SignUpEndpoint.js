import { faker } from '@faker-js/faker';
import { BaseClientAPI } from './BaseClientAPI';

export class SignUpEndpoint extends BaseClientAPI {
	SIGNUP_ENDPOINT = 'signup';

	constructor(page) {
		super(page);
	}

	signUpRandomUser = async () => {
		const payload = {
			username: 'auto_member_' + faker.number.int(),
			password: faker.internet.password(),
		};

		const response = await this.post(this.SIGNUP_ENDPOINT, payload);

		await this.page.evaluate(
			([tokenValue]) => {
				document.cookie = `token=${tokenValue}`;
			},
			[response.data.token]
		);

		return { response, payload };
	};
}
