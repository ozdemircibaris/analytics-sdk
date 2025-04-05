import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
  // UMD build (for browsers)
  {
    input: "src/index.ts",
    output: {
      name: "analyticsSDK",
      file: "dist/index.umd.js",
      format: "umd",
      exports: "named",
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" }), terser()],
  },
  // ESM and CJS builds (for bundlers and Node.js)
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "es",
        exports: "named",
        sourcemap: true,
      },
    ],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },
];
