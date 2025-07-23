import { defineConfig } from "tsup";

export default defineConfig([
  // Node.js build (CJS + ESM)
  {
    entry: ["src/bmp-444.ts", "src/itau-400.ts", "src/index.ts"],
    outDir: "dist",
    format: ["esm", "cjs"],
    target: "node22",
    dts: true,
    splitting: false,
    clean: true,
    sourcemap: true,
  },

  // Browser build (bundled ESM)
  {
    entry: ["src/bmp-444.ts", "src/itau-400.ts", "src/index.ts"],
    outDir: "dist/browser",
    format: ["esm"],
    target: "es2018",
    bundle: true,
    minify: true,
    sourcemap: true,
    dts: false, // no need to emit d.ts again
    define: {
      "process.env.NODE_ENV": '"production"',
    },
  },
]);
