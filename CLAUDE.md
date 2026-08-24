# Rishi notes

## Project

Rishi notes (rishi10ai.com) is a TanStack Start application built with TypeScript,
React, and Tailwind CSS. It is a personal blog and research notebook: stories,
research notes, and a dreams page.

## Commands

Use npm for project scripts on the local Windows setup:

- `npm install` - install dependencies
- `npm run dev` - build story content and start the Vite development server
- `npm run build` - create a production build
- `npm run deploy:dry-run` - build and validate the Cloudflare Worker bundle
- `npm run deploy` - build and deploy to Cloudflare Workers
- `npm run lint` - run ESLint
- `npm run format` - format the repository with Prettier

Run the narrowest relevant check after making changes, then run `npm run build` for changes that affect routes, server code, configuration, or shared components.

## Structure

- `src/routes/` contains TanStack file-based routes.
- `src/components/landing/RishiLandingPage.tsx` is the single landing page.
- `src/lib/` contains server-side error capture and reporting helpers.
- `public/stories/<slug>/` holds story sources (`story.docx` + images).
- `scripts/build-stories.mjs` converts stories into `src/generated/stories.ts`
  via mammoth; it runs automatically as part of `dev` and `build`.
- `src/server.ts` is the SSR/server wrapper and `src/start.ts` configures request middleware.

## Stories

To publish a new story, add a folder under `public/stories/<slug>/` containing
`story.docx` and an `images/` folder, then run `npm run build-stories`. See
`.github/skills/story-content-upload/SKILL.md` for the full workflow.

## Conventions

- Preserve existing TypeScript, React, TanStack Start, and Tailwind patterns.
- Keep server-only code in server modules and do not expose secrets to client code.
- Prefer existing components and helpers before introducing new abstractions.
- Keep generated route artifacts synchronized with TanStack route changes.
- Keep changes focused; do not reformat unrelated files or modify generated lockfile entries manually.

## Validation

Before finishing, run the relevant lint or build command and report any unrelated pre-existing failures separately. Do not commit or rewrite history unless explicitly requested.
