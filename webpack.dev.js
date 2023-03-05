// webpack.dev.js
const path = require('path');
const { merge } = require('webpack-merge');  // 引入webpack-merge功能模块
const common = require('./webpack.common.js'); // 引入webpack.common.js

module.exports = merge(common, {   // 将webpack.common.js合并到当前文件
    devServer: {
        static: path.join(__dirname, "dist"), // 原contentBase
        hot: true,
        port: '8080',
        client: { // 编译出错时在浏览器上显示错误
            overlay: {
                warnings: false,
                errors: true,
            }
        },
        open: true,
    },
})