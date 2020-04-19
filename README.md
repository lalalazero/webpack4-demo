# webpack4-demo

- [demo-02](./demo-02) Entry 和 Output
- [demo-01](./demo-01) 安装 webpack 和 webpack-cli


# demo-02 Entry 和 Output
单入口
```javascript
module.exports = {
    entry: './path/to/entry/file.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    }
}
```
多入口
```javascript
module.exports = {
    entry: {
        app: './path/to/app.js',
        anotherApp: './path/to/anotherApp.js'
    },
    output: {
        filename: '[name].js', // [name] 占位符
        path: path.join(__dirname, 'dist'),
    }
}
```

# demo-01 安装 webpack

自 webpack 4 之后 webpack 和 webpack-cli 进行了分离，因此要分别安装

```shell
npm init -y
npm i webpack webpack-cli -D

```
在 package.json 的 scripts 中增加

```json
{
    "build":"webpack"
}
``` 

`npm run build` 等同于在命令行执行 `./node_modules/bin/webpack` 

手动创建 index.html 文件并把打包出来的 bundle.js 文件引进去
