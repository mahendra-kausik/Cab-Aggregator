# Commit Strategy & Plan (file-level commit instructions)

Goal: Produce ~96 commits total (within your requested range of 80–100). Divide work across 4 contributors: `Kanishk R` (group leader), `K Hariram`, `Mahendra Kausik`, and `Karthikeyan D`.

This updated file expands the original plan with exact files and the parts of files that should change for each planned commit. Use these as a precise checklist when implementing each commit. If a file doesn't exist, create it at the path shown.

Formatting conventions used below:
- "Files to change" lists exact paths (relative to repo root).
- "Edits / additions" describes the function, route, schema, or test to add inside that file.
- For tests, add files under `backend/__tests__/unit` or `backend/__tests__/integration` as specified.

If you'd like, I can apply the first few commits automatically (create branch, add files, commit). Tell me which story you'd like me to implement.

--------------------------------------------------------------------------------

SUMMARY OF ASSIGNMENTS
- Kanishk R: P14-6 (User Registration), P14-8 (Book & Estimate), P14-14 (Trip History)
- K Hariram: P14-7 (Login), P14-9 (Driver Online & Pending), P14-12 (Mock Payment)
- Mahendra Kausik: P14-11 (Driver Live Location), P14-15 (Rate Driver), P14-17 (Admin Manage Users), P14-18 (In-App Notifications)
- Karthikeyan D: P14-10 (Accept & Update Ride Status), P14-13 (View & Edit Profile), P14-16 (Admin Login)

--------------------------------------------------------------------------------

KANISHK R — P14-6 (User Registration) — 8 commits
Branch: `feature/P14-6-Kanishk-R`

Commit 1 — feat(P14-6,Kanishk R): scaffold register-phone route and validation middleware
Files to change:
- backend/routes/auth.js
- backend/middleware/validation.js

Edits / additions:
- backend/routes/auth.js: add route handler registration:
  - router.post('/register-phone', validation.registerPhone, authController.registerPhone);
  - Ensure authController and validation are required at top: const authController = require('../controllers/authController'); const validation = require('../middleware/validation');
- backend/middleware/validation.js: add and export registerPhone middleware or Joi schema. Example: exports.registerPhone = (req,res,next) => { validate phone exists and format; next(); }

Commit 2 — feat(P14-6,Kanishk R): implement registerPhone controller core (minimal viable logic)
Files to change:
- backend/controllers/authController.js
- backend/models/User.js (read), backend/models/OTP.js (create if absent)

Edits / additions:
- backend/controllers/authController.js: add and export async function registerPhone(req, res) that reads phone from req.body, performs basic checks and calls OTP.create(phone) (see next commit).
- If OTP model not present, create backend/models/OTP.js (basic schema with phone, code, createdAt)

Commit 3 — feat(P14-6,Kanishk R): implement OTP generation & persist logic
Files to change:
- backend/models/OTP.js
- backend/controllers/authController.js

Edits / additions:
- backend/models/OTP.js: implement mongoose schema with fields { phone, code, createdAt } and TTL index on createdAt to auto-expire documents.
- backend/controllers/authController.js: call OTP.create({ phone, code }) and return success response. Keep code generation logic in controller or in a helper like backend/utils/otp.js.

Commit 4 — test(P14-6,Kanishk R): add unit tests for validation & OTP flow
Files to add:
- backend/__tests__/unit/auth-register.test.js
- backend/__tests__/helpers/testApp.js (if helpers exist; otherwise use supertest app setup)

Edits / additions:
- auth-register.test.js: tests for invalid phone (expect 400), valid phone leads to OTP created (mock OTP model), and response shape. Use jest mocks for OTP.create.

Commit 5 — fix(P14-6,Kanishk R): handle duplicate phone existing user case (409)
Files to change:
- backend/controllers/authController.js
- backend/models/User.js (read)
- backend/__tests__/unit/auth-register.test.js (update tests to include duplicate case)

Edits / additions:
- authController.registerPhone: before creating OTP, run const existing = await User.findOne({ phone }); if (existing) return res.status(409).json({ code: 'USER_EXISTS' });

Commit 6 — docs(P14-6,Kanishk R): document API contract for /api/auth/register-phone
Files to change:
- backend/docs/authentication.md or docs/API_DOCUMENTATION.md

Edits / additions:
- Add endpoint docs: request body schema, sample success response, error codes (400, 409).

Commit 7 — feat(P14-6,Kanishk R): simulate SMS sending for dev environment
Files to change:
- backend/utils/smsMock.js (create)
- backend/controllers/authController.js

