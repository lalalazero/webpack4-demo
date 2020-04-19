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