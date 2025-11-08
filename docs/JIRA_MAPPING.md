# Jira Mapping: Epics, Stories, Sprints, and Trace Links

This document maps the provided epics and user stories to Jira-style issues, sprint assignments (2 sprints), acceptance criteria, estimated story points, suggested components, and links to relevant code and tests in the repository.

---

## Sprint assignment summary
- Sprint 1: P14-6, P14-7, P14-8, P14-9, P14-10, P14-11
- Sprint 2: P14-12, P14-13, P14-14, P14-15, P14-16, P14-17, P14-18

---

## Epic: P14-1 — User Authentication & Profiles

- Epic key: P14-1

- Stories:

  1. P14-6 — User Registration (Rider & Driver)
     - Jira: P14-6 (Story)
     - Sprint: Sprint 1
     - Story points: 5
     - Components: backend, api, tests
     - Acceptance criteria:
       - POST /api/auth/register-phone accepts phone, profile (name, avatar optional), role (rider|driver), and driverInfo when role=driver.
       - Server responds with OTP info (simulated SMS in development) and temp user data when NODE_ENV=development.
       - Validation enforces E.164 phone format and required fields.
     - Code references:
       - `backend/routes/auth.js` (route: POST /api/auth/register-phone)
       - `backend/controllers/authController.js` (registerPhone)
       - `backend/models/OTP.js` (OTP creation/storage)
     - Tests:
       - `backend/__tests__/integration/auth-api.test.js` (registration flows)

  2. P14-7 — User Login
     - Jira: P14-7 (Story)
     - Sprint: Sprint 1
     - Story points: 3
     - Components: backend, api, tests
     - Acceptance criteria:
       - POST /api/auth/login-phone accepts phone and password and returns access/refresh tokens when credentials valid.
       - Suspended/inactive accounts receive 401 with ACCOUNT_SUSPENDED code.
       - Password comparison uses secure hashing; tokens are JWTs signed with `JWT_SECRET`.
     - Code references:
       - `backend/routes/auth.js` (POST /api/auth/login-phone)
       - `backend/controllers/authController.js` (loginPhone)
       - `backend/utils/sessionManager.js` (createSession, token generation)
     - Tests:
       - `backend/__tests__/integration/auth-api.test.js` (login flows)

  3. P14-13 — User: View & Edit Profile
     - Jira: P14-13 (Story)
     - Sprint: Sprint 2
     - Story points: 3
     - Components: backend, api, frontend
     - Acceptance criteria:
       - GET /api/users/profile returns user profile for authenticated users (no password field).
       - PUT /api/users/profile updates profile fields (e.g., name, email) and returns updated user.
       - Frontend reflects profile changes immediately after success.
     - Code references:
       - `backend/routes/users.js` (GET/PUT /api/users/profile)
       - `backend/controllers/userController.js` (getProfile, updateProfile)
     - Tests:
       - `backend/__tests__/integration/users-api.test.js` (if present) or unit tests under `backend/__tests__/unit`

---

## Epic: P14-2 — Core Rider Experience

- Epic key: P14-2

- Stories:

  1. P14-8 — Rider: Book a Ride & Get Fare Estimate
     - Jira: P14-8 (Story)
     - Sprint: Sprint 1
     - Story points: 8
     - Components: backend, api, frontend, services (FareService, MatchingService)
     - Acceptance criteria:
       - POST /api/rides/estimate returns fare breakdown, distance and estimated duration for given pickup/destination coordinates.
       - POST /api/rides/book creates a ride with status `requested`, stores estimates, and returns ride object.
       - Requests with invalid coordinates receive INVALID_COORDINATES error.
     - Code references:
       - `backend/routes/rides.js` (POST /api/rides/estimate, POST /api/rides/book)
       - `backend/controllers/rideController.js` (getFareEstimate, bookRide)
       - `backend/services/FareService.js` (fare calculation/estimate)
     - Tests:
       - `backend/__tests__/integration/rides-api.test.js`

  2. P14-11 — Rider: See Driver's Live Location
     - Jira: P14-11 (Story)
     - Sprint: Sprint 1
     - Story points: 5
     - Components: backend, socket, frontend
     - Acceptance criteria:
       - Once a driver is assigned, rider clients connected to the ride room receive `driver:location-updated` events with latitude/longitude.
       - Rider UI shows driver on map and updates ETA when location updates arrive.
       - Socket authentication requires a valid JWT during handshake.
     - Code references:
       - `backend/services/socketService.js` (driver location update handlers and broadcasting)
       - `frontend/src/services/*` (socket usage; e.g., rideService or SocketContext)
     - Tests:
       - System tests simulating socket connections under `backend/__tests__/system/`

  3. P14-15 — Rider: Rate Driver After Trip
     - Jira: P14-15 (Story)
     - Sprint: Sprint 2
     - Story points: 2
     - Components: backend, api, frontend
     - Acceptance criteria:
       - POST /api/payments/rate (or similar endpoint) accepts rating for a completed ride and persists it.
       - Rating is only accepted for completed rides; non-completed rides return error.
     - Code references:
       - `backend/routes/payments.js` (POST /api/payments/rate)
       - `backend/controllers/paymentController.js` (submitRating if implemented)
     - Tests:
       - `backend/__tests__/integration/payments-api.test.js` (if present)

  4. P14-18 — User: Receive In-App Notifications
     - Jira: P14-18 (Story)
     - Sprint: Sprint 2
     - Story points: 3
     - Components: socket, frontend, backend
     - Acceptance criteria:
       - When key events happen (driver assigned, status change), appropriate socket events are emitted to the ride room and admins.
       - Frontend receives `ride:status-updated`, `ride:driver-assigned`, and other notification events.
     - Code references:
       - `backend/services/socketService.js` (event emission)
       - `backend/controllers/rideController.js` (places where socketService.broadcastToRide is called)
       - `frontend/src/contexts/SocketContext.tsx` or services implementing UI notifications
     - Tests:
       - System/socket tests under `backend/__tests__/system/`

