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
		this.countryDropdown = page.locator('.country-dropdown');
		this.saveAddressBtn = page.locator('.save-address-button');
		this.savedAddressList = page.locator('.saved-address-container');
		this.savedAddressFirstNameLabel = this.savedAddressList.locator(
			'.saved-address-firstName'
		);
		this.savedAddressLastNameLabel = this.savedAddressList.locator(
			'.saved-address-lastName'
		);
		this.savedAddressStreetLabel = this.savedAddressList.locator(
			'.saved-address-street'
		);
		this.savedAddressPostCodeLabel = this.savedAddressList.locator(
			'.saved-address-postcode'
		);
		this.savedAddressCityLabel = this.savedAddressList.locator(
			'.saved-address-city'
		);
		this.savedAddressCountryLabel = this.savedAddressList.locator(
			'.saved-address-country'
		);
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
		await this.countryDropdown.selectOption(country);
	};

	clickSaveAddress = async () => await this.saveAddressBtn.click();

	clickContinueToPayment = async () => await this.continueToPaymentBtn.click();

	verifyNewlySavedAddress = async () => {
		this.expect(await this.savedAddressFirstNameLabel.first().innerText()).toBe(
			await this.firstNameInput.inputValue()
		);

		this.expect(await this.savedAddressLastNameLabel.first().innerText()).toBe(
			await this.lastNameInput.inputValue()
		);

		this.expect(await this.savedAddressStreetLabel.first().innerText()).toBe(
			await this.streetInput.inputValue()
		);

		this.expect(await this.savedAddressPostCodeLabel.first().innerText()).toBe(
			await this.postCodeInput.inputValue()
		);

		this.expect(await this.savedAddressCityLabel.first().innerText()).toBe(
			await this.cityInput.inputValue()
		);

		this.expect(
			await this.savedAddressCountryLabel.first().innerText()
		).toEqual(await this.countryDropdown.inputValue());
	};
}
