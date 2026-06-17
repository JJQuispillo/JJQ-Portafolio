# Proposal: database-integration

## Intent

Add database integration to enable dynamic content management for the Portfolio. Currently all content (translations, projects, experience) is hardcoded in static TypeScript files. Adding a database will allow easier content updates without code changes, enabling a CMS-like experience.

## Scope

### In Scope
1. Set up Supabase project with PostgreSQL database
2. Configure Drizzle ORM for type-safe database operations
3. Create database schema for: translations, projects, experience entries, tech stack
4. Build API layer to fetch data (SSR endpoints in Astro)
5. Update components to consume dynamic data instead of static translations.ts

### Out of Scope
- User authentication/admin panel (future enhancement)
- Image/media storage in Supabase (keep using local assets)
- Real-time features (WebSocket/Supabase Realtime)
- Content management UI (manual DB edits acceptable for now)

## Approach

Use **Supabase** (PostgreSQL) with **Drizzle ORM**:
1. Create Supabase project and get connection credentials
2. Add Drizzle ORM and Supabase client to dependencies
3. Define schema in `src/db/schema.ts` with tables for content
4. Create utility functions for fetching data
5. Modify page/component data loading to use database queries
6. Environment variables for database URL (no hardcoded credentials)

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `package.json` | Modified | Add drizzle-orm, @supabase/supabase-js |
| `src/db/` | New | Database schema and connection |
| `src/data/translations.ts` | Deprecated | Will be replaced by DB queries |
| `src/pages/index.astro` | Modified | Fetch from DB instead of static |
| `.env` | New | Database credentials |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| DB connection failure | Low | Graceful fallback to static data |
| Environment config issues | Medium | Clear .env.example, docs |
| Query performance | Low | Caching via Astro's SSR |

## Rollback Plan

1. Keep `translations.ts` as fallback source
2. Feature flag via environment variable to toggle DB/static
3. Revert to static by removing DB env vars and rebuilding
4. Database can be kept in Supabase for future use

## Dependencies

- Supabase account (free tier)
- Node.js 22.12+ (already in project)

## Success Criteria

- [ ] Site builds and runs locally with DB connection
- [ ] Content loads from database (verified via devtools/network)
- [ ] Fallback to static works when DB unavailable
- [ ] Environment variables documented in .env.example
- [ ] No runtime errors in production build