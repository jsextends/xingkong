const { uglify } = require("rollup-plugin-uglify")
module.exports = {
    input: 'src/index.js',
    output: {
        file: 'dist/xingkong.js',
        format: 'umd',
        name: "xingkong"
    },
    // plugins: [uglify()]
};