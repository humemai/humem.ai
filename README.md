# humem.ai

Startup website and app repo for HumemAI.


## Plan

### 1. Direction

- [ ] Confirm the product split:
	- public marketing site
	- app/dashboard for cloud users
	- control-plane API for accounts, provisioning, API keys, and billing
	- data-plane hosting for actual HumemAI cloud instances
- [ ] Keep Cloudflare as the permanent DNS and edge layer
- [ ] Keep Vercel for the website and app frontend for now
- [ ] Host the real HumemAI cloud service separately from Vercel
- [ ] Decide initial infrastructure target for hosted HumemAI:
	- Hetzner first
	- another provider if managed ops becomes more important than cost

### 2. Domain And DNS

- [ ] Keep `humem.ai` on Vercel behind Cloudflare
- [ ] Decide canonical public domain:
	- `humem.ai`
	- `www.humem.ai` redirecting to apex
- [ ] Reserve the main subdomains:
	- `app.humem.ai`
	- `api.humem.ai`
	- `docs.humem.ai`
	- `status.humem.ai`
- [ ] Add a DMARC record for `humem.ai`
- [ ] Review which records should be proxied through Cloudflare
- [ ] Decide whether docs stay on GitHub Pages temporarily or move later

### 3. Website Rebuild

- [ ] Audit the current site in `humem.ai-OLD`
- [ ] List which pages are worth keeping, rewriting, or deleting
- [ ] Define the new IA for the public site
- [ ] Choose the new stack for this repo:
	- Next.js
	- TypeScript
	- deployment on Vercel
- [ ] Scaffold the new app in this repo
- [ ] Build the first public pages:
	- home
	- product
	- pricing
	- docs entry
	- about
	- contact
- [ ] Rewrite the copy so it clearly explains:
	- open-source local/self-hosted usage
	- managed cloud offering
	- web and API access
	- why HumemAI is different
- [ ] Add proper SEO, metadata, OG images, and analytics

### 4. App And Auth

- [ ] Define the first authenticated user flow
- [ ] Decide whether auth is needed for v1 launch or can wait until cloud onboarding
- [ ] Compare auth options for this product shape:
	- Supabase Auth
	- Better Auth
	- Auth.js
- [ ] Pick the auth model based on actual needs, not trend-following
- [ ] If auth is included in v1, build:
	- sign up
	- sign in
	- session handling
	- account page
	- basic org or workspace model if needed

### 5. Cloud Product Foundations

- [ ] Define what a cloud customer gets on day one
- [ ] Decide the control-plane data model:
	- users
	- tenants
	- instances
	- API keys
	- usage records
	- billing state
- [ ] Choose the control-plane database
- [ ] Define how new hosted HumemAI instances are provisioned
- [ ] Define backup, restore, logging, and monitoring requirements
- [ ] Decide the first deployment model:
	- single-tenant instances
	- pooled/shared infra where appropriate
- [ ] Define the API surface between frontend and control plane

### 6. Billing And Operations

- [ ] Decide whether billing is part of v1 or handled manually at first
- [ ] If automated billing is needed, evaluate Stripe first
- [ ] Define plans and limits for the cloud product
- [ ] Define support workflow:
	- support email
	- issue tracking
	- status page
- [ ] Set up basic operational security:
	- secrets management
	- audit logging
	- rate limiting
	- abuse prevention

### 7. Migration Steps

- [ ] Keep the old site live until the new one is production-ready
- [ ] Reuse content from `humem.ai-OLD` only where it still matches the product
- [ ] Move the domain traffic only after the new site is validated
- [ ] Decide whether to archive `humem.ai-OLD` after launch or keep it for reference

### 8. Immediate Next Actions

- [ ] Inspect `humem.ai-OLD` and extract reusable content and assets
- [ ] Scaffold the new Next.js app in this repo
- [ ] Create the first-pass sitemap and navigation
- [ ] Draft homepage messaging for HumemAI
- [ ] Decide the initial auth direction
- [ ] Decide the initial HumemAI cloud hosting direction
