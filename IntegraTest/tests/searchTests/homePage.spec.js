import { test, expect } from '@playwright/test'
import { timeout } from '../../playwright.config'

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('banner').getByRole('link', { name: 'Sobre nosotros' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Compra un auto' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
  });