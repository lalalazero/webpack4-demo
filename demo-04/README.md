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
    ],
    "plugins": [
        "@babel/proposal-class-properties" // ES6 class 语法
    ]
}
```
npm 安装如下依赖
`npm i @babel/core @babel/preset-env babel-loader -D`


## 解析 React JSX
.babelrc 增加 prest 配置
```javascript
{
    "presets": [
       "@babel/preset-react"
    ]
}
```
npm 安装如下依赖
`npm i react react-dom @babel/preset-react -D`