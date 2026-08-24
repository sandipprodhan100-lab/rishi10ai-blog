# Fund Navigator

Fund Navigator is a TanStack Start application for researching and comparing
mutual funds.

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

## Claude Code via 9router

Use this setup when Claude Code must be the LLM interface and every model call should
flow through your running 9router endpoint.

1. Copy `.env.9router.example` to `.env.9router`.
2. Set `NINE_ROUTER_URL` to your running 9router Anthropic-compatible endpoint.
3. Set `NINE_ROUTER_API_KEY` if your router requires auth.
4. Run:

```powershell
npm run claude:9router
```

This command launches Claude Code after exporting these environment variables:

- `ANTHROPIC_BASE_URL=<NINE_ROUTER_URL>`
- `ANTHROPIC_API_URL=<NINE_ROUTER_URL>`
- `ANTHROPIC_API_KEY=<NINE_ROUTER_API_KEY>` (when provided)
- `ANTHROPIC_MODEL=<CLAUDE_CODE_MODEL>` (when provided)

If your 9router health endpoint is not available at `/health`, the script continues after
warning. To skip health checks entirely:

```powershell
powershell -ExecutionPolicy Bypass -File ./scripts/start-claude-9router.ps1 -SkipHealthCheck
```

## Cloudflare Deployment

Authenticate Wrangler, then configure the Worker with the AWS S3 connection:

```powershell
npx wrangler login
npx wrangler secret put AWS_ACCESS_KEY_ID
npx wrangler secret put AWS_SECRET_ACCESS_KEY
npx wrangler secret put AWS_REGION
npx wrangler secret put AWS_S3_BUCKET
npm run deploy
```

The AWS identity needs `s3:ListBucket` on the bucket and `s3:GetObject` and
`s3:PutObject` on the bucket objects. `HEAD` requests use the `s3:GetObject`
permission.
Use an IAM user or role dedicated to this application and keep its credentials
in Wrangler secrets. Change the `name` in `wrangler.jsonc` if `fund-navigator`
is already taken in your Cloudflare account.
The Worker is named `mflens` to match this Fund Navigator deployment. Change
the `name` in `wrangler.jsonc` only if that name is already
taken in your Cloudflare account.

- TanStack Start
- TypeScript
- Tailwind CSS
