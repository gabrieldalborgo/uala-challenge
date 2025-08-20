import { test, expect } from '@playwright/test';
import { mockDataEndpoint } from './mocks/data.mock';

test.describe('Transaction Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await mockDataEndpoint(page);
    await page.goto('/');
    // Wait for the page to load and transactions to appear
    await page.waitForSelector('text=Historial de transacciones');
    // Wait for transactions to load (not skeleton)
    await page.waitForSelector('img[alt="Store icon"]', { state: 'visible' });
  });

  test('should filter transactions by Mastercard', async ({ page }) => {
    // Get initial transaction count (should be 5 transactions)
    const initialTransactions = await page
      .locator('img[alt="Store icon"]')
      .count();
    expect(initialTransactions).toBe(5);

    // Click the filter button to open filters
    await page.locator('button:has(img[alt="Filter"])').click();

    // Wait for the filters sheet to open
    await page.waitForSelector('text=Filtros');

    // Turn on the card filter switch - simpler approach
    // Wait for switches to be visible
    await page.waitForSelector('[data-slot="switch"]', { state: 'visible' });

    // Get all switches and click the second one (which should be the card filter)
    const switches = page.locator('[data-slot="switch"]');
    await switches.nth(1).click();

    // Select Mastercard from the card options - target specifically the badge in the filter
    await page.locator('[data-slot="badge"]:has-text("Mastercard")').click();

    // Apply the filters
    await page.locator('button:has-text("Aplicar filtros")').click();

    // Wait for the filters to close and transactions to update
    await page.waitForSelector('text=Historial de transacciones');

    // Wait a bit for the filtered results to load
    await page.waitForTimeout(500);

    // Verify that only Mastercard transactions are shown (should be 2)
    const filteredTransactions = await page
      .locator('img[alt="Store icon"]')
      .count();
    expect(filteredTransactions).toBe(2);

    // Verify that the remaining transactions are Mastercard transactions
    const transactionElements = await page
      .locator('img[alt="Store icon"]')
      .locator('..')
      .locator('..')
      .all();
    for (const element of transactionElements) {
      const text = await element.textContent();
      expect(text).toContain('Mastercard');
    }
  });
});
