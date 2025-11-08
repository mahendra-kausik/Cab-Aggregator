# Admin Guide

This guide is for operators and administrators who need to manage the running system, users, and security.

1) Starting and stopping services
- Development (Docker Compose):

  - Build and start all services:

    ```powershell
    docker-compose up --build
    ```

  - Stop and remove containers and named volumes:

    ```powershell
    docker-compose down -v
    ```

- Local (backend-only):

  - Install dependencies and run backend in dev with nodemon:
    ```powershell
    npm install --prefix backend
    npm run dev --prefix backend
    ```

2) Seed data and DB initialization
- Seed development data:

  ```powershell
  npm run seed --prefix backend
  ```

- The repo includes `scripts/mongo-init.js` used by the MongoDB service in Docker Compose.

3) Admin-only HTTP endpoints
- Security dashboard and monitoring (requires admin JWT):
  - GET /api/security/dashboard — comprehensive security overview
  - GET /api/security/events — list security events
  - GET /api/security/stats — security metrics

- Session management
  - POST /api/security/sessions/:sessionId/invalidate — invalidate a specific session
  - POST /api/security/users/:userId/invalidate-sessions — invalidate all sessions for a user

- User management
  - GET /api/users/admin/users — list users
  - PUT /api/users/admin/users/:userId/suspend — suspend user
  - PUT /api/users/admin/users/:userId/reactivate — reactivate user

4) Troubleshooting and logs
- Backend logs are printed to container stdout; use `docker-compose logs backend` or `docker logs <container>`.
- The backend contains a `logs/` directory for rotating logs. Check `backend/config/security.js` for logging settings.

5) Clearing active rides (development only)
- Development-only endpoint to cancel active rides:

  - POST /api/dev/clear-active-rides (available when NODE_ENV=development)

6) Backups and maintenance
- MongoDB backup (simple example using `mongodump`):

  ```powershell
  docker exec -it cab-aggregator-mongodb mongodump --archive=/data/backup/backup-$(Get-Date -Format yyyyMMddHHmmss).gz --gzip
  docker cp cab-aggregator-mongodb:/data/backup/backup-YYYYMMDDHHMMSS.gz ./backups/
  ```

- For production-grade backups, use your cloud provider's backup features or a managed MongoDB offering.

7) Security and best practices
- Ensure `JWT_SECRET` and `ENCRYPTION_KEY` are set to strong values and stored in a secrets manager.
- Do not enable dev endpoints or verbose logging in production.
- Use Redis for sessions in production rather than the in-memory `sessionManager` implementation.

8) Scaling and HA
- Run multiple backend replicas behind a load balancer. Use sticky sessions or central session store (Redis) for Socket.IO.
- Use MongoDB replica sets for HA and backup.
