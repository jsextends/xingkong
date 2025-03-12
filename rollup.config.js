const resolve = require("@rollup/plugin-node-resolve")
const commonjs = require("@rollup/plugin-commonjs")
const terser = require("@rollup/plugin-terser")
module.exports = {
  input: "src/index.js",
  output: [
    {
      file: "dist/xingkong.js",
      format: "umd",
      name: "xingkong",
    },
    {
      file: "dist/xingkong.min.js",
      format: "umd",
      name: "xingkong",
      plugins: [terser()]
    },
  ],
  plugins: [
    resolve(), // 告诉 Rollup 如何查找和处理第三方模块
    commonjs(), // 将 CommonJS 模块转换为 ES6，以便 Rollup 可以处理它们
  ],
};
