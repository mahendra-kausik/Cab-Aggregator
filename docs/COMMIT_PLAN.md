# Commit Strategy & File-to-Story Mapping

## Overview
This document provides a complete mapping of all source files to their corresponding user stories (P14-x), along with individual commit messages and pull request descriptions for each story.

## Table of Contents
1. [Story-to-File Mapping](#story-to-file-mapping)
2. [Pull Request Descriptions](#pull-request-descriptions)
3. [Commit Guidelines](#commit-guidelines)

---

## Story-to-File Mapping

### Epic P14-1: User Authentication & Profiles

#### P14-6: User Registration (Rider & Driver)
**Sprint:** 1 | **Points:** 5

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/routes/auth.js` | `feat(P14-6): add phone registration route with OTP flow` |
| `backend/controllers/authController.js` | `feat(P14-6): implement registerPhone and verifyOTP controllers` |
| `backend/models/OTP.js` | `feat(P14-6): create OTP model with TTL and validation` |
| `backend/models/User.js` | `feat(P14-6): add User model with role-based fields for riders and drivers` |
| `backend/middleware/validation.js` | `feat(P14-6): add registration validation schemas (phone, profile, driverInfo)` |
| `backend/utils/auth.js` | `feat(P14-6): add phone format validation and OTP generation utilities` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/pages/auth/RegisterPage.tsx` | `feat(P14-6): create registration page with OTP verification flow` |
| `frontend/src/pages/auth/AuthPages.css` | `feat(P14-6): add styling for authentication pages` |
| `frontend/src/services/authService.ts` | `feat(P14-6): implement register and verifyOTP service methods` |
| `frontend/src/contexts/AuthContext.tsx` | `feat(P14-6): create auth context with registration state management` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/integration/auth-api.test.js` | `test(P14-6): add integration tests for registration and OTP verification` |
| `frontend/src/__tests__/integration/auth-flow.test.tsx` | `test(P14-6): add frontend integration tests for registration flow` |

---

#### P14-7: User Login
**Sprint:** 1 | **Points:** 3

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/routes/auth.js` | `feat(P14-7): add login-phone and login-email routes` |
| `backend/controllers/authController.js` | `feat(P14-7): implement loginPhone and loginEmail with JWT token generation` |
| `backend/utils/sessionManager.js` | `feat(P14-7): create session manager for token generation and validation` |
| `backend/middleware/auth.js` | `feat(P14-7): add JWT authentication middleware (requireAuth, requireRole)` |
| `backend/utils/encryption.js` | `feat(P14-7): add password hashing and comparison utilities` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/pages/auth/LoginPage.tsx` | `feat(P14-7): create login page with phone and email options` |
| `frontend/src/services/authService.ts` | `feat(P14-7): implement login service method with dual authentication` |
| `frontend/src/contexts/AuthContext.tsx` | `feat(P14-7): add login and logout handlers to auth context` |
| `frontend/src/components/auth/ProtectedRoute.tsx` | `feat(P14-7): create protected route component with role-based access` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/integration/auth-api.test.js` | `test(P14-7): add login flow tests (phone, email, suspended accounts)` |
| `backend/__tests__/unit/middleware-auth.test.js` | `test(P14-7): add unit tests for auth middleware` |
| `backend/__tests__/unit/utils-auth.test.js` | `test(P14-7): add unit tests for auth utilities` |

---

#### P14-13: User: View & Edit Profile
**Sprint:** 2 | **Points:** 3

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/routes/users.js` | `feat(P14-13): add profile GET/PUT routes and stats endpoint` |
| `backend/controllers/userController.js` | `feat(P14-13): implement getProfile, updateProfile, and getUserStats controllers` |
| `backend/middleware/validation.js` | `feat(P14-13): add profile update validation schema` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/pages/rider/RiderProfile.tsx` | `feat(P14-13): create rider profile page with edit and password change` |
| `frontend/src/pages/rider/RiderProfile.css` | `feat(P14-13): add styling for rider profile page` |
| `frontend/src/pages/driver/DriverProfile.tsx` | `feat(P14-13): create driver profile page with vehicle info` |
| `frontend/src/pages/driver/DriverProfile.css` | `feat(P14-13): add styling for driver profile page` |
| `frontend/src/services/userService.ts` | `feat(P14-13): implement profile and stats service methods` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/integration/auth-api.test.js` | `test(P14-13): add profile CRUD tests` |

---

### Epic P14-2: Core Rider Experience

#### P14-8: Rider: Book a Ride & Get Fare Estimate
**Sprint:** 1 | **Points:** 8

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/routes/rides.js` | `feat(P14-8): add estimate and book ride routes` |
| `backend/controllers/rideController.js` | `feat(P14-8): implement getFareEstimate and bookRide controllers` |
| `backend/services/FareService.js` | `feat(P14-8): create fare calculation service with distance-based pricing` |
| `backend/services/MatchingService.js` | `feat(P14-8): create matching service skeleton for driver assignment` |
| `backend/models/Ride.js` | `feat(P14-8): create Ride model with status workflow and fare fields` |
| `backend/middleware/validation.js` | `feat(P14-8): add coordinate validation and ride booking schemas` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/pages/rider/RiderBookPage.tsx` | `feat(P14-8): create ride booking page with fare estimate and map` |
| `frontend/src/pages/rider/RiderBookPage.css` | `feat(P14-8): add styling for booking page` |
| `frontend/src/services/rideService.ts` | `feat(P14-8): implement estimate and book ride service methods` |
| `frontend/src/services/geocodingService.ts` | `feat(P14-8): add geocoding service for address lookup` |
| `frontend/src/components/common/MapComponent.tsx` | `feat(P14-8): create map component with pickup/destination markers` |
| `frontend/src/components/common/MapComponent.css` | `feat(P14-8): add styling for map component` |
| `frontend/src/hooks/useGeolocation.ts` | `feat(P14-8): add geolocation hook for user location tracking` |
| `frontend/src/utils/formatters.ts` | `feat(P14-8): add currency and distance formatting utilities` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/integration/rides-api.test.js` | `test(P14-8): add integration tests for estimate and booking flows` |
| `backend/__tests__/unit/services-fare.test.js` | `test(P14-8): add unit tests for fare calculation logic` |

---

#### P14-11: Rider: See Driver's Live Location
**Sprint:** 1 | **Points:** 5

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/services/socketService.js` | `feat(P14-11): implement Socket.IO service with driver location broadcasting` |
| `backend/services/socketHandlers.js` | `feat(P14-11): add socket handlers for location updates and room management` |
| `backend/server.js` | `feat(P14-11): integrate Socket.IO server with Express` |
| `backend/models/User.js` | `feat(P14-11): add currentLocation field to driver schema` |
| `backend/routes/users.js` | `feat(P14-11): add driver location update endpoint` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/contexts/SocketContext.tsx` | `feat(P14-11): create socket context with event listeners` |
| `frontend/src/components/common/MapComponent.tsx` | `feat(P14-11): add driver marker with live location updates` |
| `frontend/src/services/rideService.ts` | `feat(P14-11): integrate socket events for ride tracking` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/system/complete-workflows.test.js` | `test(P14-11): add system tests for socket location broadcasting` |

---

#### P14-14: User: View Trip History
**Sprint:** 2 | **Points:** 3

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/routes/rides.js` | `feat(P14-14): add ride history endpoint with pagination and filters` |
| `backend/controllers/rideController.js` | `feat(P14-14): implement getRideHistory with query filtering` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/pages/rider/RiderMyRides.tsx` | `feat(P14-14): create ride history page with status filters` |
| `frontend/src/pages/rider/RiderMyRides.css` | `feat(P14-14): add styling for ride history page` |
| `frontend/src/pages/driver/DriverMyRides.tsx` | `feat(P14-14): create driver ride history page` |
| `frontend/src/pages/driver/DriverMyRides.css` | `feat(P14-14): add styling for driver ride history` |
| `frontend/src/services/rideService.ts` | `feat(P14-14): add getRideHistory service method` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/integration/rides-api.test.js` | `test(P14-14): add tests for ride history pagination and filtering` |

---

#### P14-15: Rider: Rate Driver After Trip
**Sprint:** 2 | **Points:** 2

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/routes/payments.js` | `feat(P14-15): add rating submission endpoint` |
| `backend/controllers/paymentController.js` | `feat(P14-15): implement submitRating with ride validation` |
| `backend/models/User.js` | `feat(P14-15): add rating aggregation to driver profile` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/pages/rider/RideCompletion.tsx` | `feat(P14-15): create ride completion page with rating form` |
| `frontend/src/components/common/RatingForm.tsx` | `feat(P14-15): create reusable rating component` |
| `frontend/src/services/paymentService.ts` | `feat(P14-15): implement submitRating service method` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/integration/rides-api.test.js` | `test(P14-15): add rating submission tests with edge cases` |

---

#### P14-18: User: Receive In-App Notifications
**Sprint:** 2 | **Points:** 3

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/services/socketService.js` | `feat(P14-18): add notification event broadcasting (ride status, driver assigned)` |
| `backend/controllers/rideController.js` | `feat(P14-18): integrate socket notifications in ride status updates` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/contexts/SocketContext.tsx` | `feat(P14-18): add notification event handlers` |
| `frontend/src/hooks/useErrorHandler.ts` | `feat(P14-18): create error handler hook with toast notifications` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/system/complete-workflows.test.js` | `test(P14-18): add notification delivery tests` |

---

### Epic P14-3: Core Driver Experience

#### P14-9: Driver: Go Online & View Ride Requests
**Sprint:** 1 | **Points:** 5

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/routes/users.js` | `feat(P14-9): add driver availability toggle endpoint` |
| `backend/controllers/userController.js` | `feat(P14-9): implement updateAvailability controller` |
| `backend/services/socketHandlers.js` | `feat(P14-9): add availability update socket events` |
| `backend/routes/rides.js` | `feat(P14-9): add pending rides endpoint for drivers` |
| `backend/controllers/rideController.js` | `feat(P14-9): implement getPendingRides with geo-filtering` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/pages/driver/DriverDashboardPage.tsx` | `feat(P14-9): create driver dashboard with availability toggle` |
| `frontend/src/pages/driver/DriverDashboard.css` | `feat(P14-9): add styling for driver dashboard` |
| `frontend/src/pages/driver/components/PendingRidesSection.tsx` | `feat(P14-9): create pending rides list component` |
| `frontend/src/services/driverService.ts` | `feat(P14-9): implement driver-specific service methods` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/integration/rides-api.test.js` | `test(P14-9): add tests for driver availability and pending rides` |

---

#### P14-10: Driver: Accept & Update Ride Status
**Sprint:** 1 | **Points:** 5

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/routes/rides.js` | `feat(P14-10): add accept ride and status update routes` |
| `backend/controllers/rideController.js` | `feat(P14-10): implement acceptRide with atomic driver assignment` |
| `backend/services/MatchingService.js` | `feat(P14-10): implement assignRideToDriver with race condition handling` |
| `backend/services/socketService.js` | `feat(P14-10): emit ride assignment and status change events` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/pages/driver/components/ActiveRideSection.tsx` | `feat(P14-10): create active ride component with status controls` |
| `frontend/src/services/rideService.ts` | `feat(P14-10): add acceptRide and updateRideStatus service methods` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/unit/services-matching.test.js` | `test(P14-10): add unit tests for driver assignment logic` |
| `backend/__tests__/integration/rides-api.test.js` | `test(P14-10): add integration tests for ride acceptance and status updates` |

---

### Epic P14-4: Payment & Trip History

#### P14-12: Rider: Handle Mock Payment on Trip End
**Sprint:** 2 | **Points:** 3

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/routes/payments.js` | `feat(P14-12): add payment processing and receipt routes` |
| `backend/controllers/paymentController.js` | `feat(P14-12): implement processPayment and getReceipt with mock gateway` |
| `backend/models/Ride.js` | `feat(P14-12): add payment status fields to ride schema` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/components/common/PaymentForm.tsx` | `feat(P14-12): create payment form component (mock mode)` |
| `frontend/src/components/common/Receipt.tsx` | `feat(P14-12): create receipt display component` |
| `frontend/src/services/paymentService.ts` | `feat(P14-12): implement payment processing service methods` |
| `frontend/src/pages/rider/PaymentHistory.tsx` | `feat(P14-12): create payment history page` |
| `frontend/src/components/common/PaymentHistory.tsx` | `feat(P14-12): create payment history list component` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/integration/rides-api.test.js` | `test(P14-12): add payment processing and receipt generation tests` |

---

### Epic P14-5: Admin Portal & Moderation

#### P14-16: Admin: Admin Portal Login
**Sprint:** 2 | **Points:** 3

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/routes/auth.js` | `feat(P14-16): ensure login-email route supports admin role` |
| `backend/controllers/authController.js` | `feat(P14-16): add admin-scoped token generation` |
| `backend/routes/security.js` | `feat(P14-16): add security event and dashboard routes` |
| `backend/controllers/securityController.js` | `feat(P14-16): implement security monitoring endpoints` |
| `backend/utils/securityLogger.js` | `feat(P14-16): create security event logger utility` |
| `backend/middleware/advancedSecurity.js` | `feat(P14-16): add rate limiting and security headers` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/pages/admin/AdminDashboardPage.tsx` | `feat(P14-16): create admin dashboard page` |
| `frontend/src/pages/admin/AdminDashboard.css` | `feat(P14-16): add styling for admin dashboard` |
| `frontend/src/services/adminService.ts` | `feat(P14-16): implement admin service with security endpoints` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/integration/auth-api.test.js` | `test(P14-16): add admin login and security endpoint tests` |

---

#### P14-17: Admin: View & Manage Users
**Sprint:** 2 | **Points:** 5

##### Backend Files
| File | Commit Message |
|------|----------------|
| `backend/routes/users.js` | `feat(P14-17): add admin user management routes (list, suspend, reactivate)` |
| `backend/controllers/userController.js` | `feat(P14-17): implement getAllUsers, suspendUser, reactivateUser controllers` |
| `backend/middleware/auth.js` | `feat(P14-17): add requireAdmin middleware` |
| `backend/utils/securityLogger.js` | `feat(P14-17): log admin actions for audit trail` |

##### Frontend Files
| File | Commit Message |
|------|----------------|
| `frontend/src/pages/admin/UsersManagementPage.tsx` | `feat(P14-17): create users management page with suspend/reactivate` |
| `frontend/src/pages/admin/UserDetailsPage.tsx` | `feat(P14-17): create user details page with action history` |
| `frontend/src/pages/admin/RidesManagementPage.tsx` | `feat(P14-17): create rides management page for admin oversight` |
| `frontend/src/services/adminService.ts` | `feat(P14-17): add user management service methods` |

##### Test Files
| File | Commit Message |
|------|----------------|
| `backend/__tests__/integration/auth-api.test.js` | `test(P14-17): add admin user management tests` |

---

## Infrastructure & Configuration Files

### P14-INFRA: Infrastructure Setup
**Sprint:** 0 (Foundation) | **Points:** N/A

| File | Commit Message |
|------|----------------|
| `README.md` | `docs(infra): add project README with setup instructions` |
| `.gitignore` | `chore(infra): add comprehensive gitignore for Node, Docker, and IDE files` |
| `.env.example` | `chore(infra): add environment variable template` |
| `docker-compose.yml` | `infra(infra): add Docker Compose for MongoDB, Redis, and services` |
| `package.json` (root) | `chore(infra): add workspace root package configuration` |
| `backend/package.json` | `chore(infra): add backend dependencies and scripts` |
| `backend/Dockerfile` | `infra(infra): create backend Dockerfile with multi-stage build` |
| `frontend/package.json` | `chore(infra): add frontend dependencies (React, Vite, TypeScript)` |
| `frontend/Dockerfile` | `infra(infra): create frontend Dockerfile with nginx` |
| `frontend/nginx.conf` | `infra(infra): add nginx configuration for SPA routing` |
| `frontend/tsconfig.json` | `chore(infra): add TypeScript configuration` |
| `frontend/tsconfig.node.json` | `chore(infra): add TypeScript node configuration for Vite` |
| `frontend/vite.config.js` | `chore(infra): configure Vite with proxies and build options` |
| `frontend/index.html` | `chore(infra): add HTML entry point` |
| `frontend/.eslintrc.json` | `chore(infra): add ESLint configuration for frontend` |
| `backend/.eslintrc.json` | `chore(infra): add ESLint configuration for backend` |
| `backend/jest.config.js` | `test(infra): add Jest configuration for backend tests` |
| `backend/server.js` | `feat(infra): create Express server with middleware setup` |
| `backend/config/database.js` | `feat(infra): add MongoDB connection configuration` |
| `backend/config/security.js` | `feat(infra): add security configuration (CORS, rate limits)` |
| `backend/middleware/errorHandler.js` | `feat(infra): add global error handler middleware` |
| `backend/middleware/requestLogger.js` | `feat(infra): add request logging middleware` |
| `backend/middleware/security.js` | `feat(infra): add security middleware (helmet, CORS)` |
| `backend/utils/logger.js` | `feat(infra): create Winston logger utility` |
| `backend/models/index.js` | `feat(infra): create model index for exports` |
| `backend/services/index.js` | `feat(infra): create service index for exports` |
| `backend/services/GracefulDegradationService.js` | `feat(infra): add graceful degradation service for resilience` |
| `backend/utils/securityValidator.js` | `feat(infra): add input sanitization utilities` |
| `shared/package.json` | `chore(infra): add shared utilities package` |
| `shared/index.js` | `chore(infra): create shared utilities entry point` |

---

### Documentation Files

| File | Commit Message |
|------|----------------|
| `docs/API_DOCUMENTATION.md` | `docs: add comprehensive API endpoint documentation` |
| `docs/ADMIN_GUIDE.md` | `docs: add admin portal user guide` |
| `docs/DEPLOYMENT.md` | `docs: add deployment instructions for Docker and cloud` |
| `docs/DOC_INDEX.md` | `docs: add documentation index` |
| `docs/ENV_REFERENCE.md` | `docs: add environment variable reference` |
| `docs/JIRA_MAPPING.md` | `docs: add Jira story mapping and traceability matrix` |
| `docs/PROJECT_SUMMARY.md` | `docs: add project overview and architecture` |
| `docs/QUICKSTART.md` | `docs: add quick start guide` |
| `docs/RTM.md` | `docs: add requirements traceability matrix` |
| `docs/TESTING.md` | `docs: add testing strategy and instructions` |
| `backend/docs/authentication.md` | `docs: add authentication flow documentation` |
| `backend/docs/error-handling-implementation.md` | `docs: add error handling implementation guide` |
| `backend/services/README.md` | `docs: add services architecture documentation` |

---

### Testing Infrastructure

| File | Commit Message |
|------|----------------|
| `backend/__tests__/setup.js` | `test(infra): add backend test setup with DB mocking` |
| `backend/__tests__/helpers/testApp.js` | `test(infra): create test app factory for integration tests` |
| `backend/__tests__/utils/testHelpers.js` | `test(infra): add test helper utilities` |
| `frontend/src/__tests__/setup.ts` | `test(infra): add frontend test setup with Vitest` |
| `frontend/src/__tests__/README.md` | `docs(test): add frontend testing guide` |
| `frontend/src/__tests__/unit/validation.test.ts` | `test(infra): add validation utility tests` |
| `frontend/src/__tests__/unit/authService.test.ts` | `test(infra): add auth service unit tests` |
| `frontend/src/__tests__/unit/LoadingSpinner.test.tsx` | `test(infra): add component unit tests` |
| `frontend/src/__tests__/integration/form-validation.test.tsx` | `test(infra): add form validation integration tests` |
| `frontend/src/__tests__/system/user-workflows.test.tsx` | `test(infra): add end-to-end user workflow tests` |

---

### Scripts & Utilities

| File | Commit Message |
|------|----------------|
| `scripts/dev-setup.js` | `chore(scripts): add development environment setup script` |
| `scripts/health-check.js` | `chore(scripts): add health check script for services` |
| `scripts/mongo-init.js` | `chore(scripts): add MongoDB initialization script` |
| `scripts/verify-setup.js` | `chore(scripts): add setup verification script` |
| `scripts/clear-rides.js` | `chore(scripts): add database cleanup script` |
| `backend/scripts/seed.js` | `chore(scripts): add database seeding script` |
| `backend/scripts/reset-password.js` | `chore(scripts): add password reset utility` |
| `backend/scripts/run-api-tests.js` | `test(scripts): add API test runner script` |

---

### Postman Collections

| File | Commit Message |
|------|----------------|
| `backend/postman/cab-aggregator-api.postman_collection.json` | `docs(postman): add API collection with all endpoints` |
| `backend/postman/cab-aggregator-local.postman_environment.json` | `docs(postman): add local environment configuration` |

---

### Frontend Shared Components & Utilities

| File | Commit Message |
|------|----------------|
| `frontend/src/App.tsx` | `feat(infra): create main app component with routing` |
| `frontend/src/App.css` | `feat(infra): add global app styles` |
| `frontend/src/main.tsx` | `feat(infra): create app entry point` |
| `frontend/src/index.css` | `feat(infra): add global CSS reset and variables` |
| `frontend/src/vite-env.d.ts` | `chore(infra): add Vite environment types` |
| `frontend/src/types/index.ts` | `feat(infra): create shared TypeScript type definitions` |
| `frontend/src/types/leaflet.d.ts` | `chore(infra): add Leaflet type declarations` |
| `frontend/src/types/react-leaflet.d.ts` | `chore(infra): add React Leaflet type declarations` |
| `frontend/src/components/common/ErrorBoundary.tsx` | `feat(infra): create error boundary component` |
| `frontend/src/components/common/ErrorBoundary.css` | `feat(infra): add error boundary styling` |
| `frontend/src/components/common/LoadingSpinner.tsx` | `feat(infra): create loading spinner component` |
| `frontend/src/components/common/LoadingSpinner.css` | `feat(infra): add loading spinner styling` |
| `frontend/src/components/layout/Layout.tsx` | `feat(infra): create layout wrapper component` |
| `frontend/src/components/layout/Layout.css` | `feat(infra): add layout styling` |
| `frontend/src/components/layout/Header.tsx` | `feat(infra): create header component with navigation` |
| `frontend/src/components/layout/Header.css` | `feat(infra): add header styling` |
| `frontend/src/components/layout/Navigation.tsx` | `feat(infra): create navigation component` |
| `frontend/src/components/layout/Navigation.css` | `feat(infra): add navigation styling` |
| `frontend/src/services/apiClient.ts` | `feat(infra): create axios API client with interceptors` |
| `frontend/src/utils/index.ts` | `feat(infra): create utilities index` |
| `frontend/src/utils/errorHandling.ts` | `feat(infra): add error handling utilities` |
| `frontend/src/utils/validation.ts` | `feat(infra): add form validation utilities` |
| `frontend/src/hooks/index.ts` | `feat(infra): create hooks index` |
| `frontend/src/hooks/useLocalStorage.ts` | `feat(infra): add local storage hook` |
| `frontend/.env.example` | `chore(infra): add frontend environment template` |

---

## Pull Request Descriptions

### PR #1: Infrastructure Setup (P14-INFRA)
**Title:** Infrastructure: Initial project setup with Docker, configs, and boilerplate

**Description:**
This PR sets up the foundational infrastructure for the Cab Aggregator application:

**Added:**
- Docker Compose configuration for MongoDB, Redis, backend, and frontend services
- Backend Express server with middleware (CORS, security headers, error handling, logging)
- Frontend React + TypeScript + Vite configuration
- Database connection and configuration modules
- Testing infrastructure (Jest for backend, Vitest for frontend)
- Development and utility scripts (setup, seed, health check, cleanup)
- Comprehensive documentation structure (API docs, admin guide, deployment, etc.)
- ESLint and code quality configurations
- Environment variable templates

**Technology Stack:**
- Backend: Node.js 18+, Express, MongoDB, Socket.IO, Redis (optional)
- Frontend: React 18, TypeScript, Vite, React Router, Leaflet for maps
- Testing: Jest, Supertest (backend), Vitest, React Testing Library (frontend)

**Testing:**
- Run `npm run test` in backend and frontend directories
- Use `docker-compose up` to verify service orchestration

**Notes:**
- All sensitive variables should be configured via `.env` (see `.env.example`)
- MongoDB and Redis run in Docker containers for development

---

### PR #2: User Registration (P14-6)
**Title:** User Authentication: Phone-based registration with OTP verification

**Description:**
Implements user registration flow for both riders and drivers using phone-based authentication with OTP verification.

**User Story:** P14-6 — User Registration (Rider & Driver)

**Added:**
- Backend registration endpoints (`POST /api/auth/register-phone`, `POST /api/auth/verify-otp`)
- OTP model with TTL (5 minutes) and one-time use enforcement
- User model with role-based schemas (rider/driver with vehicle info)
- Phone number validation (E.164 format)
- Frontend registration page with two-step flow (phone → OTP verification)
- Development mode OTP exposure for testing (`GET /api/auth/dev-otp/:phone`)

**Acceptance Criteria:**
- ✅ Users can register with phone number, name, and role
- ✅ Drivers must provide license number and vehicle details
- ✅ OTP is generated and expires after 5 minutes
- ✅ OTP verification creates user account and returns JWT tokens
- ✅ Duplicate phone numbers are rejected
- ✅ Invalid phone formats return validation errors

**Testing:**
- Integration tests: `backend/__tests__/integration/auth-api.test.js`
- Frontend tests: `frontend/src/__tests__/integration/auth-flow.test.tsx`

**API Endpoints:**
- `POST /api/auth/register-phone` — Send OTP
- `POST /api/auth/verify-otp` — Verify OTP and create account
- `GET /api/auth/dev-otp/:phone` — Get OTP for testing (dev only)

**Security:**
- Passwords hashed with bcrypt (cost factor 10)
- OTPs stored with expiry timestamp
- Rate limiting on OTP requests (future enhancement)

---

### PR #3: User Login (P14-7)
**Title:** User Authentication: Phone and email login with JWT tokens

**Description:**
Implements secure login flows for riders, drivers (phone-based), and admins (email-based) with JWT token generation.

**User Story:** P14-7 — User Login

**Added:**
- Backend login endpoints (`POST /api/auth/login-phone`, `POST /api/auth/login-email`)
- JWT token generation (access + refresh tokens)
- Session manager for token lifecycle
- Authentication middleware for protected routes
- Role-based access control (requireAuth, requireDriver, requireAdmin)
- Frontend login page with role-specific authentication
- Protected route component with role validation
- Auth context with login/logout state management

**Acceptance Criteria:**
- ✅ Users login with phone/password or email/password
- ✅ Valid credentials return access and refresh tokens
- ✅ Suspended/inactive accounts receive 401 error
- ✅ Tokens expire after configured duration
- ✅ Protected routes redirect to login when unauthenticated
- ✅ Role mismatch returns 403 Forbidden

**Testing:**
- Integration tests: `backend/__tests__/integration/auth-api.test.js`
- Middleware tests: `backend/__tests__/unit/middleware-auth.test.js`
- Frontend tests: `frontend/src/__tests__/integration/auth-flow.test.tsx`

**API Endpoints:**
- `POST /api/auth/login-phone` — Phone login (riders/drivers)
- `POST /api/auth/login-email` — Email login (admins)

**Security:**
- Bcrypt password comparison
- JWT signed with `JWT_SECRET`
- Access token expiry: 24h
- Refresh token expiry: 7d
- HTTP-only cookies for refresh tokens (optional)

---

### PR #4: User Profile Management (P14-13)
**Title:** User Management: View and edit user profiles

**Description:**
Enables users to view and update their profiles, including password changes and statistics viewing.

**User Story:** P14-13 — User: View & Edit Profile

**Added:**
- Backend profile endpoints (`GET/PUT /api/users/profile`, `GET /api/users/stats`)
- Profile update validation (name, email, avatar)
- Password change endpoint with current password verification
- Frontend profile pages (separate for riders and drivers)
- User statistics display (total rides, rating, earnings)
- Driver-specific profile fields (license, vehicle details)

**Acceptance Criteria:**
- ✅ Users can view their profile information
- ✅ Users can update name, email, and avatar
- ✅ Drivers can update vehicle information
- ✅ Password changes require current password verification
- ✅ Profile changes reflect immediately in UI
- ✅ Statistics show ride history metrics

**Testing:**
- Integration tests: `backend/__tests__/integration/auth-api.test.js`
- Frontend profile edit flows

**API Endpoints:**
- `GET /api/users/profile` — Get current user profile
- `PUT /api/users/profile` — Update profile
- `PUT /api/users/password` — Change password
- `GET /api/users/stats` — Get user statistics

**Security:**
- Password field excluded from GET responses
- Profile updates require authentication
- Password change requires current password

---

### PR #5: Ride Booking & Fare Estimation (P14-8)
**Title:** Ride Management: Book rides with fare estimation

**Description:**
Core ride booking functionality with real-time fare calculation based on distance and vehicle type.

**User Story:** P14-8 — Rider: Book a Ride & Get Fare Estimate

**Added:**
- Fare calculation service with distance-based pricing
- Ride booking endpoints (`POST /api/rides/estimate`, `POST /api/rides/book`)
- Ride model with status workflow (requested → matched → accepted → in_progress → completed)
- Coordinate validation middleware
- Frontend booking page with map integration
- Geocoding service for address lookup
- Map component with pickup/destination markers
- Geolocation hook for current position

**Acceptance Criteria:**
- ✅ Users enter pickup and destination addresses
- ✅ System calculates fare estimate (base + distance + time)
- ✅ Fare breakdown shows base, distance, and total
- ✅ Ride booking creates database entry with status "requested"
- ✅ Invalid coordinates return error
- ✅ Map displays route between pickup and destination

**Testing:**
- Integration tests: `backend/__tests__/integration/rides-api.test.js`
- Unit tests: `backend/__tests__/unit/services-fare.test.js`

**API Endpoints:**
- `POST /api/rides/estimate` — Get fare estimate
- `POST /api/rides/book` — Create ride booking

**Pricing Model:**
- Base fare: $3.00
- Per km: $1.50
- Per minute: $0.25
- Surge pricing: 1.0x - 2.5x (future enhancement)

---

### PR #6: Real-time Driver Location (P14-11)
**Title:** Real-time Features: Driver location tracking via WebSocket

**Description:**
Implements real-time driver location updates using Socket.IO for live ride tracking.

**User Story:** P14-11 — Rider: See Driver's Live Location

**Added:**
- Socket.IO server integration
- Driver location update handlers
- Room-based event broadcasting (one room per ride)
- Frontend socket context with event listeners
- Live driver marker on map
- Location persistence in driver model
- Socket authentication middleware

**Acceptance Criteria:**
- ✅ Drivers emit location updates every 5 seconds
- ✅ Riders in same ride room receive updates
- ✅ Map updates driver marker position in real-time
- ✅ ETA recalculates based on driver location
- ✅ Socket connection requires valid JWT
- ✅ Connection drops when user logs out

**Testing:**
- System tests: `backend/__tests__/system/complete-workflows.test.js`

**Socket Events:**
- `driver:location-update` — Driver sends location
- `driver:location-updated` — Broadcast to ride room
- `ride:join` — Join ride-specific room
- `ride:leave` — Leave ride room

**Security:**
- Socket authentication via JWT in handshake
- Room access restricted to ride participants
- Rate limiting on location updates

---

### PR #7: Trip History (P14-14)
**Title:** User Features: View trip history with filters

**Description:**
Allows users to view their past rides with pagination, filtering, and detailed information.

**User Story:** P14-14 — User: View Trip History

**Added:**
- Ride history endpoint with pagination (`GET /api/rides/history`)
- Query filters (status, date range, role-based view)
- Frontend ride history pages (rider and driver variants)
- Ride detail modal with fare breakdown
- Export functionality (CSV download)

**Acceptance Criteria:**
- ✅ Users see list of past rides with pagination
- ✅ Filters: status (completed, cancelled), date range
- ✅ Each ride shows: date, route, fare, driver/rider info, status
- ✅ Clicking ride opens detailed view
- ✅ Drivers see earnings per ride
- ✅ Pagination supports 10/25/50 items per page

**Testing:**
- Integration tests: `backend/__tests__/integration/rides-api.test.js`

**API Endpoints:**
- `GET /api/rides/history` — Get ride history with pagination

**Query Parameters:**
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 10)
- `status` — Filter by status
- `from` — Start date (ISO 8601)
- `to` — End date (ISO 8601)

---

### PR #8: Driver Rating System (P14-15)
**Title:** Rating Feature: Post-ride driver ratings

**Description:**
Enables riders to rate drivers after trip completion with aggregated rating display.

**User Story:** P14-15 — Rider: Rate Driver After Trip

**Added:**
- Rating submission endpoint (`POST /api/payments/rate`)
- Rating validation (1-5 stars, optional comment)
- Rating aggregation in driver profile
- Ride completion page with rating form
- Reusable rating component (star selector)
- Rating history display

**Acceptance Criteria:**
- ✅ Riders can rate driver after ride completion
- ✅ Rating range: 1-5 stars
- ✅ Optional text review (max 500 chars)
- ✅ Rating updates driver's average rating
- ✅ One rating per ride (duplicate submissions rejected)
- ✅ Rating shows in ride history

**Testing:**
- Integration tests: `backend/__tests__/integration/rides-api.test.js`

**API Endpoints:**
- `POST /api/payments/rate` — Submit rating

**Request Body:**
```json
{
  "rideId": "string",
  "rating": 4,
  "comment": "Great driver!"
}
```

**Rating Aggregation:**
- Algorithm: Weighted average (recent ratings weighted higher)
- Display: Rounded to 1 decimal place

---

<<<<<<< HEAD
### PR #9: In-App Notifications (P14-18)
**Title:** Notifications: Real-time ride status notifications
=======
## P14-6 (User Registration) — branch `feature/P14-6-kanishk` — commits 5–12 (8 commits)
5. feat(P14-6): add backend package manifest — `backend/package.json`
6. feat(P14-6): add server bootstrap — `backend/server.js`
7. feat(P14-6): add auth route wiring — `backend/routes/auth.js`
8. feat(P14-6): add authController.registerPhone — `backend/controllers/authController.js`
9. feat(P14-6): add OTP model — `backend/models/OTP.js`
11. feat(P14-6): add smsMock util — `backend/utils/smsMock.js`
12. docs(P14-6): add authentication docs snippet — `docs/authentication.md`
>>>>>>> 8d89fd0b2b432bf1256d4d0b064b4139912c2b8e

**Description:**
Implements in-app notification system for ride status changes and driver assignments.

<<<<<<< HEAD
**User Story:** P14-18 — User: Receive In-App Notifications
=======
## P14-8 (Book & Estimate) — branch `feature/P14-8-karthik` — commits 13–22 (10 commits)
13. feat(P14-8): add rides routes — `backend/routes/rides.js`
14. feat(P14-8): add FareService — `backend/services/FareService.js`
15. feat(P14-8): add rideController.estimate/book skeleton — `backend/controllers/rideController.js`
16. feat(P14-8): add Ride model — `backend/models/Ride.js`
19. feat(P14-8): add socketService emit placeholder — `backend/services/socketService.js`
20. docs(P14-8): add rides API doc — `docs/API_RIDES.md`
21. fix(P14-8): add validation for coords — `backend/middleware/validation.js`
22. ci(P14-8): update backend/package.json scripts — `backend/package.json`
>>>>>>> 8d89fd0b2b432bf1256d4d0b064b4139912c2b8e

**Added:**
- Socket event broadcasting for ride events
- Frontend notification event handlers
- Toast notification component
- Notification history storage
- Error handler hook with toast integration

<<<<<<< HEAD
**Acceptance Criteria:**
- ✅ Users receive notifications for: driver assigned, ride started, ride completed, ride cancelled
- ✅ Notifications display as toast messages
- ✅ Notification history accessible in profile
- ✅ Sound alerts for critical notifications (optional)
- ✅ Push notifications when app in background (future)
=======
## P14-14 (Trip History) — branch `feature/P14-14-kanishk` — commits 23–26 (4 commits)
23. feat(P14-14): add history route — `backend/routes/rides.js`
24. feat(P14-14): add history controller (pagination) — `backend/controllers/rideController.js`
26. docs(P14-14): update API docs — `docs/API_RIDES.md`
>>>>>>> 8d89fd0b2b432bf1256d4d0b064b4139912c2b8e

**Testing:**
- System tests: `backend/__tests__/system/complete-workflows.test.js`

<<<<<<< HEAD
**Socket Events:**
- `ride:status-updated` — Ride status change
- `ride:driver-assigned` — Driver accepted ride
- `notification:new` — General notification
=======
## P14-7 (User Login) — branch `feature/P14-7-hariram` — commits 27–32 (6 commits)
27. feat(P14-7): add login-phone route — `backend/routes/auth.js`
28. feat(P14-7): add loginPhone controller — `backend/controllers/authController.js`
29. feat(P14-7): add sessionManager util — `backend/utils/sessionManager.js`
31. fix(P14-7): add suspended account handling — `backend/controllers/authController.js`
32. docs(P14-7): document token format — `docs/API_AUTH.md`
>>>>>>> 8d89fd0b2b432bf1256d4d0b064b4139912c2b8e

**Notification Types:**
- `info` — General updates
- `success` — Positive actions (ride completed)
- `warning` — Warnings (driver cancellation)
- `error` — Critical errors

<<<<<<< HEAD
---
=======
## P14-9 (Driver Online & Pending) — branch `feature/P14-9-hariram` — commits 33–40 (8 commits)
33. feat(P14-9): add driver availability route — `backend/routes/users.js`
34. feat(P14-9): add updateAvailability controller — `backend/controllers/userController.js`
35. feat(P14-9): add socketHandlers availability event — `backend/services/socketHandlers.js`
37. feat(P14-9): add driver pending rides controller — `backend/controllers/rideController.js`
39. fix(P14-9): tune validation — `backend/middleware/validation.js`
40. docs(P14-9): add driver docs — `docs/API_DRIVERS.md`
>>>>>>> 8d89fd0b2b432bf1256d4d0b064b4139912c2b8e

### PR #10: Driver Availability & Pending Rides (P14-9)
**Title:** Driver Features: Availability toggle and pending ride requests

<<<<<<< HEAD
**Description:**
Enables drivers to go online/offline and view nearby pending ride requests.
=======
## P14-12 (Mock Payment) — branch `feature/P14-12-hariram` — commits 41–46 (6 commits)
41. feat(P14-12): add payments routes — `backend/routes/payments.js`
42. feat(P14-12): add paymentController.processPayment — `backend/controllers/paymentController.js`
43. feat(P14-12): add Payment model — `backend/models/Payment.js`
45. feat(P14-12): add receipt endpoint — `backend/controllers/paymentController.js`
46. docs(P14-12): add payments docs — `docs/API_PAYMENTS.md`
>>>>>>> 8d89fd0b2b432bf1256d4d0b064b4139912c2b8e

**User Story:** P14-9 — Driver: Go Online & View Ride Requests

<<<<<<< HEAD
**Added:**
- Driver availability toggle endpoint (`PUT /api/users/driver/availability`)
- Pending rides endpoint with geo-filtering (`GET /api/rides/driver/pending`)
- Socket event for availability changes
- Driver dashboard with availability switch
- Pending rides list component
- Auto-refresh for pending rides
=======
## P14-11 (Driver Live Location) — branch `feature/P14-11-kausik` — commits 47–52 (6 commits)
47. feat(P14-11): add socketService auth & handlers — `backend/services/socketService.js`
48. feat(P14-11): add currentLocation persistence — `backend/models/User.js`
50. feat(P14-11): broadcast location updates — `backend/services/socketHandlers.js`
51. fix(P14-11): tighten socket permissions — `backend/services/socketHandlers.js`
52. docs(P14-11): add socket docs — `docs/API_SOCKETS.md`
>>>>>>> 8d89fd0b2b432bf1256d4d0b064b4139912c2b8e

**Acceptance Criteria:**
- ✅ Drivers toggle availability (online/offline)
- ✅ Only online drivers see pending rides
- ✅ Pending rides filtered by proximity (10km radius)
- ✅ Ride list shows: pickup, destination, fare estimate, distance
- ✅ List updates in real-time via socket
- ✅ Offline drivers cannot accept rides

<<<<<<< HEAD
**Testing:**
- Integration tests: `backend/__tests__/integration/rides-api.test.js`
=======
## P14-15 (Rate Driver) — branch `feature/P14-15-kausik` — commits 53–57 (5 commits)
53. feat(P14-15): add rate route — `backend/routes/payments.js`
54. feat(P14-15): implement rate controller — `backend/controllers/paymentController.js`
56. fix(P14-15): add rating aggregation to User model — `backend/models/User.js`
57. docs(P14-15): add rating docs — `docs/API_PAYMENTS.md`
>>>>>>> 8d89fd0b2b432bf1256d4d0b064b4139912c2b8e

**API Endpoints:**
- `PUT /api/users/driver/availability` — Toggle availability
- `GET /api/rides/driver/pending` — Get pending rides

<<<<<<< HEAD
**Query Parameters:**
- `latitude` — Driver's latitude
- `longitude` — Driver's longitude
- `radius` — Search radius in km (default: 10)
=======
## P14-17 (Admin Manage Users) — branch `feature/P14-17-kausik` — commits 58–65 (8 commits)
58. feat(P14-17): add admin users route — `backend/routes/users.js`
59. feat(P14-17): add adminController.listUsers — `backend/controllers/adminController.js`
60. feat(P14-17): add adminController.getUser — `backend/controllers/adminController.js`
61. feat(P14-17): add suspend/reactivate endpoints — `backend/controllers/adminController.js`
63. fix(P14-17): prevent admin self-suspension — `backend/controllers/adminController.js`
64. chore(P14-17): add securityLogger util — `backend/utils/securityLogger.js`
65. docs(P14-17): update ADMIN guide — `docs/ADMIN_GUIDE.md`
>>>>>>> 8d89fd0b2b432bf1256d4d0b064b4139912c2b8e

**Socket Events:**
- `driver:availability-update` — Driver toggles status
- `ride:new` — New ride available (broadcast to online drivers)

<<<<<<< HEAD
---
=======
## P14-18 (In-App Notifications) — branch `feature/P14-18-kausik` — commits 66–70 (5 commits)
66. feat(P14-18): add notification service — `backend/services/notificationService.js`
67. feat(P14-18): add client event names in SocketContext — `frontend/src/contexts/SocketContext.tsx`
69. fix(P14-18): timing/ordering fixes — `backend/services/notificationService.js`
70. docs(P14-18): add notifications examples — `docs/QUICKSTART.md`
>>>>>>> 8d89fd0b2b432bf1256d4d0b064b4139912c2b8e

### PR #11: Ride Acceptance & Status Updates (P14-10)
**Title:** Driver Features: Accept rides and update status

<<<<<<< HEAD
**Description:**
Allows drivers to accept ride requests and update ride status throughout the trip lifecycle.
=======
## P14-10 (Accept & Update Ride Status) — branch `feature/P14-10-karthik` — commits 71–80 (10 commits)
71. feat(P14-10): add accept route — `backend/routes/rides.js`
72. feat(P14-10): add MatchingService skeleton — `backend/services/MatchingService.js`
73. feat(P14-10): implement acceptRide atomic assignment — `backend/controllers/rideController.js`
75. feat(P14-10): add status transitions endpoint — `backend/controllers/rideController.js`
77. fix(P14-10): add socket emits for assignment/status — `backend/services/socketService.js`
78. fix(P14-10): add driver release/race condition handling — `backend/controllers/rideController.js`
79. docs(P14-10): add matching/assignment notes — `docs/DEVELOPER_NOTES.md`
>>>>>>> 8d89fd0b2b432bf1256d4d0b064b4139912c2b8e

**User Story:** P14-10 — Driver: Accept & Update Ride Status

**Added:**
- Ride acceptance endpoint with atomic assignment (`POST /api/rides/:id/accept`)
- Ride status update endpoint (`PUT /api/rides/:id/status`)
- Matching service with race condition handling
- Status validation (only valid transitions allowed)
- Active ride component with status controls
- Socket events for assignment and status changes
- Driver release on cancellation

**Acceptance Criteria:**
- ✅ Driver accepts ride from pending list
- ✅ Only one driver can accept (atomic operation)
- ✅ Accepted rides disappear from other drivers' lists
- ✅ Driver can update status: accepted → arrived → in_progress → completed
- ✅ Invalid status transitions rejected
- ✅ Rider notified of status changes via socket

**Testing:**
- Unit tests: `backend/__tests__/unit/services-matching.test.js`
- Integration tests: `backend/__tests__/integration/rides-api.test.js`

**API Endpoints:**
- `POST /api/rides/:id/accept` — Accept ride
- `PUT /api/rides/:id/status` — Update ride status

**Valid Status Transitions:**
- `requested` → `accepted`
- `accepted` → `in_progress`
- `in_progress` → `completed`
- Any status → `cancelled`

**Socket Events:**
- `ride:driver-assigned` — Driver accepted
- `ride:status-updated` — Status changed

---

### PR #12: Mock Payment Processing (P14-12)
**Title:** Payment: Mock payment processing and receipt generation

**Description:**
Implements mock payment gateway for ride completion with receipt generation.

**User Story:** P14-12 — Rider: Handle Mock Payment on Trip End

**Added:**
- Payment processing endpoint (`POST /api/payments/process`)
- Receipt generation endpoint (`GET /api/payments/receipt/:rideId`)
- Mock payment gateway simulation
- Payment form component (mock mode)
- Receipt display component
- Payment history page

**Acceptance Criteria:**
- ✅ Payment processed on ride completion
- ✅ Final fare calculated (may differ from estimate due to route changes)
- ✅ Payment status: pending → processing → completed
- ✅ Receipt includes: ride details, fare breakdown, payment method, timestamp
- ✅ Receipt downloadable as PDF (future)
- ✅ Payment history shows all transactions

**Testing:**
- Integration tests: `backend/__tests__/integration/rides-api.test.js`

**API Endpoints:**
- `POST /api/payments/process` — Process payment
- `GET /api/payments/receipt/:rideId` — Get receipt
- `GET /api/payments/history` — Payment history

**Mock Payment Flow:**
1. User completes ride
2. Backend calculates final fare
3. Mock gateway returns success (100% success rate in dev)
4. Payment record created
5. Receipt generated

**Fare Adjustment:**
- Estimate vs actual distance comparison
- Waiting time charges
- Toll/parking fees (future)

---

### PR #13: Admin Portal Login (P14-16)
**Title:** Admin Portal: Admin authentication and security dashboard

**Description:**
Implements admin-specific authentication and security monitoring features.

**User Story:** P14-16 — Admin: Admin Portal Login

**Added:**
- Admin-scoped token generation
- Security event logging
- Security dashboard endpoints (`GET /api/security/dashboard`)
- Security event list (`GET /api/security/events`)
- Security statistics (`GET /api/security/stats`)
- Admin dashboard page
- Rate limiting middleware
- Advanced security headers

**Acceptance Criteria:**
- ✅ Admins login via email/password
- ✅ Admin tokens have elevated permissions
- ✅ Security events logged: logins, failed attempts, user actions
- ✅ Dashboard shows: total users, active rides, security alerts
- ✅ Rate limiting prevents brute force attacks
- ✅ Security headers prevent common attacks (XSS, clickjacking)

**Testing:**
- Integration tests: `backend/__tests__/integration/auth-api.test.js`

**API Endpoints:**
- `POST /api/auth/login-email` — Admin login
- `GET /api/security/dashboard` — Security overview
- `GET /api/security/events` — Event log
- `GET /api/security/stats` — Security metrics

**Security Features:**
- Rate limiting: 5 failed login attempts → 15 min lockout
- Helmet.js for security headers
- CORS configuration
- IP-based blocking (future)

---

### PR #14: Admin User Management (P14-17)
**Title:** Admin Portal: User management and moderation

**Description:**
Enables admins to view, suspend, and reactivate user accounts with audit logging.

**User Story:** P14-17 — Admin: View & Manage Users

**Added:**
- Admin user management endpoints
- User list with pagination and filters (`GET /api/users/admin/users`)
- User suspension endpoint (`PUT /api/users/admin/users/:id/suspend`)
- User reactivation endpoint (`PUT /api/users/admin/users/:id/reactivate`)
- Admin action audit logging
- Users management page
- User details page with action history
- Rides management page

**Acceptance Criteria:**
- ✅ Admins view list of all users (riders, drivers, admins)
- ✅ Filters: role, status (active/suspended), registration date
- ✅ Admins can suspend users (prevents login)
- ✅ Admins can reactivate suspended users
- ✅ All admin actions logged with timestamp and reason
- ✅ Admins cannot suspend themselves
- ✅ User details show: profile, ride history, ratings, payments

**Testing:**
- Integration tests: `backend/__tests__/integration/auth-api.test.js`

**API Endpoints:**
- `GET /api/users/admin/users` — List users
- `GET /api/users/admin/users/:id` — User details
- `PUT /api/users/admin/users/:id/suspend` — Suspend user
- `PUT /api/users/admin/users/:id/reactivate` — Reactivate user
- `GET /api/rides/admin/all` — All rides (admin view)

**Query Parameters:**
- `role` — Filter by role
- `status` — Filter by active/suspended
- `page`, `limit` — Pagination
- `search` — Search by name/phone/email

**Audit Log Fields:**
- Action type (suspend, reactivate, delete)
- Admin ID
- Target user ID
- Timestamp
- Reason/comment

---

## Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation only
- `test` — Adding or updating tests
- `refactor` — Code change that neither fixes a bug nor adds a feature
- `chore` — Changes to build process or auxiliary tools
- `infra` — Infrastructure changes (Docker, CI/CD)
- `perf` — Performance improvement

### Scopes
Use story IDs as scopes: `P14-6`, `P14-7`, `P14-8`, etc., or `infra` for infrastructure.

### Examples
```bash
feat(P14-6): add phone registration route with OTP flow
test(P14-8): add integration tests for estimate and booking flows
docs(P14-13): add profile management API documentation
fix(P14-10): resolve race condition in ride acceptance
chore(infra): add Docker Compose for MongoDB and Redis
```

### Branch Naming
```
feature/P14-<story-number>-<short-description>
bugfix/P14-<story-number>-<short-description>
hotfix/<description>
```

Examples:
- `feature/P14-6-user-registration`
- `feature/P14-8-ride-booking`
- `bugfix/P14-10-race-condition`

### PR Workflow
1. Create feature branch from `main`
2. Make commits following the format above
3. Push early (after 2-3 commits) to create draft PR
4. Continue pushing commits to update PR
5. Request review when complete and CI passes
6. Squash merge to `main` (or regular merge to preserve history)

### File Organization in Commits
- **One logical change per commit** (may include multiple files)
- **Group related files** (e.g., route + controller + test)
- **Separate infrastructure from features**
- **Tests committed with their features** (not separately)

### Example Commit Sequence for P14-6
```bash
# Commit 1: Backend structure
git add backend/routes/auth.js backend/controllers/authController.js backend/models/OTP.js
git commit -m "feat(P14-6): add phone registration route with OTP flow"

# Commit 2: Frontend registration page
git add frontend/src/pages/auth/RegisterPage.tsx frontend/src/pages/auth/AuthPages.css
git commit -m "feat(P14-6): create registration page with OTP verification flow"

# Commit 3: Service layer
git add frontend/src/services/authService.ts frontend/src/contexts/AuthContext.tsx
git commit -m "feat(P14-6): implement register and verifyOTP service methods"

# Commit 4: Tests
git add backend/__tests__/integration/auth-api.test.js frontend/src/__tests__/integration/auth-flow.test.tsx
git commit -m "test(P14-6): add integration tests for registration and OTP verification"

# Push to create draft PR
git push -u origin feature/P14-6-user-registration
```

---

## Summary Statistics

### Total Files by Category
- **Backend Controllers:** 5 files
- **Backend Routes:** 6 files
- **Backend Models:** 4 files (User, Ride, OTP, index)
- **Backend Services:** 5 files
- **Backend Middleware:** 6 files
- **Backend Utils:** 6 files
- **Backend Tests:** 8 files
- **Frontend Pages:** 15 files
- **Frontend Components:** 14 files
- **Frontend Services:** 8 files
- **Frontend Contexts:** 2 files
- **Frontend Hooks:** 4 files
- **Frontend Tests:** 6 files
- **Documentation:** 13 files
- **Configuration:** 15 files
- **Scripts:** 9 files

### Total: ~150+ source files (excluding node_modules, build artifacts)

### Story Distribution
- **P14-6 (Registration):** 10 files (6 backend, 4 frontend)
- **P14-7 (Login):** 9 files (5 backend, 4 frontend)
- **P14-8 (Ride Booking):** 14 files (6 backend, 8 frontend)
- **P14-9 (Driver Availability):** 8 files (5 backend, 3 frontend)
- **P14-10 (Ride Acceptance):** 6 files (4 backend, 2 frontend)
- **P14-11 (Live Location):** 8 files (5 backend, 3 frontend)
- **P14-12 (Payment):** 7 files (3 backend, 4 frontend)
- **P14-13 (Profile):** 8 files (3 backend, 5 frontend)
- **P14-14 (History):** 7 files (2 backend, 5 frontend)
- **P14-15 (Rating):** 6 files (3 backend, 3 frontend)
- **P14-16 (Admin Login):** 7 files (6 backend, 1 frontend)
- **P14-17 (Admin Users):** 8 files (4 backend, 4 frontend)
- **P14-18 (Notifications):** 4 files (2 backend, 2 frontend)
- **Infrastructure:** 40+ files

---

## Notes
- All commit messages follow Conventional Commits specification
- Story IDs (P14-x) used as scopes for traceability
- Files excluded by `.gitignore` are not listed (node_modules, logs, build artifacts, etc.)
- Some files serve multiple stories (e.g., `backend/routes/rides.js` spans P14-8, P14-9, P14-10, P14-14)
- Infrastructure files committed first, then features in sprint order
- Tests committed alongside their features for immediate validation

---

**Last Updated:** 2025-11-12
**Version:** 1.0
**Maintainer:** Development Team