Edits / additions:
- smsMock.js: export sendSMS(phone, message) that console.logs in dev.
- authController.registerPhone: in dev environment, call smsMock.sendSMS(phone, `OTP ${code}`) instead of external provider.

Commit 8 — chore(P14-6,Kanishk R): final polish, lint fixes and push
Files to change:
- backend/controllers/authController.js
- backend/models/OTP.js
- backend/middleware/validation.js
- tests updated as needed

Edits / additions:
- Minor code style fixes; ensure all new tests pass locally; commit and push branch.

--------------------------------------------------------------------------------

KANISHK R — P14-8 (Book & Estimate) — 12 commits
Branch: `feature/P14-8-Kanishk-R`

Commit 1 — feat(P14-8,Kanishk R): add /api/rides/estimate route and validation
Files to change:
- backend/routes/rides.js
- backend/middleware/validation.js

Edits / additions:
- routes/rides.js: add router.post('/estimate', validation.estimateRide, rideController.estimate);
- validation.js: add estimateRide middleware validating origin/destination coordinates.

Commit 2 — feat(P14-8,Kanishk R): wire FareService.calculateFare usage into controller
Files to change:
- backend/controllers/rideController.js
- backend/services/FareService.js (read/modify)

Edits / additions:
- rideController.estimate: parse coordinates and call FareService.calculateFare(origin, dest), return { fare }.

Commit 3 — test(P14-8,Kanishk R): add unit tests for FareService usage
Files to add:
- backend/__tests__/unit/fare-service.test.js
- backend/__tests__/integration/rides-estimate.test.js

Edits / additions:
- fare-service.test.js: test calculateFare outputs; rides-estimate.test.js: call endpoint and assert response structure.

Commit 4 — feat(P14-8,Kanishk R): implement /api/rides/book handler skeleton
Files to change:
- backend/routes/rides.js
- backend/controllers/rideController.js
- backend/models/Ride.js (create/modify)

Edits / additions:
- routes: add router.post('/book', validation.bookRide, rideController.book)
- rideController.book: create Ride document with riderId, origin, destination, fareEstimate, status: 'pending'

Commit 5 — feat(P14-8,Kanishk R): create ride model save and estimate persistence
Files to change:
- backend/models/Ride.js
- backend/controllers/rideController.js

Edits / additions:
- Ride schema: origin, destination, fareEstimate, rider, status, createdAt
- book saves Ride and returns its id and fareEstimate

Commit 6 — feat(P14-8,Kanishk R): add checks for active rides and invalid coordinates
Files to change:
- backend/controllers/rideController.js
- backend/middleware/validation.js

Edits / additions:
- book: check for existing Ride with rider and status in ['pending','assigned','ongoing'] and return 409 if exists
- validation: ensure coordinates are valid numbers and within lat/lng ranges

Commit 7 — test(P14-8,Kanishk R): integration tests hitting estimate and book endpoints
Files to add:
- backend/__tests__/integration/rides-book.test.js

Edits / additions:
- Test end-to-end estimate -> book; stub external services if any

Commit 8 — fix(P14-8,Kanishk R): fix edge cases in calculateDistance and validation
Files to change:
- backend/services/FareService.js
- backend/middleware/validation.js

Edits / additions:
- Add guards for zero-distance, non-numeric input; return 400 for invalid coordinates

Commit 9 — feat(P14-8,Kanishk R): add socket event trigger placeholder for matching
Files to change:
- backend/controllers/rideController.js
- backend/services/socketService.js

Edits / additions:
- rideController.book: call socketService.emit('ride:created', ride) after save

Commit 10 — docs(P14-8,Kanishk R): update API docs & add sample request/response
Files to change:
- docs/API_DOCUMENTATION.md

Edits / additions:
- Add estimate and book endpoints with examples

Commit 11 — chore(P14-8,Kanishk R): address review comments and minor refactors
Files to change:
- rideController, FareService, tests

Commit 12 — ci(P14-8,Kanishk R): add or update test scripts and run locally
Files to change:
- backend/package.json (scripts)

Edits / additions:
- Ensure `npm test` covers new tests, update scripts if necessary

--------------------------------------------------------------------------------

KANISHK R — P14-14 (Trip History) — 4 commits
Branch: `feature/P14-14-Kanishk-R`

Commit 1 — feat(P14-14,Kanishk R): add GET /api/rides/history route and basic controller
Files to change:
- backend/routes/rides.js
- backend/controllers/rideController.js

Edits / additions:
- routes: add router.get('/history', auth.ensureAuth, rideController.history)
- controller: history queries Ride.find({ rider: req.user.id }) sorted by createdAt

