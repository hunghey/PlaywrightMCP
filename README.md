# Ubuy E2E Testing Project

End-to-end testing suite for Ubuy using Playwright with TypeScript. This project implements the Page Object Model (POM) pattern and supports multi-region testing.

## Project Structure

```
├── config/
│   ├── environment.ts         # Environment configuration and site configs
├── pages/
│   ├── basePage.ts           # Base page with common functionality
│   └── homePage.ts           # Home page object
├── testData/
│   └── userData.csv          # Test data for different regions
├── tests/
│   ├── ubuy.spec.ts          # Main test suite for Ubuy
├── playwright.config.ts      # Playwright configuration
└── package.json             # Project dependencies
```

## Features

- **Multi-Region Support**: Tests adapt to different regions
- **Page Object Model**: Organized, maintainable test structure
- **Data-Driven Testing**: Test data maintained in CSV files

## Setup

1. **Install Dependencies**:

```bash
# Install Node.js dependencies
npm install
```

2. **Install Playwright Browsers**:

```bash
npx playwright install
```

3. **Configure Environment**:
   Create `.env` file in project root:

```env
TEST_REGION=lebanon  # or japan
```

## Running Tests

### Run All Tests:

```bash
npx playwright test
```

### Run Specific Tests:

````bash
# Run Ubuy specific tests
npx playwright test tests/ubuy.spec.ts

### Debug Mode:
```bash
# Run with UI Mode
npx playwright test tests/ubuy.spec.ts --ui

### Page Objects

**BasePage** (`pages/basePage.ts`):
- Base class for all page objects
- Handles common navigation and waits
- Manages site configuration

**HomePage** (`pages/homePage.ts`):
- Handles region-specific alerts
- Implements search functionality

## Key Test Scenarios

1. **Language and Country Settings**:
   - Validates default language/country
   - Tests language switching
   - Verifies settings persistence

## Debugging Tips

1. **UI Mode Debugging**:
```bash
npx playwright test --ui
````

- Visual test runner
- Real-time test execution
- Step-by-step debugging

2. **Trace Viewer**:

```bash
npx playwright show-trace test-results/trace.zip
```

- Analyze test execution
- View network requests
- Debug test failures
