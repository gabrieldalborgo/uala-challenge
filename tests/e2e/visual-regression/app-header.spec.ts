import { test, expect } from '@playwright/test'

test.describe('AppHeader Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test.describe('Desktop Header', () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('desktop header should match design', async ({ page }) => {
      // Wait for the header to be visible
      await page.waitForSelector('header')
      
      // Take screenshot of the header
      const header = page.locator('header').first()
      await expect(header).toHaveScreenshot('app-header-desktop.png')
    })

    test('desktop header with profile should match design', async ({ page }) => {
      // Wait for the header to be visible
      await page.waitForSelector('header')
      
      // Take screenshot of the entire header area
      const header = page.locator('header').first()
      await expect(header).toHaveScreenshot('app-header-desktop-profile.png')
    })

    test('desktop header layout should be consistent', async ({ page }) => {
      await page.waitForSelector('header')
      
      // Test specific elements within the header
      const profileImage = page.locator('img[alt="Profile"]')
      const nameElement = page.locator('span:has-text("Name")')
      
      // Verify elements are visible
      await expect(profileImage).toBeVisible()
      await expect(nameElement).toBeVisible()
      
      // Take screenshot of the header
      const header = page.locator('header').first()
      await expect(header).toHaveScreenshot('app-header-desktop-layout.png')
    })
  })

  test.describe('Mobile Header', () => {
    test.use({ viewport: { width: 375, height: 667 } })

    test('mobile header should match design', async ({ page }) => {
      await page.waitForSelector('header')
      
      const header = page.locator('header').first()
      await expect(header).toHaveScreenshot('app-header-mobile.png')
    })

    test('mobile header with menu should match design', async ({ page }) => {
      await page.waitForSelector('header')
      
      const header = page.locator('header').first()
      await expect(header).toHaveScreenshot('app-header-mobile-menu.png')
    })
  })

  test.describe('Responsive Behavior', () => {
    test('header should adapt to different screen sizes', async ({ page }) => {
      await page.waitForSelector('header')
      
      // Test desktop view
      await page.setViewportSize({ width: 1280, height: 720 })
      const desktopHeader = page.locator('header').first()
      await expect(desktopHeader).toHaveScreenshot('app-header-responsive-desktop.png')
      
      // Test tablet view
      await page.setViewportSize({ width: 768, height: 1024 })
      const tabletHeader = page.locator('header').first()
      await expect(tabletHeader).toHaveScreenshot('app-header-responsive-tablet.png')
      
      // Test mobile view
      await page.setViewportSize({ width: 375, height: 667 })
      const mobileHeader = page.locator('header').first()
      await expect(mobileHeader).toHaveScreenshot('app-header-responsive-mobile.png')
    })
  })
})