Commit 2 — feat(P14-14,Kanishk R): implement pagination, filters and populate in controller
Files to change:
- backend/controllers/rideController.js

Edits / additions:
- Add query params page, limit, from, to; use mongoose .skip()/.limit() and populate driver fields

Commit 3 — test(P14-14,Kanishk R): add integration tests for history endpoint
Files to add:
- backend/__tests__/integration/rides-history.test.js

Commit 4 — docs(P14-14,Kanishk R): document endpoints and finalize commits
Files to change:
- docs/API_DOCUMENTATION.md

Edits / additions:
- Add docs and sample responses

--------------------------------------------------------------------------------

K HARIRAM — P14-7 (Login) — 6 commits
Branch: `feature/P14-7-K-Hariram`

Commit 1 — feat(P14-7,K Hariram): add login-phone route
Files to change:
- backend/routes/auth.js

Edits / additions:
- Add router.post('/login-phone', validation.loginPhone, authController.loginPhone)

Commit 2 — feat(P14-7,K Hariram): implement loginPhone controller with password verification
Files to change:
- backend/controllers/authController.js
- backend/utils/sessionManager.js (read/use)

Edits / additions:
- Add loginPhone that finds user by phone, compares password (bcrypt.compare) or verifies OTP, and returns token via sessionManager.createSession

Commit 3 — feat(P14-7,K Hariram): integrate sessionManager.createSession
Files to change:
- backend/utils/sessionManager.js
- backend/controllers/authController.js

Edits / additions:
- Ensure sessionManager.createSession(user) exists and returns a token; update controller to call it and return token

Commit 4 — test(P14-7,K Hariram): add integration tests for successful and failed login
Files to add:
- backend/__tests__/integration/auth-login.test.js

Commit 5 — fix(P14-7,K Hariram): handle suspended/inactive account responses
Files to change:
- backend/controllers/authController.js

Edits / additions:
- Add check for user.isSuspended and return 403 with code ACCOUNT_SUSPENDED

Commit 6 — docs(P14-7,K Hariram): update API docs with token format
Files to change:
- docs/API_DOCUMENTATION.md

Edits / additions:
- Document login-phone endpoint and token format

--------------------------------------------------------------------------------

K HARIRAM — P14-9 (Driver Online & Pending) — 10 commits
Branch: `feature/P14-9-K-Hariram`

Commit 1 — feat(P14-9,K Hariram): add PUT /api/users/driver/availability route
Files to change:
- backend/routes/users.js

Edits / additions:
- Add router.put('/driver/availability', auth.ensureDriver, userController.updateAvailability)

Commit 2 — feat(P14-9,K Hariram): implement updateAvailability controller
Files to change:
- backend/controllers/userController.js

Edits / additions:
- Implement updateAvailability(req,res) updating User.driverInfo.isOnline, lastSeen

Commit 3 — feat(P14-9,K Hariram): add socket handler for driver:availability-update
Files to change:
- backend/services/socketHandlers.js or backend/services/socketService.js

Edits / additions:
- Add handler that updates DB and broadcasts availability change

Commit 4 — test(P14-9,K Hariram): add tests for availability API
Files to add:
- backend/__tests__/unit/user-availability.test.js

Commit 5 — feat(P14-9,K Hariram): implement GET /api/rides/driver/pending
Files to change:
- backend/routes/rides.js
- backend/controllers/rideController.js

Edits / additions:
- Add route and controller.driverPending that performs a geospatial query on Ride collection

Commit 6 — test(P14-9,K Hariram): integration tests for pending rides
Files to add:
- backend/__tests__/integration/driver-pending.test.js

Commit 7 — fix(P14-9,K Hariram): tune query params and validation
Files to change:
- backend/controllers/rideController.js
- backend/middleware/validation.js

Commit 8 — docs(P14-9,K Hariram): update backend docs and frontend notes
Files to change:
- docs/API_DOCUMENTATION.md

Commit 9 — chore(P14-9,K Hariram): address lint/test feedback and push branch
Files to change:
- userController.js, socketHandlers.js, tests

Commit 10 — ci(P14-9,K Hariram): run tests locally and push
No file changes — run tests and push

--------------------------------------------------------------------------------

K HARIRAM — P14-12 (Mock Payment) — 8 commits
Branch: `feature/P14-12-K-Hariram`

Commit 1 — feat(P14-12,K Hariram): add POST /api/payments/process route
Files to change:
- backend/routes/payments.js

Edits / additions:
- Add router.post('/process', paymentController.processPayment)

Commit 2 — feat(P14-12,K Hariram): implement processPayment mock logic in controller
Files to change:
- backend/controllers/paymentController.js

