import { test, expect } from '@playwright/test';
import { timeout } from '../../playwright.config'

test.describe('LogIn', () => {
  test.beforeEach(async ({ page }) => {
    // Go to home page
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Iniciar sesión' }).click();
    
  });
  test('LogIn with valid credentials', async ({ page }) => {
    // Login
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill('Karla@gmail.com');
    await page.locator('input[type="email"]').press('Tab');
    await page.locator('input[type="password"]').fill('Karla123!');
    await page.locator('button', { name: 'Ingresar' }).hover();
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    // Verify login
    await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
    // Logout
    await page.getByRole('menuitem', { name: 'Cerrar sesión' }).getByText('Cerrar sesión').click();
  });
  test('LogIn with invalid credentials', async ({ page }) => {
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill('Kar@gmail.com');
    await page.locator('input[type="email"]').press('Tab');
    await page.locator('input[type="password"]').fill('Karla123!');
    await page.locator('button', { name: 'Ingresar' }).hover();
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.getByText('Correo o contraseña incorrectos').click();
  });
    
});