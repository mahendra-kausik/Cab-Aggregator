# API Documentation

Base URL (development):
- HTTP: http://localhost:5000/api
- Health: http://localhost:5000/health

Authentication
- The API uses JWT bearer tokens for protected routes. Tokens are created during login/OTP verification and returned as `accessToken` and `refreshToken` in responses.
- Include header: Authorization: Bearer <accessToken>

Primary REST endpoints

1) Authentication
- POST /api/auth/register-phone
  - Description: Register phone and send OTP
  - Body (JSON): { phone: string, profile: { name: string, avatar?: string }, role?: 'rider'|'driver', driverInfo?: {...} }
  - Response: 200 OTP info and temp data in dev

- POST /api/auth/verify-otp
  - Description: Verify OTP and create account
  - Body: { phone, otp, password, tempUserData? }
  - Response: 201 user + tokens

- POST /api/auth/login-phone
  - Description: Login with phone + password
  - Body: { phone, password }

- POST /api/auth/login-email
  - Description: Admin login via email
  - Body: { email, password }

- POST /api/auth/forgot-password
  - Description: Trigger password reset for admin users (email simulated)

- GET /api/auth/dev/otp/:phone (development only)
  - Description: Retrieve OTP for a phone in development

- GET /api/auth/verify
  - Description: Verify access token; requires Authorization header

2) Rides
- POST /api/rides/estimate
  - Description: Fare estimation
  - Body: { pickup: { coordinates: [lng, lat] }, destination: { coordinates: [lng, lat] } }
  - Response: estimated fare breakdown

- POST /api/rides/book
  - Description: Create a ride (rider only)
  - Auth: required
  - Body: { pickup, destination, specialInstructions? }

- GET /api/rides/history
  - Description: Ride history, supports filters and pagination
  - Auth: required

- GET /api/rides/driver/pending, /driver/active, /drivers/available
  - Description: Driver-specific endpoints

- GET /api/rides/:id, POST /api/rides/:id/accept, POST /api/rides/:id/find-driver, PUT /api/rides/:id/status, PUT /api/rides/:id/complete
  - Description: Ride lifecycle operations (role-based access)

3) Users
- GET /api/users/profile — get current user profile (auth)
- PUT /api/users/profile — update profile
- PUT /api/users/password — change password
- PUT /api/users/driver/location — update driver location (driver only)
- Admin endpoints under /api/users/admin/* for user listing, suspend/reactivate, stats

4) Payments
- POST /api/payments/process — process payment (auth required)
- POST /api/payments/rate — submit rating
- GET /api/payments/history — get user payment history

5) Security / Admin
- GET /api/security/events — list security events (admin)
- GET /api/security/stats — security stats (admin)
- GET /api/security/dashboard — security dashboard (admin)
- POST /api/security/sessions/:sessionId/invalidate — invalidate a session (admin)

6) Health and misc
- GET /health — health check with DB status and external services
- GET /api/test-models — models integration test

Error format
- On errors the API responds with:
  {
    success: false,
    error: { code: string, message: string, timestamp: ISOString, details?: any }
  }

Rate limiting
- Authentication and OTP endpoints have stricter rate limits (see `backend/config/security.js`). Generic API rate limiter is applied to `/api`.

Real-time / WebSocket (Socket.IO)
- Namespace: default Socket.IO server at same origin as backend.
- Auth: clients must supply a JWT as `auth.token` during handshake or via `Authorization` header.

Common socket events
- connection:confirmed — server confirms connection
- ride:join-room { rideId } — join a ride room
- driver:location-update { rideId, location } — drivers send location updates
- ride:status-update { rideId, status, location? } — participants update ride status
- ride:status-updated (broadcast) — server notifies participants of status changes
- driver:availability-updated — confirmation to driver

Client notes
- Frontend API client base URL is read from `import.meta.env.VITE_API_BASE_URL` or defaults to `http://localhost:5000/api`.

Examples
- `curl -X GET http://localhost:5000/health`
