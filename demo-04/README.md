# demo-04 常见资源的 webpack 解析

## 解析 ES6
使用 babel-loader，并在 .babelrc 文件配置 preset 配置。
babel 的 plugins: 一个 plugin 就是一个功能。
babel 的 presets: 多个 plugins 的集合，就是 presets 预设。

```javascript
// webpack.config.js
{
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
        
    }
}
// .babelrc
{
    "presets": [
        "@babel/preset-env"
    ]
}
```
npm 安装如下依赖
`npm i @babel/core @babel/preset-env babel-loader -D`


## 解析 React JSX
.babelrc 增加 preset 配置
```javascript
{
    "presets": [
       "@babel/preset-react"
    ]
}
```
npm 安装如下依赖
`npm i react react-dom @babel/preset-react -D`

## 解析 CSS
- css-loader 加载 .css 文件，转换为 commonJS 对象导出
- style-loader 将样式通过 `style` 标签插入到 `head` 中
```javascript
// webpack.config.js
{
    // ...省略其他
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader','css-loader' 
            ] // 注意多个 loader 的调用顺序,从右到左
        }
    ]
}
```
npm 安装如下依赖
`npm i style-loader css-loader -D`

## 解析 less
- less-loader 解析 .less 文件，生成 .css 文件（依赖 less)
```javascript
{
    // webpack.config.js
    // ...省略其他
    rules: [
        {
            test: /\.less/,
            use: [
                'style-loader','css-loader','less-loader'
            ]
        }
    ]
}
```
npm 安装依赖
`npm i less less-loader -D`


## 解析图片和字体
- file-loader 解析
```javascript
{
    // webpack.config.js 配置 ...省略其他
    rules: [
        {
            test: /\.(png|jpg|gif|jpeg)$/,
            use: 'file-loader'
        },
        {
            test: /\.(woff|woff2|eot|otf|ttf)$/,
            use: 'file-loader'
        }
    ]
}
```
```css
/* 定义字体 */
@font-face {
    font-family: 'SourceHanSerifSC-Heavy';
    src: url('./images/SourceHanSerifSC-Heavy.otf');
}
/* 使用字体 */
.search-text {
    font-family: 'SourceHanSerifSC-Heavy';
}
```
npm 安装依赖
`npm i file-loader -D`


- url-loader 可以设置较小资源的 base64 内联
```javascript
{
   // webpack.config.js 配置 ...省略其他
    rules: [
        {
            test: /\.(png|jpg|gif|jpeg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10240 // 10kb
                    }
                }
            ]
        }
    ] 
}
```
npm 安装依赖
`npm i url-loader -D`

用 file-loader 解析图片
![image](https://user-images.githubusercontent.com/20458239/79694312-237e1600-82a2-11ea-8e0c-8d960d2a6e2d.png)

用 url-loader 将图片 base64 内联之后
![image](https://user-images.githubusercontent.com/20458239/79694262-dbf78a00-82a1-11ea-8ee3-498264aa0cd2.png)




