# KB Labs Profile Schemas

A **monorepo with JSON Schema contracts and profiles** for the KB Labs ecosystem.  
It provides validation, consistency, and compatibility between products (AI Review, AI Docs, AI Tests, AI Assistant, etc.).

**Goals:** Standardized profile validation, consistent schemas across products, and reusable profile presets.

## 📁 Repository Structure

```
apps/
├── demo/                    # Example app demonstrating profile usage
packages/
├── profile-schemas/         # Core JSON Schema definitions for profiles and products
├── profile-fixtures/        # Test profiles (valid/invalid) for schema validation
├── profile-presets-io/      # I/O policy presets
├── profile-presets-backend-core/  # Backend service presets
├── profile-presets-web-core/      # Frontend/web project presets
└── profile-examples/        # Demonstration profile examples
docs/
└── adr/                     # Architecture Decision Records (ADRs)
```

## 📦 Available Packages

- **[@kb-labs/profile-schemas](./packages/profile-schemas/)** — Core JSON Schema definitions for profiles and products
- **[@kb-labs/profile-fixtures](./packages/profile-fixtures/)** — Test profiles (valid/invalid) for schema validation
- **[@kb-labs/profile-presets-io](./packages/profile-presets-io/)** — I/O policy presets
- **[@kb-labs/profile-presets-backend-core](./packages/profile-presets-backend-core/)** — Backend service presets
- **[@kb-labs/profile-presets-web-core](./packages/profile-presets-web-core/)** — Frontend/web project presets
- **[@kb-labs/profile-examples](./packages/profile-examples/)** — Demonstration profile examples

## 🚀 Quick Start

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev         # Parallel dev mode for selected packages/apps
pnpm build       # Build all packages
pnpm test        # Run tests
pnpm lint        # Lint code
```

### Using Profile Schemas

```bash
# Install specific profile packages
pnpm add -D @kb-labs/profile-schemas
```

Example profile validation:
```ts
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

- **Code Style:** ESLint + Prettier, TypeScript strict mode
- **Testing:** Vitest with fixtures for integration testing
- **Versioning:** SemVer with automated releases through Changesets
- **Architecture:** Document decisions in ADRs (see `docs/adr/`)
- **Schema Validation:** All schemas must be validated against test fixtures
- **Backward Compatibility:** Schema changes must maintain backward compatibility

## ⚙️ CI Integration

This repository uses DevKit reusable workflows.  
Any project in the ecosystem can integrate ready-made profile validation:

```yaml
jobs:
  validate-profiles:
    uses: KirillBaranov/kb-labs-devkit/.github/workflows/profiles-validate-reusable.yml@main
```

## 🔧 Requirements

- **Node.js:** >= 18.18.0
- **pnpm:** >= 9.0.0

## 📄 License

MIT © KB Labs