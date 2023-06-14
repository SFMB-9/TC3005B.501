import { test, expect } from '@playwright/test'
import { timeout } from '../../playwright.config'

test.describe('View Docs', () => {

    test.beforeEach(async ({ page }) => {
        //Go to home page and select 'iniciar sesion'
        await page.goto('http://localhost:3000/');
        await page.getByRole('link', { name: 'Iniciar sesión' }).click();
    })

    test.afterEach(async ({ page }) => {
        // Logout
        await page.goto('http://localhost:3000/');
        await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
        await page.getByRole('menuitem', { name: 'Cerrar sesión' }).getByText('Cerrar sesión').click();     
    })

    test('Check the view of documents inside an account', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.getByRole('link', { name: 'Iniciar sesión' }).click();
        await page.locator('input[type="email"]').click();
        await page.locator('input[type="email"]').fill('karla@gmail.com');
        await page.locator('input[type="email"]').press('Tab');
        await page.locator('input[type="password"]').press('CapsLock');
        await page.locator('input[type="password"]').fill('K');
        await page.locator('input[type="password"]').press('CapsLock');
        await page.locator('input[type="password"]').fill('Karla123!');
        await page.locator('button', { name: 'Ingresar' }).hover();
        await page.getByRole('button', { name: 'Ingresar' }).click();
        await page.goto('http://localhost:3000/');
        await page.goto('http://localhost:3000/');
        await page.goto('http://localhost:3000/');
        await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
        await page.getByRole('link', { name: 'Ver mi perfil' }).click();
        await page.getByRole('link', { name: 'Mis documentos' }).getByTestId('ps-menu-button-test-id').click();
        await page.goto('http://localhost:3000/account/documents');
    });
})