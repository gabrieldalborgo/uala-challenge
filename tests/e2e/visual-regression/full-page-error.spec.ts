import { test, expect } from '@playwright/test'
import { mockDataEndpoint } from './mocks/data.mock'

test.describe('Full Page Error Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await mockDataEndpoint(page, 0, 'server_error')
    await page.goto('/')
  })

  test.describe('Desktop View', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('full page should match design', async ({ page }) => {
      // Take screenshot of the entire page
      await expect(page).toHaveScreenshot('full-page-error-desktop.png')
    })

    test('page layout should be consistent', async ({ page }) => {
      // Verify key elements are present
      await expect(page.locator('header')).toBeVisible()
      await expect(page.locator('text=Tus cobros')).toBeVisible()
      await expect(page.locator('text=Diario')).toBeVisible()
      
      // Take screenshot of the entire page
      await expect(page).toHaveScreenshot('full-page-error-layout-desktop.png')
    })
  })

  test.describe('Mobile View', () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test('full page should match mobile design', async ({ page }) => {
      // Take screenshot of the entire page
      await expect(page).toHaveScreenshot('full-page-error-mobile.png')
    })
  })

  test.describe('Responsive Behavior', () => {
    test('page should adapt to different screen sizes', async ({ page }) => {
      // Test desktop view
      await page.setViewportSize({ width: 1280, height: 720 })
      await expect(page).toHaveScreenshot('full-page-error-responsive-desktop.png')
      
      // Test mobile view
      await page.setViewportSize({ width: 375, height: 667 })
      await expect(page).toHaveScreenshot('full-page-error-responsive-mobile.png')
    })
  })

  test.describe('Cross-Browser Compatibility', () => {
    test('page should look consistent across browsers', async ({ page }) => {
      // This test will run in different browsers based on the project configuration
      await expect(page).toHaveScreenshot('full-page-error-cross-browser.png')
    })
  })

  test.describe('Performance', () => {
    test('page should render quickly', async ({ page }) => {
      // Measure time to load
      const startTime = Date.now()
      await page.goto('/')
      await page.waitForSelector('text=Tus cobros')
      const loadTime = Date.now() - startTime
      
      // Verify page loads within reasonable time (adjust threshold as needed)
      expect(loadTime).toBeLessThan(5000)
      
      // Take screenshot after load
      await expect(page).toHaveScreenshot('full-page-error-performance.png')
    })
  })
})
