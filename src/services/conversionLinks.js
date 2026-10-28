import brand from '@/data/brand';

const { BRAND } = brand;

export function getTrialUrl(lang = 'id') {
  let url;
  try {
    url = new URL(process.env.REACT_APP_TRIAL_URL || `${BRAND.platformUrl}/start-trial`);
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Unsupported URL');
  } catch {
    url = new URL(`${BRAND.platformUrl}/start-trial`);
  }
  url.searchParams.set('lang', lang === 'en' ? 'en' : 'id');
  return url.href;
}

export function getPurchaseUrl(planName, lang = 'id') {
  const message = lang === 'en'
    ? `Hello BerkahEmas, I would like to buy the ${planName || 'ERP'} package for my gold store.`
    : `Halo BerkahEmas, saya ingin membeli paket ${planName || 'ERP'} untuk toko emas saya.`;
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}
