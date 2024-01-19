import { faker } from '@faker-js/faker';
import { BaseCheckoutPage } from './BaseCheckoutPage';

export class PaymentPage extends BaseCheckoutPage {
	constructor(page) {
		super(page);

		this.totalLabel = page.locator('.total-value');
		this.totalIncludingDiscountLabel = page.locator(
			'.total-with-discount-value'
		);
		this.discountPercentageLabel = page
			.frameLocator('.active-discount-container')
			.locator('//*[contains(text(),"Use the following code")]');
		this.discountCodeLabel = page
			.frameLocator('.active-discount-container')
			.locator('.discount-code');
		this.discountCodeInput = page.getByPlaceholder('Discount code');
		this.submitDiscountBtn = page.locator('.submit-discount-button');

		this.creditCardOwnerInput = page.getByPlaceholder('Credit card owner');
		this.creditCardNumberInput = page.getByPlaceholder('Credit card number');
		this.validUntilInput = page.getByPlaceholder('Valid until');
		this.creditCardCVCInput = page.getByPlaceholder('Credit card CVC');
		this.payBtn = page.locator('.pay-button');
	}

	inputDiscountCode = async () => {
		await this.discountCodeInput.fill(await this.discountCodeLabel.innerText());
		await this.expect(await this.discountCodeInput).toHaveValue(
			await this.discountCodeLabel.innerText()
		);
	};

	clickSubmitDiscount = async () => {
		await this.submitDiscountBtn.click();
	};

	inputCreditCardOwner = async () => {
		await this.creditCardOwnerInput.fill(faker.person.fullName());
	};

	inputCreditCardNumber = async () => {
		await this.creditCardNumberInput.fill(faker.finance.accountNumber(16));
	};

	inputValidUntil = async () => {
		let randomMonth = faker.number.int({ min: 1, max: 12 });
		randomMonth =
			randomMonth.toString().length === 1 ? '0' + randomMonth : randomMonth;

		const randomYear = faker.number.int({
			min: new Date().getFullYear() % 100,
			max: 99,
		});

		await this.validUntilInput.fill(`${randomMonth}${randomYear}`);
	};

	inputCreditCardCVC = async () => {
		await this.creditCardCVCInput.fill(faker.finance.creditCardCVV());
	};

	clickPay = async () => {
		await this.payBtn.click();
	};

	verifyDiscountPrice = async () => {
		const totalAmount = +(await this.totalLabel.innerText()).replace('$', '');

		const discountPercentage = +(
			await this.discountPercentageLabel.innerText()
		).match(/\d+/);
		const discountAmount = (discountPercentage / 100) * totalAmount;
		const expectedPrice = Math.floor(totalAmount - discountAmount);

		this.expect(await this.totalIncludingDiscountLabel.innerText()).toBe(
			`${expectedPrice}$`
		);
	};
}
