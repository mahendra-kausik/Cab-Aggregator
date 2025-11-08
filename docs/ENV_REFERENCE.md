# Environment Reference

This file lists environment variables used by the project, their purpose, and default values when available.

Backend / docker-compose (important variables):

- MONGO_ROOT_USERNAME
  - Purpose: MongoDB admin username used by docker-compose initialization.
  - Default (docker-compose): cabadmin

- MONGO_ROOT_PASSWORD
  - Purpose: MongoDB admin password used by docker-compose initialization.
  - Default (docker-compose): SecureDevPassword2024

- MONGO_DB_NAME
  - Purpose: Default DB name created by the init script.
  - Default: cab_aggregator

- MONGO_URI
  - Purpose: Connection string used by backend when present; falls back to a default local URI.
  - Example: mongodb://cabadmin:SecureDevPassword2024@mongodb:27017/cab_aggregator?authSource=admin

- REDIS_URL
  - Purpose: Redis connection for sessions/caches.
  - Default in docker-compose: redis://redis:6379

- NODE_ENV
  - Purpose: Environment mode (development/test/production)
  - Default: development

- PORT
  - Purpose: Backend port (default 5000)
  - Default: 5000

- JWT_SECRET
  - Purpose: Secret used to sign JWTs. REQUIRED in production; security config will exit if missing.
  - Default: none (must set in production). Should be >= 32 chars.

- JWT_EXPIRES_IN
  - Purpose: Access token expiry string
  - Default: 24h

- MAPBOX_ACCESS_TOKEN
  - Purpose: Optional mapbox token used by frontend/backend geocoding utilities

- TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
  - Purpose: Twilio credentials (SMS) — present but optional in docker-compose; SMS sending is simulated in dev.

- FRONTEND_URL
  - Purpose: Allowed origin for CORS/Socket.io (frontend URL)
  - Default: http://localhost:3000

- VITE_API_BASE_URL / VITE_API_URL
  - Purpose: Frontend build-time base API URL (used by `frontend/src/services/apiClient.ts` and Vite envs)
  - Example: http://localhost:5000/api

- VITE_SOCKET_URL
  - Purpose: Frontend socket URL
  - Example: http://localhost:5000

Other environment flags and toggles (backend code references):

- ENABLE_DEV_ENDPOINTS
  - Purpose: Enable development-only endpoints (e.g., `/api/auth/dev/otp/:phone`)
  - Values: 'true'|'false'

- ENABLE_CONSOLE_LOGGING
  - Purpose: Enable extra console logging in development

- DISABLE_MATCHING
  - Purpose: If 'true', MatchingService.skip matching (used in tests)

- ENCRYPTION_KEY
  - Purpose: Optional encryption key for crypto operations; should be >=32 chars if used.

Notes & security guidance
- Do not store secrets in source. Use a secrets manager or environment injection in production.
- `JWT_SECRET` is required for the backend to start — set to a long, random value in production.
- If you run in Docker Compose, store sensitive values in a `.env` file excluded from version control (see `.env.example`).
