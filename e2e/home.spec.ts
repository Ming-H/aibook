import { test, expect } from '@playwright/test';

test.describe('首页', () => {
  test('首页加载并显示标题', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveText('DevFox AI');
  });

  test('首页全页截图', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: 'e2e/screenshots/home.png',
      fullPage: true,
    });
  });

  test('关于页全页截图', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      path: 'e2e/screenshots/about.png',
      fullPage: true,
    });
  });
});
