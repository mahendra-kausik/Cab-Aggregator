# Quickstart

This section gets you from repository to a running local system in a few steps.

Prerequisites
- Docker & Docker Compose
- Node.js >= 18 and npm >= 9 (only required if running without Docker)

1) Clone and install (if needed)

```powershell
git clone <repo-url> cab-aggregator-local
cd "cab-aggregator-local"
npm install
```

2) Environment
- Copy `.env.example` to `.env` and update secrets (optional if using docker-compose defaults):

```powershell
cp .env.example .env
# Edit `.env` and set JWT_SECRET for local testing
```

3) Start with Docker Compose (recommended)

```powershell
docker-compose up --build
```

This starts:
- MongoDB (port 27017)
- Redis (port 6379)
- Backend (port 5000)
- Frontend (port 3000)

4) Seed sample data (optional)

```powershell
npm run seed --prefix backend
```

5) Verify

- Backend health check: http://localhost:5000/health
- API base: http://localhost:5000/api
- Frontend: http://localhost:3000

Local dev without Docker (backend)

```powershell
npm install --prefix backend
npm run dev --prefix backend
```

Notes
- The project contains development-only endpoints and console-based OTP/email simulators. These are safe for local development but must be disabled in production.
