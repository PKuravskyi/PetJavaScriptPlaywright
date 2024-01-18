import { test, expect } from '../pages/pageFixtures';

test.describe('Checkout page', () => {
	test.beforeEach(async ({ page, artsPage, basketPage, loginPage, signUpPage }) => {
		const isDesktopViewport = () => page.viewportSize().width >= 600;

		await page.goto('http://localhost:2221');
		await artsPage.addArtToBasket('Mountain Landscape');
		await artsPage.addArtToBasket('Baby Zebra with butterfly');
		await artsPage.addArtToBasket('Astronaut dabbing');
		if (!isDesktopViewport()) {
			await artsPage.openHamburgerMenu();
		}
		await artsPage.clickCheckout();
		await basketPage.clickContinueToCheckout();
		await loginPage.clickRegister();
		await signUpPage.inputRandomEmail();
		await signUpPage.inputRandomPassword();
		await signUpPage.clickRegister();
	});

	test('Verify user can go to checkout after registering', async ({ page }) => {
		await expect(page).toHaveURL(/.*delivery-details/);
	});

	test('Verify user can fill out delivery details', async ({
		page,
		deliveryDetailsPage,
	}) => {
		await deliveryDetailsPage.inputRandomFirstName();
		await deliveryDetailsPage.inputRandomLastName();
		await deliveryDetailsPage.inputRandomStreet();
		await deliveryDetailsPage.inputRandomPostCode();
		await deliveryDetailsPage.inputRandomCity();
		await deliveryDetailsPage.selectCountry('Ukraine');
		await deliveryDetailsPage.clickContinueToPayment();
		await expect(page).toHaveURL(/.*payment/);
	});

	test('Verify user can save delivery details address', async ({
		deliveryDetailsPage,
	}) => {
		await deliveryDetailsPage.inputRandomFirstName();
		await deliveryDetailsPage.inputRandomLastName();
		await deliveryDetailsPage.inputRandomStreet();
		await deliveryDetailsPage.inputRandomPostCode();
		await deliveryDetailsPage.inputRandomCity();
		await deliveryDetailsPage.selectCountry('Ukraine');
		await deliveryDetailsPage.clickSaveAddress();
		await deliveryDetailsPage.verifyNewlySavedAddress();
	});

	test('Verify user can get a discount', async ({
		deliveryDetailsPage,
		paymentPage,
	}) => {
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

	test('Verify user can input credit card details and finish buying process', async ({
		deliveryDetailsPage,
		paymentPage,
		thankYouPage,
	}) => {
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
