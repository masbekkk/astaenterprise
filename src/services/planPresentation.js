export function isTrialPlan(plan) {
  return plan.is_trial === true || (plan.plan || plan.name || '').toLowerCase() === 'trial';
}

export function getPaidPlanTiers(plans, pricing, lang) {
  const fallback = pricing?.tiers || [];
  const paid = Array.isArray(plans) ? plans.filter(plan => !isTrialPlan(plan)) : [];
  if (!paid.length) return fallback;

  return paid.map(plan => {
    const key = (plan.plan || plan.name || '').toLowerCase();
    const localized = fallback.find(tier => tier.name.toLowerCase() === key || tier.name.toLowerCase() === (plan.display_name || '').toLowerCase());
    const price = Number(plan.price_monthly) || 0;
    const featured = Boolean(plan.featured || plan.is_popular || localized?.featured);
    return {
      name: lang === 'id' && localized ? localized.name : plan.display_name || plan.name || plan.plan,
      tagline: lang === 'id' && localized ? localized.tagline : plan.tagline || plan.description || localized?.tagline,
      price: price > 0 ? `Rp ${price.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')}` : lang === 'id' ? 'Kustom' : 'Custom',
      period: price > 0 ? pricing?.periodMonth || (lang === 'id' ? '/ bulan' : '/ month') : '',
      featured,
      badge: featured ? localized?.badge || pricing?.popularBadge : null,
      features: lang === 'id' && localized?.features?.length ? localized.features : plan.features || localized?.features || [],
      ctaText: localized?.ctaText || (lang === 'id' ? 'Beli Paket' : 'Buy Package'),
    };
  });
}
