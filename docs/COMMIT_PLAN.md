# Commit Strategy & Plan

Goal: Produce ~96 commits total (within your requested range of 80–100). Divide work across 4 contributors: `Kanishk R` (group leader), `K Hariram`, `Mahendra Kausik`, and `Karthikeyan D`.

Distribution (balanced for leader test responsibilities):
- `Kanishk R` (group leader): 18 commits
- `K Hariram`: 26 commits
- `Mahendra Kausik`: 28 commits
- `Karthikeyan D`: 24 commits

This document contains:
- overall branching model
- per-person story assignments
- per-person commit-by-commit plan (commit messages templates and what to include in each commit)
- push and PR guidance, branch names, and merge flow

Overview & rules
- Commit message convention: use Conventional Commits (type(scope): description). Examples:
  - feat(auth): add phone registration endpoint
  - fix(ride): correct distance calculation
  - test(auth): add integration tests for register endpoint
  - docs: update README

- Branching:
  - `main` — production-ready (protected)
  - `develop` — integration branch for the sprint
  - `feature/P{story}-{shortname}` — feature branches per story (shortname is contributor name)
  - `hotfix/*` — for urgent fixes
  - `release/sprint-1`, `release/sprint-2` — release branches created at end of a sprint

- Push & PR cadence:
  - Push frequently (every 3–6 commits or when a subtask completes).
  - Open a PR to `develop` when the feature branch is functionally complete and has tests.
  - For large features (>=10 commits) open an early draft PR after ~6 commits for design review.
  - PR checklist: passing CI, lint, unit tests, integration tests (if run), description with acceptance criteria, reviewer(s) assigned.

Sprint overview (for context)
- Sprint 1: P14-6, P14-7, P14-8, P14-9, P14-10, P14-11
- Sprint 2: P14-12, P14-13, P14-14, P14-15, P14-16, P14-17, P14-18

Total commits target: 96 (distributed as above). Adjust locally if you prefer 80 or 100 — keep relative distribution proportional.

Assignments (which stories each person implements)
- Kanishk R (group leader): P14-6 (User Registration), P14-8 (Book & Estimate), P14-14 (Trip History) — fewer feature commits; primary cross-feature test owner for others' work
- K Hariram: P14-7 (Login), P14-9 (Driver Online & Pending), P14-12 (Mock Payment)
- Mahendra Kausik: P14-11 (Driver Live Location), P14-15 (Rate Driver), P14-17 (Admin Manage Users), P14-18 (In-App Notifications)
- Karthikeyan D: P14-10 (Accept & Update Ride Status), P14-13 (View & Edit Profile), P14-16 (Admin Login)

Note: Each commit below is a template. Replace placeholders (e.g., <files>, <service>) with actual paths. Push every 3–6 commits and open PR when feature branch is complete or earlier for draft review.

--------------------------------------------------------------------------------

