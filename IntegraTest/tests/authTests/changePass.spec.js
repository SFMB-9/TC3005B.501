import { test, expect } from '@playwright/test'
import { timeout } from '../../playwright.config'

const email = 'email4@test.com'
const password = '12345!Q'
const new_password = '1234!Q'
const email2 = 'email3@test.com'
const password2 = '12345!Q'
const new_password2 = '1234!Q'
const email3 = 'email2@test.com'
const password3 = '1234!Q'
const new_password3 = '12345!Q'

test.describe('Change Pass', () => {
  test.beforeEach(async ({ page }) => {
    // Go to home page
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Iniciar sesión' }).click();
    
  });
  test.afterEach(async ({ page }) => {
    // Logout
    await page.goto('http://localhost:3000/');
    await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
    await page.getByRole('menuitem', { name: 'Cerrar sesión' }).getByText('Cerrar sesión').click();
  });
  test('Change password to same current password', async ({ page }) => {
    // Login
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="email"]').press('Tab');
    await page.locator('input[type="password"]').fill(password);
    await page.locator('button', { name: 'Ingresar' }).hover();
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    // Go to change password page
    await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
    await page.getByRole('link', { name: 'Cambiar contraseña' }).click();
    // Should not change password, displays "La nueva contraseña debe ser diferente a la actual"
    await page.getByLabel('Contraseña Actual *').click();
    await page.getByLabel('Contraseña Actual *').fill(password);
    await page.getByLabel('Contraseña Actual *').press('Tab');
    await page.locator('form div').filter({ hasText: 'Nueva Contraseña *Nueva Contraseña *' }).locator('#password_field').fill(password);
    await page.locator('form div').filter({ hasText: 'Nueva Contraseña *Nueva Contraseña *' }).locator('#password_field').press('Tab');
    await page.locator('form div').filter({ hasText: 'Confirmar Contraseña *Confirmar Contraseña *' }).locator('#password_field').fill(password);
    await page.getByRole('button', { name: 'Cambiar Contraseña' }).click();
    await page.getByText('La nueva contraseña debe ser diferente a la actual').click();
  });
  test('Change password with incorrect current password', async ({ page }) => {
    // Login
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill(email3);
    await page.locator('input[type="email"]').press('Tab');
    await page.locator('input[type="password"]').fill(password3);
    await page.locator('button', { name: 'Ingresar' }).hover();
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    // Go to change password page
    await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
    await page.getByRole('link', { name: 'Cambiar contraseña' }).click();
    // Should not change password, displays "Contraseña actual incorrecta"
    await page.getByLabel('Contraseña Actual *').click();
    await page.getByLabel('Contraseña Actual *').fill(new_password3);
    await page.getByLabel('Contraseña Actual *').press('Tab');
    await page.locator('form div').filter({ hasText: 'Nueva Contraseña *Nueva Contraseña *' }).locator('#password_field').fill(new_password3);
    await page.locator('form div').filter({ hasText: 'Nueva Contraseña *Nueva Contraseña *' }).locator('#password_field').press('Tab');
    await page.locator('form div').filter({ hasText: 'Confirmar Contraseña *Confirmar Contraseña *' }).locator('#password_field').fill(new_password3);
    await page.getByRole('button', { name: 'Cambiar Contraseña' }).click();
    await page.getByText('Contraseña actual incorrecta').click();
  });
  test('Change password successfully', async ({ page }) => {
    // Go to home page
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Iniciar sesión' }).click();
    // Login
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill(email2);
    await page.locator('input[type="email"]').press('Tab');
    await page.locator('input[type="password"]').fill(password2);
    await page.locator('button', { name: 'Ingresar' }).hover();
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    // Go to change password page
    await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
    await page.getByRole('link', { name: 'Cambiar contraseña' }).click();
    // Should change password, displays "Contraseña cambiada exitosamente"
    await page.getByLabel('Contraseña Actual *').click();
    await page.getByLabel('Contraseña Actual *').fill(password2);
    await page.getByLabel('Contraseña Actual *').press('Tab');
    await page.locator('form div').filter({ hasText: 'Nueva Contraseña *Nueva Contraseña *' }).locator('#password_field').fill(new_password2);
    await page.locator('form div').filter({ hasText: 'Nueva Contraseña *Nueva Contraseña *' }).locator('#password_field').press('Tab');
    await page.locator('form div').filter({ hasText: 'Confirmar Contraseña *Confirmar Contraseña *' }).locator('#password_field').fill(new_password2);
    await page.getByRole('button', { name: 'Cambiar Contraseña' }).click();
    await page.getByText('Contraseña cambiada exitosamente').click();
    // Logout
    await page.goto('http://localhost:3000/');
    await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
    await page.getByRole('menuitem', { name: 'Cerrar sesión' }).getByText('Cerrar sesión').click();
    // Login with new password
    await page.getByRole('link', { name: 'Iniciar sesión' }).click();
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill(email2);
    await page.locator('input[type="email"]').press('Tab');
    await page.locator('input[type="password"]').fill(new_password2);
    await page.locator('button', { name: 'Ingresar' }).hover();
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    // Verify login
    await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
  });/*
  test.afterAll(async ({ page }) => {
    // Change password back to original
    // Go to home page
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Iniciar sesión' }).click();
    // Login
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="email"]').press('Tab');
    await page.locator('input[type="password"]').fill(new_password);
    await page.locator('button', { name: 'Ingresar' }).hover();
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    // Go to change password page
    await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
    await page.getByRole('link', { name: 'Cambiar contraseña' }).click();
    // Change password
    await page.getByLabel('Contraseña Actual *').click();
    await page.getByLabel('Contraseña Actual *').fill(new_password);
    await page.getByLabel('Contraseña Actual *').press('Tab');
    await page.locator('form div').filter({ hasText: 'Nueva Contraseña *Nueva Contraseña *' }).locator('#password_field').fill('password');
    await page.locator('form div').filter({ hasText: 'Nueva Contraseña *Nueva Contraseña *' }).locator('#password_field').press('Tab');
    await page.locator('form div').filter({ hasText: 'Confirmar Contraseña *Confirmar Contraseña *' }).locator('#password_field').fill('password');
    await page.getByRole('button', { name: 'Cambiar Contraseña' }).click();
    await page.getByText('Contraseña cambiada exitosamente').click();
    // Logout
    await page.goto('http://localhost:3000/');
    await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
    await page.getByRole('menuitem', { name: 'Cerrar sesión' }).getByText('Cerrar sesión').click();
  });*/
});