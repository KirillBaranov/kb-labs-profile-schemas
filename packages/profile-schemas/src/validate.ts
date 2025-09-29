
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import addFormats from "ajv-formats";

type Json = unknown;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// корень пакета profile-schemas
const PKG_ROOT = resolve(__dirname, "..");

// утилита: загрузить JSON из файла
async function loadJson(p: string): Promise<Json> {
  const buf = await readFile(p, "utf8");
  return JSON.parse(buf);
}

async function main() {
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  // пути к схемам (минимальный набор; расширяй по мере добавления файлов)
  const paths = {
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
  };

  // загружаем и регистрируем все схемы (ajv.addSchema использует $id)
  const schemas: Record<string, Json> = {
    profile: await loadJson(paths.profile),
    io: await loadJson(paths.io),
    diff: await loadJson(paths.diff),
    cap: await loadJson(paths.cap),
    rules: await loadJson(paths.rules),
    review: await loadJson(paths.products.review),
    tests: await loadJson(paths.products.tests),
    docs: await loadJson(paths.products.docs),
    assistant: await loadJson(paths.products.assistant),
  };

  Object.values(schemas).forEach((s) => ajv.addSchema(s));

  // пробуем скомпилировать основные схемы
  const compiled = [
    ajv.getSchema((schemas.profile as any)?.$id) ?? ajv.compile(schemas.profile),
    ajv.getSchema((schemas.io as any)?.$id) ?? ajv.compile(schemas.io),
    ajv.getSchema((schemas.diff as any)?.$id) ?? ajv.compile(schemas.diff),
    ajv.getSchema((schemas.cap as any)?.$id) ?? ajv.compile(schemas.cap),
    ajv.getSchema((schemas.rules as any)?.$id) ?? ajv.compile(schemas.rules),
  ];

  // опционально валидируем фикстуры, если пакет profile-fixtures присутствует
  const FIXTURES_DIR =
    process.env.KB_PROFILES_FIXTURES ??
    resolve(PKG_ROOT, "../profile-fixtures/fixtures");

  let fixturesChecked = 0;
  let fixturesFailed = 0;

  try {
    // минимальные фикстуры: valid/invalid профили
    const validProfilePath = resolve(FIXTURES_DIR, "valid/min.profile.json");
    const invalidProfilePath = resolve(
      FIXTURES_DIR,
      "invalid/empty-products.profile.json",
    );

    const profileSchemaId =
      (schemas.profile as any)?.$id ?? "https://schemas.kb-labs.dev/profile/profile.schema.json";
    const validateProfile = ajv.getSchema(profileSchemaId) ?? ajv.compile(schemas.profile);

    const validProfile = await loadJson(validProfilePath);
    const ok1 = validateProfile(validProfile);
    fixturesChecked++;
    if (!ok1) {
      fixturesFailed++;
      console.error("[fixtures] expected VALID, got ERR for:", validProfilePath);
      console.error(validateProfile.errors);
    }

    const invalidProfile = await loadJson(invalidProfilePath);
    const ok2 = validateProfile(invalidProfile);
    fixturesChecked++;
    if (ok2) {
      fixturesFailed++;
      console.error("[fixtures] expected INVALID, got OK for:", invalidProfilePath);
    }
  } catch (e: any) {
    // фикстур может не быть на ранних шагах — это не ошибка схем
    console.warn("[warn] fixtures not validated:", e?.message ?? String(e));
  }

  // итог
  console.log(
    `[schemas] compiled: ${compiled.length}; fixtures: checked=${fixturesChecked}, failed=${fixturesFailed}`,
  );

  if (fixturesFailed > 0) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("[schemas] validation failed:", err);
  process.exitCode = 1;
});