# Exploration: database-integration

## Current State

The Portfolio project is an **Astro 6.1.5** SSR portfolio with:
- **Static data**: All content is hardcoded in `src/data/translations.ts`
- **Node adapter**: Using `@astrojs/node` with SSR mode
- **Current storage**: No database; all translations and content are static TypeScript objects

The site currently supports:
- Bilingual content (ES/EN) via URL parameter
- Components: Hero, TechStack, Experience, Projects, Education, Contact
- Static tech stack icons

## Affected Areas

- `src/data/translations.ts` — currently static, would need database
- `src/pages/index.astro` — renders content, could fetch from DB
- `src/components/*.astro` — display components, need data source change

## Approaches

1. **Supabase (Recommended)** — PostgreSQL + Auth + Storage
   - Pros: Free tier, excellent TypeScript SDK, built-in auth, row-level security, simple setup
   - Cons: External vendor dependency
   - Effort: Low

2. **Firebase/Firestore** — NoSQL document store
   - Pros: Generous free tier, real-time, easy for small data
   - Cons: NoSQL may be less familiar for portfolio, vendor lock-in
   - Effort: Low

3. **SQLite with Drizzle ORM** — Self-hosted file-based DB
   - Pros: Simple, portable, no external service, great DX with Drizzle
   - Cons: Not ideal for multi-instance deployment
   - Effort: Medium

4. **PostgreSQL with Drizzle** — Full SQL database
   - Pros: Most powerful, relational data, can host anywhere
   - Cons: Requires hosting setup
   - Effort: Medium-High

5. **CMS Integration** — Contentful, Strapi, Sanity
   - Pros: Content management interface, good for non-technical updates
   - Cons: More complex, adds external dependency
   - Effort: Medium

## Recommendation

**Supabase with Drizzle ORM** is recommended because:
- Already have PostgreSQL icons in portfolio (shows relevance)
- Excellent free tier for personal projects
- TypeScript-first SDK matches project
- Can start simple, scale as needed
- Auth ready if needed later

## Risks

- Adding database increases complexity (connection, query logic)
- Requires environment variables for credentials
- Build/deploy considerations for server-side data fetching

## Ready for Proposal

Yes. The scope is clear: add database integration for dynamic content management. Next step: proposal with specific use cases (what content becomes dynamic?) and approach.