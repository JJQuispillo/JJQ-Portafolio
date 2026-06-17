# Database Integration Specification

## Purpose

This specification defines the database integration for the Portfolio project to enable dynamic content management. Currently all content is hardcoded in static TypeScript files (`translations.ts`). The database integration will allow content updates without code changes.

## ADDED Requirements

### Requirement: Database Connection

The system MUST establish a connection to a PostgreSQL database (via Supabase) for retrieving portfolio content.

The connection MUST use environment variables for credentials and MUST NOT hardcode any database credentials in source code.

### Requirement: Schema Support

The database schema MUST support the following content domains:
- Navigation items (skills, experience, projects, education, contact)
- Hero section content (badge, title, subtitle, tagline, CTAs)
- Tech stack categories and items
- Experience entries with highlights
- Projects with name, description, and tech stack
- Education information
- Contact section content

The schema MUST support bilingual content (Spanish/English) with a lang field.

### Requirement: Data Fetching API

The system MUST provide a type-safe API for fetching content from the database.

The API MUST include:
- Function to fetch all translations for a given language
- Function to fetch specific content sections
- Error handling with descriptive messages

### Requirement: Fallback to Static Data

When the database is unavailable or returns an error, the system SHOULD fall back to the static `translations.ts` data.

A configuration option (environment variable) MUST control whether to use database or static data.

### Requirement: Type Safety

Database operations MUST use Drizzle ORM for type-safe queries.

Type definitions MUST be generated from the database schema.

## MODIFIED Requirements

### Requirement: Content Loading (Modified)

**Previously**: Content was loaded at build time from static TypeScript objects in `translations.ts`.

**Now**: Content MUST be fetched at runtime from the database when available, with build-time fallback to static data for SSG builds.

#### Scenario: SSR Mode - Database Available

- GIVEN the site is running in SSR mode with DATABASE_URL environment variable set
- WHEN a user visits any page
- THEN content SHOULD be fetched from the database
- AND the page SHOULD render with database content

#### Scenario: SSR Mode - Database Unavailable

- GIVEN the site is running in SSR mode but DATABASE_URL is invalid or connection fails
- WHEN a user visits any page
- THEN the system SHOULD fall back to static translations.ts
- AND the page SHOULD render with static content without error

#### Scenario: SSG Build Mode

- GIVEN the site is building in static mode (no DATABASE_URL)
- WHEN the build runs
- THEN static content MUST be used (same as current behavior)
- AND no database connection should be attempted

### Requirement: Environment Configuration (Modified)

**Previously**: No database environment variables existed.

**Now**: The system MUST recognize the following environment variables:
- `DATABASE_URL` - PostgreSQL connection string (optional)
- `USE_DATABASE` - Force database mode (boolean, defaults to true if DATABASE_URL present)

#### Scenario: No Database Variables

- GIVEN no DATABASE_URL is set
- WHEN the application starts
- THEN it SHOULD use static translations.ts
- AND no warning SHOULD be shown

#### Scenario: Database URL Set

- GIVEN DATABASE_URL is set to a valid Supabase connection string
- WHEN the application starts
- THEN it SHOULD attempt to connect to the database
- AND content SHOULD load from database when available

## REMOVED Requirements

### Requirement: Hardcoded Translations (Deprecated)

The `translations.ts` file will be deprecated for runtime content but MUST be kept as fallback source.

This specification does NOT remove the file - it adds a runtime layer on top.

## Testable Scenarios Summary

| ID | Scenario | GIVEN | WHEN | THEN |
|----|----------|-------|------|------|
| 1 | SSR DB Available | SSR mode, DATABASE_URL set | Page request | Content from DB |
| 2 | SSR DB Unavailable | SSR mode, invalid DATABASE_URL | Page request | Static fallback |
| 3 | SSG Build | No DATABASE_URL | Build run | Static content |
| 4 | Env var missing | No DATABASE_URL set | App start | Static mode |
| 5 | Connection success | Valid DATABASE_URL | App start | Connected log |
| 6 | Type safety | Schema changes | Build | Types updated |