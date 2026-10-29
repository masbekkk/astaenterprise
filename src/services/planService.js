/**
 * Subscription Plans Service with Frontend Stale-While-Revalidate (SWR) Caching.
 * Prevents redundant network requests, eliminates layout shifts, and provides offline resilience.
 */

import brand from '@/data/brand';

const CACHE_KEY = "berkahemas_subscription_plans_cache_v2";
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL

// In-memory fallback if sessionStorage is unavailable
let memoryCache = null;

export async function getSubscriptionPlans({ forceRefresh = false } = {}) {
  const backendUrl = (process.env.REACT_APP_BACKEND_URL || brand.BRAND.platformUrl).replace(/\/+$/, '');

  // 1. If backend URL is not configured or in production without live backend, return null immediately
  // React will seamlessly use the high-performance pre-baked localized pricing tiers.
  if (backendUrl.includes("preview.emergentagent.com")) {
    return { data: null, fromCache: false, status: 'static' };
  }

  const url = `${backendUrl}/api/v1/subscription-plans`;

  // 2. Read from cache first
  const cached = getCachedPlans();

  // If cache is fresh, return cached data immediately
  if (cached && !cached.isStale && !forceRefresh) {
    return { data: cached.data, fromCache: true, status: 'cached' };
  }

  // 3. Fetch fresh data from backend
  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timeoutId = controller ? setTimeout(() => controller.abort(), 3000) : null;
  try {

    const response = await fetch(url, {
      signal: controller?.signal,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return { data: cached?.data || null, fromCache: Boolean(cached), status: cached ? 'stale' : 'static' };
    }

    const json = await response.json();
    if (Array.isArray(json?.data) && json.data.length > 0) {
      savePlansToCache(json.data);
      return { data: json.data, fromCache: false, status: 'live' };
    }

    if (cached) {
      return { data: cached.data, fromCache: true, status: 'stale' };
    }

    return { data: null, fromCache: false, status: 'static' };
  } catch (err) {
    // Graceful silent fallback without noisy console errors
    if (cached) {
      return { data: cached.data, fromCache: true, isStaleFallback: true, status: 'stale' };
    }
    return { data: null, fromCache: false, status: 'static' };
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

/**
 * Synchronous initial cache read to populate React state immediately upon component mount (0ms delay).
 */
export function getInitialCachedPlans() {
  const cached = getCachedPlans();
  return cached ? cached.data : null;
}

export function getInitialCachedPlanResult() {
  const cached = getCachedPlans();
  return { data: cached?.data || null, status: cached ? (cached.isStale ? 'stale' : 'cached') : 'static' };
}

function getCachedPlans() {
  try {
    const raw = typeof window !== "undefined" ? window.sessionStorage?.getItem(CACHE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.data) && parsed.timestamp) {
        const isStale = Date.now() - parsed.timestamp > CACHE_TTL_MS;
        return { data: parsed.data, isStale, timestamp: parsed.timestamp };
      }
    }
  } catch (e) {
    // Storage access restricted or invalid JSON
  }

  if (memoryCache && Array.isArray(memoryCache.data)) {
    const isStale = Date.now() - memoryCache.timestamp > CACHE_TTL_MS;
    return { data: memoryCache.data, isStale, timestamp: memoryCache.timestamp };
  }

  return null;
}

function savePlansToCache(data) {
  const payload = {
    data,
    timestamp: Date.now(),
  };

  memoryCache = payload;

  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    }
  } catch (e) {
    // Storage quota exceeded or disabled
  }
}
