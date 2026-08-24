# Rishi notes

Rishi notes ([rishi10ai.com](https://rishi10ai.com)) is a personal blog and
research notebook built with TanStack Start: stories, research notes, and a
dreams page. Story posts are authored as Word documents and compiled into the
site at build time.

## Development

Install [Node.js](https://nodejs.org/) and the project dependencies:

```powershell
npm install
npm run dev
```

The development server runs on the URL printed by Vite. Other useful commands:

```powershell
npm run build
npm run lint
npm run format
```

## Publishing a story

1. Create a folder `public/stories/<slug>/` containing `story.docx` (the story
   text; paragraphs are preserved) and an `images/` folder with illustrations.
2. Run `npm run build-stories` — it converts the DOCX to HTML, extracts the
   images to `public/stories/<slug>`, and regenerates `src/generated/stories.ts`.
3. The story appears on the landing page automatically. See
   `.github/skills/story-content-upload/SKILL.md` for details.

## Claude Code: LLM gateway vs. native Anthropic

Claude Code sessions launched from this folder can route model calls either through
an LLM gateway (any Anthropic-compatible router, e.g. 9router) or directly through
Anthropic with your normal claude.ai login. The global Claude CLI settings are never
modified — only this project's local settings file changes.

The active mode is whichever template is copied to `.claude/settings.local.json`
(gitignored):

- `.claude/settings.gateway.json` — routes every model call through the gateway
  (`ANTHROPIC_BASE_URL`, `ANTHROPIC_API_URL`, `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`)
- `.claude/settings.anthropic.json` — empty env block; Claude Code uses native
  Anthropic auth (claude.ai login or your own `ANTHROPIC_API_KEY`)

Switch modes:

```powershell
npm run claude:gateway    # route through the LLM gateway
npm run claude:anthropic  # use native Anthropic / claude.ai login
```

Then start Claude Code normally from the project folder:

```powershell
claude
```

First-time setup for gateway mode:

1. Copy `.env.llm-gateway.example` to `.env.llm-gateway` and fill in your gateway
   URL, API key, and default model.
2. Put those values into a copy of `.claude/settings.gateway.json`, then activate it
   with `npm run claude:gateway`.

Note: switching takes effect on the next Claude Code launch — restart any running
session after running one of the switch commands.

## Cloudflare Deployment

```powershell
npx wrangler login
npm run deploy
```

The Worker name (`rishi10ai`) and custom domains live in `wrangler.jsonc`.

- TanStack Start
- TypeScript
- Tailwind CSS