Edits / additions:
- Implement processPayment that validates rideId and amount and returns mocked transaction id

Commit 3 — feat(P14-12,K Hariram): persist payment record with receipt metadata
Files to add/change:
- backend/models/Payment.js
- backend/controllers/paymentController.js

Edits / additions:
- Payment schema: rideId, payerId, amount, transactionId, status, createdAt
- Save payment on processPayment

Commit 4 — test(P14-12,K Hariram): add integration tests for payment processing
Files to add:
- backend/__tests__/integration/payments.test.js

Commit 5 — feat(P14-12,K Hariram): add GET /api/payments/receipt/:rideId
Files to change:
- backend/routes/payments.js
- backend/controllers/paymentController.js

Edits / additions:
- Add route and controller.getReceipt to fetch Payment by rideId

Commit 6 — fix(P14-12,K Hariram): handle edge cases and errors
Files to change:
- paymentController.js, tests

Commit 7 — docs(P14-12,K Hariram): document payment API and receipts
Files to change:
- docs/API_DOCUMENTATION.md

Commit 8 — chore(P14-12,K Hariram): final touches, add sample responses
Files to change:
- docs and controller

--------------------------------------------------------------------------------

MAHENDRA KAUSIK — P14-11 (Driver Live Location) — 8 commits
Branch: `feature/P14-11-Mahendra-Kausik`

Commit 1 — feat(P14-11,Mahendra Kausik): add socket auth and driver:location-update handler
Files to change:
- backend/services/socketService.js
- backend/services/socketHandlers.js

Edits / additions:
- Add socket.on('driver:location-update', handler) with token verification

Commit 2 — feat(P14-11,Mahendra Kausik): update User driverInfo.currentLocation persistence
Files to change:
- backend/controllers/userController.js (or socket handler)
- backend/models/User.js

Edits / additions:
- Persist { lat, lng, timestamp } and update lastSeen

Commit 3 — test(P14-11,Mahendra Kausik): add tests for socket auth and location update persistence
Files to add:
- backend/__tests__/system/socket-location.test.js

Commit 4 — feat(P14-11,Mahendra Kausik): broadcast driver:location-updated to ride rooms and admins
Files to change:
- backend/services/socketService.js

Edits / additions:
- Emit events to `ride:{rideId}` rooms and `admin` namespace

Commit 5 — fix(P14-11,Mahendra Kausik): ensure permissions and error handling
Files to change:
- socket handler files

Commit 6 — docs(P14-11,Mahendra Kausik): update API docs and socket event list
Files to change:
- docs/API_DOCUMENTATION.md, docs/RTM.md

Commit 7 — chore(P14-11,Mahendra Kausik): minor UI integration notes
Files to change:
- frontend/src/contexts/SocketContext.tsx (comments) or docs

Commit 8 — ci(P14-11,Mahendra Kausik): run system tests locally and push
No file changes — run tests and push

--------------------------------------------------------------------------------

MAHENDRA KAUSIK — P14-15 (Rate Driver) — 6 commits
Branch: `feature/P14-15-Mahendra-Kausik`

Commit 1 — feat(P14-15,Mahendra Kausik): add POST /api/payments/rate route
Files to change:
- backend/routes/payments.js
- backend/controllers/paymentController.js

Edits / additions:
- Add router.post('/rate', paymentController.rateDriver) and implement basic validation

Commit 2 — feat(P14-15,Mahendra Kausik): implement submitRating to persist ratings
Files to change:
- backend/controllers/paymentController.js
- backend/models/Ride.js or backend/models/User.js (update driver rating fields)

Commit 3 — test(P14-15,Mahendra Kausik): add tests ensuring only completed rides can be rated
Files to add:
- backend/__tests__/integration/rating.test.js

Commit 4 — fix(P14-15,Mahendra Kausik): add rating aggregation/update on driver profile
Files to change:
- backend/models/User.js
- paymentController.js

Commit 5 — fix(P14-15,Mahendra Kausik): address cross-test issues
Files to change:
- tests and controllers

Commit 6 — docs(P14-15,Mahendra Kausik): update API docs
Files to change:
- docs/API_DOCUMENTATION.md

--------------------------------------------------------------------------------

MAHENDRA KAUSIK — P14-17 (Admin Manage Users) — 8 commits
Branch: `feature/P14-17-Mahendra-Kausik`

Commit 1 — feat(P14-17,Mahendra Kausik): implement GET /api/users/admin/users
Files to change:
- backend/routes/users.js
- backend/controllers/adminController.js (create if needed)

