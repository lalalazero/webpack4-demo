# demo-03 Loaders 和 Plugins

### Loaders

为什么需要 loaders? webpack 开箱即用只支持 js 和 json 两种文件类型，通过 loaders 去支持其他文件类型(less, sass, jsx, 字体，图片, ts, vue等）并转换为有效的模块，添加到依赖图中。

loader 本身是一个函数，接受源文件作为参数，返回转换的结果。

### 常见 loaders

| 名称      | 说明    |
|---------- |-------- |
| babel-loader | 转换 ES6,ES7等新js特性语法 |
| css-loader | 支持 .css文件的加载和解析 |
| less-loader | 将 .less 文件转化为 css |
| ts-loader| 将 ts 转换为 js |
| file-loader | 对图片，字体等进行打包 |
| raw-loader | 将文件以字符串的形式导入 |
| thread-loader | 多进程打包js和css |

### 曾经用过的 loader
- vue-loader
- awesome-typescript-loader
- sass-loader
- style-loader

### Plugins

Loaders 用来指定什么格式的文件应该怎么处理。
Plugins 多用于增强 webpack 功能，用于各种 bundle 文件的优化，资源的管理或者环境变量的注入等。**它作用于整个构建过程**。

### 常见的 Plugins

| 名称      | 说明    |
|---------- |-------- |
| CommonsChunkPlugin | 将chunks相同的模块代码提取成公共js |
| CleanWebpackPlugin | 清理构建目录 |
| ExtractTextWebpackPlugin | 将css从bundle文件里提取成一个独立的css文件 |
| CopyWebpackPlugin | 将文件或者文件夹拷贝到构建的输出目录 |
| HtmlWebpackPlugin | 创建 html 文件去承载输出的 bundle |
| UglifyjsWebpackPlugin | 压缩 js |
| ZipWebpackPlugin | 将打包出的资源生成一个 zip 包 |

### Mode
mode 是 webpack 4 提出的新概念，用来指定当前的构建环境： `production`,`development`,`none`,默认值是 `production`

对于不同的 mode, webpack 内置了一些操作。

| mode | 默认操作 |
| ------------- | --------------- |
| development | 设置 process.env.NODE_ENV 的值是 development，开启 NamedChunksPlugin 和 NamedModulesPlugin |
| production | 设置 process.env.NODE_ENV 的值是 production，开启 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin,SideEffectsFlagPlugin 和 TerserPlugin |
| none | 不开启任何优化选项 |