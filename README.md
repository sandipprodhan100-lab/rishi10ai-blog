# Rishi notes

Rishi notes ([rishi10ai.com](https://rishi10ai.com)) is a personal blog and
research notebook: short stories, research notes, poetry, and a dreams page.
Story posts are written as Word documents and compiled into the site at build
time — publishing a new post requires no code changes.

## Tech stack

| Layer      | Technology                                                              |
| ---------- | ----------------------------------------------------------------------- |
| Framework  | [TanStack Start](https://tanstack.com/start) (SSR, file-based routing)   |
| UI         | React 19 + Tailwind CSS 4                                               |
| Language   | TypeScript (strict, `noUncheckedIndexedAccess`)                          |
| Build      | Vite 8 via `@lovable.dev/vite-tanstack-config`, nitro with Cloudflare target |
| Content    | `story.docx` sources compiled by `scripts/build-stories.mjs` (mammoth)  |
| Hosting    | Cloudflare Workers + static assets (`wrangler.jsonc`)                   |
| Quality    | ESLint 9 + Prettier                                                     |

## Project structure

```text
public/stories/<slug>/     Story sources: story.docx + images/
src/routes/                TanStack file-based routes (landing page at /)
src/components/landing/    The landing page component
src/generated/stories.ts   Generated story data (do not edit by hand)
src/lib/                   SSR error capture and reporting helpers
scripts/build-stories.mjs  DOCX → stories.ts converter (runs in dev/build)
```

## Development

Install [Node.js](https://nodejs.org/), then:

```powershell
npm install
npm run dev        # builds stories, starts Vite dev server
```

Other commands:

| Command                  | What it does                                        |
| ------------------------ | --------------------------------------------------- |
| `npm run build`          | Production build (stories + Vite/nitro bundle)       |
| `npm run deploy:dry-run` | Build and validate the Worker bundle without pushing |
| `npm run deploy`         | Build and deploy to Cloudflare Workers               |
| `npm run lint`           | ESLint                                              |
| `npm run format`         | Prettier                                            |

## Publishing a story

1. Create a folder `public/stories/<slug>/` containing `story.docx` (first
   paragraph = title, second = author, rest = body) and an `images/` folder
   with illustrations named `01-…`, `02-…`, `03-…`.
2. Run `npm run build-stories`. Mammoth converts the DOCX and regenerates
   `src/generated/stories.ts`; the story appears on the landing page
   automatically.
3. Validate with `npm run build`, then publish with `npm run deploy`.

Full workflow (including the Story Writer vs. Poetry Writer presentation
modes): `.github/skills/story-content-upload/SKILL.md`.

## Claude Code: LLM gateway vs. native Anthropic

Claude Code sessions launched from this folder can route model calls either
through an LLM gateway (any Anthropic-compatible router, e.g. 9router) or
directly through Anthropic with your normal claude.ai login. Global Claude CLI
settings are never touched — only this project's local settings file changes.

The active mode is whichever template was last copied to
`.claude/settings.local.json` (gitignored; holds real credentials):

- `.claude/settings.gateway.json` — route every model call through a gateway
  (`ANTHROPIC_BASE_URL`, `ANTHROPIC_API_URL`, `ANTHROPIC_API_KEY`,
  `ANTHROPIC_MODEL`)
- `.claude/settings.anthropic.json` — empty env block; use native Anthropic
  auth (claude.ai login or your own `ANTHROPIC_API_KEY`)

Switch modes (takes effect on next Claude Code launch):

```powershell
npm run claude:gateway    # route through the LLM gateway
npm run claude:anthropic  # native Anthropic / claude.ai login
claude
```

First-time gateway setup: copy `.env.llm-gateway.example` to
`.env.llm-gateway` for reference, fill your gateway URL/key/model into a copy
of `.claude/settings.gateway.json`, then activate it with
`npm run claude:gateway`.

## Deployment

The site deploys to Cloudflare Workers as an SSR Worker plus static assets,
with `rishi10ai.com` and `www.rishi10ai.com` as custom domains (see
`wrangler.jsonc`):

```powershell
npx wrangler login   # once
npm run deploy
```

To validate locally, run the production bundle through workerd rather than
`vite preview` (which expects a plain-Vite output this project doesn't
produce):

```powershell
npx wrangler dev --config wrangler.jsonc
```
