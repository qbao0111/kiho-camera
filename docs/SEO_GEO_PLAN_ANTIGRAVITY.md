# Kiho Camera — SEO/GEO implementation plan for Antigravity

Audit date: 2026-09-05. Scope: current local checkout plus limited read-only production HTTP checks. This is a handoff plan, not an implementation or deployment report.

## Brief for Antigravity

Improve organic discovery and the accuracy of AI-generated answers about Kiho Camera at https://kihocamera.com. GEO means Generative Engine Optimization. Preserve the current visual design, camera catalog, authentication, RLS, lead persistence and Google Sheets workflow. Work in small, reviewable changes. Do not run production migrations, reseed production, rotate keys or deploy as part of this plan without deployment authorization.

The audited branch is `codex/security-hardening`, with substantial existing uncommitted changes. Inspect the latest checkout and diff before implementation; preserve all existing work. Do not assume this branch matches the deployed commit. Do not reuse the historical claim that the title template ends in “Kiho Camera Quảng Bình”: the current template is `%s | Kiho Camera`.

## Evidence and priorities

| Priority | Observed finding | Evidence / impact |
|---|---|---|
| P0 | Rental information can contradict itself | `src/app/(public)/gia-thue-may-anh-dong-hoi/page.tsx:93` says daily prices start at 150,000 VND, but IXY 640 is 120,000 in both `supabase/seed.sql` and `src/lib/mock-data.ts`. Session windows on that page also differ from the product page's 4–5 hours; confirm the actual policy before editing. |
| P0 | Comparison lookups and fallback prices are unsafe | Canon comparison lines 34–38 use a noncanonical G7X slug plus name matching and fallback prices 200,000/150,000. A name formatted “G7 X” can miss the fallback name match. Fuji comparison falls back to 300,000 for X100V instead of the current canonical 380,000. |
| P0 | Confirmed duplicate production title | `/gia-thue-may-anh-dong-hoi` renders `… — Kiho Camera | Kiho Camera`. |
| P0 | Accidental metadata inheritance | Production `/photobooth` returns 200, index/follow, and homepage title/canonical. Its source also recommends models outside the rental catalog, such as X-T30 II and Sony A6400. |
| P1 | Social metadata does not describe the shared route | Live catalog, contact, pricing and Canon comparison pages inherit homepage OG/Twitter titles. |
| P1 | Content visibility depends on JS | `src/components/ui/motion.tsx:26,84` initializes FadeIn hidden and reveals via IntersectionObserver. Content exists in HTML, but remains visually hidden if JS fails. This is a resilience issue, not proof Google cannot index it. |
| P1 | Database outages resemble missing content | `src/lib/services/equipment.ts` converts query failures to `[]`/`null` in production and caches results for 300 seconds. Product pages can emit false 404s; sitemap can silently omit all cameras. |
| P1 | Business facts have separate sources | LocalBusiness schema hardcodes hours and coordinates while visible pages use settings. Product metadata prioritizes editorial copy, while Product JSON-LD prioritizes database copy. Bundled accessories are repeatedly asserted in editorial text. |
| P2 | Existing SEO foundations should be retained | Live sitemap has 22 URLs: 10 static routes plus 12 cameras. Homepage, R50, robots and sitemap returned 200. Product canonical is correct. Editorial content already covers all 12 camera slugs. |

No Search Console, Bing Webmaster, GBP, GA4 reports, field Core Web Vitals or production database audit was performed for this plan. Do not claim indexing, rankings, search volume or traffic improvements from these HTTP checks.

## Phase 0 — Baseline and regression boundaries

1. Record branch, commit, working-tree diff and deployment identity. Save an inventory of public routes and metadata before changes.
2. Crawl all sitemap URLs and selected edge cases: unknown camera slug, `/admin`, `/admin/login`, `/api/`, `/feedback`, `/photobooth`, catalog filters, sort and search query parameters.
3. Capture status, redirect chain, canonical, robots, title, description, OG/Twitter, H1, internal links, image failures and JSON-LD. Check both raw HTML and rendered mobile pages.
4. Keep the 12-camera catalog and existing public slugs. Runtime catalog data is authoritative for prices; repository seed/mock are consistency references. Current mock path is `src/lib/mock-data.ts`, not `src/data/mock-data.ts`.

Acceptance: a baseline distinguishes confirmed production behavior, source-only risks and items requiring owner verification.

## Phase 1 — Correct facts, metadata and indexing

### A. One source for rental facts

