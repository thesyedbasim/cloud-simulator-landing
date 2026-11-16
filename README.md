# CloudSim landing page

Static marketing site for CloudSim (Next.js, `output: 'export'`). Every page is pre-rendered to plain HTML in `out/`, so text is crawlable and works without JavaScript.

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # writes ./out
```

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this site. Used for canonical links, the sitemap, `robots.txt` and social cards. On Vercel it falls back to the production domain. |
| `NEXT_PUBLIC_APP_URL` | Where "Start Now" goes (the deployed simulator). **Required** for Vercel production builds; the build fails without it. |

## Deploying on Vercel

Import the repo; the Next.js preset detects the static export. Set the two variables above. `vercel.json` adds security headers and long-term caching for hashed assets.

## Layout

- `src/content/` all copy and links as data.
- `src/components/` sections; `iso/` draws the isometric components as SVG.
- `src/styles/tokens.css` colour, radius and motion tokens.
- `docs/LANDING_SPEC.md` the original specification.
