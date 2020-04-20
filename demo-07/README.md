# demo-07 文件压缩

## JavaScript 压缩

wepback 4 内置了 `uglifyjs-webpack-plugin`, 模式为 `production` 时自动开启 js 压缩。

## CSS 压缩
使用 `optimize-css-assets-webpack-plugin`，同时使用 `cssnano`
```javascript
{
    // ...省略其他
    plugins: [
        new OptimizeCssAssestsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        })
    ]
}
```
npm 安装依赖 `npm i optimize-css-assets-webpack-plugin cssnano -D`

## HTML 压缩
使用 `html-webpack-plugin`, 设置压缩参数
```javascript
{
    // ... 省略其他
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/search.html'),
            filename: 'search.html',
            chunks: ['search'],
            inject: true, // 把生成的 js，css等注入 html 页面
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        })
    ]
}
```
npm 安装依赖 `npm i html-webpack-plugin -D`

通常一个页面对应一个 `html-webpack-plugin`，多个页面就需要添加多个配置