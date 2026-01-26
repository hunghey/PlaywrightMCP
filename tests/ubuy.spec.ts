import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { getCurrentSiteConfig } from '../config/environment';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

interface SiteConfigData {
  country: string;
  language: string;
  email: string;
  password: string;
}

// Read test data
const testData = parse(fs.readFileSync(path.join(__dirname, '../testData/userData.csv')), {
  columns: true,
  skip_empty_lines: true
}) as SiteConfigData[];

test.describe('Ubuy Search Tests', () => {
    // let config = getCurrentSiteConfig();

  // test.beforeEach(async ({ page }) => {
  //   // Set locale and currency based on config
  //   await page.setExtraHTTPHeaders({
  //     'Accept-Language': config.locale
  //   });
  // });

  test('Verify country and language', async ({ page }) => {
    let config = getCurrentSiteConfig();
    
    // Get test data for current region
    const userData = testData.find(data => data.country.toLowerCase() === config.country.toLowerCase());
    
    const homePage = new HomePage(page, config);
    await homePage.goto();

    // Close region alert if present
    await homePage.closeRegionAlertIfPresent();

    // Verify default language and country
    await homePage.verifyCountryAndLanguage(
      userData!.country,
      userData!.language
    );
  });
});