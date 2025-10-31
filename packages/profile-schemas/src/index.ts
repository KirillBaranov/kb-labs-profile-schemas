// Primary export surface with stable names expected by consumers
export { default as profile } from './profile.schema.json' assert { type: 'json' };
export { default as rules } from './rules.schema.json' assert { type: 'json' };
export { default as io } from './profile.io.json' assert { type: 'json' };
export { default as diff } from './profile.diff.json' assert { type: 'json' };
export { default as cap } from './profile.cap.json' assert { type: 'json' };
export { default as profileManifestV1 } from './profile-manifest-v1.schema.json' assert { type: 'json' };

// Product schemas
export { default as review } from './products/review.schema.json' assert { type: 'json' };
export { default as tests } from './products/tests.schema.json' assert { type: 'json' };
export { default as docs } from './products/docs.schema.json' assert { type: 'json' };
export { default as assistant } from './products/assistant.schema.json' assert { type: 'json' };
export { default as devlink } from './products/devlink.schema.json' assert { type: 'json' };
export { default as mind } from './products/mind.schema.json' assert { type: 'json' };
export { default as release } from './products/release.schema.json' assert { type: 'json' };
