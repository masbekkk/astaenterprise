import { normalizeGoldPrices, goldPriceState, getGoldPrices, readGoldPriceCache, GOLD_PRICE_CACHE_KEY } from './goldPriceService';

const now = Date.parse('2026-10-26T03:00:00Z');
const quote = { product: 'ANTAM', priceType: 'retail', amountIdr: 2000000, weightGrams: 1, basis: 'Harga dasar, belum termasuk pajak', sourceName: 'ANTAM', sourceUrl: 'https://www.logammulia.com/id/harga-emas-hari-ini', publishedAt: '2026-10-26T08:30:00+07:00' };
test('normalizes explicit timestamps and selects the latest quote of each type', () => {
  const result = normalizeGoldPrices({ data: [quote, { ...quote, publishedAt: '2026-10-25T08:30:00+07:00' }, { ...quote, priceType: 'buyback' }] }, now);
  expect(result).toHaveLength(2);
  expect(result[0]).toEqual({ ...quote, publishedAt: '2026-10-26T01:30:00.000Z' });
});
test.each([
  { amountIdr: null }, { amountIdr: 0 }, { amountIdr: '2000000' }, { amountIdr: Infinity },
  { weightGrams: 0 }, { weightGrams: '1' }, { weightGrams: Infinity }, { priceType: 'buyback', weightGrams: 5 }, { basis: '' }, { sourceName: '' }, { sourceUrl: 'javascript:alert(1)' },
  { publishedAt: 'bad-date' }, { publishedAt: '2026-10-26T08:30:00' },
  { publishedAt: '2026-10-27T08:30:00+07:00' }, { priceType: 'spot' }, { product: 'UBS' },
])('rejects invalid or ambiguous quote fields: %j', fields => {
  expect(normalizeGoldPrices([{ ...quote, ...fields }], now)).toEqual([]);
});
test('missing, malformed and empty payloads are unavailable', () => {
  for (const payload of [null, {}, { data: null }, [null], []]) expect(normalizeGoldPrices(payload, now)).toEqual([]);
  expect(goldPriceState([], { now }).status).toBe('unavailable');
});
test('retail denominations retain their total prices and do not overwrite the 1g quote', () => {
  const result = normalizeGoldPrices([quote, { ...quote, weightGrams: 5, amountIdr: 9900000 }, { ...quote, weightGrams: 0.5, amountIdr: 1050000 }], now);
  expect(result.map(r => r.weightGrams)).toEqual([0.5, 1, 5]);
  expect(result.find(r => r.weightGrams === 5).amountIdr).toBe(9900000);
  expect(result.find(r => r.weightGrams === 1).amountIdr).toBe(2000000);
});
test('tax-inclusive prices require their own basis and never calculate tax locally', () => {
  const enriched = { ...quote, amountWithTaxIdr: 2005000, taxBasis: 'PPh 22 sesuai sumber', branchName: 'Jakarta' };
  expect(normalizeGoldPrices([enriched], now)[0]).toMatchObject({ amountWithTaxIdr: 2005000, taxBasis: 'PPh 22 sesuai sumber', branchName: 'Jakarta' });
  for (const invalid of [{ taxBasis: '' }, { amountWithTaxIdr: 0 }, { amountWithTaxIdr: '2005000' }]) {
    expect(normalizeGoldPrices([{ ...enriched, ...invalid }], now)[0]).not.toHaveProperty('amountWithTaxIdr');
  }
});
test('separate branches cannot silently overwrite one another', () => {
  expect(normalizeGoldPrices([{ ...quote, branchName: 'Jakarta' }, { ...quote, branchName: 'Surabaya' }], now)).toHaveLength(2);
});
test('freshness uses Jakarta publication date, including local midnight', () => {
  expect(goldPriceState([quote], { now }).status).toBe('available');
  const midnight = Date.parse('2026-10-26T17:01:00Z');
  expect(goldPriceState([quote], { now: midnight }).status).toBe('stale');
  expect(goldPriceState([quote], { now, refreshFailed: true }).status).toBe('stale');
});
test('network and HTTP failures preserve previous quote and original publication time', async () => {
  for (const fetcher of [async () => { throw new Error('offline'); }, async () => ({ ok: false }), async () => ({ ok: true, json: async () => ({ data: [] }) })]) {
    const state = await getGoldPrices({ endpoint: '/gold', previous: [quote], fetcher, now });
    expect(state.status).toBe('stale');
    expect(state.records[0].publishedAt).toBe('2026-10-26T01:30:00.000Z');
  }
});
test('successful responses persist normalized quotes; cache is scoped to the configured feed', async () => {
  const storage = { getItem: jest.fn(), setItem: jest.fn() };
  const state = await getGoldPrices({ endpoint: '/gold', storage, now, fetcher: async () => ({ ok: true, json: async () => [quote] }) });
  expect(state.status).toBe('available');
  expect(storage.setItem).toHaveBeenCalledWith(GOLD_PRICE_CACHE_KEY, expect.any(String));
  storage.getItem.mockReturnValue(storage.setItem.mock.calls[0][1]);
  expect(readGoldPriceCache(storage, now, '/gold')).toHaveLength(1);
  expect(readGoldPriceCache(storage, now, '/different')).toEqual([]);
  storage.getItem.mockReturnValue('{bad json');
  expect(readGoldPriceCache(storage, now, '/gold')).toEqual([]);
});
test('unconfigured feed never fetches or displays cached monetary values', async () => {
  const fetcher = jest.fn();
  expect(await getGoldPrices({ previous: [quote], fetcher, now })).toEqual({ status: 'unavailable', records: [] });
  expect(fetcher).not.toHaveBeenCalled();
});
test('failed request without cached data is unavailable', async () => {
  expect((await getGoldPrices({ endpoint: '/gold', now, fetcher: async () => { throw new Error('offline'); } })).status).toBe('unavailable');
});
