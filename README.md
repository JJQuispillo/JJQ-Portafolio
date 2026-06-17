# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🗄️ Database Integration (Supabase)

This project supports dynamic content via Supabase (PostgreSQL) with Drizzle ORM.

### Setup

1. **Create a Supabase project** at https://supabase.com
2. **Get your credentials**: Go to Settings → Database → Connection string
3. **Configure environment variables**:

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your DATABASE_URL
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Optional: Set to 'false' to use static fallback
USE_DATABASE=true
```

### Populate the Database

1. Open Supabase SQL Editor
2. Copy the content from `scripts/init-db.sql`
3. Run the script to create tables and populate initial data

### How It Works

- When `DATABASE_URL` is set, content is fetched from the database at runtime (SSR)
- When `DATABASE_URL` is not set or connection fails, the system falls back to static data from `src/data/translations.ts`
- Use `?lang=es` or `?lang=en` URL parameters to switch languages

### Files

| File | Purpose |
|------|---------|
| `src/db/schema.ts` | Drizzle schema definition |
| `src/db/index.ts` | Database client and connection |
| `src/lib/content.ts` | Content fetching API with fallback |
| `.env.example` | Environment variable documentation |
| `scripts/init-db.sql` | SQL to initialize database |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build/) or jump into our [Discord server](https://astro.build/chat).