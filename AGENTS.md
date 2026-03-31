# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 15 portfolio site** (single app, no backend/database). See `README.md` for full docs.

### Key commands

| Action | Command |
|--------|---------|
| Install deps | `npm install --legacy-peer-deps` |
| Dev server | `npm run dev` (port 3000) |
| Build | `npm run build` |
| Type check | `npx tsc --noEmit` |

### Caveats

- **`--legacy-peer-deps` is required** when running `npm install` — React 19 has peer dependency conflicts with some packages. This flag is specified in `vercel.json` and must be used locally too.
- No lockfile is committed; `npm install` resolves fresh each time.
- The root URL (`/`) redirects (307) to `/en` or `/es` via next-intl middleware — this is expected behavior, not an error.
- No automated test framework is configured. Validation is limited to `npx tsc --noEmit` and `npm run build`.
- No `.env` file is needed for development. Environment variables (`RESEND_API_KEY`, etc.) are only for a future contact-form email feature and are not required.
