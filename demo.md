# demo-08 

## 清理构建目录

- 通过 `npm scripts` 清理

```json
{
    "build": "rm -rf ./dist && webpack",
    "build2": "rimraf ./dist && webpack"
}
```

- 通过插件自动清理
`clean-webpack-plugin` 默认会删除 output 指定的输出目录
```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
{
    // webpack.config.js ... 省略其他配置
    plugins: [
        new CleanWebpackPlugin()
    ]
}
```
npm 添加依赖 `npm i clean-webpack-plugin -D`

清理效果对比分析：

- 由于 `production` 模式打包用到了 `chunkhash` 和 `contenthash`，为了对比插件的清理效果，每次打包之后先手动修改下 js 和 css 文件，然后每次打包出来的文件指纹不同，就能体会到不清理目录的话 `dist` 目录下东西会越来越多的问题。
- `production` 和 `development` 都打包一下，由于 `development` 模式没有设置文件指纹，也可以看到两次打包的文件都在 `dist` 目录保留了下来。

## CSS3 前缀自动补全

浏览器内核不同，CSS 属性实现不一样

| 浏览器 | 内核 | 前缀补齐 |
|--------|------ |------- |
| IE 浏览器 | Trident | -ms |
| 火狐浏览器 | Geko | -moz |
| 谷歌浏览器 | Webkit | -webkit |
| Opera 浏览器 | Presto | -o |

`PostCSS` 插件配合 `autoprefixer` 插件自动补齐前缀。
原理是根据 [Can I Use](https://caniuse.com) 规则配合浏览器版本
```javascript
{
    // webpack.config.js ...省略其他配置
    rules: [
        {
                test: /\.less/,
                use: [
                    'style-loader', 'css-loader', 'less-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')({
                                overrideBrowserslist: ['last 2 version','>1%','IOS 7']
                            })]
                        }
                    }
                ]
            },
    ]
}
```
npm 添加依赖 `npm i postcss-loader autoprefixer -D`

关于 loader 顺序
- postcss-loader 执行顺序必须保证在 css-loader 之前，建议还是放在 less或者 sass 等预处理器之后更好。即 loader 顺序：
    less-loader -> postcss-loader -> css-loader -> style-loader 或者 MiniCssExtractPlugin.loader。
    其实 postcss-loader 放在 less-loader 之前问题也不大，平时使用的 less 里面的语法基本不会和 autoprefixer 处理产生冲突的。

如果构建的时候警告你 postcss-loader 没有生效（`You did not set any plugins, parser, or stringifier. Right now, PostCSS does nothing`）看下插件官网最新的 plugins 配置写法是怎么样的。

对比自动补全效果：
在 CSS 中增加 `display: flex` 会看到开启插件补全前后的构建结果是有差异的。

## 移动端 CSS px 自动转 rem

由于手机型号众多而且分辨率各不相同，手机页面样式要做不同尺寸的适配。
- 媒体查询
    - 需要编写多套适配样式代码
- rem 相对单位转换

rem： root 节点的 `font-size`（就是 1 个 rem）
rem 是相对单位，px 是绝对单位

通过使用 `px2rem-loader` 可以将 CSS 中的 px 单位转化为 rem，开发的时候还是写 px，打包的时候由插件自动转换。

```javascript
{
    rules: [
        {
            test: /\.less$/,
            use: [
                'style-loader','css-loader',{
                    loader: 'px2rem-loader',
                    options: {
                        remUnit: 75, // 1rem = 75px 适合 750px 的视觉稿
                        remPrecision: 8 // px 转换成 rem 之后保留小数点的位数
                    }
                },'less-loader',
            ]
        }
    ]
}
```

在页面渲染时计算根元素(root 节点)的 `font-size` 值可以使用手淘的 `lib-flexible` 库

npm 安装依赖 `npm i px2rem-loader -D`  `npm i lib-flexible -S`(这个是直接依赖)


## 资源内联

意义：
- 页面框架的初始化脚本（比如计算 root 节点的 `font-size`)
- 上报相关打点
    - 一些埋点相关的 js 应该内联到页面上，比如页面加载完成上报，CSS 加载完成上报
    - 前端监控埋点js内联，避免监控资源如果走http请求加载失败，导致无法监控的场景
- CSS 内联避免页面闪动
    - 闪动：先没有样式，等CSS资源回来了才有样式）
    - 内联：一开始随着 HTML 页面回来 CSS 就在页面里了
- 减少 http 请求开销
    - 小图片(小于5k/10k)或者字体内联（`url-loader`)

`raw-loader` 内联 html(常用于 meta 信息的内联)

`<%=require("raw-loader!./meta.html")%>`

`raw-loader` 内联 js

`<script><%=require("raw-loader!babel-loader!../node_modules/lib-flexible/flexible.js")%></script>`

`babel-loader` 用来转换 es6 的语法

npm 下载依赖 `npm i raw-loader@0.5.1 -D`


CSS内联的做法
- `style-loader`
    ```javascript
    {
        // webpack.config.js ... 省略其他配置
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: "top", // 样式插入到 <head>
                            singleton: true // 合并所有 style 标签为 1 个
                        }
                    }
                ]
            }
        ]
    }
    
    ```
- `html-inline-css-webpack-plugin`
