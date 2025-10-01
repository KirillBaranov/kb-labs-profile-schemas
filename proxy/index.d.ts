import type { JSONSchema7 } from "json-schema";

declare module "@kb-labs/profile-schemas" {
  export const profile: JSONSchema7;
  export const rules: JSONSchema7;
  export const io: JSONSchema7;
  export const diff: JSONSchema7;
  export const cap: JSONSchema7;

  export const review: JSONSchema7;
  export const tests: JSONSchema7;
  export const docs: JSONSchema7;
  export const assistant: JSONSchema7;

  declare const _default: {
    profile: JSONSchema7;
    rules: JSONSchema7;
    io: JSONSchema7;
    diff: JSONSchema7;
    cap: JSONSchema7;
    products: {
      review: JSONSchema7;
      tests: JSONSchema7;
      docs: JSONSchema7;
      assistant: JSONSchema7;
    };
  };

  export default _default;
}

declare module "@kb-labs/profile-schemas/profile" {
  const schema: JSONSchema7;
  export default schema;
}
declare module "@kb-labs/profile-schemas/rules" {
  const schema: JSONSchema7;
  export default schema;
}
declare module "@kb-labs/profile-schemas/profile.io" {
  const schema: JSONSchema7;
  export default schema;
}
declare module "@kb-labs/profile-schemas/profile.diff" {
  const schema: JSONSchema7;
  export default schema;
}
declare module "@kb-labs/profile-schemas/profile.cap" {
  const schema: JSONSchema7;
  export default schema;
}
declare module "@kb-labs/profile-schemas/products/review" {
  const schema: JSONSchema7;
  export default schema;
}
declare module "@kb-labs/profile-schemas/products/tests" {
  const schema: JSONSchema7;
  export default schema;
}
declare module "@kb-labs/profile-schemas/products/docs" {
  const schema: JSONSchema7;
  export default schema;
}
declare module "@kb-labs/profile-schemas/products/assistant" {
  const schema: JSONSchema7;
  export default schema;
}
