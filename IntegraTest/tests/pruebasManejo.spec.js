import { test, expect } from '@playwright/test'
import { timeout } from '../playwright.config'

test.describe('Driving Req', () => {
    test.beforeEach(async ({ page }) => {

        await page.goto('http://localhost:3000/')
        await page.getByRole('link', { name: 'Iniciar sesión'}).click()

        //Se confirma la sesión antes de realizar el proceso
        await page.locator('input[type="email"]').click();
        await page.locator('input[type="email"]').fill('karla@gmail.com');
        await page.locator('input[type="email"]').press('Tab');
        await page.locator('input[type="password"]').fill('Karla123!');
        await page.locator('button', { name: 'Ingresar' }).hover();
        await page.getByRole('button', { name: 'Ingresar' }).click();
        setTimeout(() => { page.getByRole('menuitem', { name: 'Mi cuenta' }).getByText('Mi cuenta').hover();}, 50000);
    })

    test('Agendar prueba de manejo correctamente', async ({ page }) => {
        setTimeout(() => { page.getByRole('banner').getByRole('link', { name: 'Compra un auto' }).click();}, 50000);
        setTimeout(() => { page.getByRole('link', { name: 'Nissan Versa 2019 · Ciudad de México · Nissan Cuauhtémoc Disponible en 2 colores $245.999 MXN' }).click();}, 50000); 
        setTimeout(() => { page.getByRole('button', { name: 'Prueba de manejo' }).click();}, 50000); 
        setTimeout(() => { page.goto('http://localhost:3000/catalog/test-detail?auto_id=kZS_dIgB6Fc17-h0kMHn&colorName=Blanco+Nieve');}, 50000); 
        setTimeout(() => { page.getByRole('button', { name: 'Continuar' }).click();}, 50000);
        setTimeout(() => { page.getByRole('textbox').first().click();}, 50000); 
        setTimeout(() => { page.getByRole('option', { name: 'Choose Thursday, June 15th, 2023' }).click();}, 50000); 
        setTimeout(() => { page.getByRole('textbox').nth(1).click();}, 50000); 
        setTimeout(() => { page.getByText('06 PM').click();}, 50000); 
        setTimeout(() => { page.getByRole('button', { name: 'Continuar' }).click();}, 50000); 
        setTimeout(() => { page.getByRole('button', { name: 'Confirmar' }).click();}, 50000); 
        setTimeout(() => { page.getByRole('menuitem', { name: 'Mi cuenta' }).click();}, 50000);
        setTimeout(() => { page.getByRole('menuitem', { name: 'Ver mi perfil' }).click();}, 50000); 
        setTimeout(() => { page.getByRole('link', { name: 'Mis pruebas de manejo' }).getByTestId('ps-menu-button-test-id').click();}, 50000); 
        setTimeout(() => { page.getByRole('link', { name: 'Nissan Versa 2019 Nissan Cuauhtemoc Fecha de la cita: 15 de junio del 2023 Horario de la cita: 18:00 Estatus: En proceso' }).click();}, 50000); 
        setTimeout(() => { page.locator('div').filter({ hasText: /^¡Su prueba de manejo ha sido agendada exitosamente!$/ }).click();}, 50000);     
    })
})
