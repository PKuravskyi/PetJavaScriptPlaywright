import { emptyDir } from 'fs-extra';
import { join } from 'path';

const allureResultsPath = join(__dirname, '../allure-results');

async function globalSetup() {
	// Clean allure-results folder before each test run
	try {
		await emptyDir(allureResultsPath);
		console.log('Allure results folder cleaned successfully.');
	} catch (error) {
		console.error('Error cleaning Allure results folder:', error);
	}
}

export default globalSetup;