Edits / additions:
- Add route and adminController.listUsers implementing pagination and filters via query params

Commit 2 — feat(P14-17,Mahendra Kausik): implement GET /api/users/admin/users/:userId
Files to change:
- backend/controllers/adminController.js

Commit 3 — feat(P14-17,Mahendra Kausik): implement suspendUser and reactivateUser endpoints
Files to change:
- backend/routes/users.js
- backend/controllers/adminController.js

Edits / additions:
- Add POST /admin/users/:userId/suspend and /reactivate and implement audit logging calls

Commit 4 — test(P14-17,Mahendra Kausik): add integration tests for admin endpoints
Files to add:
- backend/__tests__/integration/admin-users.test.js

Commit 5 — docs(P14-17,Mahendra Kausik): update admin docs
Files to change:
- docs/ADMIN_GUIDE.md and docs/API_DOCUMENTATION.md

Commit 6 — fix(P14-17,Mahendra Kausik): prevent admin self-suspension
Files to change:
- adminController.js

Commit 7 — chore(P14-17,Mahendra Kausik): add audit logging calls and minor refactors
Files to change:
- backend/utils/securityLogger.js
- adminController.js

Commit 8 — ci(P14-17,Mahendra Kausik): run tests locally and push

--------------------------------------------------------------------------------

MAHENDRA KAUSIK — P14-18 (In-App Notifications) — 6 commits
Branch: `feature/P14-18-Mahendra-Kausik`

Commit 1 — feat(P14-18,Mahendra Kausik): define notification events and server emission points
Files to change:
- backend/services/notificationService.js (create)
- backend/controllers/rideController.js (emit notifications on key events)

Commit 2 — feat(P14-18,Mahendra Kausik): add client-side event names to docs & SocketContext notes
Files to change:
- frontend/src/contexts/SocketContext.tsx
- docs/API_DOCUMENTATION.md

Commit 3 — test(P14-18,Mahendra Kausik): add basic system tests to validate events
Files to add:
- backend/__tests__/system/notifications.test.js

Commit 4 — fix(P14-18,Mahendra Kausik): address timing/ordering issues
Files to change:
- notificationService.js, tests

Commit 5 — docs(P14-18,Mahendra Kausik): add notification examples for frontend
Files to change:
- docs/QUICKSTART.md or frontend README

Commit 6 — chore(P14-18,Mahendra Kausik): final polish and push

--------------------------------------------------------------------------------

KARTHIKEYAN D — P14-10 (Accept & Update Ride Status) — 12 commits
Branch: `feature/P14-10-Karthikeyan-D`

Commit 1 — feat(P14-10,Karthikeyan D): add POST /api/rides/:id/accept route and validation
Files to change:
- backend/routes/rides.js
- backend/middleware/validation.js

Edits / additions:
- routes: add router.post('/:id/accept', auth.ensureDriver, rideController.accept)

Commit 2 — feat(P14-10,Karthikeyan D): implement MatchingService.assignRideToDriver skeleton
Files to change:
- backend/services/MatchingService.js

Edits / additions:
- Export assignRideToDriver(rideId, driverId) that will be used by controller

Commit 3 — feat(P14-10,Karthikeyan D): implement acceptRide logic, atomic assignment
Files to change:
- backend/controllers/rideController.js
- backend/models/Ride.js

Edits / additions:
- accept: Ride.findOneAndUpdate({ _id: rideId, status: 'pending' }, { $set: { status: 'assigned', driver: driverId } }, { new: true }) and emit events

Commit 4 — test(P14-10,Karthikeyan D): add unit tests for assignment conflict and success
Files to add:
- backend/__tests__/unit/ride-accept.test.js

Commit 5 — feat(P14-10,Karthikeyan D): implement PUT /api/rides/:id/status and transitions
Files to change:
- backend/routes/rides.js
- backend/controllers/rideController.js

Edits / additions:
- routes: add router.put('/:id/status', auth.ensureDriverOrParticipant, rideController.updateStatus)
- controller: implement allowed transitions and checks

Commit 6 — test(P14-10,Karthikeyan D): add tests for status transitions and authorization checks
Files to add:
- backend/__tests__/integration/ride-status.test.js

Commit 7 — fix(P14-10,Karthikeyan D): add socket emits for assignment and status change
Files to change:
- backend/controllers/rideController.js
- backend/services/socketService.js

Commit 8 — fix(P14-10,Karthikeyan D): ensure driver release and race conditions handled
Files to change:
- backend/controllers/rideController.js

Commit 9 — docs(P14-10,Karthikeyan D): update API docs and matching notes
Files to change:
- docs/API_DOCUMENTATION.md

