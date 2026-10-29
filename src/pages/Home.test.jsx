import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { getSubscriptionPlans, getInitialCachedPlanResult } from '@/services/planService';
import { getPaidPlanTiers } from '@/services/planPresentation';
import { getTrialUrl } from '@/services/conversionLinks';
import content from '@/data/brand-content.json';
import Home from './Home';

let mockLang = 'id';
jest.mock('@/context/AppContext', () => ({
  useApp: () => ({ t: require('../data/brand-content.json')[mockLang], lang: mockLang }),
}));
jest.mock('@/services/planService', () => ({ getSubscriptionPlans: jest.fn(), getInitialCachedPlanResult: jest.fn() }));
jest.mock('@/components/GoldPriceReference', () => () => null);

const plans = [
  { plan: 'trial', display_name: 'Trial', price_monthly: 0, is_trial: true },
  { plan: 'starter', display_name: 'Starter', price_monthly: 499000 },
  { plan: 'professional', display_name: 'Professional', price_monthly: 1199000, is_popular: true },
  { plan: 'enterprise', display_name: 'Enterprise', price_monthly: 0 },
];
let container;
let root;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  mockLang = 'id';
  getInitialCachedPlanResult.mockReturnValue({ data: null, status: 'static' });
  getSubscriptionPlans.mockResolvedValue({ data: plans, status: 'live' });
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  delete global.IS_REACT_ACT_ENVIRONMENT;
});

test('live Trial plan uses signup while each paid package opens WhatsApp with its own name', async () => {
  await act(async () => root.render(<Home />));
  expect(container.querySelector('[data-testid="hero-primary-cta"]').href).toBe('https://app.berkahemas.web.id/start-trial?lang=id');
  expect(container.querySelector('[data-testid="trial-offer"]').textContent).toContain('Gratis 3 hari');
  const purchases = [...container.querySelectorAll('[data-testid="purchase-plan"]')];
  expect(purchases).toHaveLength(3);
  purchases.forEach((link, index) => {
    const url = new URL(link.href);
    expect(url.hostname).toBe('wa.me');
    expect(url.pathname).toBe('/6287777809578');
    expect(url.searchParams.get('text')).toContain(plans[index + 1].display_name);
    expect(link.textContent).toContain('Beli');
  });
  expect(container.querySelector('#pricing').textContent).not.toContain('Beli Trial');
});

test('English signup preserves language and paid fallback remains available when the API is unavailable', async () => {
  mockLang = 'en';
  getSubscriptionPlans.mockResolvedValue({ data: null, status: 'static' });
  await act(async () => root.render(<Home />));
  expect(container.querySelector('[data-testid="hero-primary-cta"]').href).toBe('https://app.berkahemas.web.id/start-trial?lang=en');
  const purchases = [...container.querySelectorAll('[data-testid="purchase-plan"]')];
  expect(purchases).toHaveLength(3);
  expect(purchases[0].textContent).toContain('Buy Starter');
  expect(new URL(purchases[0].href).searchParams.get('text')).toContain('buy the Starter package');
  expect(container.querySelector('[data-testid="pricing-status"]').textContent).toContain('Reference package prices');
});

test('Trial API rows never shift localized paid plan features', () => {
  const tiers = getPaidPlanTiers(plans, content.id.pricing, 'id');
  expect(tiers.map(tier => tier.name)).toEqual(['Starter', 'Professional', 'Enterprise']);
  expect(tiers[0].features).toEqual(content.id.pricing.tiers[0].features);
  expect(tiers[1].features).toEqual(content.id.pricing.tiers[1].features);
  expect(tiers[2].price).toBe('Kustom');
});

test('configured signup links preserve query parameters and reject unsupported protocols', () => {
  const previous = process.env.REACT_APP_TRIAL_URL;
  try {
    process.env.REACT_APP_TRIAL_URL = 'http://localhost:8000/start-trial?source=landing';
    expect(getTrialUrl('en')).toBe('http://localhost:8000/start-trial?source=landing&lang=en');
    process.env.REACT_APP_TRIAL_URL = 'javascript:alert(1)';
    expect(getTrialUrl()).toBe('https://app.berkahemas.web.id/start-trial?lang=id');
  } finally {
    if (previous === undefined) delete process.env.REACT_APP_TRIAL_URL;
    else process.env.REACT_APP_TRIAL_URL = previous;
  }
});
