# demo-14 动态 import

懒加载 js 的意义，减少首屏的 bundle.js 大小，初始下载的代码更小
方式:
- CommonJS: require.ensure
- ES: 动态 import （需要babel转换）
    - @babel/plugin-syntax-dynamic-import 如果不支持的话添加 babel 的这个 plugin
    - 我测试的时候不加也行，就不加了

懒加载的 js 会被单纯打成一个 bundle，不包含在 output 的 bundle.js 中，起到代码分离的作用。