- Resolve comparison cameras using exact slugs: `canon-eos-r50`, `canon-g7x-mark-iii`, `fujifilm-x100v`, `fujifilm-x100vi`.
- Remove invented price fallbacks. If data is unavailable, do not publish a fabricated price; render an explicit unavailable-price state or propagate a transient data error appropriately.
- Derive minimum session/day prices from active catalog data. Keep units explicit: VND/session, VND/day, VND/day for rentals of at least three days. Do not label 80,000 VND as the daily minimum.
- Supply actual R50 prices to `canon-r50-spotlight.tsx` instead of its hardcoded 150K/250K values.
- Reconcile session duration, included items, delivery areas/fees and verification policy across pricing, guide, policy, homepage and camera editorial content. Canonical verification wording: “Không cần cọc tiền máy — chỉ cần ảnh CCCD hoặc VNeID để xác minh.”
- Treat accessories such as OTG readers, 2 batteries or 64GB cards as model-specific claims requiring confirmation against the actual bundle. Do not create separate lens/accessory rental products.

### B. Consistent metadata

- Introduce a small shared metadata utility, for example `src/lib/seo/metadata.ts`, only to eliminate demonstrated duplication: title, description, path, image and canonical origin.
- Child titles contain no Kiho suffix; preserve the current root template. Normalize legacy suffixes narrowly rather than deleting legitimate title content.
- Give each indexable route its own canonical, OG URL/title/description and Twitter metadata. Keep `vi_VN`, website name and valid image fallbacks.
- Decide metadata precedence explicitly: validated admin override, then editorial default, then generated fallback. Apply the same resolved description to page metadata and relevant structured data.
- Avoid blindly incrementing “2026” or update dates. Use genuine editorial dates, or remove the year when no dated review process exists.
- For `/photobooth`, default to `noindex, follow` through a server layout while retaining functionality. If the owner wants it indexed later, require unique useful content, its own canonical and accurate camera recommendations first.
- Keep `/feedback` noindex unless an intentional content decision changes it; remove its redundant title suffix. It should not inherit the homepage canonical.
- Keep sorting/tracking variants consolidated to the clean catalog canonical. Give internal search/filter combinations an explicit indexing policy; don't generate indexable pages for every combination. Avoid mixing unrelated canonicals with noindex as a blanket fix.

### C. Reliable crawling

- Distinguish a successful empty query/not-found result from a network/database failure. Only genuine unknown/inactive products should become 404; transient failures should not masquerade as missing products.
- Do not cache an outage as an empty catalog. Use the existing cache's documented error behavior and, where appropriate, retained last successful data; verify against Next.js 14 before implementing.
- Sitemap must contain only canonical, indexable, active pages and real modification dates. On a transient fetch failure, avoid returning a successful truncated sitemap.
- Verify robots protection covers the intended admin paths, while retaining actual auth controls and noindex metadata. Review CDN/WAF separately: a permissive robots file alone does not prove crawlers can reach the site.

Acceptance: no duplicate brand titles, no homepage canonical on unrelated routes, no invented prices, all 22 intended current sitemap URLs return correct metadata, unknown slug is a real 404, transient failures do not produce false catalog deletion signals.

## Phase 2 — GEO and local business clarity

### A. Strengthen existing pages before adding pages

| Search / answer intent | Primary page | Content needed |
|---|---|---|
| Camera rental in Đồng Hới / Quảng Bình | `/` | Brief business identity, location, real service scope and link to catalog/pricing. |
| How much does rental cost? | `/gia-thue-may-anh-dong-hoi` | Server-rendered 12-camera price table with all three periods, confirmed duration rules and bundles. |
| Which camera should I rent? | `/thiet-bi` and camera pages | Practical differences, suitability, limitations and links to relevant comparisons. |
| R50 versus G7X; X100V versus X100VI | Existing comparison routes | Direct recommendation by use case, exact current prices and evidence-based differences. |
| Renting for Phong Nha | `/thue-may-anh-phong-nha` | Actual pickup/delivery arrangement, practical shooting constraints and appropriate models. Do not imply a Phong Nha branch exists. |
| Deposit, identification and return rules | `/chinh-sach-thue`, `/huong-dan-thue` | Consistent short answers, process and links to full conditions. |
| Where is Kiho and how do I contact it? | `/gioi-thieu`, `/lien-he` | Confirmed name, address, phone, hours, map and genuine storefront photos. |

- Use short answer-first paragraphs under natural questions. Keep HTML readable and links crawlable. Do not inject hidden text written only for AI crawlers.
- Existing editorial content already has FAQs, comparisons and scene recommendations. Audit factual accuracy before expanding it. Verify technical specifications against official manufacturer sources; distinguish experience from claims about hardware.
- Add first-hand material only when available: model-appropriate sample photos with permission, actual settings, location and limitations; verified staff advice with real reviewer attribution and dates.
- Link each article to its relevant camera pages, pricing and policy. Give each page a distinct job instead of repeating the same generic rental copy everywhere.
- Do not mass-generate neighborhood pages, fake reviews, invented testimonials or unsupported “best/cheapest” claims.

