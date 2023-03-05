本工程使用纯粹的webpack书写，用于在纯净环境下观察webpack的用法

#### 前期创建方式：
`npm init -y`
`webpack webpack-cli --save-dev`
按以下创建文件夹及文件
|-- yourProjectName
    |-- package-lock.json
    |-- package.json
    |-- readme.md
    |-- webpack.config.js
    |-- dist
    |   |-- index.html
    |-- src
        |-- index.js
`webpack`或在package.json添加`"dev": "webpack"`后运行`npm run dev`

webpack是一个打包工具，他的宗旨是一切静态资源皆可打包。webpack做的事情是：分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。

#### webpack核心概念

1、Entry（入口）：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

2、Output（出口）：告诉 webpack 在哪里输出它所创建的结果文件，以及如何命名这些文件，默认值为./dist。

3、Loader（模块转换器）：将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

4、Plugins（插件）：在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。

5、Module(模块)：开发者将程序分解成离散功能块，并称之为模块，

在webpack里一个模块对应着一个文件，webpack会从配置的 Entry 开始递归找出所有依赖的模块。

#### webpack执行流程

webpack启动后会在entry里配置的module开始递归解析entry所依赖的所有module，每找到一个module, 就会根据配置的loader去找相应的转换规则，对module进行转换后在解析当前module所依赖的module，这些模块会以entry为分组，一个entry和所有相依赖的module也就是一个chunk，最后webpack会把所有chunk转换成文件输出，在整个流程中webpack会在恰当的时机执行plugin的逻辑

#### 构建本地服务
`npm install webpack-dev-server -D`

在webpack.config.js添加：
```json
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
        // hot: true, // 模块替换功能，实时预览
        hot: "only", // 在构建失败的情况下启用无需页面刷新的热模块替换作为后备
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

    devtool: 'source-map'
```
#### 配置loader
`npm install style-loader css-loader -D`
`npm install -D sass-loader@^10 sass`


#### 插件
插件（Plugins）是用来拓展Webpack功能的，它们会在整个构建过程中生效，执行相关的任务。
Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，插件并不直接操作单个文件，它直接对整个构建过程其作用。

