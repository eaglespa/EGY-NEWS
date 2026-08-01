# EGY NEWS — Work Checkpoint

Last updated: Aug 01, 2026. Status: **ALL DONE — committed, built, deployed.** This file can be deleted; kept only as a record.

## What was delivered in this batch

1. **Hero featured-card redesign** (`components/site/Hero.tsx`) — larger art thumb with inner ring,
   gold category dot, clock glyph + read-time meta, oversized `01/02/03` index watermark, gold hover hairline.

2. **Wire expanded 8 → 51 sources** (`lib/wire.ts` + `lib/async.ts`) — added MSN, AP, Guardian, NYT,
   Washington Post, Bloomberg, CNBC, NBC, CBS, ABC, USA Today, Forbes, Yahoo News, HuffPost, NPR,
   Politico, Verge, WIRED, TechCrunch, Business Insider, Sky News, DW, France 24, India Today, Times of
   India, SCMP, Japan Times, Al Arabiya, Arab News, Times of Israel, The National + 12 Arabic outlets.
   Uses `mapLimit(…, 6, fetchFeed)` concurrency pool, 7s per-fetch timeout, cap 150 items.
   LiveWire chip colors now hash-assigned from a 12-color palette (`sourceColor()`).

3. **Weather section** (`lib/weather.ts`, `app/api/weather/route.ts`, `components/site/WeatherSection.tsx`)
   — Open-Meteo multi-location, 20 famous world cities, WMO-code→label/icons, hi/lo, wind, humidity,
   local time. Handles BOTH Open-Meteo response shapes: object-with-arrays AND array-of-per-location-objects.
   Route cached `revalidate:600`, validation throws on bad payload (never caches zeros).

4. **Currencies & Stocks section** (`lib/markets.ts`, `app/api/markets/route.ts`,
   `components/site/MarketsSection.tsx`) — FX via `open.er-api.com/v6/latest/USD` (20 currencies,
   1 USD = X), stocks/indices via Yahoo chart API (19-20 symbols incl. ^GSPC, ^EGX30, COMI.CA),
   `mapLimit(…, 8, fetchStock)`. Route cached `revalidate:300`.

5. **i18n** (`lib/i18n-wire.ts`) — `WeatherDict` + `MarketsDict` interfaces and full `WEATHER` +
   `MARKETS` records for all 30 locales; `getWeather()`, `getMarkets()` helpers.

6. **Pages** — `app/[lang]/page.tsx` + `app/[lang]/live/page.tsx` now render Weather + Markets sections.

## Verified
- `npx tsc --noEmit` clean, `npm run lint` clean, `npm run build` succeeds (940 pages).
- Local `next start` smoke tests: `/api/weather` (20 cities w/ real temps/codes/hi/lo),
  `/api/markets` (20 fx + 19 stocks), `/api/news?lang=en` (4759 total / 150 items / 51 sources in 5.9s),
  `/en`, `/en/live`, `/ar/live` all render the new sections.

## Notes / constraints
- Vercel Hobby function timeout ~60s: wire cold-cache fetch measured 5.9s locally → safe.
- `vercel deploy --prod` is required (GitHub integration does not auto-deploy this repo).
- Comments still require the user's Upstash/KV store + env vars (unchanged, out of scope here).
