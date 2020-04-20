# demo-09

## 多页面应用打包通用方案

`SPA` v.s. `MPA` 
- SPA：只有一个 html 页面，不同的页面表现是前端根据 hash 路由或者 browser 路由实现的，本质还是渲染不同的 div
- MPA: 每次路由地址变化，服务端都返回一个新的 html 页面

多页面应用的优势：页面解耦，利于 SEO 优化

如何做多页面打包？动态获取 entry 并根据 entry 的数量设置对应的 html-webpack-plugin 数量。为了方便动态获取 entry，统一约定 entry 的格式为 src/xxxDir/index.js，比如 src/index/index.js, src/search/index.js，模版文件也都是叫 index.html

npm 安装依赖 `npm i glob -D`
