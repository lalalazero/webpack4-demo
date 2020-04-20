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