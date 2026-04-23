# VPS Deployment

This project deploys through GitHub Actions only when you push a Git tag or when you manually trigger the workflow.

It does not deploy on normal branch pushes.

## Template Naming Changes

This repository is a template, so if you reuse it for another project you should rename the Pulse-specific values before going live.

Review and change these values as needed:

- Workflow name in `.github/workflows/deploy.yml`
- GHCR image name `pulse-dashboard`
- VPS app directory `/var/www/pulse-dashboard`
- Docker Compose service name `pulse-dashboard`
- Docker container name `pulse-dashboard`
- Docker image tag examples in this document

If you are creating a branded project such as `acme-admin`, update those values consistently everywhere so the image name, deploy directory, and running container all match.

The workflow file is:

- `.github/workflows/deploy.yml`

The VPS runtime compose file is:

- `docker-compose.yml`

## Files To Rename Carefully

When adapting this template, update the following files together:

1. `.github/workflows/deploy.yml`
2. `docker-compose.yml`
3. `docs/DOCKER.md`
4. `docs/DEPLOY.md`

Recommended replacements:

- `pulse-dashboard` -> your real app slug
- `/var/www/pulse-dashboard` -> your target VPS directory
- `ghcr.io/${{ github.repository_owner }}/pulse-dashboard` -> your final image name

## Trigger Behavior

The workflow uses:

```yml
on:
  push:
    tags:
      - '*'
  workflow_dispatch:
```

That means:

- Pushing commits to branches will not deploy.
- Pushing a tag such as `v1.0.0` will build and deploy.
- You can also deploy manually from the GitHub Actions UI with `workflow_dispatch`.

## What The Workflow Does

1. Builds the Docker image from the repo `Dockerfile`.
2. Pushes the image to GitHub Container Registry (`ghcr.io`).
3. Replaces the image placeholder in `docker-compose.yml`.
4. Copies the generated compose file to the VPS.
5. Writes a production `.env` file on the VPS from GitHub secrets.
6. Pulls the tagged image and restarts the container with `docker compose up -d`.

## Required GitHub Secrets

Create these repository secrets before using the workflow:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL
DATABASE_URL
SSH_HOST
SSH_USER
SSH_PRIVATE_KEY
SSH_PORT
PORT
GHCR_PAT
```

Notes:

- `GHCR_PAT` should be a token that can read packages from GHCR on the VPS.
- `PORT` is the host port on the VPS. If omitted in the script, it falls back to `3000`.
- `NEXT_PUBLIC_*` values are compiled into the frontend build, so changing them requires a new image build.

## Required VPS Setup

Your VPS should already have:

- Docker installed
- Docker Compose plugin installed
- A target app directory at `/var/www/pulse-dashboard` or permission to create it

The workflow deploys into:

```text
/var/www/pulse-dashboard
```

If this is a new project, replace that path with your own app directory before the first deployment.

## First-Time Setup

1. Add the GitHub repository secrets listed above.
2. Make sure the VPS user can run Docker commands.
3. Push the workflow and deployment files to your default branch.
4. Create and push a tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Updating A Release

For every new deployment:

```bash
git tag v1.0.1
git push origin v1.0.1
```

Each tag push creates and deploys a new image tagged with:

- `latest`
- `${github.sha}`
- the git tag name such as `v1.0.1`

## Files You Should Keep In Sync

If project environment variables change, update all of these together:

1. `.env.example`
2. `Dockerfile`
3. `.github/workflows/deploy.yml`
4. `docs/DOCKER.md`
5. `docs/DEPLOY.md`

That keeps local Docker usage, CI builds, and VPS deployment aligned.