Commit 10 — chore(P14-10,Karthikeyan D): finalize integration tests and push
Files to add/update:
- backend/__tests__/integration/ride-accept-flow.test.js

Commit 11 — fix(P14-10,Karthikeyan D): tune edge-case handling after cross tests
Files to change:
- rideController.js, MatchingService.js, tests

Commit 12 — docs(P14-10,Karthikeyan D): add developer notes for atomic assignment
Files to change:
- docs/DEVELOPER_NOTES.md or docs/RTM.md

--------------------------------------------------------------------------------

KARTHIKEYAN D — P14-13 (View & Edit Profile) — 6 commits
Branch: `feature/P14-13-Karthikeyan-D`

Commit 1 — feat(P14-13,Karthikeyan D): add GET /api/users/profile and route wiring
Files to change:
- backend/routes/users.js
- backend/controllers/userController.js

Edits / additions:
- routes: add router.get('/profile', auth.ensureAuth, userController.getProfile)

Commit 2 — feat(P14-13,Karthikeyan D): implement updateProfile in controller with validation
Files to change:
- backend/controllers/userController.js
- backend/middleware/validation.js

Commit 3 — test(P14-13,Karthikeyan D): add integration tests for profile retrieval and updates
Files to add:
- backend/__tests__/integration/profile.test.js

Commit 4 — fix(P14-13,Karthikeyan D): handle email unset vs empty string behavior
Files to change:
- backend/controllers/userController.js

Commit 5 — docs(P14-13,Karthikeyan D): update API docs and frontend notes
Files to change:
- docs/API_DOCUMENTATION.md

Commit 6 — chore(P14-13,Karthikeyan D): final cleanups and push
Files to change:
- userController.js, tests

--------------------------------------------------------------------------------

KARTHIKEYAN D — P14-16 (Admin Login) — 6 commits
Branch: `feature/P14-16-Karthikeyan-D`

Commit 1 — feat(P14-16,Karthikeyan D): add POST /api/auth/login-email route for admin auth
Files to change:
- backend/routes/auth.js
- backend/controllers/authController.js

Commit 2 — feat(P14-16,Karthikeyan D): ensure sessionManager records admin sessions with role check
Files to change:
- backend/utils/sessionManager.js
- backend/controllers/authController.js

Commit 3 — test(P14-16,Karthikeyan D): add tests for admin login and invalid credentials
Files to add:
- backend/__tests__/integration/admin-login.test.js

Commit 4 — docs(P14-16,Karthikeyan D): add admin login notes and token requirements
Files to change:
- docs/ADMIN_GUIDE.md

Commit 5 — fix(P14-16,Karthikeyan D): tweak error messages and rate limiting
Files to change:
- authController.js, middleware/rateLimiter.js (if present)

Commit 6 — chore(P14-16,Karthikeyan D): push branch and create PR

--------------------------------------------------------------------------------

INTEGRATION & RELEASE FLOW (unchanged)

Follow the branching and PR rules in the original plan: feature branches → PR to `develop` → create `release/*` → merge to `main` and tag.

--------------------------------------------------------------------------------

Notes & next steps
- The document now contains file-level instructions for each planned commit. If you'd like, I can:
  - Implement the first N commits of a particular story and push them to branches in this repo.
  - Generate the test files and controllers automatically for a chosen story.
  - Export this plan as CSV for bulk import to a tracker.

Tell me which story and how many initial commits you want me to create (I recommend starting with P14-6 commit 1–3).


P14-7 (User Login) — 6 commits
  1. feat(P14-7,K Hariram): add login-phone route to `backend/routes/auth.js`
  2. feat(P14-7,K Hariram): implement loginPhone controller with password verification
  3. feat(P14-7,K Hariram): integrate `sessionManager.createSession` for token creation
  4. test(P14-7,K Hariram): add integration tests for successful and failed login
  5. fix(P14-7,K Hariram): handle suspended/inactive account responses (ACCOUNT_SUSPENDED)
  6. docs(P14-7,K Hariram): update API docs with token format and example

P14-9 (Driver: Go Online & View Ride Requests) — 10 commits
  7. feat(P14-9,K Hariram): add PUT /api/users/driver/availability route
  8. feat(P14-9,K Hariram): implement `updateAvailability` in `backend/controllers/userController.js`
  9. feat(P14-9,K Hariram): add socket handler for `driver:availability-update` in `socketService.js`
 10. test(P14-9,K Hariram): add tests for availability API and DB field changes
 11. feat(P14-9,K Hariram): implement GET /api/rides/driver/pending (DB geospatial query)
 12. test(P14-9,K Hariram): integration tests for pending rides query
 13. fix(P14-9,K Hariram): tune query params and validation
 14. docs(P14-9,K Hariram): update backend docs and add frontend notes for driver flow
 15. chore(P14-9,K Hariram): address lint/test feedback and push branch

