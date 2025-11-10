# File-per-commit, branch-grouped plan (80 commits total)

Overview
This plan maps exactly one file per commit, grouped by feature branch (story). The total number of commits is 80 (kept >60 as requested). For each commit you get:
- a suggested commit message,
- the file to add or replace as the single-file change,
- guidance for when to push and when to open/update a PR for the branch.

Conventions
- Commit message format: type(P14-xxx): short description (e.g. feat(P14-6): add register-phone route)
- One whole file per git commit. If the file doesn't exist, create it; otherwise replace the file.
- Branch naming: feature/P14-xxx-<owner-short> (e.g. feature/P14-6-kanishk)
- Push policy: push branch after the first 2–3 commits to create a draft PR, then push after each subsequent commit. Open final PR when branch's commits are complete and CI is green.

PowerShell example workflow
```powershell
# create branch
git checkout -b feature/P14-6-kanishk

# for each file (one commit per file):
git add <file>
git commit -m "feat(P14-6): add register-phone route"

# push early after 2-3 commits
git push -u origin feature/P14-6-kanishk

# later commits: commit locally, then push (appends to draft PR)
git add <file>
git commit -m "test(P14-6): add auth-register unit tests"
git push

# when branch complete and CI green: open PR to develop and request review
```

Plan (branch grouped)

Infra & repo setup — commits 1–4 (Kanishk R)
1 — chore(repo): add README — README.md
2 — chore(repo): add .gitignore — .gitignore
3 — infra: add docker-compose — docker-compose.yml
4 — infra: add basic CI workflow — .github/workflows/ci.yml

P14-6 (User Registration) — branch feature/P14-6-kanishk — commits 5–12 (8 commits)
5 — feat(P14-6): add backend/package.json — backend/package.json
6 — feat(P14-6): add server bootstrap — backend/server.js
7 — feat(P14-6): add auth route wiring — backend/routes/auth.js
8 — feat(P14-6): add authController.registerPhone — backend/controllers/authController.js
9 — feat(P14-6): add OTP model — backend/models/OTP.js
10 — test(P14-6): add auth-register unit tests — backend/__tests__/unit/auth-register.test.js
11 — feat(P14-6): add smsMock util — backend/utils/smsMock.js
12 — docs(P14-6): add authentication docs snippet — docs/authentication.md

Push/PR guidance: push after commit 7 (create draft PR). Continue pushing; mark PR ready when commit 12 is complete and CI passes.

P14-8 (Book & Estimate) — branch feature/P14-8-karthik — commits 13–22 (10 commits)
13 — feat(P14-8): add rides routes — backend/routes/rides.js
14 — feat(P14-8): add FareService — backend/services/FareService.js
15 — feat(P14-8): add rideController.estimate/book skeleton — backend/controllers/rideController.js
16 — feat(P14-8): add Ride model — backend/models/Ride.js
17 — test(P14-8): add fare-service unit tests — backend/__tests__/unit/fare-service.test.js
18 — test(P14-8): add rides-estimate integration test — backend/__tests__/integration/rides-estimate.test.js
19 — feat(P14-8): add socketService emit placeholder — backend/services/socketService.js
20 — docs(P14-8): add rides API doc — docs/API_RIDES.md
21 — fix(P14-8): add validation for coords — backend/middleware/validation.js
22 — ci(P14-8): update backend/package.json scripts — backend/package.json

Push/PR guidance: push after commit 15; open draft PR and iterate until commit 22. Final PR when CI is green.

P14-14 (Trip History) — branch feature/P14-14-kanishk — commits 23–26 (4 commits)
23 — feat(P14-14): add history route — backend/routes/rides.js
24 — feat(P14-14): add history controller (pagination) — backend/controllers/rideController.js
25 — test(P14-14): add rides-history integration tests — backend/__tests__/integration/rides-history.test.js
26 — docs(P14-14): update API docs — docs/API_RIDES.md

Push/PR guidance: push after commit 24; final PR after commit 26.

P14-7 (User Login) — branch feature/P14-7-hariram — commits 27–32 (6 commits)
27 — feat(P14-7): add login-phone route — backend/routes/auth.js
28 — feat(P14-7): add loginPhone controller — backend/controllers/authController.js
29 — feat(P14-7): add sessionManager util — backend/utils/sessionManager.js
30 — test(P14-7): add auth-login integration tests — backend/__tests__/integration/auth-login.test.js
31 — fix(P14-7): add suspended account handling — backend/controllers/authController.js
32 — docs(P14-7): document token format — docs/API_AUTH.md

Push/PR guidance: push after commit 29; open draft PR and finish by commit 32.

P14-9 (Driver Online & Pending) — branch feature/P14-9-hariram — commits 33–40 (8 commits)
33 — feat(P14-9): add driver availability route — backend/routes/users.js
34 — feat(P14-9): add updateAvailability controller — backend/controllers/userController.js
35 — feat(P14-9): add socketHandlers availability event — backend/services/socketHandlers.js
36 — test(P14-9): add user-availability unit tests — backend/__tests__/unit/user-availability.test.js
37 — feat(P14-9): add driver pending rides controller — backend/controllers/rideController.js
38 — test(P14-9): add driver-pending integration tests — backend/__tests__/integration/driver-pending.test.js
39 — fix(P14-9): tune validation — backend/middleware/validation.js
40 — docs(P14-9): add driver docs — docs/API_DRIVERS.md

