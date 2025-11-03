# KB Labs Profile Schemas Documentation Standard

> **This document is a project-specific copy of the KB Labs Documentation Standard.**  
> See [Main Documentation Standard](https://github.com/KirillBaranov/kb-labs/blob/main/docs/DOCUMENTATION.md) for the complete ecosystem standard.

This document defines the documentation standards for **KB Labs Profile Schemas**. This project follows the [KB Labs Documentation Standard](https://github.com/KirillBaranov/kb-labs/blob/main/docs/DOCUMENTATION.md) with the following project-specific customizations:

## Project-Specific Customizations

KB Labs Profile Schemas provides JSON Schema contracts and profiles for the KB Labs ecosystem. Documentation should emphasize:
- Schema definitions and validation
- Profile structure and requirements
- Preset usage and customization
- Backward compatibility guidelines

## Project Documentation Structure

```
docs/
├── README.md              # Documentation index (optional)
├── DOCUMENTATION.md       # This standard (REQUIRED)
├── adr/                   # Architecture Decision Records
│   ├── 0000-template.md  # ADR template
│   └── *.md               # ADR files
└── guides/                # Detailed guides (optional)
    └── *.md
```

## Required Documentation

This project requires:

- [x] `README.md` in root with all required sections
- [x] `CONTRIBUTING.md` in root with development guidelines
- [x] `docs/DOCUMENTATION.md` (this file)
- [x] `docs/adr/0000-template.md` (ADR template)
- [x] `LICENSE` in root

## Optional Documentation

Consider adding:

- [ ] `docs/guides/schema-definitions.md` - Schema structure guide
- [ ] `docs/guides/profile-presets.md` - Preset usage guide
- [ ] `docs/guides/validation.md` - Validation patterns
- [ ] `docs/guides/backward-compatibility.md` - Breaking change guidelines

## ADR Requirements

All ADRs must follow the format defined in the [main standard](https://github.com/KirillBaranov/kb-labs/blob/main/docs/DOCUMENTATION.md#architecture-decision-records-adr) with:

- Required metadata: Date, Status, Deciders, Last Reviewed, Tags
- Minimum 1 tag, maximum 5 tags
- Tags from approved list
- See `docs/adr/0000-template.md` for template

## Cross-Linking

This project links to:

**Dependencies:**
- [@kb-labs/core](https://github.com/KirillBaranov/kb-labs-core) - Core utilities
- [@kb-labs/devkit](https://github.com/KirillBaranov/kb-labs-devkit) - DevKit presets

**Used By:**
- All KB Labs projects for profile validation
- [@kb-labs/ai-review](https://github.com/KirillBaranov/kb-labs-ai-review) - AI Review profiles
- Other KB Labs products requiring profile validation

**Ecosystem:**
- [KB Labs](https://github.com/KirillBaranov/kb-labs) - Main ecosystem repository

---

**Last Updated:** 2025-11-03  
**Standard Version:** 1.0 (following KB Labs ecosystem standard)  
**See Main Standard:** [KB Labs Documentation Standard](https://github.com/KirillBaranov/kb-labs/blob/main/docs/DOCUMENTATION.md)


