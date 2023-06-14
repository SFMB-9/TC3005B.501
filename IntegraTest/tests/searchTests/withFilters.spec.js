import { test, expect } from '@playwright/test'
import { timeout } from '../../playwright.config'

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('banner').getByRole('link', { name: 'Compra un auto' }).click();
    await page.getByRole('button', { name: 'Marca' }).click();
    await page.getByLabel('Porsche').check();
    await page.getByRole('button', { name: 'Marca' }).click();
    await page.getByRole('button', { name: 'Marca' }).click();
    await page.getByLabel('Porsche').uncheck();
    await page.getByRole('button', { name: 'Marca' }).click();
    await page.getByRole('button', { name: 'Modelo' }).click();
    await page.getByRole('button', { name: 'Modelo' }).click();
    await page.getByRole('button', { name: 'Modelo' }).click();
    await page.getByRole('button', { name: 'Modelo' }).click();
    await page.getByRole('button', { name: 'Modelo' }).click();
    await page.getByRole('button', { name: 'Modelo' }).click();
    await page.getByRole('button', { name: 'Modelo' }).click();
    await page.getByLabel('Q5 Quattro').check();
    await page.getByLabel('Q5 Quattro').uncheck();
    await page.getByRole('button', { name: 'Modelo' }).click();
    await page.getByRole('button', { name: 'Año' }).click();
    await page.getByLabel('2016').check();
    await page.getByLabel('2016').uncheck();
    await page.getByRole('button', { name: 'Año' }).click();
    await page.getByRole('button', { name: 'Color' }).click();
    await page.getByLabel('Negro', { exact: true }).check();
    await page.getByLabel('Negro', { exact: true }).uncheck();
    await page.getByRole('button', { name: 'Color' }).click();
    await page.getByRole('button', { name: 'Combustible' }).click();
    await page.getByLabel('Híbrido').check();
    await page.getByLabel('Híbrido').uncheck();
    await page.getByRole('button', { name: 'Combustible' }).click();
    await page.getByRole('button', { name: 'Motor' }).click();
    await page.getByLabel('V6', { exact: true }).check();
    await page.getByLabel('V6', { exact: true }).uncheck();
    await page.getByRole('button', { name: 'Motor' }).click();
    await page.getByRole('button', { name: 'Tipo de vehículo' }).click();
    await page.getByLabel('Sedán').check();
    await page.getByLabel('Sedán').uncheck();
    await page.getByRole('button', { name: 'Tipo de vehículo' }).click();
    await page.getByRole('button', { name: 'Estado de la agencia' }).click();
    await page.getByLabel('CDMX').check();
    await page.getByLabel('CDMX').uncheck();
    await page.getByRole('button', { name: 'Estado de la agencia' }).click();
  });