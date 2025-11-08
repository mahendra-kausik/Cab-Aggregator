# Frontend Testing Suite

Comprehensive testing suite for the Cab Aggregator frontend application covering unit, integration, and system tests.

## Test Structure

```
frontend/src/__tests__/
├── setup.ts                      # Test configuration and global mocks
├── unit/                         # Unit tests for individual components/utilities
│   ├── authService.test.ts       # Auth service methods
│   ├── LoadingSpinner.test.tsx   # Loading spinner component
│   └── validation.test.ts        # Validation utility functions
├── integration/                  # Integration tests for component interactions
│   ├── auth-flow.test.tsx        # Complete authentication flow with context
│   └── form-validation.test.tsx  # Form validation with user interactions
└── system/                       # System tests for end-to-end workflows
    └── user-workflows.test.tsx   # Complete user journeys
```

## Running Tests

### Unit Tests
Test individual functions, components, and services in isolation:
```bash
npm run test:unit
```

### Integration Tests
Test component interactions with services and contexts:
```bash
npm run test:integration
```

### System Tests
Test complete workflows with minimal mocking:
```bash
npm run test:system
```

### All Tests
Run unit, integration, and system tests:
```bash
npm test
```

### Watch Mode
Run tests in watch mode for development:
```bash
npm run test:watch
```

### Coverage Report
Generate test coverage report:
```bash
npm run test:coverage
```

## Test Coverage

### Unit Tests (3 test files)
- **authService.test.ts**: Auth service methods (register, login, OTP verification)
- **LoadingSpinner.test.tsx**: Loading spinner component rendering and props
- **validation.test.ts**: Validation utilities (email, phone, password, OTP)

### Integration Tests (2 test files)
- **auth-flow.test.tsx**: Complete authentication workflows with AuthContext
- **form-validation.test.tsx**: Form validation with user input and error handling

### System Tests (1 test file)
- **user-workflows.test.tsx**: End-to-end user journeys (rider, driver, admin workflows)

## Test Technologies

- **Vitest**: Fast unit test framework with native ESM support
- **React Testing Library**: Component testing utilities
- **Cypress**: End-to-end testing framework
- **jsdom**: DOM simulation for component tests

## Writing New Tests

### Unit Test Example
```typescript
import { describe, it, expect } from 'vitest';
import { isValidEmail } from '@/utils/validation';

describe('Email Validation', () => {
  it('should validate correct emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  it('should reject invalid emails', () => {
    expect(isValidEmail('invalid')).toBe(false);
  });
});
```

### Integration Test Example
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext';

describe('Auth Flow', () => {
  it('should authenticate user', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Authenticated')).toBeInTheDocument();
    });
  });
});
```

### E2E Test Example
```javascript
describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('input[placeholder*="Phone"]').type('+1234567890');
    cy.get('input[type="password"]').type('Password123');
    cy.get('button').contains('Sign In').click();
    cy.url().should('include', '/dashboard');
  });
});
```

## CI/CD Integration

Tests are configured to run in CI/CD pipelines:
- Unit, integration, and system tests run on every commit
- Coverage reports are generated automatically

## Best Practices

1. **Keep tests simple**: Course-project level, not production complexity
2. **Test behavior, not implementation**: Focus on user interactions
3. **Mock external dependencies**: API calls, localStorage, geolocation
4. **Use descriptive test names**: Clearly state what is being tested
5. **Arrange-Act-Assert pattern**: Organize test steps clearly
6. **Clean up after tests**: Use `afterEach` for cleanup

## Troubleshooting

### Tests failing with "Cannot find module"
Ensure all imports use the correct aliases (@/components, @/utils, etc.)

### Cypress tests timing out
Increase timeout or check if backend is running:
```javascript
cy.visit('/login', { timeout: 10000 });
```

### Mock not working
Clear mocks between tests:
```typescript
beforeEach(() => {
  vi.clearAllMocks();
});
```

## Test Maintenance

- Run tests before committing code
- Update tests when adding new features
- Keep test coverage above 70% for critical paths
- Review and remove obsolete tests regularly