Push/PR guidance: push after commit 35; create draft PR; finalize when commit 40 is complete.

P14-12 (Mock Payment) — branch feature/P14-12-hariram — commits 41–46 (6 commits)
41 — feat(P14-12): add payments routes — backend/routes/payments.js
42 — feat(P14-12): add paymentController.processPayment — backend/controllers/paymentController.js
43 — feat(P14-12): add Payment model — backend/models/Payment.js
44 — test(P14-12): add payments integration tests — backend/__tests__/integration/payments.test.js
45 — feat(P14-12): add receipt endpoint — backend/controllers/paymentController.js
46 — docs(P14-12): add payments docs — docs/API_PAYMENTS.md

Push/PR guidance: push after commit 43; finalize after 46.

P14-11 (Driver Live Location) — branch feature/P14-11-kausik — commits 47–52 (6 commits)
47 — feat(P14-11): add socketService auth & handlers — backend/services/socketService.js
48 — feat(P14-11): add currentLocation persistence — backend/models/User.js
49 — test(P14-11): add socket-location system test — backend/__tests__/system/socket-location.test.js
50 — feat(P14-11): broadcast location updates — backend/services/socketHandlers.js
51 — fix(P14-11): tighten socket permissions — backend/services/socketHandlers.js
52 — docs(P14-11): add socket docs — docs/API_SOCKETS.md

Push/PR guidance: push after commit 48; finalize after 52.

P14-15 (Rate Driver) — branch feature/P14-15-kausik — commits 53–57 (5 commits)
53 — feat(P14-15): add rate route — backend/routes/payments.js
54 — feat(P14-15): implement rate controller — backend/controllers/paymentController.js
55 — test(P14-15): add rating integration tests — backend/__tests__/integration/rating.test.js
56 — fix(P14-15): add rating aggregation to User model — backend/models/User.js
57 — docs(P14-15): add rating docs — docs/API_PAYMENTS.md

Push/PR guidance: push after commit 54; finalize after 57.

P14-17 (Admin Manage Users) — branch feature/P14-17-kausik — commits 58–65 (8 commits)
58 — feat(P14-17): add admin users route — backend/routes/users.js
59 — feat(P14-17): add adminController.listUsers — backend/controllers/adminController.js
60 — feat(P14-17): add adminController.getUser — backend/controllers/adminController.js
61 — feat(P14-17): add suspend/reactivate endpoints — backend/controllers/adminController.js
62 — test(P14-17): add admin integration tests — backend/__tests__/integration/admin-users.test.js
63 — fix(P14-17): prevent admin self-suspension — backend/controllers/adminController.js
64 — chore(P14-17): add securityLogger util — backend/utils/securityLogger.js
65 — docs(P14-17): update ADMIN guide — docs/ADMIN_GUIDE.md

Push/PR guidance: push after commit 60; finalize after 65.

P14-18 (In-App Notifications) — branch feature/P14-18-kausik — commits 66–70 (5 commits)
66 — feat(P14-18): add notification service — backend/services/notificationService.js
67 — feat(P14-18): add client event names in SocketContext — frontend/src/contexts/SocketContext.tsx
68 — test(P14-18): add notifications system test — backend/__tests__/system/notifications.test.js
69 — fix(P14-18): timing/ordering fixes — backend/services/notificationService.js
70 — docs(P14-18): add notifications examples — docs/QUICKSTART.md

Push/PR guidance: push after commit 67; finalize after 70.

P14-10 (Accept & Update Ride Status) — branch feature/P14-10-karthik — commits 71–80 (10 commits)
71 — feat(P14-10): add accept route — backend/routes/rides.js
72 — feat(P14-10): add MatchingService skeleton — backend/services/MatchingService.js
73 — feat(P14-10): implement acceptRide atomic assignment — backend/controllers/rideController.js
74 — test(P14-10): add ride-accept unit tests — backend/__tests__/unit/ride-accept.test.js
75 — feat(P14-10): add status transitions endpoint — backend/controllers/rideController.js
76 — test(P14-10): add ride-status integration tests — backend/__tests__/integration/ride-status.test.js
77 — fix(P14-10): add socket emits for assignment/status — backend/services/socketService.js
78 — fix(P14-10): add driver release/race condition handling — backend/controllers/rideController.js
79 — docs(P14-10): add matching/assignment notes — docs/DEVELOPER_NOTES.md
80 — chore(P14-10): finalize integration flow tests — backend/__tests__/integration/ride-accept-flow.test.js

Push/PR guidance: push after commit 73 (early atomic assignment) to create a draft PR for frontend alignment, finalize after commit 80.

General rules and recommendations
- Use the commit message exactly as suggested for traceability (include P14 story id).
- Push branches early and often. Draft PRs are useful to keep frontend and reviewers in sync; update the PR by pushing new commits.
- Final PR: wait for CI to be green and at least one reviewer approval before merging. Use squash-merge if the team prefers a single commit in develop, or merge normally if you want to keep the per-file commit history.
- If you want me to implement a branch's commits automatically (scaffold files, commit, push), tell me which story to start and I will create the branch and commits.
