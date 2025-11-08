# Requirements Traceability Matrix (RTM)

This RTM maps key functional and non-functional requirements to code locations and tests.

Functional requirements

1. User registration & authentication
   - Code: `backend/routes/auth.js`, `backend/controllers/authController.js`, `backend/utils/sessionManager.js`, `backend/models/User.js`
   - Tests: `backend/__tests__/integration/auth-api.test.js`, `backend/__tests__/unit/utils-auth.test.js`

2. OTP generation and verification
   - Code: `backend/controllers/authController.js`, `backend/models/OTP.js`, `backend/middleware/validation.js`
   - Tests: `backend/__tests__/integration/auth-api.test.js`

3. Ride booking and lifecycle
   - Code: `backend/routes/rides.js`, `backend/controllers/rideController.js`, `backend/models/Ride.js`, `backend/services/MatchingService.js`, `backend/services/FareService.js`
   - Tests: `backend/__tests__/integration/rides-api.test.js`, `backend/__tests__/unit/services-matching.test.js`, `backend/__tests__/unit/services-fare.test.js`

4. Real-time updates (driver location, ride rooms)
   - Code: `backend/services/socketService.js`, `frontend/src/services/apiClient.ts` (socket interactions live in frontend services)
   - Tests: system tests under `backend/__tests__/system/` may cover end-to-end websockets

5. Payments and rating
   - Code: `backend/routes/payments.js`, `backend/controllers/paymentController.js`
   - Notes: Stripe removed in this edition; payment processing is mocked/simulated

6. Admin and security management
   - Code: `backend/routes/security.js`, `backend/controllers/securityController.js`, `backend/utils/securityLogger.js`, `backend/config/security.js`
   - Tests: security-related unit tests under `backend/__tests__/unit` and integration tests

Non-functional requirements

- Rate limiting and input validation
  - Code: `backend/middleware/validation.js`, `backend/config/security.js`

- High availability and scaling
  - Notes: Socket scaling requires Redis adapter; see `docs/DEPLOYMENT.md`

- Observability
  - Health endpoint: `server.js` `/health`
  - Security logging: `backend/config/security.js`, `backend/utils/securityLogger.js`

Traceability notes
- Each requirement above has related tests under `backend/__tests__/`. Use those tests as validation when changing features.
