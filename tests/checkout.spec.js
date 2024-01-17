import { test, expect } from '@playwright/test';

import { ArtsPage } from '../pages/ArtsPage';
import { BasketPage } from '../pages/BasketPage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { DeliveryDetailsPage } from '../pages/checkout/DeliveryDetailsPage';
import { PaymentPage } from '../pages/checkout/PaymentPage';
import { ThankYouPage } from '../pages/checkout/ThankYouPage';

test.describe('Checkout page', () => {
	let artsPage;
	let basketPage;
	let loginPage;
	let signUpPage;
	let deliveryDetailsPage;
	let paymentPage;
	let thankYouPage;

	test.beforeEach(async ({ page }) => {
		artsPage = new ArtsPage(page);
		basketPage = new BasketPage(page);
		loginPage = new LoginPage(page);
		signUpPage = new SignUpPage(page);
		deliveryDetailsPage = new DeliveryDetailsPage(page);
		paymentPage = new PaymentPage(page);
		thankYouPage = new ThankYouPage(page);

		await page.goto('http://localhost:2221');
		await artsPage.addArtToBasket('Mountain Landscape');
		await artsPage.addArtToBasket('Baby Zebra with butterfly');
		await artsPage.addArtToBasket('Astronaut dabbing');
		await artsPage.goToCheckout();
		await basketPage.clickContinueToCheckout();
		await loginPage.clickRegister();
		await signUpPage.inputRandomEmail();
		await signUpPage.inputRandomPassword();
		await signUpPage.clickRegister();
	});

	test('Verify user can go to checkout after registering', async ({ page }) => {
		await expect(page).toHaveURL(/.*delivery-details/);
	});

	test('Verify user can fill out delivery details', async ({ page }) => {
		await deliveryDetailsPage.inputRandomFirstName();
		await deliveryDetailsPage.inputRandomLastName();
		await deliveryDetailsPage.inputRandomStreet();
		await deliveryDetailsPage.inputRandomPostCode();
		await deliveryDetailsPage.inputRandomCity();
		await deliveryDetailsPage.selectCountry('Ukraine');
		await deliveryDetailsPage.clickContinueToPayment();
		await expect(page).toHaveURL(/.*payment/);
	});

	test('Verify user can save delivery details address', async () => {
		await deliveryDetailsPage.inputRandomFirstName();
		await deliveryDetailsPage.inputRandomLastName();
		await deliveryDetailsPage.inputRandomStreet();
		await deliveryDetailsPage.inputRandomPostCode();
		await deliveryDetailsPage.inputRandomCity();
		await deliveryDetailsPage.selectCountry('Ukraine');
		await deliveryDetailsPage.clickSaveAddress();
		await deliveryDetailsPage.verifyNewlySavedAddress();
	});

	test('Verify user can get a discount', async () => {
		await deliveryDetailsPage.inputRandomFirstName();
		await deliveryDetailsPage.inputRandomLastName();
		await deliveryDetailsPage.inputRandomStreet();
		await deliveryDetailsPage.inputRandomPostCode();
		await deliveryDetailsPage.inputRandomCity();
		await deliveryDetailsPage.selectCountry('Ukraine');
		await deliveryDetailsPage.clickContinueToPayment();
		await paymentPage.inputDiscountCode();
		await paymentPage.clickSubmitDiscount();
		await paymentPage.verifyDiscountPrice();
	});

	test('Verify user can input credit card details and finish buying process', async () => {
		await deliveryDetailsPage.inputRandomFirstName();
		await deliveryDetailsPage.inputRandomLastName();
		await deliveryDetailsPage.inputRandomStreet();
		await deliveryDetailsPage.inputRandomPostCode();
		await deliveryDetailsPage.inputRandomCity();
		await deliveryDetailsPage.selectCountry('Ukraine');
		await deliveryDetailsPage.clickContinueToPayment();
		await paymentPage.inputCreditCardOwner();
		await paymentPage.inputCreditCardNumber();
		await paymentPage.inputValidUntil();
		await paymentPage.inputCreditCardCVC();
		await paymentPage.clickPay();
		await thankYouPage.verifySuccessfullPaymentMessage();
	});
});
