import { test, expect } from '@playwright/test'
import { timeout } from '../../playwright.config'

// Variables, change wich each test
const name = 'nombre'
const lastName = 'apellido'
const email = 'email@test.com'
const phone = '1234567890'
const password = '1234!Q'
const street = 'Calle'
const streetNumber = '123'
const interiorNumber = '12'
const postalCode = '12345'
const city = 'CDMX'
const estado = 'Ciudad de México'
const country = 'México'


test.describe('SignUp', () => {
  test.beforeEach(async ({ page }) => {
    // Go to home page
    await page.goto('http://localhost:3000/')
    await page.getByRole('link', { name: 'Iniciar sesión' }).click()
  });
  test('SignUp with valid credentials', async ({ page }) => {
    // SignUp
    await page.getByRole('link', { name: 'Regístrate aquí' }).click();
    await page.getByLabel('Nombre(s) *').click();
    await page.getByLabel('Nombre(s) *').fill(name);//add a name
    await page.getByLabel('Nombre(s) *').press('Tab');
    await page.getByLabel('Apellidos *').fill(lastName);//add a last name
    await page.getByLabel('Apellidos *').press('Tab');
    await page.getByLabel('Correo Electrónico *').fill(email);//add an email
    await page.getByLabel('Correo Electrónico *').press('Tab');
    await page.getByLabel('Teléfono *').fill(phone);//add a phone number
    await page.getByLabel('Teléfono *').press('Tab');
    await page.getByLabel('Contraseña *', { exact: true }).fill(password);//add a password
    await page.getByLabel('Contraseña *', { exact: true }).press('Tab');
    await page.getByLabel('Confirmar Contraseña *').fill(password);//confirm password
    await page.getByRole('button', { name: 'Continuar el Registro' }).click();
    await page.getByLabel('Calle *').click();
    await page.getByLabel('Calle *').fill(street);//add a street
    await page.getByLabel('Calle *').press('Tab');
    await page.getByLabel('nº Exterior *').fill(streetNumber);//add a street number
    await page.getByLabel('nº Exterior *').press('Tab');
    await page.getByLabel('nº Interior').fill(interiorNumber);//add an interior number
    await page.getByLabel('nº Interior').press('Tab');
    await page.getByLabel('Código Postal *').fill(postalCode);//add a postal code
    await page.getByLabel('Código Postal *').press('Tab');
    await page.getByLabel('Ciudad *').fill(city);//add a city
    await page.getByLabel('Ciudad *').press('Tab');
    await page.locator('#signup_dropdownStates__5W_RM').selectOption(estado);//add a state
    //await page.locator('#signup_dropdownStates__5W_RM').selectOption('Nayarit');
    await page.getByLabel('País *').click();
    await page.getByLabel('País *').fill(country);//add a country
    await page.locator('[id="__next"] div').filter({ hasText: 'Regístrate Calle *Calle *nº Exterior *nº Exterior *nº Interiornº InteriorCódigo ' }).nth(3).click();
    await page.getByRole('button', { name: 'Crear Cuenta' }).click();
    await page.getByText('Usuario registrado exitosamente').click();
    // Verify SignUp by logging in
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill(email);//same email as before
    await page.locator('input[type="email"]').press('Tab');
    await page.locator('input[type="password"]').fill(password); //same password as before
    await page.locator('button', { name: 'Ingresar' }).hover();
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/');
    // Verify that the user is logged in
    await page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').click();
    // Logout
    await page.getByRole('menuitem', { name: 'Cerrar sesión' }).click();
  });
  test('SignUp with invalid credentials', async ({ page }) => {
    await page.getByRole('link', { name: 'Regístrate aquí' }).click();
    await page.getByLabel('Nombre(s) *').click();
    await page.getByLabel('Nombre(s) *').fill(name);//add a name
    await page.getByLabel('Nombre(s) *').press('Tab');
    await page.getByLabel('Apellidos *').fill(lastName);//add a last name
    await page.getByLabel('Apellidos *').press('Tab');
    await page.getByLabel('Correo Electrónico *').fill('email@test.com');//add an email
    await page.getByLabel('Correo Electrónico *').press('Tab');
    await page.getByLabel('Teléfono *').fill(phone);//add a phone number
    await page.getByLabel('Teléfono *').press('Tab');
    await page.getByLabel('Contraseña *', { exact: true }).fill(password);//add a password
    await page.getByLabel('Contraseña *', { exact: true }).press('Tab');
    await page.getByLabel('Confirmar Contraseña *').fill(password);//confirm password
    await page.getByRole('button', { name: 'Continuar el Registro' }).click();
    await page.getByLabel('Calle *').click();
    await page.getByLabel('Calle *').fill(street);//add a street
    await page.getByLabel('Calle *').press('Tab');
    await page.getByLabel('nº Exterior *').fill(streetNumber);//add a street number
    await page.getByLabel('nº Exterior *').press('Tab');
    await page.getByLabel('nº Interior').fill(interiorNumber);//add an interior number
    await page.getByLabel('nº Interior').press('Tab');
    await page.getByLabel('Código Postal *').fill(postalCode);//add a postal code
    await page.getByLabel('Código Postal *').press('Tab');
    await page.getByLabel('Ciudad *').fill(city);//add a city
    await page.getByLabel('Ciudad *').press('Tab');
    await page.locator('#signup_dropdownStates__5W_RM').selectOption(estado);//add a state
    //await page.locator('#signup_dropdownStates__5W_RM').selectOption('Nayarit');
    await page.getByLabel('País *').click();
    await page.getByLabel('País *').fill(country);//add a country
    await page.locator('[id="__next"] div').filter({ hasText: 'Regístrate Calle *Calle *nº Exterior *nº Exterior *nº Interiornº InteriorCódigo ' }).nth(3).click();
    await page.getByRole('button', { name: 'Crear Cuenta' }).click();
    await page.getByText('Hubo un error al registrarse').click();
  });
});