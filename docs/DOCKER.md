# Docker Setup

This project is a `Next.js 16` application and is configured to run in Docker using Next.js standalone output.

## Template Naming Changes

This repo is also usable as a template, so rename the Pulse-specific Docker values if you use it for another app.

Check these files and replace `pulse-dashboard` with your project slug where appropriate:

- `Dockerfile`
- `docker-compose.yml`
- `.github/workflows/deploy.yml`
- `docs/DOCKER.md`
- `docs/DEPLOY.md`

Typical values to rename:

- Docker image tag `pulse-dashboard`
- Compose service name `pulse-dashboard`
- Container name `pulse-dashboard`
- VPS path `/var/www/pulse-dashboard`

The Docker setup in this repo follows current official guidance from:

- Next.js deployment docs: https://nextjs.org/docs/pages/getting-started/deploying
- Docker Node guide: https://docs.docker.com/guides/nodejs/containerize/
- Docker build best practices: https://docs.docker.com/build/building/best-practices/

## Files Added Or Updated

- `Dockerfile`
- `.dockerignore`
- `next.config.ts`

`next.config.ts` now uses:

```ts
output: "standalone"
```

That allows the final image to copy only the minimal runtime files produced by `next build`.

## What You Need To Edit

Before building the image, review and update the values in `.env.example` for your environment, then pass the real values into the Docker build and run commands.

This project currently expects these environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
DATABASE_URL=
```

Notes:

- `NEXT_PUBLIC_*` values are exposed to the browser and should be set at build time.
- `SUPABASE_SERVICE_ROLE_KEY` is sensitive and must only be used server-side.
- `DATABASE_URL` is optional in the current template, but keep it available if you add direct database access.
- Do not commit real secrets into the repository.

## Build The Docker Image

Build with explicit args so the public and server-side environment values are available during `next build`:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key \
  --build-arg SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key \
  --build-arg NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  --build-arg DATABASE_URL=postgresql://user:password@host:5432/database \
  -t pulse-dashboard .
```

## Run The Container

```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key \
  -e SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  -e DATABASE_URL=postgresql://user:password@host:5432/database \
  pulse-dashboard
```

Open:

```text
http://localhost:3000
```

## Suggested Workflow

1. Update `.env.example` so it reflects every environment variable the project truly needs.
2. Keep your real secrets in your deployment platform or local untracked env files.
3. Rebuild the image whenever `NEXT_PUBLIC_*` values change, because public values are compiled into the frontend build.
4. Use `docker build --pull -t pulse-dashboard .` periodically to refresh the base image with newer security patches.

## Why This Setup

- Multi-stage build keeps the runtime image smaller.
- Standalone output copies only the files needed to run the Next.js server.
- `.dockerignore` reduces build context size and keeps local files out of the image.
- The container runs as a non-root user for better security.

## Project-Specific Reminder

If you add new required env vars, update all of the following together:

1. `.env.example`
2. `Dockerfile` build args and env declarations
3. This `docs/DOCKER.md` guide

That keeps local setup, Docker builds, and deployment docs aligned.