---

## Epic: P14-3 — Core Driver Experience

- Epic key: P14-3

- Stories:

  1. P14-9 — Driver: Go Online & View Ride Requests
     - Jira: P14-9 (Story)
     - Sprint: Sprint 1
     - Story points: 5
     - Components: backend, socket, frontend
     - Acceptance criteria:
       - Drivers can toggle availability via PUT /api/users/driver/availability and via socket `driver:availability-update`.
       - When online, the driver receives pending ride requests via GET /api/rides/driver/pending or via socket notifications.
     - Code references:
       - `backend/routes/users.js` (PUT /api/users/driver/availability)
       - `backend/services/socketService.js` (availability updates and notifications)
       - `backend/controllers/userController.js` (updateAvailability)
     - Tests:
       - `backend/__tests__/integration/rides-api.test.js` (driver-specific endpoints)

  2. P14-10 — Driver: Accept & Update Ride Status
     - Jira: P14-10 (Story)
     - Sprint: Sprint 1
     - Story points: 5
     - Components: backend, api, socket
     - Acceptance criteria:
       - POST /api/rides/:id/accept assigns the driver atomically and updates driver availability.
       - Drivers can update ride status (PUT /api/rides/:id/status) with proper authorization checks.
       - Socket events are emitted to notify rider and admins about assignment and status changes.
     - Code references:
       - `backend/routes/rides.js` (POST /:id/accept, PUT /:id/status)
       - `backend/controllers/rideController.js` (acceptRide, updateRideStatus)
       - `backend/services/MatchingService.js` (assignRideToDriver)
     - Tests:
       - `backend/__tests__/unit/services-matching.test.js`
       - `backend/__tests__/integration/rides-api.test.js`

---

## Epic: P14-4 — Payment & Trip History

- Epic key: P14-4

- Stories:

  1. P14-12 — Rider: Handle Mock Payment on Trip End
     - Jira: P14-12 (Story)
     - Sprint: Sprint 2
     - Story points: 3
     - Components: backend, api, frontend
     - Acceptance criteria:
       - On ride completion, backend calculates final fare and charges a mock payment method (simulated) via POST /api/payments/process.
       - Payment result recorded in DB and a receipt endpoint GET /api/payments/receipt/:rideId returns payment details.
     - Code references:
       - `backend/routes/payments.js` (POST /process, GET /receipt/:rideId)
       - `backend/controllers/paymentController.js` (processPayment, getReceipt)
     - Tests:
       - `backend/__tests__/integration/payments-api.test.js`

  2. P14-14 — User: View Trip History
     - Jira: P14-14 (Story)
     - Sprint: Sprint 2
     - Story points: 3
     - Components: backend, api, frontend
     - Acceptance criteria:
       - GET /api/rides/history returns paginated ride records with filters for date range and status.
       - Admins can query all rides via GET /api/rides/admin/all.
     - Code references:
       - `backend/routes/rides.js` (GET /history, GET /admin/all)
       - `backend/controllers/rideController.js` (getRideHistory)
     - Tests:
       - `backend/__tests__/integration/rides-api.test.js`

---

## Epic: P14-5 — Admin Portal & Moderation

- Epic key: P14-5

- Stories:

  1. P14-16 — Admin: Admin Portal Login
     - Jira: P14-16 (Story)
     - Sprint: Sprint 2
     - Story points: 3
     - Components: backend, frontend (admin UI), api
     - Acceptance criteria:
       - Admin users can authenticate via POST /api/auth/login-email and receive admin-scoped tokens.
       - Admin sessions are recorded and manageable through security endpoints.
     - Code references:
       - `backend/routes/auth.js` (POST /login-email)
       - `backend/controllers/authController.js` (loginEmail)
       - `backend/routes/security.js` and `backend/controllers/securityController.js` (admin security APIs)
     - Tests:
       - `backend/__tests__/integration/auth-api.test.js`

  2. P14-17 — Admin: View & Manage Users
     - Jira: P14-17 (Story)
     - Sprint: Sprint 2
     - Story points: 5
     - Components: backend, api, admin-frontend
     - Acceptance criteria:
       - Admins can list users with pagination/filtering via GET /api/users/admin/users.
       - Admins can suspend/reactivate users via PUT /api/users/admin/users/:userId/suspend and /reactivate.
       - Actions are logged (security audit) and visible in security events.
     - Code references:
       - `backend/routes/users.js` (admin user endpoints)
       - `backend/controllers/userController.js` (getAllUsers, suspendUser, reactivateUser)
       - `backend/routes/security.js` (security events)
     - Tests:
       - `backend/__tests__/integration/users-api.test.js` (if present)

---

## Story Points (summary)
- 2 pts: Minor UI or small backend change (rating endpoint)
- 3 pts: Single endpoint + validation + small UI (login, profile, payment mock, history)
- 5 pts: Multi-endpoint flow with auth and DB updates (registration with OTP, driver availability)
- 8 pts: Complex flow involving services and background matching (book a ride, estimate, matching)
