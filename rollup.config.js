import { defineConfig } from 'rollup';
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import { terser } from 'rollup-plugin-terser';


const isDevelopment = process.env.ROLLUP_WATCH ? true : false;


const serveOptions = {
  contentBase: ["./dist", "./"],
  host: "0.0.0.0",
  port: 3000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};
const terserOptions = {
  format: {
    comments: false
  }
};

export default defineConfig(
  [
    {
      input: "src/main.ts",
      output: {
        file: "dist/swipe-navigation.js",
        format: "es",
        sourcemap: isDevelopment,
      },
      watch:{
        chokidar: {
          // Workaround for WSL2-based Docker
          usePolling: true,
        }
      },
      plugins: [
        typescript({
          sourceMap: isDevelopment,
          outputToFilesystem: true,
        }),
        nodeResolve(),
        // Serve or Uglify based on develop or release
        isDevelopment ? serve(serveOptions) : terser(terserOptions),
      ]
    },
  ]
);
