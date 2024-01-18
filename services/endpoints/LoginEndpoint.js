import { BaseClientAPI } from './BaseClientAPI';

export class LoginEndpoint extends BaseClientAPI {
	LOGIN_ENDPOINT = 'api/login';

	constructor(page) {
		super(page);
	}

	login = async withMockedRequest => {
		const payload = {
			username: process.env.ADMIN_USERNAME,
			password: process.env.ADMIN_PASSWORD,
		};

		if (withMockedRequest) {
			await this.page.route('**/api/user**', async route => {
				await route.fulfill({
					status: 500,
					contentType: 'application/json',
					body: JSON.stringify({ message: 'PLAYWRIGHT ERROR FROM MOCKING :)' }),
				});
			});
		}

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
