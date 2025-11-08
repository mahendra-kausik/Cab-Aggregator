# Deployment

This document explains how to deploy the application and production recommendations.

Development (Docker Compose)
- Use the provided `docker-compose.yml` to run a local full stack. It includes MongoDB and Redis services.

Production recommendations
- Use separate environments for staging/production.
- Replace in-memory session manager with Redis-based session store. Configure `REDIS_URL`.
- Use an environment secret store for `JWT_SECRET`, `ENCRYPTION_KEY`, and DB credentials.
- Run MongoDB as a managed/replicated service (Atlas, Cosmos, or self-hosted replica set) and enable backups.
- Configure HTTPS termination (load balancer or ingress) and enable HSTS.

Scaling Socket.IO
- Socket.IO requires sticky sessions or an adapter (Redis adapter) for multiple backend instances. See:
  - Use `socket.io-redis` or `@socket.io/redis-adapter` and set `REDIS_URL`.

CI/CD
- Typical pipeline tasks:
  1. Run linters and tests
  2. Build frontend (Vite) and create container images
  3. Push images to registry
  4. Deploy via Kubernetes or Docker Compose in orchestrated environment

Environment variables
- See `docs/ENV_REFERENCE.md` for an exhaustive list of environment variables and security notes.

Health checks and monitoring
- Expose `/health` for liveness and readiness checks.
- Monitor metrics: database connectivity, socket connections, active sessions, security events.

Database migrations
- This prototype uses Mongoose — consider using migration tooling (migrate-mongo, Mongock) for production schema changes.

Logging and auditing
- Use a centralized logging and auditing system for security events and admin actions (ELK, Papertrail, Datadog).
