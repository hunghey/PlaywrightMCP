# Playwright TypeScript Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-v1.56+-2EAD33?style=flat-square&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v18.0+-339933?style=flat-square&logo=node.js&logoColor=white)

## Introduction

This repository contains a professional **End-to-End (E2E) Automation Framework** built with **Playwright** and **TypeScript**.

The framework implements industry best practices including the **Page Object Model (POM)** pattern, data-driven testing with CSV integration, and a modular architecture that promotes code reusability and maintainability.

## Key Features

- **Page Object Model (POM)**+

- **CSV Data Provider**

- **Environment Configuration**

- **Test Data Generation**

## Project Structure

```
PlaywrightMCp/
├── config/                      # Environment and configuration files
│   └── environment.ts           # Site configuration and environment settings
├── data/                        # CSV data files for data-driven testing
│   └── created_users.csv        # User credentials storage
├── pages/                       # Page Object Model classes
│   ├── components/              # Reusable UI components
│   │   └── NavbarComponent.ts   # Navigation bar component
│   ├── basePage.ts              # Base class for all page objects
│   ├── HomePage.ts              # Home page object
│   ├── SignupPage.ts            # Sign-up page object
│   ├── AccountInfoPage.ts       # Account information page object
│   ├── AccountCreatedPage.ts    # Account creation confirmation page
│   ├── DashboardPage.ts         # User dashboard page object
│   └── DeleteAccountPage.ts     # Account deletion page object
├── tests/                       # Test specifications
│   └── auth/                    # Authentication capability tests
│       └── auth.spec.ts         # User authentication and management test suite
├── utils/                       # Utility helper functions
│   ├── csvUtils.ts              # CSV read/write operations for test data
│   └── testDataGenerator.ts     # Test data generation utilities
├── .env                         # Environment variables (not committed)
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies and scripts
├── playwright.config.ts         # Main Playwright configuration
└── README.md                    # Project documentation
```

## Prerequisites & Installation

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: v18.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0 or higher (comes with Node.js)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd PlaywrightMCp
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Configure environment variables (if required):**
   - Create a `.env` file in the root directory
   - Add any required environment variables (see `config/environment.ts` for reference)

### Verify Installation

Run a quick test to verify everything is set up correctly:

```bash
npx playwright test --list
```

This command will list all available tests without executing them, confirming that Playwright is properly configured.

## Running Tests

For detailed information on running tests, see [INSTRUCTIONS.md](./INSTRUCTIONS.md).

Quick reference:
- Run all tests: `npx playwright test`
- Run in UI mode: `npx playwright test --ui`
- Run in debug mode: `npx playwright test --debug`
- View test report: `npx playwright show-report`

## Technology Stack

- **Playwright**: v1.56.0 - Modern browser automation framework
- **TypeScript**: v5.0+ - Type-safe JavaScript
- **Faker.js**: v10.2.0 - Test data generation
- **csv-parse**: v6.1.0 - CSV file parsing
- **dotenv**: v17.2.3 - Environment variable management

## Contributing

When contributing to this project, please ensure:

1. Follow the existing Page Object Model pattern
2. Maintain consistent code formatting and style
3. Add appropriate test data to CSV files when needed
4. Update documentation for any new features or changes

## License

ISC
