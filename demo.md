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
optimization: {
    splitChunks: {
    cacheGroups: {
            commons: {
                test: /(react|react-dom)/,
                name: "vendors",
                chunks: "all" // 注意这个参数
            }
        }
    }
}

```
这里要注意这个 chunks 参数说明

- async 异步引入的库进行分离(默认)
- initial 同步引入的库进行分离
- all 所有引入的库进行分离(推荐)

打包出来就会有单独的 `vendors.[chunkshash].js` 文件，为了要在打包出来的 html 文件中使用这个 chunks，需要更新 htmlWebpackPlugin 的配置为
```javascript
new HtmlWebpackPlugin({
    chunks: ['vendors', pageName]
})
```
效果如：
![image](https://user-images.githubusercontent.com/20458239/79878599-30287880-8420-11ea-9647-99582b77fcc1.png)


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
### html-webpack-externals-plugin 体验分离基础包

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

**存在问题**
当直接把 htmlWebpackExternalsPlugin 写到 plugins 数组的后面时
```javascript
{
    // webpack.config.js ... 省略其他配置
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

出现奇怪的情况，为什么 index.html 把 react 和 react-dom 的 cdn 引入了一次，而 search.html 中各引入了两次？
![image](https://user-images.githubusercontent.com/20458239/79873534-d2912d80-8419-11ea-9844-3381d5c22ec6.png)

初步怀疑跟多页面打包有关，我又新加了一个 board/index.js board/index.html，然后打包出来3个页面 index.html, search.html, board.html，其中只有 search.js 中用到了 react，其他两个都没有用到 react。index.html 和 board.html 分别引用了 react 和 react-dom 各一次，而 search.html 引用了 react 和 react-dom 分别3次！

看了下[官方文档](https://github.com/mmiller42/html-webpack-externals-plugin)：**这里说明了如果有多个 htmlWebpackPlugin 实例，要指定 htmlWebpackExternalsPlugin 的 files 属性，否则会默认打到所有的文件中去**
![image](https://user-images.githubusercontent.com/20458239/79875822-c195eb80-841c-11ea-8b48-2b712c1742b6.png)

所以把插件改写成了这样
```javascript
// setMPA() 函数内的改造
htmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
        }
    }))
htmlWebpackPlugins.push(
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
        ],
        files: `${pageName}.html`
    })
)
```
保证 htmlWebpackPlugin 和 htmlWebpackExternalsPlugin 是成对的。这样修改之后，index.html 和 search.html board.html 都按照预期的只打了一次 react 和 react-dom 的 cdn 链接进去。
