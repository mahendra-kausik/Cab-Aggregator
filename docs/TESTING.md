# Testing

This project includes unit, integration and system tests (backend). Frontend tests are scaffolded under `frontend/__tests__`.

Backend test runner
- Tests use Jest and `supertest` for HTTP integration tests.
- Test projects are organized under `backend/__tests__/unit`, `integration`, and `system`.

Run tests

Run backend tests (all):

```powershell
npm run test --prefix backend
```

Run specific categories:

```powershell
npm run test:backend:unit
npm run test:backend:integration
npm run test:backend:system
```

CI considerations
- Use `mongodb-memory-server` for unit/integration tests in CI to avoid external DB dependency.
- Ensure Redis is mocked or available for tests that depend on session store.

Test tips
- When tests leave open handles (socket or intervals), run `sessionManager._stopCleanup()` in test teardown.
- Use `DISABLE_MATCHING=true` to prevent background matching tasks from interfering with deterministic tests.

Test coverage
- Backend script `test:coverage` runs Jest coverage collection.

Where to find tests
- Backend tests: `backend/__tests__/` (integration, system, unit)
- Frontend tests: `frontend/__tests__/` (scaffold present)
