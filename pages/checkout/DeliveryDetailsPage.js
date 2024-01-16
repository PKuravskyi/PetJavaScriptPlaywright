import { faker } from '@faker-js/faker';

import { BaseCheckoutPage } from './BaseCheckoutPage';

export class DeliveryDetailsPage extends BaseCheckoutPage {
	constructor(page) {
		super(page);

		this.firstNameInput = page.getByPlaceholder('First name');
		this.lastNameInput = page.getByPlaceholder('Last name');
		this.streetInput = page.getByPlaceholder('Street');
		this.postCodeInput = page.getByPlaceholder('Post code');
		this.cityInput = page.getByPlaceholder('City');
		this.continueToPaymentBtn = page.locator('.continue-to-payment-button');
	}

	inputRandomFirstName = async () => {
		await this.firstNameInput.fill(faker.person.firstName());
	};

	inputRandomLastName = async () => {
		await this.lastNameInput.fill(faker.person.lastName());
	};

	inputRandomStreet = async () => {
		await this.streetInput.fill(faker.location.street());
	};

	inputRandomPostCode = async () => {
		await this.postCodeInput.fill(faker.location.zipCode());
	};

	inputRandomCity = async () => {
		await this.cityInput.fill(faker.location.city());
	};

	selectCountry = async country => {
		await this.page.selectOption('.country-dropdown', country);
	};

	clickContinueToPayment = async () => {
		await this.continueToPaymentBtn.click();
	};
}
