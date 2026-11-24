# Total Services Home Care Provider — Website

Next.js 16 (App Router, Cache Components) · React 19.3 · Tailwind CSS 4 · Motion · Lenis

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to edit content

| What | File |
| --- | --- |
| Phone, address, email, hours, socials, rating, NPI | `src/lib/site.ts` |
| Service categories + the 16 individual services | `src/lib/services.ts` |
| FAQs, values, "how it works" steps, promises, **testimonials** | `src/lib/content.ts` |
| Photos | `public/images/` (free Pexels license) |

### Before launch — fill these in (`TODO` in code)
- **Email** (`site.email`) — none was public; email links appear automatically when set.
- **Office hours** (`site.hours`) — shows "Call for availability" until set.
- **Social profiles** (`site.socials`) — none exist yet; links appear in the footer when added.
- **Service area** (`serviceArea`) — nearby towns listed as a starting point; confirm real coverage.
- **Testimonials** (`testimonials`) — add real reviews you have permission to publish; they replace the "commitments" wall on the home page.
- **Domain** — when a custom domain goes live, set `NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com` in Vercel. Until then canonicals, `og:url`, the sitemap and JSON-LD use Vercel's production domain automatically (`VERCEL_PROJECT_PRODUCTION_URL`), falling back to `https://total-services-home-care-provider.vercel.app`.
- **Analytics** — set `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` to load Google Tag Manager on every page (configure GA4 inside GTM). The CSP already allows Google's tag/analytics domains.
- **Search Console** — verify the domain in Google Search Console and submit `/sitemap.xml`.
- **Real photos** of the team/office would beat stock photos — drop them into `public/images/` with the same filenames.

### Contact & careers forms
The forms use Server Actions (`src/app/actions.ts`) and send email via [Resend](https://resend.com) when these env vars are set:

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=office@yourdomain.com
CONTACT_FROM_EMAIL="Total Services Website <noreply@yourdomain.com>"   # verified sender
```

Without them, submissions are logged to the console in development and the form shows a "please call us" error in production, so leads are never silently lost.

## SEO & performance notes
- Every page builds full metadata with `pageMeta()` (`src/lib/seo.ts`): self-referencing HTTPS canonical, `og:url`, title ≤ 60 chars, description ≤ 155 chars. Next merges metadata shallowly, so never set only `description` on a page.
- Structured data: `LocalBusiness` + `WebSite` (all pages), `BreadcrumbList` (inner pages), `Service` (service pages), `FAQPage` (any FAQ section).
- `/llms.txt` is generated from the same data for AI answer engines.
- FAQ answers stay in the HTML when collapsed (crawlable); avoid conditionally rendering content.
- Hero headlines must stay visible on first paint (`AnimatedHeadline immediate`) — hiding them, even briefly, delays LCP.
- Motion uses `LazyMotion` + `m.*` components; animation features load after first paint. Use `m.div`, never `motion.div` (strict mode throws).
- Security headers (CSP, X-Frame-Options, nosniff, HSTS, Referrer/Permissions-Policy) are set in `next.config.ts`. Add any new third-party domain to the CSP there.

## Motion & UI techniques used
- **Page transitions** — React `<ViewTransition>` (soft fade/rise) + shared-element image morph from `/services` cards into `/services/[slug]` heroes.
- **Smooth scrolling** — Lenis; scroll progress bar.
- **Home** — masked word-reveal headline, parallax image stack with floating glass cards and a rotating text badge; dual infinite service tickers; scroll-linked word-by-word mission reveal; pinned **horizontal scroll** service rail (swipe carousel on mobile); **vertical stacking** step cards; dark **spotlight-glow bento** with counters; auto-scrolling testimonial/promise columns (pause on hover); town marquee + map; sticky-sidebar FAQ.
- **About** — un-clipping parallax hero, photo collage, **expanding value panels**, **sticky sidebar** image that cross-fades as each commitment scrolls by.
- **Services** — **scroll-spy sticky sidebar** with animated active pill, spotlight cards, hover-sweep detail rows.
- **Careers** — **3D tilt** cards with sheen, hover-reveal role cards, glass application form.
- Hide-on-scroll glass navbar, magnetic CTAs, circular-reveal mobile menu.
- Respects `prefers-reduced-motion` throughout.
