// Public, normalized feed only. Provider credentials belong on the server.
export const GOLD_PRICE_REFRESH_MS = 15 * 60 * 1000;
export const GOLD_PRICE_CACHE_KEY = 'berkahemas_gold_prices_v1';
export const OFFICIAL_GOLD_URL = 'https://logammulia.com/harga-emas';

const jakartaDate = value => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(new Date(value));

export function normalizeGoldPrices(payload, now = Date.now()) {
  const records = Array.isArray(payload) ? payload : payload?.data;
  if (!Array.isArray(records)) return [];
  const normalized = records.flatMap(record => {
    if (!record || record.product !== 'ANTAM' || !['retail', 'buyback'].includes(record.priceType)) return [];
    const { amountIdr, weightGrams } = record;
    if (typeof amountIdr !== 'number' || !Number.isFinite(amountIdr) || amountIdr <= 0) return [];
    if (typeof weightGrams !== 'number' || !Number.isFinite(weightGrams) || weightGrams <= 0) return [];
    // Retail amounts are totals per bar; buyback remains a per-gram reference.
    if (record.priceType === 'buyback' && weightGrams !== 1) return [];
    if (!['basis', 'sourceName', 'sourceUrl', 'publishedAt'].every(key => typeof record[key] === 'string' && record[key].trim())) return [];
    // Require an explicit timezone; never interpret a provider timestamp in the visitor's timezone.
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(record.publishedAt)) return [];
    const published = Date.parse(record.publishedAt);
    if (!Number.isFinite(published) || published > now) return [];
    try { if (new URL(record.sourceUrl).protocol !== 'https:') return []; } catch { return []; }
    const details = {};
    if (typeof record.branchName === 'string' && record.branchName.trim()) details.branchName = record.branchName.trim();
    if (typeof record.taxBasis === 'string' && record.taxBasis.trim()
      && typeof record.amountWithTaxIdr === 'number' && Number.isFinite(record.amountWithTaxIdr)
      && record.amountWithTaxIdr >= amountIdr) {
      details.amountWithTaxIdr = record.amountWithTaxIdr;
      details.taxBasis = record.taxBasis.trim();
    }
    return [{ product: 'ANTAM', priceType: record.priceType, amountIdr, weightGrams, ...details,
      basis: record.basis.trim(), sourceName: record.sourceName.trim(), sourceUrl: record.sourceUrl,
      publishedAt: new Date(published).toISOString() }];
  });
  // Keep weights and branches distinct; never replace a 1g quote with a larger bar's total.
  const latest = new Map();
  for (const quote of normalized) {
    const key = JSON.stringify([quote.priceType, quote.weightGrams, quote.branchName || '']);
    if (!latest.has(key) || Date.parse(quote.publishedAt) > Date.parse(latest.get(key).publishedAt)) latest.set(key, quote);
  }
  return [...latest.values()].sort((a, b) => a.priceType.localeCompare(b.priceType) * -1 || a.weightGrams - b.weightGrams || (a.branchName || '').localeCompare(b.branchName || ''));
}

export function goldPriceState(records, { now = Date.now(), refreshFailed = false } = {}) {
  const quotes = normalizeGoldPrices(records, now);
  if (!quotes.length) return { status: 'unavailable', records: [] };
  const stale = refreshFailed || quotes.some(r => jakartaDate(r.publishedAt) !== jakartaDate(now));
  return { status: stale ? 'stale' : 'available', records: quotes };
}

export function readGoldPriceCache(storage, now = Date.now(), endpoint = '') {
  try {
    const cached = JSON.parse(storage?.getItem(GOLD_PRICE_CACHE_KEY) || 'null');
    if (!endpoint || cached?.endpoint !== endpoint) return [];
    return normalizeGoldPrices(cached.records, now);
  } catch { return []; }
}

export async function getGoldPrices({ endpoint, previous = [], storage, signal, fetcher = fetch, now = Date.now() } = {}) {
  if (!endpoint) return { status: 'unavailable', records: [] };
  let timeout;
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal?.addEventListener('abort', abort, { once: true });
  if (signal?.aborted) abort();
  try {
    timeout = setTimeout(abort, 8000);
    const response = await fetcher(endpoint, { signal: controller.signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Gold reference unavailable');
    const records = normalizeGoldPrices(await response.json(), now);
    if (!records.length) throw new Error('No valid quotes');
    try { storage?.setItem(GOLD_PRICE_CACHE_KEY, JSON.stringify({ endpoint, records })); } catch { /* Storage is optional. */ }
    return goldPriceState(records, { now });
  } catch {
    return goldPriceState(previous, { now, refreshFailed: true });
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener('abort', abort);
  }
}
