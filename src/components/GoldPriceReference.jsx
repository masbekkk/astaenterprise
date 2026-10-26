import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, Coins } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GOLD_PRICE_REFRESH_MS, OFFICIAL_GOLD_URL, readGoldPriceCache, getGoldPrices, goldPriceState } from '@/services/goldPriceService';

const endpoint = process.env.REACT_APP_GOLD_PRICE_URL;
function storage() { try { return window.localStorage; } catch { return undefined; } }

export default function GoldPriceReference() {
  const { t, lang } = useApp();
  const copy = t.goldReference;
  const [state, setState] = useState(() => {
    const records = readGoldPriceCache(storage(), Date.now(), endpoint);
    return records.length ? goldPriceState(records, { refreshFailed: true })
      : { status: endpoint ? 'loading' : 'unavailable', records: [] };
  });
  useEffect(() => {
    if (!endpoint) return undefined;
    let previous = readGoldPriceCache(storage(), Date.now(), endpoint);
    let active = true;
    let pending = false;
    let request;
    const refresh = async () => {
      if (document.hidden || pending) return;
      pending = true;
      request = new AbortController();
      // A previous day's quote becomes stale even while revalidation is pending.
      if (previous.length) setState(goldPriceState(previous, { refreshFailed: true }));
      const result = await getGoldPrices({ endpoint, previous, storage: storage(), signal: request.signal });
      if (active) { previous = result.records; setState(result); }
      pending = false;
    };
    refresh();
    const timer = setInterval(refresh, GOLD_PRICE_REFRESH_MS);
    document.addEventListener('visibilitychange', refresh);
    return () => { active = false; clearInterval(timer); request?.abort(); document.removeEventListener('visibilitychange', refresh); };
  }, []);

  const money = new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
  const date = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'id-ID', { timeZone: 'Asia/Jakarta', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const weight = new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'id-ID', { maximumFractionDigits: 3 });
  const retail = state.records.filter(record => record.priceType === 'retail');
  return <section id="gold-reference" aria-labelledby="gold-reference-title" className="gold-reference font-sans">
    <div className="mx-auto max-w-7xl px-6 md:px-10">
      <div className="gold-reference-panel">
        <div className="space-y-3">
          <p className="eyebrow flex items-center gap-2"><Coins className="h-4 w-4" aria-hidden="true" />{copy.eyebrow}</p>
          <h2 id="gold-reference-title" className="font-editorial text-3xl md:text-4xl">{copy.title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{copy.description}</p>
        </div>
        <div className="gold-reference-quotes" aria-live="polite" aria-busy={state.status === 'loading'}>
          <p className="mb-4 text-xs font-semibold text-muted-foreground">{copy[state.status]}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {['retail', 'buyback'].map(type => {
              const quote = state.records.find(r => r.priceType === type && r.weightGrams === 1);
              return <article key={type} className="gold-quote">
                <h3 className="text-sm font-semibold">{copy[type]}</h3>
                {quote ? <>
                  <p className="my-2 text-xl font-bold tabular-nums">{money.format(quote.amountIdr)}<span className="ml-1 text-xs font-normal">/ gram</span></p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{quote.basis}</p>
                  {quote.branchName && <p className="mt-1 text-xs text-muted-foreground">{quote.branchName}</p>}
                  <p className="mt-2 text-xs text-muted-foreground"><time dateTime={quote.publishedAt}>{date.format(new Date(quote.publishedAt))} WIB</time></p>
                  <a className="source-link mt-2" href={quote.sourceUrl} target="_blank" rel="noopener noreferrer">{quote.sourceName}<ArrowUpRight className="h-3 w-3" aria-hidden="true" /></a>
                </> : <p className="mt-3 text-sm text-muted-foreground">{state.status === 'loading' ? copy.loading : copy.unavailable}</p>}
              </article>;
            })}
          </div>
          <a className="source-link mt-4" href={OFFICIAL_GOLD_URL} target="_blank" rel="noopener noreferrer">{copy.sourceLink}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
      </div>
      <details className="gold-price-details">
        <summary><span>{copy.detailsTitle}</span><ChevronDown className="h-4 w-4" aria-hidden="true" /></summary>
        <div className="gold-price-details-body">
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">{copy.detailsDescription}</p>
          {retail.length ? <div className="gold-price-table-wrap" role="region" aria-label={copy.tableCaption} tabIndex={0}>
            <table className="gold-price-table">
              <caption className="sr-only">{copy.tableCaption}</caption>
              <thead><tr><th scope="col">{copy.weight}</th><th scope="col">{copy.publishedPrice}</th><th scope="col">{copy.taxPrice}</th><th scope="col">{copy.sourceAndTime}</th></tr></thead>
              <tbody>{retail.map(record => <tr key={`${record.weightGrams}-${record.branchName || ''}`}>
                <th scope="row">{weight.format(record.weightGrams)} gram{record.branchName && <span className="mt-1 block text-xs font-normal text-muted-foreground">{record.branchName}</span>}</th>
                <td><span className="font-semibold tabular-nums">{money.format(record.amountIdr)}</span><span className="mt-1 block text-xs text-muted-foreground">{record.basis}</span></td>
                <td>{record.amountWithTaxIdr != null ? <><span className="font-semibold tabular-nums">{money.format(record.amountWithTaxIdr)}</span><span className="mt-1 block text-xs text-muted-foreground">{record.taxBasis}</span></> : <span className="text-xs text-muted-foreground">{copy.notPublished}</span>}</td>
                <td><a className="source-link" href={record.sourceUrl} target="_blank" rel="noopener noreferrer">{record.sourceName}<ArrowUpRight className="h-3 w-3" aria-hidden="true" /></a><time className="mt-2 block text-xs text-muted-foreground" dateTime={record.publishedAt}>{date.format(new Date(record.publishedAt))} WIB</time></td>
              </tr>)}</tbody>
            </table>
          </div> : <div className="gold-price-empty"><Coins className="h-6 w-6 text-gold-700" aria-hidden="true" /><p className="font-medium">{copy.unavailable}</p><p className="text-sm text-muted-foreground">{copy.detailsUnavailable}</p></div>}
          <a className="source-link mt-5" href={OFFICIAL_GOLD_URL} target="_blank" rel="noopener noreferrer">{copy.sourceLink}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
      </details>
      <p className="mt-4 max-w-4xl text-xs leading-relaxed text-muted-foreground">{copy.note}</p>
    </div>
  </section>;
}
