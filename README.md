# Team Zion Lipa — Website

A church website built with **Next.js** (App Router + TypeScript + Tailwind CSS) and an embedded **Sanity Studio** CMS so non-technical staff can edit content.

- Pages: Home, About, Visit, Sermons, Events, Connect, Give, Privacy
- Content (sermons, events, announcements, site settings, pages) is editable at **`/studio`**
- Sermons are YouTube/Facebook embeds (no media hosting cost)
- Contact + Prayer forms email submissions via Resend (free tier)
- Hosted free on **Vercel**; CMS data on **Sanity** free tier

## 1. Prerequisites

- Node.js 18+ (you have v22) and npm
- A free [Sanity](https://www.sanity.io) account
- (Optional) A free [Resend](https://resend.com) account for form emails

## 2. Install

```bash
npm install
```

## 3. Create a Sanity project

```bash
npx sanity@latest login
npx sanity@latest init --env .env.local
```

When prompted, create a **new project** and dataset named `production`. This
writes `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` into
`.env.local`. (Or copy `.env.local.example` to `.env.local` and paste the
Project ID from https://www.sanity.io/manage.)

## 4. Configure environment

Copy the example file and fill in values:

```bash
cp .env.local.example .env.local
```

| Variable | What it's for |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID (required for content) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `RESEND_API_KEY` | Email delivery for forms (optional — logs to console if empty) |
| `CONTACT_EMAIL` | Where form submissions are sent |
| `FROM_EMAIL` | Verified sender (use `onboarding@resend.dev` to start) |
| `NEXT_PUBLIC_SITE_URL` | Your production URL (for SEO/sitemap) |

> The site runs **without** any keys — content areas just show friendly empty
> states and forms log to the console. Add the keys to go live.

## 5. Run locally

```bash
npm run dev
```

- Website: http://localhost:3000
- Studio (CMS): http://localhost:3000/studio

In the Studio, fill in **Site Settings** first (service times, address, map,
social links), then add **Sermons**, **Events**, and **Announcements**.

## 6. Deploy to Vercel (free)

1. Push this folder to a GitHub repo.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the same environment variables in Vercel → Project → Settings.
4. Deploy. Add your custom domain under Settings → Domains.
5. In Sanity → Manage → API → **CORS origins**, add your Vercel URL and custom
   domain so the Studio can connect.

## Project structure

```
src/
  app/
    (site)/          # public pages (share Header/Footer)
    studio/          # embedded Sanity Studio at /studio
    api/             # contact + prayer form handlers
  components/        # UI components
  sanity/            # client, schema, GROQ queries
  lib/               # video embed + mailer helpers
sanity.config.ts     # Studio configuration
```

## Roadmap (post-MVP)

- Online giving (GCash / Maya / PayMongo / Xendit)
- Email newsletter signup (Brevo / Mailchimp)
- Sermon series + search, small-group signups
- Tagalog / English language toggle

## Customizing the brand

- Colors: `tailwind.config.ts` (`brand` and `gold` palettes)
- Fonts: `src/app/layout.tsx`
- Logo/name: `src/components/Header.tsx`
