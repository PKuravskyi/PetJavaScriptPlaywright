import 'dotenv/config';
import { mergeTests } from '@playwright/test';

const { test: pageFixtures } = require('../pages/pageFixtures');
const {
	test: endpointFixtures,
} = require('../services/endpoints/endpointFixtures');

const test = mergeTests(pageFixtures, endpointFixtures);
module.exports = { test };