P14-12 (Mock Payment) — 10 commits
 16. feat(P14-12,K Hariram): add POST /api/payments/process route
 17. feat(P14-12,K Hariram): implement processPayment mock logic in controller
 18. feat(P14-12,K Hariram): persist payment record with receipt metadata
 19. test(P14-12,K Hariram): add integration tests for payment processing and receipt retrieval
 20. feat(P14-12,K Hariram): add GET /api/payments/receipt/:rideId
 21. fix(P14-12,K Hariram): handle edge cases and errors
 22. docs(P14-12,K Hariram): document payment API and receipts
 23. chore(P14-12,K Hariram): final touches, add sample responses
 24. ci(P14-12,K Hariram): run tests locally and push
 25. fix(P14-12,K Hariram): address test edge cases reported by Kanishk R's cross tests
 26. docs(P14-12,K Hariram): add sample receipt to API docs

Push/PR rules for K Hariram
- Push `feature/P14-7-K Hariram` early (after 3 commits) for security review; final PR after tests pass.
- For `feature/P14-9-K Hariram`, open a draft PR after implementing socket integration (commit 9) to align frontend work.
- `feature/P14-12-K Hariram` should be merged after payment tests and receipt endpoint are verified.

--------------------------------------------------------------------------------

Mahendra Kausik — 28 commits (assigned: P14-11, P14-15, P14-17, P14-18)
- Branches:
  - `feature/P14-11-Mahendra Kausik`
  - `feature/P14-15-Mahendra Kausik`
  - `feature/P14-17-Mahendra Kausik`
  - `feature/P14-18-Mahendra Kausik`

- Commit allocation and messages:

P14-11 (Driver Live Location) — 8 commits
 13. feat(P14-11,Mahendra Kausik): add socket auth and driver:location-update handler in `socketService.js`
 14. feat(P14-11,Mahendra Kausik): update User driverInfo.currentLocation updates from socket
 15. test(P14-11,Mahendra Kausik): add tests for socket auth and location update persistence
 16. feat(P14-11,Mahendra Kausik): broadcast `driver:location-updated` to ride room and admins
 17. fix(P14-11,Mahendra Kausik): ensure permissions and error handling are robust
 18. docs(P14-11,Mahendra Kausik): update API docs and socket event list
 19. chore(P14-11,Mahendra Kausik): minor UI integration notes for frontend
 20. ci(P14-11,Mahendra Kausik): run system tests locally and push

P14-15 (Rate Driver) — 6 commits
 21. feat(P14-15,Mahendra Kausik): add POST /api/payments/rate route and validation
 22. feat(P14-15,Mahendra Kausik): implement submitRating to persist ratings on Ride or User
 23. test(P14-15,Mahendra Kausik): add tests ensuring only completed rides can be rated
 24. fix(P14-15,Mahendra Kausik): add rating aggregation/update on driver profile
 25. fix(P14-15,Mahendra Kausik): address cross-test issues reported by Kanishk R
 26. docs(P14-15,Mahendra Kausik): add sample UI flow for rating

P14-17 (Admin Manage Users) — 8 commits
 27. feat(P14-17,Mahendra Kausik): implement GET /api/users/admin/users with pagination/filter
 28. feat(P14-17,Mahendra Kausik): implement GET /api/users/admin/users/:userId
 29. feat(P14-17,Mahendra Kausik): implement suspendUser and reactivateUser endpoints
 30. test(P14-17,Mahendra Kausik): add integration tests for admin endpoints and permission checks
 31. docs(P14-17,Mahendra Kausik): update admin docs and link security event logging
 32. fix(P14-17,Mahendra Kausik): prevent admin self-suspension, handle edge cases
 33. chore(P14-17,Mahendra Kausik): add audit logging calls and minor refactors
 34. ci(P14-17,Mahendra Kausik): run tests locally and push

P14-18 (In-App Notifications) — 6 commits
 35. feat(P14-18,Mahendra Kausik): define notification events and server emission points (ride assigned/status changes)
 36. feat(P14-18,Mahendra Kausik): add client-side event names to docs & SocketContext notes
 37. test(P14-18,Mahendra Kausik): add basic system tests to validate events are emitted
 38. fix(P14-18,Mahendra Kausik): address timing/ordering issues found in system tests
 39. docs(P14-18,Mahendra Kausik): add notification examples for frontend
 40. chore(P14-18,Mahendra Kausik): final polish and push

