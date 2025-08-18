import { test, expect } from '@playwright/test'

test.describe('CollectionsSummary Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Desktop View', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('collections summary should match design', async ({ page }) => {
      // Wait for the main content to load
      await page.waitForSelector('text=Tus cobros')
      
      // Take screenshot of the collections summary section
      const collectionsSection = page.locator('text=Tus cobros').locator('..').locator('..')
      await expect(collectionsSection).toHaveScreenshot('collections-summary-desktop.png')
    })

    test('title should have correct styling', async ({ page }) => {
      await page.waitForSelector('text=Tus cobros')
      
      const title = page.locator('text=Tus cobros')
      await expect(title).toBeVisible()
      
      // Take screenshot of the title area
      await expect(title).toHaveScreenshot('collections-summary-title.png')
    })

    test('skeleton component should match design', async ({ page }) => {
      await page.waitForSelector('text=Tus cobros')
      
      // Find the skeleton component
      const skeleton = page.locator('.bg-\\[\\#dee2ec\\]').first()
      await expect(skeleton).toBeVisible()
      
      // Take screenshot of the skeleton
      await expect(skeleton).toHaveScreenshot('collections-summary-skeleton.png')
    })

    test('tabs should match design', async ({ page }) => {
      await page.waitForSelector('text=Tus cobros')
      
      // Find the tabs section
      const tabs = page.locator('text=Diario').locator('..').locator('..')
      await expect(tabs).toBeVisible()
      
      // Take screenshot of the tabs
      await expect(tabs).toHaveScreenshot('collections-summary-tabs.png')
    })

    test('metrics button should match design', async ({ page }) => {
      await page.waitForSelector('text=Tus cobros')
      
      // Find the metrics button
      const metricsButton = page.locator('button:has-text("Ver métricas")')
      await expect(metricsButton).toBeVisible()
      
      // Take screenshot of the button
      await expect(metricsButton).toHaveScreenshot('collections-summary-metrics-button.png')
    })
  })

  test.describe('Mobile View', () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test('collections summary should match mobile design', async ({ page }) => {
      await page.waitForSelector('text=Tus cobros')
      
      const collectionsSection = page.locator('text=Tus cobros').locator('..').locator('..')
      await expect(collectionsSection).toHaveScreenshot('collections-summary-mobile.png')
    })

    test('mobile tabs should be properly laid out', async ({ page }) => {
      await page.waitForSelector('text=Tus cobros')
      
      const tabs = page.locator('text=Diario').locator('..').locator('..')
      await expect(tabs).toHaveScreenshot('collections-summary-tabs-mobile.png')
    })

    test('mobile metrics button should be properly sized', async ({ page }) => {
      await page.waitForSelector('text=Tus cobros')
      
      const metricsButton = page.locator('button:has-text("Ver métricas")')
      await expect(metricsButton).toHaveScreenshot('collections-summary-metrics-button-mobile.png')
    })
  })

  test.describe('Interactive States', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('metrics button hover state', async ({ page }) => {
      await page.waitForSelector('text=Tus cobros')
      
      const metricsButton = page.locator('button:has-text("Ver métricas")')
      
      // Hover over the button
      await metricsButton.hover()
      
      // Take screenshot of hover state
      await expect(metricsButton).toHaveScreenshot('collections-summary-metrics-button-hover.png')
    })

    test('selected tab state', async ({ page }) => {
      await page.waitForSelector('text=Tus cobros')
      
      // Find the selected tab (Semanal should be selected by default)
      const selectedTab = page.locator('text=Semanal')
      await expect(selectedTab).toBeVisible()
      
      // Take screenshot of the selected tab
      const tabContainer = selectedTab.locator('..').locator('..')
      await expect(tabContainer).toHaveScreenshot('collections-summary-selected-tab.png')
    })
  })

  test.describe('Responsive Behavior', () => {
    test('should adapt to different screen sizes', async ({ page }) => {
      await page.waitForSelector('text=Tus cobros')
      
      // Test desktop view
      await page.setViewportSize({ width: 1280, height: 720 })
      const desktopSection = page.locator('text=Tus cobros').locator('..').locator('..')
      await expect(desktopSection).toHaveScreenshot('collections-summary-responsive-desktop.png')
      
      // Test tablet view
      await page.setViewportSize({ width: 768, height: 1024 })
      const tabletSection = page.locator('text=Tus cobros').locator('..').locator('..')
      await expect(tabletSection).toHaveScreenshot('collections-summary-responsive-tablet.png')
      
      // Test mobile view
      await page.setViewportSize({ width: 375, height: 667 })
      const mobileSection = page.locator('text=Tus cobros').locator('..').locator('..')
      await expect(mobileSection).toHaveScreenshot('collections-summary-responsive-mobile.png')
    })
  })
})
