# KB Labs Profile Schemas (@kb-labs/profile-schemas)

> **JSON Schema contracts and profiles for KB Labs ecosystem.** Provides validation, consistency, and compatibility between products (AI Review, AI Docs, AI Tests, AI Assistant, etc.).

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18.18.0+-green.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.0.0+-orange.svg)](https://pnpm.io/)

## 🎯 Vision

KB Labs Profile Schemas provides JSON Schema contracts and profiles for the KB Labs ecosystem. It enables standardized profile validation, consistent schemas across products, and reusable profile presets, ensuring compatibility and quality across all KB Labs products.

The project solves the problem of inconsistent profile formats and validation across multiple KB Labs products by providing a unified schema system with validation, presets, and fixtures. Instead of each product defining its own profile format, developers can use Profile Schemas for consistent validation and compatibility.

This project is part of the **@kb-labs** ecosystem and integrates seamlessly with AI Review, Core, DevKit, and all other KB Labs tools.

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/kirill-baranov/kb-labs-profile-schemas.git
cd kb-labs-profile-schemas

# Install dependencies
pnpm install
```

### Development

```bash
# Start development mode for all packages
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint
```

### Using Profile Schemas

```bash
# Install specific profile packages
pnpm add -D @kb-labs/profile-schemas
```

Example profile validation:

```typescript
import Ajv from "ajv";
import profileSchema from "@kb-labs/profile-schemas/profile";

const ajv = new Ajv();
const validate = ajv.compile(profileSchema);

const data = { 
  name: "my-profile", 
  kind: "composite", 
  scope: "repo", 
  version: "1.0.0", 
  products: {} 
};

if (!validate(data)) {
  console.error(validate.errors);
}
```

### Schema Validation

Locally validate all schemas and fixtures:

```bash
pnpm -F @kb-labs/profile-schemas run schemas:check
```

## ✨ Features

- **JSON Schema Validation**: Standardized profile validation with JSON Schema
- **Profile Presets**: Reusable presets for common use cases (I/O, backend-core, web-core)
- **Test Fixtures**: Valid and invalid profile examples for schema validation
- **Backward Compatibility**: Schema changes maintain backward compatibility
- **CI Integration**: Ready-made GitHub Actions workflows for profile validation

## 📁 Repository Structure

```
kb-labs-profile-schemas/
├── apps/                    # Demo applications
│   └── demo/                # Example app demonstrating profile usage
├── packages/                # Core packages
│   ├── profile-schemas/     # Core JSON Schema definitions for profiles and products
│   ├── profile-fixtures/    # Test profiles (valid/invalid) for schema validation
│   ├── profile-presets-io/  # I/O policy presets
│   ├── profile-presets-backend-core/  # Backend service presets
│   ├── profile-presets-web-core/      # Frontend/web project presets
│   └── profile-examples/    # Demonstration profile examples
├── docs/                    # Documentation
│   └── adr/                 # Architecture Decision Records (ADRs)
└── scripts/                 # Utility scripts
```

### Directory Descriptions

- **`apps/`** - Demo applications demonstrating profile schema usage
- **`packages/profile-schemas/`** - Core JSON Schema definitions for profiles and products
- **`packages/profile-fixtures/`** - Test profiles (valid/invalid) for schema validation
- **`packages/profile-presets-io/`** - I/O policy presets
- **`packages/profile-presets-backend-core/`** - Backend service presets
- **`packages/profile-presets-web-core/`** - Frontend/web project presets
- **`packages/profile-examples/`** - Demonstration profile examples
- **`docs/`** - Documentation including ADRs and guides

## 📦 Packages

| Package | Description |
|---------|-------------|
| [@kb-labs/profile-schemas](./packages/profile-schemas/) | Core JSON Schema definitions for profiles and products |
| [@kb-labs/profile-fixtures](./packages/profile-fixtures/) | Test profiles (valid/invalid) for schema validation |
| [@kb-labs/profile-presets-io](./packages/profile-presets-io/) | I/O policy presets |
| [@kb-labs/profile-presets-backend-core](./packages/profile-presets-backend-core/) | Backend service presets |
| [@kb-labs/profile-presets-web-core](./packages/profile-presets-web-core/) | Frontend/web project presets |
| [@kb-labs/profile-examples](./packages/profile-examples/) | Demonstration profile examples |

### Package Details

**@kb-labs/profile-schemas** provides the core schema definitions:
- Profile schema definitions with JSON Schema
- Product schema definitions for AI Review, AI Docs, AI Tests, etc.
- Schema validation utilities

**@kb-labs/profile-fixtures** provides test fixtures:
- Valid profile examples for testing
- Invalid profile examples for validation testing
- Schema validation test cases

**@kb-labs/profile-presets-io** provides I/O policy presets:
- Standard I/O policy configurations
- Reusable preset templates

**@kb-labs/profile-presets-backend-core** provides backend presets:
- Backend service profile presets
- Core backend configurations

**@kb-labs/profile-presets-web-core** provides web presets:
- Frontend/web project profile presets
- Core web configurations

**@kb-labs/profile-examples** provides example profiles:
- Complete profile examples for demonstration
- Best practices and usage patterns

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development mode for all packages |
| `pnpm build` | Build all packages |
| `pnpm build:clean` | Clean and build all packages |
| `pnpm test` | Run all tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm lint` | Lint all code |
| `pnpm lint:fix` | Fix linting issues |
| `pnpm type-check` | TypeScript type checking |
| `pnpm check` | Run lint, type-check, and tests |
| `pnpm ci` | Full CI pipeline (clean, build, check) |
| `pnpm clean` | Clean build artifacts |
| `pnpm clean:all` | Clean all node_modules and build artifacts |

## 📋 Development Policies

- **Code Style**: ESLint + Prettier, TypeScript strict mode
- **Testing**: Vitest with fixtures for integration testing
- **Versioning**: SemVer with automated releases through Changesets
- **Architecture**: Document decisions in ADRs (see `docs/adr/`)
- **Schema Validation**: All schemas must be validated against test fixtures
- **Backward Compatibility**: Schema changes must maintain backward compatibility

## 🔧 Requirements

- **Node.js**: >= 18.18.0
- **pnpm**: >= 9.0.0

## ⚙️ CI Integration

This repository uses DevKit reusable workflows.  
Any project in the ecosystem can integrate ready-made profile validation:

```yaml
jobs:
  validate-profiles:
    uses: KirillBaranov/kb-labs-devkit/.github/workflows/profiles-validate-reusable.yml@main
```

## 📚 Documentation

- [Documentation Standard](./docs/DOCUMENTATION.md) - Full documentation guidelines
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- [Architecture Decisions](./docs/adr/) - ADRs for this project

## 🔗 Related Packages

### Dependencies

- [@kb-labs/core](https://github.com/KirillBaranov/kb-labs-core) - Core utilities
- [@kb-labs/devkit](https://github.com/KirillBaranov/kb-labs-devkit) - DevKit presets

### Used By

- All KB Labs projects for profile validation
- [@kb-labs/ai-review](https://github.com/KirillBaranov/kb-labs-ai-review) - AI Review profiles
- Other KB Labs products requiring profile validation

### Ecosystem

- [KB Labs](https://github.com/KirillBaranov/kb-labs) - Main ecosystem repository

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines and contribution process.

## 📄 License

MIT © KB Labs

---

**See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines and contribution process.**