### B. Structured data that matches the page

- Retain LocalBusiness, WebSite, BreadcrumbList and their stable IDs. Normalize absolute URLs and connect entities consistently.
- Confirm hours, coordinates, address and service areas with the owner/current Business Profile before changing them. Handle free-text opening hours conservatively: omit unsupported structured hours instead of guessing.
- Review Product/Offer as a rental offer, with explicit rental duration semantics where supported. Evaluate current Google eligibility before promising product rich results or Merchant Center inclusion. Consider a service representation only when it better describes the visible page; do not add redundant schemas for their own sake.
- Keep the existing removal of unsupported InStock, UsedCondition, arbitrary priceValidUntil and synthetic ratings.
- Preserve the secure JSON-LD serializer. Never replace escaped output with raw database interpolation.
- Keep visible FAQs for customers. Do not promise FAQ rich results or add markup solely to chase them. Article authors/dates must represent real editorial responsibility and revisions.

### C. Discovery outside the repository

- Audit Google Business Profile: correct business identity, address, phone, category, hours, website and genuine photos. Confirm the current official postal address while preserving useful local search terminology naturally.
- Audit Search Console domain verification, sitemap submission, Page Indexing and actual Google-selected canonicals. Check available generative-AI inclusion controls in the current UI.
- Add/audit Bing Webmaster Tools and its AI Performance report where available. Treat access/configuration work as separate from code implementation.
- Inspect OAI-SearchBot access for ChatGPT search. GPTBot training access is a separate owner preference, not a prerequisite for search visibility.
- `llms.txt` is optional and low priority. Do not make it a launch gate or claim it boosts Google rankings; maintain it only for a documented consumer/use case.

Acceptance: an AI or human can identify the business, prices, rental duration, deposit policy and contact route from public HTML without contradictory facts. Inclusion/citation by an AI engine is not guaranteed.

## Phase 3 — Performance and measurement

- Make FadeIn/ImageReveal progressive enhancements: essential content visible without JS and under reduced motion. Preserve the existing design and normal animation behavior where practical.
- Measure homepage, catalog, R50 and pricing on mobile before optimizing. Inspect hero LCP, image sizes/srcset, lazy-loading below the fold, layout stability, font payload and the interactive aperture component's actual bundle cost. Do not assume Three.js is on the homepage critical path just because it is installed.
- Retain lightweight DTOs and existing public caching. Optimize only measured bottlenecks; never cache personalized/admin/API data as part of SEO work.
- Target field p75 LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 where sufficient field data exists. Lighthouse is diagnostic lab evidence, not a field pass.
- Reuse GA4 events in `src/lib/analytics.ts`: distinguish contact clicks from successful persisted rental requests. Validate events using mocked notifications or a preview environment because live Messenger/Zalo clicks also call `/api/contact-click`, triggering Sheets/email.
- Exclude names, phone numbers, email, CCCD/VNeID and free-text customer notes from analytics.
- Record a baseline and compare at 28/56 days: non-brand organic impressions/clicks by landing page, qualified leads, conversion rate, indexed canonical pages and Bing AI citations when available. Track AI referrers as partial evidence; missing referrers do not mean no AI exposure.
- Maintain a small fixed set of representative Vietnamese questions for periodic manual AI-answer checks. Record engine/date/answer/cited URL and factual accuracy. Do not interpret a handful of personalized answers as a comprehensive ranking metric.

## Delivery and verification

Suggested implementation batches: (1) data consistency + metadata/indexing, (2) content/entity/schema improvements, (3) measured performance + reporting. Complete the first batch before commissioning additional articles.

For each batch provide changed files, rationale, before/after evidence and unresolved owner facts. Run `npx tsc --noEmit`, `npm run lint`, `npm run test:security`, `npm run build`, and `git diff --check` as appropriate to the changes. Add focused regressions for exact slug lookup, price calculations, metadata composition and query-error/not-found behavior.

Validate rendered production-build HTML across the route inventory; parse JSON-LD, check schema/page agreement, check links/images, and test JS-disabled content. Use Schema.org validator and relevant Google tools without treating eligibility warnings as permission to invent data. Recheck after an authorized deployment. Do not submit live leads just to validate SEO.

This planning pass changed only this document. No application code, production settings or database data was modified, and build/performance tests were not rerun for a documentation-only plan.

## Primary references checked

- Google, generative AI search guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google, product structured data: https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- Google, current feature/documentation changes: https://developers.google.com/search/updates
- OpenAI crawler roles: https://developers.openai.com/api/docs/bots
- Bing AI Performance: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview

Recheck vendor guidance when implementation starts. SEO/GEO recommendations are not guarantees of crawling, indexing, ranking or AI citation.
