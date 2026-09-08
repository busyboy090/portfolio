# Portfolio + CMS

A personal portfolio site with a custom-built admin panel for managing its own content — no hosted headless CMS, no markdown files. Projects, work experience, education, certifications, and skills are all stored in Postgres (via Supabase) and edited through a self-hosted `/admin` dashboard, protected by Supabase Auth.

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19** + **TypeScript**
- **[Supabase](https://supabase.com)** — Postgres database, Auth, and Storage
- **Tailwind CSS v4** + **shadcn/ui** for the admin dashboard
- **Framer Motion** for page and component animation
- **Lucide** for icons

## Features

**Public site**
- Home / About
- Work — showcase grid of published projects, with uploaded screenshots or a generated schematic fallback
- Experience — work history, education, and certifications
- Skills — grouped by domain (Frontend, Backend, Database, DevOps & Tools)
- Contact — direct email links plus an in-page form that submits straight into the admin inbox

**Admin dashboard** (`/admin`, auth-protected)
- Projects — create/edit/delete, publish/unpublish, image upload to Supabase Storage
- Experience — three independent sections: work history, education, certifications
- Skills — named skill groups under one of four categories
- Messages — inbox for contact form submissions, with read/starred/replied/archived state
- Settings

All public pages read live, published data straight from Supabase on every request (Server Components) — there's no build step or redeploy needed to publish new content.

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up Supabase

Create a project at [supabase.com](https://supabase.com), then run the schema migrations in the Supabase SQL editor, in this order:

1. `schema.sql` — `projects` table + RLS
2. `experience_schema.sql` — `work_experience`, `education`, `certifications` tables + RLS
3. `skills_schema.sql` — `skill_categories` table + RLS
4. `messages_schema.sql` — `messages` table + RLS (public insert, admin-only read)
5. `storage_setup.sql` — public `project-images` Storage bucket + policies

> These live outside this repo for now — pull them from your project history, or re-generate them if needed.

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase project's values (Project Settings → API):

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

### 4. Create an admin user

In the Supabase dashboard, go to Authentication → Users and add yourself manually (or enable sign-ups temporarily). This is the account you'll use to log into `/admin` — there's no public sign-up flow.

### 5. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site, and [http://localhost:3000/admin](http://localhost:3000/admin) to log in and manage content.

## Generating database types (optional but recommended)

Keep TypeScript in sync with your actual schema instead of hand-written interfaces:

```bash
npx supabase login
npx supabase gen types typescript --project-id <your-project-id> > lib/database.types.ts
```

Re-run this any time the schema changes.

## Project Structure

```
app/
  (root)/            # Public site — Home, About, Work, Experience, Skills, Contact
  admin/              # Auth-protected CMS dashboard
lib/
  client.ts           # Supabase browser client
  server.ts           # Supabase server client (Server Components / Route Handlers)
  middleware.ts        # Session refresh, used by proxy.ts
proxy.ts              # Protects /admin/* routes
data/
  portfolio.ts         # Shared animation variants (fadeInUp, staggerContainer) — no longer holds content
```

## Notes

- Public pages filter to `published = true` where that flag exists (Projects); Experience, Education, Certifications, and Skills have no draft state — anything added shows immediately.
- Deleting a project or replacing its image also removes the old file from Storage, so the bucket doesn't accumulate orphans.
- The contact form writes directly to the `messages` table as an anonymous insert — RLS only allows `insert` for anonymous users, not `select`, so visitors can't read anyone else's messages.
