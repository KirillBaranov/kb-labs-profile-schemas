import profile from "../packages/profile-schemas/src/profile.schema.json"  with { type: "json" };
import rules from "../packages/profile-schemas/src/rules.schema.json"    with { type: "json" };
import io from "../packages/profile-schemas/src/profile.io.json"      with { type: "json" };
import diff from "../packages/profile-schemas/src/profile.diff.json"    with { type: "json" };
import cap from "../packages/profile-schemas/src/profile.cap.json"     with { type: "json" };

import review from "../packages/profile-schemas/src/products/review.schema.json"    with { type: "json" };
import tests from "../packages/profile-schemas/src/products/tests.schema.json"     with { type: "json" };
import docs from "../packages/profile-schemas/src/products/docs.schema.json"      with { type: "json" };
import assistant from "../packages/profile-schemas/src/products/assistant.schema.json" with { type: "json" };

export {
  profile,
  rules,
  io,
  diff,
  cap,
  review,
  tests,
  docs,
  assistant,
};

export default {
  profile,
  rules,
  io,
  diff,
  cap,
  products: { review, tests, docs, assistant }
};
