# Project Summary

Name: Cab Aggregator (local edition)

Short description
: A MERN-style ride-hailing demo application with a Node/Express backend, MongoDB, Redis (optional), Socket.IO real-time features, and a TypeScript React frontend built with Vite. Striping/payment integration has been removed for the academic edition.

Architecture
- Backend: Node.js (Express) with modular routes and controllers.
  - Socket.IO server for real-time driver/rider updates (`backend/services/socketService.js`).
  - Matching and fare services (`backend/services/MatchingService.js`, `FareService.js`).
  - Session/token management in `backend/utils/sessionManager.js`.
  - Security and validation centralized under `backend/config/security.js` and `backend/middleware`.
- Database: MongoDB (runs in Docker Compose in development).
- Cache: Redis (optional, used for production session/store patterns, referenced in docker-compose).
- Frontend: React + TypeScript, Vite bundler. API client at `frontend/src/services/apiClient.ts`.

Key directories
- `backend/` — backend source, routes, controllers, services, configs, tests.
- `frontend/` — frontend app (Vite + React + TypeScript).
- `shared/` — workspace shared packages.
- `docs/` — human-facing documentation (this folder).

Primary responsibilities
- Authentication and session management (OTP, phone/email login, JWT tokens).
- Ride lifecycle (estimate, book, match drivers, accept, update status, complete).
- Real-time events (driver location, ride rooms, event broadcasting).
- Admin utilities (user suspension/reactivation, security dashboard endpoints).

Versions and compatibility
- Node >= 18.x
- NPM >= 9.x
- MongoDB 6.x (docker-compose uses `mongo:6.0`)
