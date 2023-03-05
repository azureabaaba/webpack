const path = require('path') // 处理绝对路径
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, '/src/index.js'), // 入口文件

    output: {
        path: path.join(__dirname, '/dist'), //打包后的文件存放的地方
        filename: 'bundle.js' //打包后输出文件的文件名
    },
    // path.join的功能是拼接路径片段
    // __dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录

    devServer: {
        server: "http",
        static: path.join(__dirname, "dist"), // 原contentBase
        headers: [
            {
              key: 'X-Custom',
              value: 'foo',
            },
            {
              key: 'Y-Custom',
              value: 'bar',
            },
        ],
        hot: true, // 模块替换功能，实时预览
        // hot: "only", // 在构建失败的情况下启用无需页面刷新的热模块替换作为后备
        host: "localhost",
        port: 8080, // 开启服务器的端口号
        open: true, // devserver启动且第一次完成构建时，自动使用系统默认浏览器打开网页
        client: { // 编译出错时在浏览器上显示错误
            overlay: {
                warnings: false,
                errors: true,
            }
        },
        proxy: { // 跨域问题
            '/api': {
                target: 'http://localhost:8888', // 目标接口的域名（服务器接口）
                changeOrigin: true, // 是否跨域
                secure: false, // 代理地址没证书也可以代理成功 
                pathRewrite: {
                    '^api': '' // 重写路径
                }
            }
        }
    },

    mode: "development",

    devtool: 'source-map',

    // loader
    module: {
        rules: [
          {
            test: /\.css$/,   // 正则匹配以.css结尾的文件
            use: ['style-loader', 'css-loader']  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
          },
          {
            test: /\.(scss|sass)$/,   // 正则匹配以.scss和.sass结尾的文件
            use: ['style-loader', 'css-loader', 'sass-loader']  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
          }
        ]
    },
    
    // 插件
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),  // new一个插件的实例
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "/src/index.html")// new一个这个插件的实例，并传入相关的参数
        }),
        // new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin() // 热更新插件 
    ]
}