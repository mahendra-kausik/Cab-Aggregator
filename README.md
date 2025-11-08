# Cab Aggregator — Local Edition

This repository is an academic/demo implementation of a cab aggregator (ride-hailing) application.

Overview
- Backend: Node.js + Express, Socket.IO, Mongoose (MongoDB)
- Frontend: React + TypeScript (Vite)
- DB: MongoDB, optional Redis for session/caching

Useful commands
- Start full stack (Docker Compose):

```powershell
docker-compose up --build
```

- Install dependencies for all workspaces:

```powershell
npm run install:all
```

- Run backend tests:

```powershell
npm run test --prefix backend
```

Documentation
- See the `docs/` folder for detailed docs:
  - `docs/DOC_INDEX.md` — index of docs
  - `docs/QUICKSTART.md` — how to run locally
  - `docs/API_DOCUMENTATION.md` — API reference
  - `docs/ADMIN_GUIDE.md` — admin operations
  - `docs/ENV_REFERENCE.md` — environment variables
  - `docs/DEPLOYMENT.md` — deployment recommendations
  - `docs/TESTING.md` — test notes and commands
  - `docs/RTM.md` — requirements traceability matrix

Contributing
- Use the code style from existing files. Run linters before opening PRs.

Support
- For development issues, check logs under `backend/logs/` and run the health check at `http://localhost:5000/health`.
