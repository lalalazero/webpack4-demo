# demo-11 提取页面公共资源

## 提取思路

### 基础库分离

- 将 vue， react，react-dom 等基础库通过 cdn 引入，不打入 bundle 中
- 使用 html-webpack-externals-plugin

### 公共脚本分离

- webpack4 内置的 SplitChunksPlugin，用于替代(CommonsChunkPlugin插件)
    
## splitChunksPlugin 

### 分离基础库(vendor库)

比如分离 react， react-dom
```javascript
splitChunks: {
    cacheGroups: {
        commons: {
            test: /(react|react-dom)/,
            name: "vendors",
            chunks: "all"
        }
    }
}
```


### 分离页面公共文件
```javascript
splitChunks: {
    minSize: 0, // 分离的包体积的大小
    cacheGroups: {
        commons: {
            name: "commons",
            chunks: "all",
            minChunks: 2 // 最小引用次数是2,超过2次引用就分离打包
        }
    }
}
```
### html-webpack-externals-plugin 体验

npm 安装依赖 `npm i html-webpack-externals-plugin -D`

HtmlWebpackExternalsPlugin 分离 react 和 react-dom 之后构建的 js 明显小了很多
```javascript
{
  // webpack.config.prod.js ...省略其他配置
  plugins: [
      new HtmlWebpackExternalPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://cdn.bootcss.com/react/16.13.1/umd/react.production.min.js',
                    global: 'React'
                },
                {
                    module: 'react-dom',
                    entry: 'https://cdn.bootcss.com/react-dom/16.13.1/umd/react-dom.production.min.js',
                    global: 'ReactDOM'

                }
            ]
        })
  ]
}

```
![image](https://user-images.githubusercontent.com/20458239/79871110-7c6ebb00-8416-11ea-9579-6dde66f7e510.png)

对比分离之前(index.js 由于没有引用 React 和 ReactDOM 所以分离前后体积大小没什么变化）

![image](https://user-images.githubusercontent.com/20458239/79871363-d0799f80-8416-11ea-9392-c906ece0f88e.png)


