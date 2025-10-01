
import { readFile, readdir } from "node:fs/promises";
import { resolve, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { ValidateFunction } from "ajv";
import Ajv from "ajv";
import addFormats from "ajv-formats";

/** ---------- Logging ---------- */

type LogLevel = "debug" | "info" | "warn" | "error";
const LEVELS: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };
const LOG_LEVEL: LogLevel =
  (process.env.KB_PROFILES_LOG as LogLevel) ||
  (process.env.KB_PROFILES_VERBOSE ? "debug" : "info");

function log(level: LogLevel, ...args: unknown[]) {
  if (LEVELS[level] < LEVELS[LOG_LEVEL]) { return; }
  const tag = `[schemas:${level}]`;
  (console as any)[level === "debug" ? "log" : level](tag, ...args);
}

/** ---------- Paths & IDs ---------- */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PKG_ROOT = resolve(__dirname, "..");

// co-located packages (optional presence)
const DIR_FIXTURES =
  process.env.KB_PROFILES_FIXTURES ?? resolve(PKG_ROOT, "../profile-fixtures/src");
const DIR_PRESETS_IO = resolve(PKG_ROOT, "../profile-presets-io/src");

// schema file paths (in this package)
const PATHS = {
  profile: resolve(PKG_ROOT, "src/profile.schema.json"),
  io: resolve(PKG_ROOT, "src/profile.io.json"),
  diff: resolve(PKG_ROOT, "src/profile.diff.json"),
  cap: resolve(PKG_ROOT, "src/profile.cap.json"),
  rules: resolve(PKG_ROOT, "src/rules.schema.json"),
  products: {
    review: resolve(PKG_ROOT, "src/products/review.schema.json"),
    tests: resolve(PKG_ROOT, "src/products/tests.schema.json"),
    docs: resolve(PKG_ROOT, "src/products/docs.schema.json"),
    assistant: resolve(PKG_ROOT, "src/products/assistant.schema.json"),
  },
} as const;

/** Fallback canonical IDs (used if a schema JSON lacks $id for some reason) */
const ID = {
  profile: "https://schemas.kb-labs.dev/profile/profile.schema.json",
  io: "https://schemas.kb-labs.dev/profile/profile.io.json",
  diff: "https://schemas.kb-labs.dev/profile/profile.diff.json",
  cap: "https://schemas.kb-labs.dev/profile/profile.cap.json",
  rules: "https://schemas.kb-labs.dev/profile/rules.schema.json",
} as const;

type Json = unknown;

type Schemas = {
  profile: Json;
  io: Json;
  diff: Json;
  cap: Json;
  rules: Json;
  review: Json;
  tests: Json;
  docs: Json;
  assistant: Json;
};

/** ---------- Small Utilities ---------- */

async function readJson(p: string): Promise<Json> {
  const buf = await readFile(p, "utf8");
  return JSON.parse(buf);
}

async function listJson(dir: string): Promise<string[]> {
  try {
    const items = await readdir(dir);
    const files = items.filter((f: string) => f.endsWith(".json")).map((f: string) => resolve(dir, f));
    log("debug", "listJson:", dir, "→", files.length, "files");
    return files;
  } catch (e: any) {
    log("debug", "listJson: skip (no dir)", dir, "-", e?.message ?? String(e));
    return [];
  }
}

function basename(p: string): string {
  const parts = p.split(sep);
  return parts[parts.length - 1] || p;
}

/** ---------- Ajv Factory & Schema Loading ---------- */

function createAjv(): Ajv {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  return ajv;
}

async function loadSchemas(): Promise<Schemas> {
  log("debug", "loading schemas from PATHS");
  return {
    profile: await readJson(PATHS.profile),
    io: await readJson(PATHS.io),
    diff: await readJson(PATHS.diff),
    cap: await readJson(PATHS.cap),
    rules: await readJson(PATHS.rules),
    review: await readJson(PATHS.products.review),
    tests: await readJson(PATHS.products.tests),
    docs: await readJson(PATHS.products.docs),
    assistant: await readJson(PATHS.products.assistant),
  };
}

function registerAll(ajv: Ajv, schemas: Schemas): void {
  Object.entries(schemas).forEach(([k, s]) => {
    ajv.addSchema(s as any);
    const id = (s as any)?.$id;
    log("debug", "addSchema:", k, id ? `id=${id}` : "(no $id)");
  });
}

/** Returns existing validator by $id or compiles the given schema JSON. */
function getOrCompile(
  ajv: Ajv,
  targetId: string,
  fallbackSchema?: Json
): ValidateFunction {
  const v = ajv.getSchema(targetId);
  if (v) {
    log("debug", "getSchema hit:", targetId);
    return v;
  }
  if (!fallbackSchema) {
    throw new Error(
      `Schema with id "${targetId}" not registered and no fallback provided.`
    );
  }
  log("debug", "compile schema for id:", targetId);
  return ajv.compile(fallbackSchema);
}

/** ---------- Runners ---------- */

type Counters = { checked: number; failed: number };

