import { test, expect } from '@playwright/test'
import { timeout } from '../../playwright.config'

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Tipos' }).click();
    await page.getByRole('link', { name: 'Hatchback' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByText('MarcasTiposAñosUbicaciones').click();
    await page.getByRole('button', { name: 'Tipos' }).click();
    await page.getByRole('link', { name: 'Familiar' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Tipos' }).click();
    await page.getByRole('link', { name: 'SUV' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Tipos' }).click();
    await page.getByRole('link', { name: 'Camioneta' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Tipos' }).click();
    await page.getByRole('link', { name: 'Deportivo' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Tipos' }).click();
    await page.getByRole('link', { name: 'Sedán' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Tipos' }).click();
    await page.getByRole('link', { name: 'Coupé' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Tipos' }).click();
  });