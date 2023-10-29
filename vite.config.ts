/// <reference types="vite/client" />
import { defineConfig } from "vitest/config";
import { resolve } from "node:path";
import tsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    // dts({
    //     include: ["src"],
    // }),
    ...VitePluginNode({
      // Nodejs native Request adapter
      // currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
      // you can also pass a function if you are using other frameworks, see Custom Adapter section
      adapter: "fastify",

      // tell the plugin where is your project entry
      appPath: "./src/main.ts",

      // Optional, default: 'viteNodeApp'
      // the name of named export of you app from the appPath file
      exportName: "viteNodeApp",

      // Optional, default: 'esbuild'
      // The TypeScript compiler you want to use
      // by default this plugin is using vite default ts compiler which is esbuild
      // 'swc' compiler is supported to use as well for frameworks
      // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
      // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
      tsCompiler: "esbuild",

      // Optional, default: {
      // jsc: {
      //   target: 'es2019',
      //   parser: {
      //     syntax: 'typescript',
      //     decorators: true
      //   },
      //  transform: {
      //     legacyDecorator: true,
      //     decoratorMetadata: true
      //   }
      // }
      // }
      // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
      swcOptions: {},
    }),
  ],
  // build: {
  //     minify: false,
  //     sourcemap: true,
  //     outDir: "dist",
  //     lib: {
  //         entry: resolve("src", "main.ts"),
  //         name: "uk-fuel-prices",
  //         formats: ["es", "cjs"],
  //         fileName: (format) => {
  //             switch (format) {
  //                 case "es":
  //                     return `${format}/index.mjs`;
  //                 case "cjs":
  //                     return `${format}/index.cjs`;
  //                 default:
  //                     return "index.js";
  //             }
  //         },
  //     },
  // },
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reportsDirectory: "vitest-coverage",
      enabled: true,
      reporter: ["text", "cobertura", "html"],
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
      exclude: ["**/src/test/**", "**/*.test.{ts,tsx}"],
    },
    reporters: ["default", "junit"],
    outputFile: {
      junit: "vitest-junit.xml",
    },
    testTimeout: 60000,
  },
});
