# Design: Database Integration

## Technical Approach

Use **Supabase** (PostgreSQL) with **Drizzle ORM** to enable dynamic content fetching in SSR mode. The architecture adds a database layer between Astro components and the static `translations.ts` file, with fallback to static data when the database is unavailable.

## Architecture Decisions

### Decision: Database Provider

**Choice**: Supabase (PostgreSQL)
**Alternatives considered**: Firebase, SQLite, PostgreSQL standalone, CMS (Contentful/Strapi)
**Rationale**: 
- Already includes PostgreSQL icons in portfolio (shows relevance)
- Excellent free tier for personal projects
- TypeScript-first SDK matches Astro/TypeScript project
- Auth ready if needed later
- Selected in proposal phase

### Decision: ORM

**Choice**: Drizzle ORM
**Alternatives considered**: Prisma, raw SQL, query builder
**Rationale**:
- Lightweight and fast
- TypeScript-first with excellent DX
- Works well with Supabase
- No global ORM runtime (unlike Prisma)

### Decision: Data Loading Strategy

**Choice**: Runtime fetch in SSR, static for SSG fallback
**Alternatives considered**: Build-time fetch (like getStaticPaths), hybrid approach
**Rationale**: 
- Astro already runs in SSR mode (`output: 'server'`)
- Runtime fetch preserves dynamic capability
- Static fallback ensures build still works

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Astro Components                     │
│  (Hero.astro, Experience.astro, Projects.astro)    │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Data Access Layer                     │
│                   src/lib/db.ts                       │
│  - getTranslations(lang)                               │
│  - getSection(section, lang)                          │
└─────────────────────────┬───────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            ▼                           ▼
┌─────────────────────┐   ┌─────────────────────┐
│   Database Query    │   │   Static Fallback   │
│  (if DB available) │   │ translations.ts    │
└─────────────────────┘   └─────────────────────┘
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Modify | Add drizzle-orm, @supabase/supabase-js |
| `src/db/schema.ts` | Create | Drizzle schema for content tables |
| `src/db/index.ts` | Create | DB connection and exports |
| `src/lib/content.ts` | Create | Content fetching API with fallback |
| `.env.example` | Create | Document required env vars |
| `.env` | Create | Local Supabase dev credentials |
| `translations.ts` | Keep | As fallback source |

## Schema Design

```typescript
// src/db/schema.ts

export const translations = pgTable('translations', {
  id: serial('id').primaryKey(),
  lang: varchar('lang', { length: 2 }).notNull(),  // 'es' | 'en'
  section: varchar('section', { length: 50 }).notNull(), // 'hero', 'nav', 'tech', etc.
  key: varchar('key', { length: 100 }).notNull(),
  value: text('value').notNull(),
});

// Index for efficient queries
export const translationsIndex = index('translations_lang_section_idx')
  .on(translations.lang, translations.section);
```

## Content API

```typescript
// src/lib/content.ts

import { translations } from '../db/schema';
import { db } from '../db';
import { translations as staticData } from '../data/translations';

export async function getTranslations(lang: 'es' | 'en') {
  const useDb = process.env.DATABASE_URL && process.env.USE_DATABASE !== 'false';
  
  if (!useDb) {
    return staticData[lang];
  }
  
  try {
    const rows = await db.select()
      .from(translations)
      .where(eq(translations.lang, lang));
    
    // Convert flat rows to nested structure
    return convertToTranslations(rows);
  } catch (error) {
    console.warn('DB fetch failed, using static fallback:', error.message);
    return staticData[lang];
  }
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | No | Supabase PostgreSQL connection string |
| `USE_DATABASE` | No | Force DB mode (default: true if DATABASE_URL set) |

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | Content API fallback logic | Jest unit test with mocked DB |
| Integration | DB connection | Supertest against SSR endpoint |
| Manual | Full SSR render | Dev server + browser check |

## Migration / Rollout

No data migration required. Static `translations.ts` remains as source of record. Content can be populated via:
1. Initial SQL script to populate from existing translations.ts
2. Manual Supabase dashboard insert
3. Future admin UI (out of scope)

## Open Questions

- [ ] Should translations be stored as JSON in a single content table, or normalized?
- [ ] Cache strategy for frequently accessed content?
- [ ] Future: Real-time content updates via Supabase Realtime?

## Next Step

Ready for tasks (sdd-tasks).