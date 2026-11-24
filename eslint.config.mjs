import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next";

export default defineConfig([
  ...next,
  globalIgnores([".next/**", ".next-dev/**", "out/**", "build/**", "next-env.d.ts"]),
]);
