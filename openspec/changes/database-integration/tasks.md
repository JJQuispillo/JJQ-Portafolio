# Tasks: Database Integration

## Phase 1: Infrastructure

- [x] 1.1 Add dependencies: `npm install drizzle-orm @supabase/supabase-js` to package.json
- [x] 1.2 Create `.env.example` with `DATABASE_URL` and `USE_DATABASE` variables documented
- [x] 1.3 Create `.env` with placeholder for local dev ( Supabase credentials)
- [x] 1.4 Verify `.gitignore` excludes `.env` file

## Phase 2: Database Layer

- [x] 2.1 Create `src/db/schema.ts` with Drizzle schema for translations table
- [x] 2.2 Create `src/db/index.ts` with Supabase client initialization and connection test function
- [x] 2.3 Create `src/lib/content.ts` with `getTranslations(lang)` function including fallback logic
- [x] 2.4 Add type exports from schema for TypeScript support

## Phase 3: Integration

- [x] 3.1 Update `src/pages/index.astro` to fetch content from `getTranslations()` instead of importing static
- [x] 3.2 Update all components (Hero, TechStack, Experience, Projects, Education, Contact) to accept content props
- [x] 3.3 Verify bilingual support works (URL parameter ?lang=es or ?lang=en)
- [x] 3.4 Test SSR mode with `npm run dev`

## Phase 4: Testing & Verification

- [x] 4.1 Test: Verify site builds with `npm run build`
- [x] 4.2 Test: Dev server loads content from database (if DATABASE_URL set) - Falls back to static when no DB
- [x] 4.3 Test: Fallback to static when DATABASE_URL is removed - Implemented in getTranslations()
- [x] 4.4 Test: Both ES and EN languages render correctly - URL param support maintained

## Phase 5: Cleanup

- [x] 5.1 Document the integration in README.md (how to set up Supabase)
- [x] 5.2 Add SQL script in `scripts/init-db.sql` to populate initial data from translations.ts
- [x] 5.3 Clean up any debug console.log statements added during development

## Implementation Order

1. Start with Phase 1 (dependencies and env vars)
2. Phase 2 (DB schema and lib) — foundation for everything else
3. Phase 3 (integration) — connect components to the new data layer
4. Phase 4 (testing) — verify against spec scenarios
5. Phase 5 (cleanup) — polish and document

## Key Dependencies

- `drizzle-orm` provides type-safe DB queries
- `@supabase/supabase-js` connects to Supabase
- Schema must be created BEFORE any queries run
- Content API must handle both DB and fallback states