Push/PR rules for Mahendra Kausik
- For P14-10 open a draft PR after commit 4 (atomic assignment) to review concurrency approach.
- For socket-related P14-11 coordinate with frontend developer working on real-time UI; push an integration branch early.

--------------------------------------------------------------------------------

Karthikeyan D — 24 commits (assigned: P14-13, P14-16, P14-10)
- Branches:
  - `feature/P14-13-Karthikeyan D`
  - `feature/P14-16-Karthikeyan D`
  - `feature/P14-10-Karthikeyan D`

- Commit allocation and messages:
P14-13 (View & Edit Profile) — 6 commits
  1. feat(P14-13,Karthikeyan D): add GET /api/users/profile and route wiring
  2. feat(P14-13,Karthikeyan D): implement updateProfile in controller with validation
  3. test(P14-13,Karthikeyan D): add integration tests for profile retrieval and updates
  4. fix(P14-13,Karthikeyan D): handle email unset vs empty string behavior
  5. docs(P14-13,Karthikeyan D): update API docs and frontend notes
  6. chore(P14-13,Karthikeyan D): final cleanups and push

P14-16 (Admin Portal Login) — 6 commits
  7. feat(P14-16,Karthikeyan D): add POST /api/auth/login-email route for admin auth
  8. feat(P14-16,Karthikeyan D): ensure sessionManager records admin sessions with role check
  9. test(P14-16,Karthikeyan D): add tests for admin login and invalid credentials
 10. docs(P14-16,Karthikeyan D): add admin login notes and token requirements
 11. fix(P14-16,Karthikeyan D): tweak error messages and rate limiting
 12. chore(P14-16,Karthikeyan D): push branch and create PR

P14-10 (Accept & Update Ride Status) — 12 commits
 13. feat(P14-10,Karthikeyan D): add POST /api/rides/:id/accept route and validation
 14. feat(P14-10,Karthikeyan D): implement MatchingService.assignRideToDriver skeleton call
 15. feat(P14-10,Karthikeyan D): implement acceptRide logic, atomic assignment (findOneAndUpdate)
 16. test(P14-10,Karthikeyan D): add unit tests for assignment conflict and success
 17. feat(P14-10,Karthikeyan D): implement PUT /api/rides/:id/status and transitions
 18. test(P14-10,Karthikeyan D): add tests for status transitions and authorization checks
 19. fix(P14-10,Karthikeyan D): add socket emits for assignment and status change
 20. fix(P14-10,Karthikeyan D): ensure driver release and race conditions handled
 21. docs(P14-10,Karthikeyan D): update API docs and matching notes
 22. chore(P14-10,Karthikeyan D): finalize integration tests and push
 23. fix(P14-10,Karthikeyan D): tune edge-case handling after cross tests
 24. docs(P14-10,Karthikeyan D): add developer notes for atomic assignment

Push/PR rules for Karthikeyan D
- For admin endpoints (P14-16, P14-17) require at least one security reviewer. Open PR when integration tests pass.
- Notification socket work should be pushed early so front-end can consume events; open draft PR after commit 21.

--------------------------------------------------------------------------------

Integration and release flow
- Developers merge feature branches into `develop` via PRs once feature is complete and tests pass.
- At the end of Sprint 1, create `release/sprint-1` from `develop`, run final integration/system tests, then merge to `main` and tag release (v0.1.0). Repeat for Sprint 2 with `release/sprint-2`.
- Hotfixes branch off `main` and are cherry-picked or merged back into `develop`.

PR template (recommended)
Title: feat(P14-xxx): short description — <your-name>
Description:
- Story: P14-xxx — summary
- Acceptance criteria: (copy from `docs/JIRA_MAPPING.md`)
- What I changed: list files and high level design
- How to test: curl examples or steps
- Checklist:
  - [ ] Tests added/updated
  - [ ] Lint passed
  - [ ] CI green
  - [ ] Reviewed by at least 1 peer

Merge rules
- Squash merge feature branches into `develop` to keep commit noise manageable (retain detailed commits in branch history if needed).
- Preserve small granular commits locally to help reviewers; use descriptive messages.

Tips and best practices
- Small, focused commits are easier to review. If you must make a large change, create incremental commits that each compile and pass tests.
- Keep commit messages actionable (why not only what) and include story IDs (P14-xxx) in the scope to make traceability easy.
- Coordinate socket and frontend tasks: push server socket API early to avoid integration blockers.
- If a developer finishes early, they can pick up tests, docs, or help others with PR reviews.