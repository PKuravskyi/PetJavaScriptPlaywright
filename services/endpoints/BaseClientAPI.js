import axios from 'axios';

export class BaseClientAPI {
	constructor(page) {
		this.page = page
		this.baseUrl = 'http://localhost:2221/';
	}

	post = async (endpoint, payload) => {
		const response = await axios
			.post(this.baseUrl + endpoint, payload)
			.catch(error => {
				this.#printErrorMessage(error);
			});
		return response;
	};

	#printErrorMessage = error => {
		const message = `${error.message}\nResponse details: ${error.response.statusText} - ${error.response.data}`;
		throw new Error(message);
	};
}
