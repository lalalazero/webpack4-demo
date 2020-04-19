# demo-05 文件监听和热更新 WDS
## 文件监听
- 命令行开启：`webpack --watch`
- 修改配置 webpack.config.js 设置 `watch: true`
每当文件变化之后会自动重新构建文件，但是在浏览器还是要手动刷新的。。

文件监听的原理是轮询判断文件的最后修改时间有没有发生改变。某个文件发生了变化，并不会立刻通知监听者，而是先缓存起来，等 aggregateTimeout 时间到了再通知变化。

```javascript
module.exports = {
    watch: true, // 默认 false，不开启文件监听
    watchOptions: { // 只有 watch 为 true，watchOptions 配置了才有效
        ignored: /node_modules/, // 不监听变化的文件夹，支持正则匹配，默认为空
        aggregateTimeout: 300, // 监听到变化后多少毫秒再去执行，默认300ms
        poll: 1000 // 每秒向系统轮询文件是否发生变化的次数，1秒1000次就是每毫秒1次，默认1000

    }
}
```

## 热更新WDS webpack-dev-server
- wds 不刷新浏览器
- wds 不输出文件到磁盘上，而是存在内存中（文件监听会在文件变化后构建新的文件并输出到磁盘，wds 没有磁盘IO消耗，直接用内存所以更快）
- 配合使用 HotModuleReplacementPlugin 插件开启热更新功能

```json
{
    "dev": "webpack-dev-server --open" 
}
```
`--open` 参数指定每次构建完成后自动新开浏览器窗口

修改 webpack.config.js
```javascript
const webpack = require('webpack')
module.exports = {
    // ... 省略其他
    mode: 'development', // 热更新一般都是开发调试阶段
    plugins: [
        new webpack.HotModuleReplacementPlugin() // 该插件是 webpack 自带的
    ],
    devServer: {
        contentBase: './dist',
        hot: true // 开启热更新
    }
}
```

npm 添加依赖
`npm i webpack-dev-server -D`


### 热更新的原理

![image](https://user-images.githubusercontent.com/20458239/79695507-d9992e00-82a9-11ea-8642-17cdf2207afe.png)

启动过程从 1 -> 2 -> a -> b
文件热更新从 1 -> 2 -> 3 -> 4




