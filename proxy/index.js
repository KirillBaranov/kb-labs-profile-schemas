import profile from "../packages/profile-schemas/src/profile.schema.json"  with { type: "json" };
import rules from "../packages/profile-schemas/src/rules.schema.json"    with { type: "json" };
import io from "../packages/profile-schemas/src/profile.io.json"      with { type: "json" };
import diff from "../packages/profile-schemas/src/profile.diff.json"    with { type: "json" };
import cap from "../packages/profile-schemas/src/profile.cap.json"     with { type: "json" };
import profileManifestV1 from "../packages/profile-schemas/src/profile-manifest-v1.schema.json"  with { type: "json" };

import review from "../packages/profile-schemas/src/products/review.schema.json"    with { type: "json" };
import tests from "../packages/profile-schemas/src/products/tests.schema.json"     with { type: "json" };
import docs from "../packages/profile-schemas/src/products/docs.schema.json"      with { type: "json" };
import assistant from "../packages/profile-schemas/src/products/assistant.schema.json" with { type: "json" };
import devlink from "../packages/profile-schemas/src/products/devlink.schema.json" with { type: "json" };
import mind from "../packages/profile-schemas/src/products/mind.schema.json" with { type: "json" };
import release from "../packages/profile-schemas/src/products/release.schema.json" with { type: "json" };

export {
  profile,
  rules,
  io,
  diff,
  cap,
  profileManifestV1,
  review,
  tests,
  docs,
  assistant,
  devlink,
  mind,
  release,
};

export default {
  profile,
  rules,
  io,
  diff,
  cap,
  profileManifestV1,
  products: { review, tests, docs, assistant, devlink, mind, release }
};
