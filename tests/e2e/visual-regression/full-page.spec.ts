import { test, expect } from '@playwright/test'

test.describe('Full Page Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for the page to fully load
    await page.waitForSelector('text=Tus cobros')
  })

  test.describe('Desktop View', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('full page should match design', async ({ page }) => {
      // Take screenshot of the entire page
      await expect(page).toHaveScreenshot('full-page-desktop.png')
    })

    test('page layout should be consistent', async ({ page }) => {
      // Verify key elements are present
      await expect(page.locator('header')).toBeVisible()
      await expect(page.locator('text=Tus cobros')).toBeVisible()
      await expect(page.locator('text=Diario')).toBeVisible()
      
      // Take screenshot of the entire page
      await expect(page).toHaveScreenshot('full-page-layout-desktop.png')
    })
  })

  test.describe('Mobile View', () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test('full page should match mobile design', async ({ page }) => {
      // Take screenshot of the entire page
      await expect(page).toHaveScreenshot('full-page-mobile.png')
    })

    test('mobile layout should be responsive', async ({ page }) => {
      // Verify mobile header is visible
      await expect(page.locator('header')).toBeVisible()
      await expect(page.locator('text=Tus cobros')).toBeVisible()
      
      // Take screenshot of the entire page
      await expect(page).toHaveScreenshot('full-page-layout-mobile.png')
    })
  })

  test.describe('Responsive Behavior', () => {
    test('page should adapt to different screen sizes', async ({ page }) => {
      // Test desktop view
      await page.setViewportSize({ width: 1280, height: 720 })
      await expect(page).toHaveScreenshot('full-page-responsive-desktop.png')
      
      // Test tablet view
      await page.setViewportSize({ width: 768, height: 1024 })
      await expect(page).toHaveScreenshot('full-page-responsive-tablet.png')
      
      // Test mobile view
      await page.setViewportSize({ width: 375, height: 667 })
      await expect(page).toHaveScreenshot('full-page-responsive-mobile.png')
    })
  })

  test.describe('Cross-Browser Compatibility', () => {
    test('page should look consistent across browsers', async ({ page }) => {
      // This test will run in different browsers based on the project configuration
      await expect(page).toHaveScreenshot('full-page-cross-browser.png')
    })
  })

  test.describe('Loading States', () => {
    test('page should handle loading gracefully', async ({ page }) => {
      // Navigate to the page and take screenshot immediately
      await page.goto('/')
      await expect(page).toHaveScreenshot('full-page-loading.png')
      
      // Wait for content to load and take another screenshot
      await page.waitForSelector('text=Tus cobros')
      await expect(page).toHaveScreenshot('full-page-loaded.png')
    })
  })

  test.describe('Accessibility', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('page should have proper contrast and readability', async ({ page }) => {
      // Verify text elements are visible and readable
      await expect(page.locator('text=Tus cobros')).toBeVisible()
      await expect(page.locator('text=Diario')).toBeVisible()
      await expect(page.locator('text=Semanal')).toBeVisible()
      await expect(page.locator('text=Mensual')).toBeVisible()
      
      // Take screenshot for visual accessibility review
      await expect(page).toHaveScreenshot('full-page-accessibility.png')
    })

    test('page should be keyboard navigable', async ({ page }) => {
      // Focus on the first interactive element
      await page.keyboard.press('Tab')
      
      // Take screenshot of focused state
      await expect(page).toHaveScreenshot('full-page-keyboard-focus.png')
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
      await expect(page).toHaveScreenshot('full-page-performance.png')
    })
  })
})
