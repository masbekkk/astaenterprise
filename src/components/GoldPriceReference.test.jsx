import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { getGoldPrices, readGoldPriceCache } from '@/services/goldPriceService';

jest.mock('@/context/AppContext', () => ({
  useApp: () => ({ t: require('../data/brand-content.json').id, lang: 'id' }),
}));
jest.mock('@/services/goldPriceService', () => ({
  ...jest.requireActual('@/services/goldPriceService'),
  getGoldPrices: jest.fn(),
  readGoldPriceCache: jest.fn(() => []),
}));

const previousEndpoint = process.env.REACT_APP_GOLD_PRICE_URL;
process.env.REACT_APP_GOLD_PRICE_URL = '/test-only-gold-reference';
const GoldPriceReference = require('./GoldPriceReference').default;
const record = { product: 'ANTAM', priceType: 'retail', amountIdr: 2000000, weightGrams: 1, basis: 'Harga dasar', sourceName: 'ANTAM', sourceUrl: 'https://logammulia.com/harga-emas', publishedAt: '2026-10-26T01:30:00.000Z' };
let container;
let root;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  jest.clearAllMocks();
  readGoldPriceCache.mockReturnValue([]);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});
afterAll(() => {
  if (previousEndpoint === undefined) delete process.env.REACT_APP_GOLD_PRICE_URL;
  else process.env.REACT_APP_GOLD_PRICE_URL = previousEndpoint;
  delete global.IS_REACT_ACT_ENVIRONMENT;
});

test('summary selects 1g while the detail table preserves denomination totals and tax basis', async () => {
  getGoldPrices.mockResolvedValue({ status: 'available', records: [
    { ...record, weightGrams: 5, amountIdr: 9900000 },
    { ...record, amountWithTaxIdr: 2005000, taxBasis: 'Pajak sesuai sumber', branchName: 'Jakarta' },
    { ...record, priceType: 'buyback', amountIdr: 1800000 },
  ] });
  await act(async () => root.render(<GoldPriceReference />));
  const summary = container.querySelector('.gold-reference-quotes').textContent;
  expect(summary).toContain('2.000.000');
  expect(summary).toContain('1.800.000');
  expect(summary).not.toContain('9.900.000');
  expect(container.querySelectorAll('tbody tr')).toHaveLength(2);
  const table = container.querySelector('table').textContent;
  expect(table).toContain('9.900.000');
  expect(table).toContain('2.005.000');
  expect(table).toContain('Pajak sesuai sumber');
  expect(table).toContain('Jakarta');
  expect(table).toContain('08.30 WIB');
  expect(table).toContain('Tidak dicantumkan sumber');
});

test('unavailable data offers the official page without invented prices or blank numeric rows', async () => {
  getGoldPrices.mockResolvedValue({ status: 'unavailable', records: [] });
  await act(async () => root.render(<GoldPriceReference />));
  expect(container.textContent).toContain('Data harga belum tersedia');
  expect(container.textContent).not.toMatch(/Rp\s*\d/);
  expect(container.querySelector('table')).toBeNull();
  expect(container.querySelector('#gold-reference a').href).toBe('https://logammulia.com/harga-emas');
  expect(container.querySelector('details')).toBeNull();
});

test('stale quotes keep their original timestamp and an explicit unconfirmed-update label', async () => {
  getGoldPrices.mockResolvedValue({ status: 'stale', records: [{ ...record, publishedAt: '2026-10-25T01:30:00.000Z' }] });
  await act(async () => root.render(<GoldPriceReference />));
  expect(container.textContent).toContain('pembaruan belum terkonfirmasi');
  expect(container.querySelector('time').dateTime).toBe('2026-10-25T01:30:00.000Z');
});

test('visibility revalidation is suspended while hidden and removed on unmount', async () => {
  getGoldPrices.mockResolvedValue({ status: 'available', records: [record] });
  Object.defineProperty(document, 'hidden', { configurable: true, value: true });
  await act(async () => root.render(<GoldPriceReference />));
  expect(getGoldPrices).not.toHaveBeenCalled();
  Object.defineProperty(document, 'hidden', { configurable: true, value: false });
  await act(async () => document.dispatchEvent(new Event('visibilitychange')));
  expect(getGoldPrices).toHaveBeenCalledTimes(1);
  await act(async () => root.render(null));
  await act(async () => document.dispatchEvent(new Event('visibilitychange')));
  expect(getGoldPrices).toHaveBeenCalledTimes(1);
  delete document.hidden;
});
