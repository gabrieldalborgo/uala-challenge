import { test, expect } from '@playwright/test'

test.describe('Tabs Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for the page to load and tabs to be visible
    await page.waitForSelector('text=Diario')
  })

  test.describe('Desktop View', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('tabs should match design', async ({ page }) => {
      // Find the tabs container
      const tabsContainer = page.locator('text=Diario').locator('..').locator('..')
      await expect(tabsContainer).toBeVisible()
      
      // Take screenshot of the tabs
      await expect(tabsContainer).toHaveScreenshot('tabs-desktop.png')
    })

    test('individual tabs should have correct styling', async ({ page }) => {
      // Test each individual tab
      const diarioTab = page.locator('text=Diario')
      const semanalTab = page.locator('text=Semanal')
      const mensualTab = page.locator('text=Mensual')
      
      await expect(diarioTab).toBeVisible()
      await expect(semanalTab).toBeVisible()
      await expect(mensualTab).toBeVisible()
      
      // Take screenshots of individual tabs
      await expect(diarioTab).toHaveScreenshot('tab-diario.png')
      await expect(semanalTab).toHaveScreenshot('tab-semanal.png')
      await expect(mensualTab).toHaveScreenshot('tab-mensual.png')
    })

    test('selected tab should have correct styling', async ({ page }) => {
      // Find the selected tab (Semanal should be selected by default)
      const selectedTab = page.locator('text=Semanal')
      await expect(selectedTab).toBeVisible()
      
      // Take screenshot of the selected tab
      const selectedTabContainer = selectedTab.locator('..').locator('..')
      await expect(selectedTabContainer).toHaveScreenshot('tab-selected.png')
    })

    test('tab dot indicator should be visible', async ({ page }) => {
      // Find the selected tab and its dot indicator
      const selectedTab = page.locator('text=Semanal')
      const tabContainer = selectedTab.locator('..').locator('..')
      
      // Look for the dot indicator
      const dot = tabContainer.locator('.w-2.h-2.rounded-full.bg-\\[\\#022A9A\\]')
      await expect(dot).toBeVisible()
      
      // Take screenshot of the tab with dot
      await expect(tabContainer).toHaveScreenshot('tab-with-dot.png')
    })
  })

  test.describe('Mobile View', () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test('mobile tabs should match design', async ({ page }) => {
      const tabsContainer = page.locator('text=Diario').locator('..').locator('..')
      await expect(tabsContainer).toBeVisible()
      
      await expect(tabsContainer).toHaveScreenshot('tabs-mobile.png')
    })

    test('mobile tabs should be properly spaced', async ({ page }) => {
      const tabsContainer = page.locator('text=Diario').locator('..').locator('..')
      
      // Verify all tabs are visible
      await expect(page.locator('text=Diario')).toBeVisible()
      await expect(page.locator('text=Semanal')).toBeVisible()
      await expect(page.locator('text=Mensual')).toBeVisible()
      
      await expect(tabsContainer).toHaveScreenshot('tabs-mobile-spacing.png')
    })
  })

  test.describe('Interactive States', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('tab hover state', async ({ page }) => {
      const diarioTab = page.locator('text=Diario')
      
      // Hover over the tab
      await diarioTab.hover()
      
      // Take screenshot of hover state
      const tabContainer = diarioTab.locator('..').locator('..')
      await expect(tabContainer).toHaveScreenshot('tab-hover.png')
    })

    test('tab click state', async ({ page }) => {
      const diarioTab = page.locator('text=Diario')
      
      // Click on the tab
      await diarioTab.click()
      
      // Wait a moment for any animations
      await page.waitForTimeout(100)
      
      // Take screenshot of click state
      const tabContainer = diarioTab.locator('..').locator('..')
      await expect(tabContainer).toHaveScreenshot('tab-click.png')
    })
  })

  test.describe('Responsive Behavior', () => {
    test('tabs should adapt to different screen sizes', async ({ page }) => {
      // Test desktop view
      await page.setViewportSize({ width: 1280, height: 720 })
      const desktopTabs = page.locator('text=Diario').locator('..').locator('..')
      await expect(desktopTabs).toHaveScreenshot('tabs-responsive-desktop.png')
      
      // Test tablet view
      await page.setViewportSize({ width: 768, height: 1024 })
      const tabletTabs = page.locator('text=Diario').locator('..').locator('..')
      await expect(tabletTabs).toHaveScreenshot('tabs-responsive-tablet.png')
      
      // Test mobile view
      await page.setViewportSize({ width: 375, height: 667 })
      const mobileTabs = page.locator('text=Diario').locator('..').locator('..')
      await expect(mobileTabs).toHaveScreenshot('tabs-responsive-mobile.png')
    })
  })

  test.describe('Accessibility', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('tabs should be keyboard accessible', async ({ page }) => {
      const diarioTab = page.locator('text=Diario')
      
      // Focus on the tab
      await diarioTab.focus()
      
      // Take screenshot of focused state
      const tabContainer = diarioTab.locator('..').locator('..')
      await expect(tabContainer).toHaveScreenshot('tab-focused.png')
    })

    test('tabs should have proper contrast', async ({ page }) => {
      const tabsContainer = page.locator('text=Diario').locator('..').locator('..')
      
      // Verify text is visible and readable
      await expect(page.locator('text=Diario')).toBeVisible()
      await expect(page.locator('text=Semanal')).toBeVisible()
      await expect(page.locator('text=Mensual')).toBeVisible()
      
      await expect(tabsContainer).toHaveScreenshot('tabs-contrast.png')
    })
  })
})
