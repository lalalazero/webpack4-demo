# webpack4-demo

- [demo-02](./demo-02)
- [demo-01](./demo-01) 安装 webpack 和 webpack-cli


# demo-01

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
