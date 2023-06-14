import { test, expect } from '@playwright/test'
import { timeout } from '../../playwright.config'


test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Años' }).click();
    await page.getByRole('link', { name: '2022' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Años' }).click();
    await page.getByRole('link', { name: '2021' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Años' }).click();
    await page.getByRole('link', { name: '2020' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Años' }).click();
    await page.getByRole('link', { name: '2019' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Años' }).click();
    await page.getByRole('link', { name: '2018' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Años' }).click();
    await page.getByRole('link', { name: '2017' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Años' }).click();
    await page.getByRole('link', { name: '2016' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Años' }).click();
    await page.getByRole('link', { name: '2015' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Años' }).click();
    await page.getByRole('link', { name: '2014' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Años' }).click();
    await page.getByRole('link', { name: '2013' }).click();
    await page.getByRole('link', { name: 'Logo' }).click();
    await page.getByRole('button', { name: 'Años' }).click();
    await page.getByRole('link', { name: '2012' }).click();
  });