Kanishk R — 18 commits (group leader: reduced feature work + cross-feature test owner)
- Branches:
  - `feature/P14-6-Kanishk R`
  - `feature/P14-8-Kanishk R`
  - `feature/P14-14-Kanishk R`
  - `feature/tests-cross-Kanishk R` (test branch for unit/integration/system tests against others' features)

- Notes: `Kanishk R` is the group leader and will focus on quality: writing unit, integration and system tests for other people's features, CI coordination, and light feature development. This reduces reviewer bottlenecks and ensures consistent test coverage.

- Commit allocation and messages (total 18):

P14-6 (User Registration) — 6 commits
  1. feat(P14-6,Kanishk R): scaffold register-phone route and validation middleware
     - Add route to `backend/routes/auth.js`, add validation schema in `middleware/validation`.
  2. feat(P14-6,Kanishk R): implement registerPhone controller core (minimal viable logic)
     - Create handler in `backend/controllers/authController.js`.
  3. feat(P14-6,Kanishk R): implement OTP generation & persist logic (essential paths)
     - Add OTP creation and TTL behavior in `backend/models/OTP.js`.
  4. test(P14-6,Kanishk R): add unit tests for validation & OTP flow
  5. fix(P14-6,Kanishk R): handle duplicate phone existing user case (409)
  6. docs(P14-6,Kanishk R): document API contract for /api/auth/register-phone

P14-8 (Book a Ride & Estimate) — 6 commits (reduced)
  7. feat(P14-8,Kanishk R): add /api/rides/estimate route and validation
  8. feat(P14-8,Kanishk R): wire FareService.calculateFare usage into controller (core estimation)
  9. test(P14-8,Kanishk R): add unit tests for FareService usage (small coverage)
 10. feat(P14-8,Kanishk R): implement minimal /api/rides/book handler to persist ride request
 11. fix(P14-8,Kanishk R): fix critical edge cases in calculateDistance/validation
 12. docs(P14-8,Kanishk R): update API docs & add sample request/response

Cross-feature testing (Kanishk R responsibilities) — 2 commits
 13. test(P14-7,Kanishk R): add integration tests for login flows (covers K Hariram work)
 14. test(P14-10,Kanishk R): add integration tests for ride assignment conflict/success (covers Mahendra Kausik work)

P14-14 (Trip History) — 4 commits
 15. feat(P14-14,Kanishk R): add GET /api/rides/history route and basic controller
 16. feat(P14-14,Kanishk R): implement pagination, filters and populate in controller
 17. test(P14-14,Kanishk R): add integration tests for history endpoint
 18. docs(P14-14,Kanishk R): document endpoints and finalize commits

Push/PR rules for Kanishk R
- Push `feature/tests-cross-Kanishk R` frequently (after each test suite addition) and open PRs that reference the feature branches being tested.
- Open PRs for small feature slices (P14-6 core) and rely on `Kanishk R`'s cross-feature tests to validate integration.

--------------------------------------------------------------------------------

K Hariram — 26 commits (assigned: P14-7, P14-9, P14-12)
- Branches:
  - `feature/P14-7-K Hariram`
  - `feature/P14-9-K Hariram`
  - `feature/P14-12-K Hariram`

- Commit allocation and messages:

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

P14-18 was moved to `Mahendra Kausik` (see above). Karthikeyan D no longer owns P14-18 and has its totals reduced accordingly.

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

If you want a CSV export of these planned issues (with columns: Summary, Issue Type, Epic Link, Story Points, Sprint, Assignee, Description), I can create it next so you can bulk-import into Jira.
# Commit Strategy & Plan

Goal: Produce ~96 commits total (within your requested range of 80–100). Divide work across 4 contributors: `Kanishk R`, `K Hariram`, `Mahendra Kausik`, and `nam4`. Each contributor will make 24 commits.

This document contains:
- overall branching model
- per-person story assignments
- per-person commit-by-commit plan (commit messages templates and what to include in each commit)
- push and PR guidance, branch names, and merge flow

Overview & rules
- Commit message convention: use Conventional Commits (type(scope): description). Examples:
  - feat(auth): add phone registration endpoint
  - fix(ride): correct distance calculation
  - test(auth): add integration tests for register endpoint
  - docs: update README

- Branching:
  - `main` — production-ready (protected)
  - `develop` — integration branch for the sprint
  - `feature/P{story}-{shortname}` — feature branches per story (shortname is contributor name)
  - `hotfix/*` — for urgent fixes
  - `release/sprint-1`, `release/sprint-2` — release branches created at end of a sprint

- Push & PR cadence:
  - Push frequently (every 3–6 commits or when a subtask completes).
  - Open a PR to `develop` when the feature branch is functionally complete and has tests.
  - For large features (>=10 commits) open an early draft PR after ~6 commits for design review.
  - PR checklist: passing CI, lint, unit tests, integration tests (if run), description with acceptance criteria, reviewer(s) assigned.

Sprint overview (for context)
- Sprint 1: P14-6, P14-7, P14-8, P14-9, P14-10, P14-11
- Sprint 2: P14-12, P14-13, P14-14, P14-15, P14-16, P14-17, P14-18

Total commits target: 96 (24 per person). Adjust locally if you prefer 80 or 100 — keep relative distribution proportional.

Assignments (which stories each person implements)
- Kanishk R: P14-6 (User Registration), P14-8 (Book & Estimate), P14-14 (Trip History)
- K Hariram: P14-7 (Login), P14-9 (Driver Online & Pending), P14-12 (Mock Payment)
- Mahendra Kausik: P14-10 (Accept & Update Ride Status), P14-11 (Driver Live Location), P14-15 (Rate Driver)
- Karthikeyan D: P14-13 (View & Edit Profile), P14-16 (Admin Login), P14-17 (Admin Manage Users), P14-18 (In-App Notifications)

Per-person commit plan (24 commits each)
Note: Each commit below is a template. Replace placeholders (e.g., <files>, <service>) with actual paths. Push every 3–6 commits and open PR when feature branch is complete or earlier for draft review.

--------------------------------------------------------------------------------

Kanishk R — 24 commits (assigned: P14-6, P14-8, P14-14)
- Branches:
  - `feature/P14-6-Kanishk R`
  - `feature/P14-8-Kanishk R`
  - `feature/P14-14-Kanishk R`

- Commit allocation and messages:

P14-6 (User Registration) — 8 commits
  1. feat(P14-6,Kanishk R): scaffold register-phone route and validation middleware
     - Add route to `backend/routes/auth.js`, add validation schema in `middleware/validation`.
  2. feat(P14-6,Kanishk R): implement registerPhone controller skeleton
     - Create handler in `backend/controllers/authController.js` (registerPhone stub).
  3. feat(P14-6,Kanishk R): implement OTP generation & persist logic
     - Add `OTP.createOTP()` call and OTP model interactions (`backend/models/OTP.js`).
  4. feat(P14-6,Kanishk R): simulate SMS sending for dev environment
     - Console logging for OTP, update response shape to include tempUserData on dev.
  5. test(P14-6,Kanishk R): add unit tests for validation & OTP flow
     - Tests under `backend/__tests__/unit` and integration skeleton.
  6. fix(P14-6,Kanishk R): handle duplicate phone existing user case (409)
     - Add existing user check and error handling.
  7. docs(P14-6,Kanishk R): document API contract for /api/auth/register-phone
     - Update `docs/API_DOCUMENTATION.md` if needed.
  8. chore(P14-6,Kanishk R): final polish, lint fixes and push
     - Minor refactors, ensure tests pass locally.

P14-8 (Book a Ride & Estimate) — 12 commits
  9. feat(P14-8,Kanishk R): add /api/rides/estimate route and validation
 10. feat(P14-8,Kanishk R): wire FareService.calculateFare usage into controller
 11. test(P14-8,Kanishk R): add unit tests for FareService usage
 12. feat(P14-8,Kanishk R): implement /api/rides/book handler skeleton
 13. feat(P14-8,Kanishk R): create ride model save and estimate persistence
 14. feat(P14-8,Kanishk R): add checks for active rides and invalid coordinates
 15. test(P14-8,Kanishk R): integration tests hitting estimate and book endpoints
 16. fix(P14-8,Kanishk R): fix edge cases in calculateDistance and validation
 17. feat(P14-8,Kanishk R): add socket event trigger placeholder for matching (no assignment)
 18. docs(P14-8,Kanishk R): update API docs & add sample request/response
 19. chore(P14-8,Kanishk R): address review comments and minor refactors
 20. ci(P14-8,Kanishk R): add or update test scripts and run locally

P14-14 (Trip History) — 4 commits
 21. feat(P14-14,Kanishk R): add GET /api/rides/history route and basic controller
 22. feat(P14-14,Kanishk R): implement pagination, filters and populate in controller
 23. test(P14-14,Kanishk R): add integration tests for history endpoint
 24. docs(P14-14,Kanishk R): document endpoints and finalize commits

Push/PR rules for Kanishk R
- Push `feature/P14-6-Kanishk R` after commit 3 or 4 for early integration; push again after commit 8 and open PR to `develop` (title: feat(P14-6): User Registration — Kanishk R).
- For P14-8 (bigger feature) push as draft PR after commit 12 for design review; final PR to `develop` after commit 20.
- For small P14-14, push once complete and include tests in PR.

--------------------------------------------------------------------------------

K Hariram — 24 commits (assigned: P14-7, P14-9, P14-12)
- Branches:
  - `feature/P14-7-K Hariram`
  - `feature/P14-9-K Hariram`
  - `feature/P14-12-K Hariram`

- Commit allocation and messages:

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

P14-12 (Mock Payment) — 8 commits
 16. feat(P14-12,K Hariram): add POST /api/payments/process route
 17. feat(P14-12,K Hariram): implement processPayment mock logic in controller
 18. feat(P14-12,K Hariram): persist payment record with receipt metadata
 19. test(P14-12,K Hariram): add integration tests for payment processing and receipt retrieval
 20. feat(P14-12,K Hariram): add GET /api/payments/receipt/:rideId
 21. fix(P14-12,K Hariram): handle edge cases and errors
 22. docs(P14-12,K Hariram): document payment API and receipts
 23. chore(P14-12,K Hariram): final touches, add sample responses
 24. ci(P14-12,K Hariram): run tests locally and push

Push/PR rules for K Hariram
- Push `feature/P14-7-K Hariram` early (after 3 commits) for security review; final PR after tests pass.
- For `feature/P14-9-K Hariram`, open a draft PR after implementing socket integration (commit 9) to align frontend work.
- `feature/P14-12-K Hariram` should be merged after payment tests and receipt endpoint are verified.

--------------------------------------------------------------------------------

Mahendra Kausik — 24 commits (assigned: P14-10, P14-11, P14-15)
- Branches:
  - `feature/P14-10-Mahendra Kausik`
  - `feature/P14-11-Mahendra Kausik`
  - `feature/P14-15-Mahendra Kausik`

- Commit allocation and messages:

P14-10 (Accept & Update Ride Status) — 10 commits
  1. feat(P14-10,Mahendra Kausik): add POST /api/rides/:id/accept route and validation
  2. feat(P14-10,Mahendra Kausik): implement MatchingService.assignRideToDriver skeleton call
  3. feat(P14-10,Mahendra Kausik): implement acceptRide logic, atomic assignment (findOneAndUpdate)
  4. test(P14-10,Mahendra Kausik): add unit tests for assignment conflict and success
  5. feat(P14-10,Mahendra Kausik): implement PUT /api/rides/:id/status and transitions
  6. test(P14-10,Mahendra Kausik): add tests for status transitions and authorization checks
  7. fix(P14-10,Mahendra Kausik): add socket emits for assignment and status change
  8. fix(P14-10,Mahendra Kausik): ensure driver release and race conditions handled
  9. docs(P14-10,Mahendra Kausik): update API docs and matching notes
 10. chore(P14-10,Mahendra Kausik): finalize integration tests and push

P14-11 (Driver Live Location) — 8 commits
 11. feat(P14-11,Mahendra Kausik): add socket auth and driver:location-update handler in `socketService.js`
 12. feat(P14-11,Mahendra Kausik): update User driverInfo.currentLocation updates from socket
 13. test(P14-11,Mahendra Kausik): add tests for socket auth and location update persistence
 14. feat(P14-11,Mahendra Kausik): broadcast `driver:location-updated` to ride room and admins
 15. fix(P14-11,Mahendra Kausik): ensure permissions and error handling are robust
 16. docs(P14-11,Mahendra Kausik): update API docs and socket event list
 17. chore(P14-11,Mahendra Kausik): minor UI integration notes for frontend
 18. ci(P14-11,Mahendra Kausik): run system tests locally and push

P14-15 (Rate Driver) — 6 commits
 19. feat(P14-15,Mahendra Kausik): add POST /api/payments/rate route and validation
 20. feat(P14-15,Mahendra Kausik): implement submitRating to persist ratings on Ride or User
 21. test(P14-15,Mahendra Kausik): add tests ensuring only completed rides can be rated
 22. fix(P14-15,Mahendra Kausik): add rating aggregation/update on driver profile
 23. docs(P14-15,Mahendra Kausik): update API docs
 24. chore(P14-15,Mahendra Kausik): finalize and push

Push/PR rules for Mahendra Kausik
- For P14-10 open a draft PR after commit 4 (atomic assignment) to review concurrency approach.
- For socket-related P14-11 coordinate with frontend developer working on real-time UI; push an integration branch early.

--------------------------------------------------------------------------------

nam4 — 24 commits (assigned: P14-13, P14-16, P14-17, P14-18)
- Branches:
  - `feature/P14-13-nam4`
  - `feature/P14-16-nam4`
  - `feature/P14-17-nam4`
  - `feature/P14-18-nam4`

- Commit allocation and messages:

P14-13 (View & Edit Profile) — 6 commits
  1. feat(P14-13,nam4): add GET /api/users/profile and route wiring
  2. feat(P14-13,nam4): implement updateProfile in controller with validation
  3. test(P14-13,nam4): add integration tests for profile retrieval and updates
  4. fix(P14-13,nam4): handle email unset vs empty string behavior
  5. docs(P14-13,nam4): update API docs and frontend notes
  6. chore(P14-13,nam4): final cleanups and push

P14-16 (Admin Portal Login) — 6 commits
  7. feat(P14-16,nam4): add POST /api/auth/login-email route for admin auth
  8. feat(P14-16,nam4): ensure sessionManager records admin sessions with role check
  9. test(P14-16,nam4): add tests for admin login and invalid credentials
 10. docs(P14-16,nam4): add admin login notes and token requirements
 11. fix(P14-16,nam4): tweak error messages and rate limiting
 12. chore(P14-16,nam4): push branch and create PR

P14-17 (Admin Manage Users) — 8 commits
 13. feat(P14-17,nam4): implement GET /api/users/admin/users with pagination/filter
 14. feat(P14-17,nam4): implement GET /api/users/admin/users/:userId
 15. feat(P14-17,nam4): implement suspendUser and reactivateUser endpoints
 16. test(P14-17,nam4): add integration tests for admin endpoints and permission checks
 17. docs(P14-17,nam4): update admin docs and link security event logging
 18. fix(P14-17,nam4): prevent admin self-suspension, handle edge cases
 19. chore(P14-17,nam4): add audit logging calls and minor refactors
 20. ci(P14-17,nam4): run tests locally and push

P14-18 (In-App Notifications) — 4 commits
 21. feat(P14-18,nam4): define notification events and server emission points (ride assigned/status changes)
 22. feat(P14-18,nam4): add client-side event names to docs & SocketContext notes
 23. test(P14-18,nam4): add basic system tests to validate events are emitted
 24. chore(P14-18,nam4): final polish and push

Push/PR rules for nam4
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

If you want a CSV export of these planned issues (with columns: Summary, Issue Type, Epic Link, Story Points, Sprint, Assignee, Description), I can create it next so you can bulk-import into Jira.