async function validateFixtures(
  ajv: Ajv,
  schemas: Schemas,
  dirFixtures: string
): Promise<Counters> {
  const counters: Counters = { checked: 0, failed: 0 };

  // Use profile schema for fixture profiles
  const profileId = (schemas.profile as any)?.$id ?? ID.profile;
  const validateProfile = getOrCompile(ajv, profileId, schemas.profile);

  const validFiles = await listJson(resolve(dirFixtures, "valid"));
  const invalidFiles = await listJson(resolve(dirFixtures, "invalid"));

  for (const p of validFiles) {
    log("debug", "fixture VALID:", p);
    const data = (await readJson(p)) as any;
    const ok = validateProfile(data);
    counters.checked++;
    if (!ok) {
      counters.failed++;
      log("error", "[fixtures] expected VALID, got ERR:", p, validateProfile.errors);
    } else {
      log("debug", "fixture OK:", p);
    }
  }

  for (const p of invalidFiles) {
    log("debug", "fixture INVALID:", p);
    const data = (await readJson(p)) as any;
    const ok = validateProfile(data);
    counters.checked++;
    if (ok) {
      counters.failed++;
      log("error", "[fixtures] expected INVALID, got OK:", p);
    } else {
      log("debug", "fixture correctly failed:", p);
    }
  }

  return counters;
}

async function validatePresetsIo(
  ajv: Ajv,
  schemas: Schemas,
  dirPresets: string
): Promise<Counters> {
  const counters: Counters = { checked: 0, failed: 0 };

  const files = await listJson(dirPresets);
  if (files.length === 0) {
    log("debug", "no presets found in", dirPresets);
    return counters; // optional
  }

  const ioId = (schemas.io as any)?.$id ?? ID.io;
  const diffId = (schemas.diff as any)?.$id ?? ID.diff;
  const capId = (schemas.cap as any)?.$id ?? ID.cap;

  const vIO = getOrCompile(ajv, ioId, schemas.io);
  const vDIFF = getOrCompile(ajv, diffId, schemas.diff);
  const vCAP = getOrCompile(ajv, capId, schemas.cap);

  for (const p of files) {
    const base = basename(p);
    let validator: ValidateFunction | null = null;
    let kind = "";
    if (base.startsWith("io.")) {
      validator = vIO;
      kind = "io";
    } else if (base.startsWith("diff.")) {
      validator = vDIFF;
      kind = "diff";
    } else if (base.startsWith("cap.")) {
      validator = vCAP;
      kind = "cap";
    } else {
      log("debug", "skip non-preset file:", base);
      continue;
    }

    try {
      log("debug", `preset ${kind}:`, p);
      const data = (await readJson(p)) as any;
      const ok = validator(data);
      counters.checked++;
      if (!ok) {
        counters.failed++;
        log("error", "[presets] invalid:", p, validator.errors);
      } else {
        log("debug", "preset OK:", p);
      }
    } catch (e: any) {
      counters.failed++;
      counters.checked++; // считаем попытку
      log("error", "[presets] parse error:", p, e?.message ?? String(e));
    }
  }
  return counters;
}

/** ---------- Main Orchestrator ---------- */

async function main() {
  log("info", "validator start", { LOG_LEVEL, PKG_ROOT });
  const ajv = createAjv();
  const schemas = await loadSchemas();
  registerAll(ajv, schemas);

  // compile a few core schemas just to ensure they're valid
  const compiled = [
    getOrCompile(ajv, (schemas.profile as any)?.$id ?? ID.profile, schemas.profile),
    getOrCompile(ajv, (schemas.io as any)?.$id ?? ID.io, schemas.io),
    getOrCompile(ajv, (schemas.diff as any)?.$id ?? ID.diff, schemas.diff),
    getOrCompile(ajv, (schemas.cap as any)?.$id ?? ID.cap, schemas.cap),
    getOrCompile(ajv, (schemas.rules as any)?.$id ?? ID.rules, schemas.rules),
  ];
  log("debug", "compiled validators:", compiled.length);

  // fixtures (optional presence)
  let fixtures: Counters = { checked: 0, failed: 0 };
  try {
    fixtures = await validateFixtures(ajv, schemas, DIR_FIXTURES);
  } catch (e: any) {
    log("warn", "fixtures not validated:", e?.message ?? String(e));
  }

  // presets IO (optional presence)
  let presetsIo: Counters = { checked: 0, failed: 0 };
  try {
    presetsIo = await validatePresetsIo(ajv, schemas, DIR_PRESETS_IO);
  } catch (e: any) {
    log("warn", "presets not validated:", e?.message ?? String(e));
  }

  // summary
  log(
    "info",
    `compiled: ${compiled.length}; fixtures: checked=${fixtures.checked}, failed=${fixtures.failed}; presets: checked=${presetsIo.checked}, failed=${presetsIo.failed}`
  );

  if (fixtures.failed > 0 || presetsIo.failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  log("error", "validation failed:", err);
  process.exitCode = 1;
});