import { BaseClientAPI } from './BaseClientAPI';

export class LoginEndpoint extends BaseClientAPI {
	LOGIN_ENDPOINT = 'api/login';

	constructor(page) {
		super(page);
	}

	login = async () => {
		const payload = { username: 'admin', password: 'Admin123' };
		console.log('Logging in ' + payload.username);
		const response = await this.post(this.LOGIN_ENDPOINT, payload);
		await this.page.evaluate(
			([tokenValue]) => {
				document.cookie = `token=${tokenValue}`;
			},
			[response.data.token]
		);

		return response;
	};
}
