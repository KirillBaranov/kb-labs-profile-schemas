# Contributing to KB Labs Profile Schemas

Thanks for considering a contribution to **KB Labs Profile Schemas**!  
This project provides JSON Schema contracts and profiles for the KB Labs ecosystem.

---

## 🚀 Development Setup

### Prerequisites

- **Node.js:** >= 18.18.0
- **pnpm:** >= 9.0.0

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/kirill-baranov/kb-labs-profile-schemas.git
cd kb-labs-profile-schemas

# Install dependencies
pnpm install

# Start development mode
pnpm dev
```

## 📋 Development Guidelines

### Code Style

- Follow **ESLint** and **Prettier** rules configured in the project
- Use **TypeScript strict mode** for all new code
- Run `pnpm lint` before committing changes
- Use `pnpm lint:fix` to automatically fix formatting issues

### Testing

- Write tests for all new functionality using **Vitest**
- Maintain or improve test coverage
- Run `pnpm test` to execute all tests
- Use `pnpm test:watch` for development
- Ensure all schemas are validated against test fixtures

### Schema Development

- Each schema package in `packages/` should be self-contained
- Follow the existing package structure and naming conventions
- Update package README files when adding new functionality
- Ensure all packages build successfully with `pnpm build`
- Maintain backward compatibility for schema changes
- Validate schemas against test fixtures before committing

### Commit Messages

Use clear, conventional commit messages:

```bash
feat: add new profile schema for web applications
fix: correct validation rules for backend profiles
docs: update schema documentation
test: add unit tests for profile validation
refactor: simplify schema structure
```

### Architecture Decisions

- For significant architectural changes, create an **ADR** (Architecture Decision Record) in `docs/adr/`
- Follow the ADR template in `docs/adr/0000-template.md`
- Include required metadata (Date, Status, Deciders, **Last Reviewed**, **Tags**)
- **Last Reviewed** date is required and should be updated periodically
- **Tags** are mandatory (minimum 1, maximum 5 tags from approved list)
- See [Documentation Standard](./docs/DOCUMENTATION.md) for ADR format requirements

## 🔄 DevKit Integration

This project uses `@kb-labs/devkit` for shared tooling configurations. Key points:

- **Configurations**: ESLint, Prettier, Vitest, TypeScript, and GitHub Actions are managed by devkit
- **Local configs**: Act as thin wrappers over devkit configurations
- **Updates**: When devkit is updated, run `pnpm install` to get the latest configurations
- **Customization**: For project-specific rules, extend devkit configs rather than overriding them

### DevKit Commands

- `pnpm devkit:sync` - Sync DevKit configurations (runs automatically on install)
- `pnpm devkit:check` - Check if sync is needed
- `pnpm devkit:force` - Force sync (overwrites existing configs)
- `pnpm devkit:help` - Show help and available options

For more details, see [ADR-0005: Use DevKit for Shared Tooling](docs/adr/0005-use-devkit-for-shared-tooling.md).

## 🔄 Pull Request Process

### Before Submitting

1. **Fork** the repository and create a feature branch
2. **Make your changes** following the guidelines above
3. **Run quality checks:**
   ```bash
   pnpm check  # Runs lint + type-check + tests
   ```
4. **Update documentation** if needed (README files, inline comments)
5. **Test your changes** thoroughly, especially schema validation

### Submitting the PR

1. **Push** your changes to your fork
2. **Create a Pull Request** with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Reference any related issues
   - Examples of schema usage if applicable

### Review Process

- All PRs require review before merging
- Address feedback promptly and professionally
- Keep PRs focused and reasonably sized
- Update your branch if the main branch has moved forward

## 🐛 Reporting Issues

When reporting bugs or requesting features:

1. **Check existing issues** to avoid duplicates
2. **Provide clear reproduction steps** for bugs
3. **Include environment details** (Node.js version, OS, etc.)
4. **Use appropriate labels** and templates

## 📚 Additional Resources

- [Architecture Decision Records](./docs/adr/) - Project architecture decisions
- [Package Documentation](./packages/) - Individual package README files
- [Development Scripts](./README.md#-available-scripts) - Available npm scripts

---

**See [Documentation Standard](./docs/DOCUMENTATION.md) for complete documentation guidelines.**
