# demo-06 文件指纹

## 文件指纹的意义
- 不设置文件指纹，会导致文件重名，发布上线会覆盖旧的 css，js资源，如果发布出现故障会导致旧的资源也处于无法使用的状态（而且大公司的发布一般都会遵循灰度->全量的原则，要保持新旧资源同时的可用性）
- 版本管理，没有修改的文件(js,css,图片字体等资源)无需发布上线
- 更好的利用浏览器的本地缓存

## 文件指纹的分类
- Hash: 和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
    - webpack 初始化的时候有一个 compiler 对象，每次文件修改导致的构建会生成不同的 compilation 对象，这个对象的变化导致整个项目构建的 hash 值变化。（比如改了 A 页面引用的 a.js 修改也会导致 B 页面引用的 b.js 构建出来的文件指纹也变化，但是这是不需要的，所以有 chunkhash 概念）
- Chunkhash: 和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值
    - 还是上面的例子，通过区分不同页面不同 entry 以及 chunkhash，改了 A 页面的 a.js 不会引起 b.js 的指纹发生变化了，但是会引起相关 a.css 文件的变化，其实这也是不需要的，所以有 contenthash 的概念
- Contenthash: 根据文件内容来定义 hash，文件内容不变，则 contenthash 不变

## 设置 js 和 css 文件指纹
修改 webpack 配置
```javascript
{
    // ...省略其他配置
    output: {
        // 设置js文件的hash
        filename: '[name][chunkhash:8].js', 
    },
    plugins: [
        // 设置css文件的hash
        new MiniCssExtractPlugin({
            filename: '[name][contenthash:8].css'
        })
    ]
}
```
js 文件直接修改 output.filename 设置文件 hash。
对于使用 `style-loader`, `css-loader` 的项目而言，这两个 `loader` 都不会生成一个 `css` 文件。`css-loader` 是处理 `.css` 文件专程 `commonJS` 对象。`style-loader` 是把 `css` 内容直接提取并插入到 `head` 标签。所以需要一个单独的 `MiniCssExtractPlugin` 插件，生成 `css` 文件。

**生成 `.css` 文件和把 `css` 样式插入到 `head` 标签功能是互斥的，所以两者不能同时使用。**


## 设置图片字体等文件的指纹
修改 webpack 配置
```javascript
{
    // ... 省略其他配置
    {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: 'img/[name][hash:8].[ext]'
                }
            }
        ]
    }
}
```
| 占位符名称 | 含义 |
| --------- | ------- |
| [ext] | 资源后缀名 |
| [name] | 文件名称 |
| [path] | 文件的相对路径 |
| [folder] | 文件所在的文件夹 |
| [contenthash] | 文件的内容 hash，默认是 md5 生成 |
| [hash] | 文件内容的 hash, 默认是 md5 生成（ md5 长度 32 位，默认取前 8 位） |
| [emoji] | 一个随机的指代文件内容的 emoji |

- **这里图片设置的 [hash] 区别于前面讲的关于 webpack 项目修改后产生的构建 [hash]**
- **要为图片文件设置指纹，就不能用 `url-loader` 把小图片内联到 js 文件中去了。**
- **chunkhash 没法跟 wds 热更新等一起使用，所以要更新 mode 为 production**

npm 添加依赖
`npm i mini-css-extract-plugin -D`

### 查看效果
由于还没有讲到 htmlPlugin 插件，prodction 模式 build 完成之后需要手动在 dist 目录创建 `search.html`, 并引入 `search` 相关的两个文件，一个 js 一个 css
