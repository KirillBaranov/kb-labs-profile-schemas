// Re-export schemas as JSON (these will be available via package exports)
export { default as profileSchema } from './profile.schema.json' assert { type: 'json' };
export { default as rulesSchema } from './rules.schema.json' assert { type: 'json' };
export { default as profileIoSchema } from './profile.io.json' assert { type: 'json' };
export { default as profileDiffSchema } from './profile.diff.json' assert { type: 'json' };
export { default as profileCapSchema } from './profile.cap.json' assert { type: 'json' };

// Re-export product schemas
export { default as reviewSchema } from './products/review.schema.json' assert { type: 'json' };
export { default as testsSchema } from './products/tests.schema.json' assert { type: 'json' };
export { default as docsSchema } from './products/docs.schema.json' assert { type: 'json' };
export { default as assistantSchema } from './products/assistant.schema.json' assert { type: 'json' };
